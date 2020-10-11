<?php
require 'vendor/autoload.php';
use Intervention\Image\ImageManagerStatic as Image;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {    
    $raw = file_get_contents("php://input");


    $json = json_decode($raw);


    $user = "@" . $json->user;
    $text = $json->body;



    //$size = (strlen($text) < 100) ? 40 : (strlen($text) < 160) ? 36 : (strlen($text) < 220) ? 32 : 28;
    $body = wordwrap($text, 28, "\n", false);


    $img = Image::make('input/ivy.png');
    $img->text($body, 320, 180, function($font) {
        $font->file = 'D:\xampp\htdocs\tweet-xender\php\font\cocogoose.ttf';
        $font->size(36);
        $font->color('#fff');
        $font->align('center');
        $font->valign('middle');
    });

    $img->text($user, 132, 338, function($font) {
        $font->file = 'D:\xampp\htdocs\tweet-xender\php\font\exo.ttf';
        $font->size(17);
        $font->color(array(255, 255, 255, 0.8));
    });
    $img->save('output/ok.png');

    $data = file_get_contents('output/ok.png');
    $bytes = filesize('output/ok.png');
    $base64 = base64_encode($data);


    $url = "http://$_SERVER[HTTP_HOST]/tweet-xender/php/output/" . 'ok.png';
    $response = [
        'status' => true,
        'url' => $url,
        'bytes' => $bytes,
        'base64' => $base64
    ];
    echo json_encode($response);
} else {
    http_response_code(400);
}