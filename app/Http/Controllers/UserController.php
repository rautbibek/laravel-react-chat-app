<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getChatUsers(){
        $users= User::where('id','<>',auth()->id())->paginate(50);
        return $users;
    }
}
