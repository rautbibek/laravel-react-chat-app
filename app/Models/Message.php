<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $fillable=['message','from','to','type'];

    public function receiver(){
        return $this->belongsTo(User::class,'to');
    }
}
