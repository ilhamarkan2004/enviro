<?php

use App\Http\Controllers\ProfilController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\KeunggulanController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\KontakController;
use App\Http\Controllers\TentangKamiController;
use App\Http\Controllers\WebSettingController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\AlurPendaftaranController;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return redirect('/login');
});


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('operasional')->name('operasional.')->group(function () {
        Route::get('/pekerjaan', [TaskController::class, 'index'])->name('pekerjaan.index');
        Route::get('/pekerjaan/export/pdf', [TaskController::class, 'exportPdf'])->name('pekerjaan.export.pdf');
        Route::get('/pekerjaan/export/excel', [TaskController::class, 'exportExcel'])->name('pekerjaan.export.excel');
        Route::post('/pekerjaan', [TaskController::class, 'store'])->name('pekerjaan.store');
        Route::post('/pekerjaan/{id}', [TaskController::class, 'update'])->name('pekerjaan.update');
        Route::delete('/pekerjaan/{id}', [TaskController::class, 'destroy'])->name('pekerjaan.destroy');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



    Route::prefix('setting')
        ->name('setting.')
        ->group(function () {
            Route::get('/user', [UserController::class, 'index'])->name('user.index');
            Route::post('/user', [UserController::class, 'store'])->name('user.store');
            Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('user.destroy');
            Route::get('/user/export/pdf', [UserController::class, 'exportPdf'])->name('user.export.pdf');
            Route::get('/user/export/excel', [UserController::class, 'exportExcel'])->name('user.export.excel');

            Route::get('/akun', [ProfilController::class, 'index'])->name('akun.index');
            Route::post('/akun', [ProfilController::class, 'store'])->name('akun.store');

            Route::get('/role', [RoleController::class, 'index'])->name('role.index');
            Route::post('/role', [RoleController::class, 'store'])->name('role.store');
            Route::delete('/role/{id}', [RoleController::class, 'destroy'])->name('role.destroy');

            Route::get('/permission/{role_id}', [PermissionController::class, 'index'])->name('permission.index');
            Route::post('/permission', [PermissionController::class, 'store'])->name('permission.store');
        });
    Route::prefix('finance')
        ->name('finance.')
        ->group(function () {
            Route::get('/laporan', [UserController::class, 'index'])->name('user.index');
        });

    Route::prefix('master')
        ->name('master.')
        ->group(function () {
            Route::get('/department', [DepartmentController::class, 'index'])->name('department.index');
            Route::post('/department', [DepartmentController::class, 'store'])->name('department.store');
            Route::delete('/department/{id}', [DepartmentController::class, 'destroy'])->name('department.destroy');

            Route::get('/position', [PositionController::class, 'index'])->name('position.index');
            Route::post('/position', [PositionController::class, 'store'])->name('position.store');
            Route::delete('/position/{id}', [PositionController::class, 'destroy'])->name('position.destroy');
        });
});

require __DIR__ . '/auth.php';
