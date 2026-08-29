<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'department_id',
        'user_id',
        'created_by',
        'deadline_at',
        'status',
        'priority',
        'is_reminded',
        'is_overdue_notified',
    ];

    public function pic()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function histories()
    {
        return $this->hasMany(TaskHistory::class, 'task_id')->orderBy('created_at', 'desc');
    }
}
