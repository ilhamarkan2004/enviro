<?php

namespace App\Http\Repositories;

use App\Models\WebSetting;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WebSettingRepository
{
    private $response;
    private $webSetting;

    public function __construct(Response $response, WebSetting $webSetting)
    {
        $this->response = $response;
        $this->webSetting = $webSetting;
    }

    private function validate(): array
    {
        return [
            'no_wa' => 'nullable|string|max:255',
            'url_form' => 'nullable|url|max:255',
        ];
    }

    public function getSetting()
    {
        $setting = $this->webSetting->first();
        if (!$setting) {
            $setting = $this->webSetting->create([
                'no_wa' => null,
                'url_form' => null,
            ]);
        }
        return $setting;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validate());
        if ($validator->fails()) {
            return $this->response->validationError($validator->errors());
        }

        $setting = $this->getSetting();
        $setting->update([
            'no_wa' => $request->input('no_wa'),
            'url_form' => $request->input('url_form'),
        ]);

        return $this->response->update($setting);
    }
}
