<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {    
    $raw = file_get_contents("php://input");

    $json = json_decode($raw);


    $i = $json->i;
    $user = "@" . $json->user;
    $text = $json->body;




    $im = @imagecreatefrompng('input/ivy.png');


    $white = imagecolorallocate($im, 255, 255, 255);
    
    
    
    
 
    
    $text = wordwrap($text, 40, "\n", false);
    
    $uploads_dir = 'output/';
    // Replace path by your own font path
    $font = 'D:\xampp\htdocs\tweet-xender\php\font\cocogoose.ttf';
    $font_size = 20;
    $angle = 45;
    
    
    $name = $uploads_dir . $i. ".png";
    
    
    $image_width = imagesx($im);  
    $image_height = imagesy($im);
    
    
    $text_box = imagettfbbox($font_size, $angle, $font, $text);
    
    
    
    
    $xr = abs(max($text_box[2], $text_box[4]));
    $yr = abs(max($text_box[3], $text_box[7]));
    
    $x = intval(($image_width - $xr) / 2);
    $y = intval(($image_height + $yr) / 2);
    
    
    
    imagettftext($im, $font_size, 0, $x, $y, $white, $font, $text);
    
    imagepng($im,$name,9);
    imagedestroy($im);

    http_response_code(204);
} else {
    http_response_code(400);
}