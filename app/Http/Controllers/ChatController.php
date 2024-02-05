<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index(){
        return Inertia::render('Chat/Messanger',[
            'data'=>'me'
        ]);
    }

    public function selectUser($id){
        $user=User::findOrFail($id);
        $messages=Message::where(function($query) use($id){
            $query->where('from',$id)->where('to',auth()->id());
        })->orWhere(function($query) use($id){
            $query->where('from',auth()->id())->where('to',$id);
        })->get();
        return Inertia::render('Chat/Messanger',[
            'user'=>$user,
            'chats'=>$messages
        ]);
    }

    public function sendMessage(StoreMessageRequest $request){
        // return $request->all();
        $msg=$request->get('message');
        $receiver_id= $request->get('receiver_id');
        // $message = new Message();
        $message= Message::create([
            'from'=>auth()->id(),
            'to'=>$receiver_id,
            'message'=>$msg,
            'type'=>false
        ]);
        broadcast(new MessageSent($message))->toOthers();
        return response()->json([
            'message'=>$message
        ]);
    }
}
