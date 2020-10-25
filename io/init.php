<?php
require 'vendor/autoload.php';
use Intervention\Image\Image as Image;


$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

	$i = $data->i; //TweetID or file name
	$user = "@" . $data->user; //Tweet User
	$text = preg_replace('/(\s+|^)@\S+/', '', $data->body); //Remove all Twitter handles
	$text = preg_replace('/[[:^print:]]/', '', $text); //Remove all emojis
	$text = wordwrap($text, 20, "\n", true);

	$xd = ["car.png", "dark.png", "food.png", "room.png", "rock.png", "green.png", "red.png"];
	$img = Image::make("input/" . $xd[rand(0, (count($xd) - 1))]);
	$img->text($text, 320, 180, function($font) {
	    $font->file('D:\xampp\htdocs\tweet-xender\io\font\graviola.ttf');
	    $font->size(32);
	    $font->color('#FFFFFF');
	    $font->align('center');
	    $font->valign('middle');
	});


	$img->text($user, 120, 340, function($font) {
	    $font->file('D:\xampp\htdocs\tweet-xender\io\font\exo.ttf');
	    $font->size(14);
		$font->color(array(255, 255, 255, 0.8));
	});


	$img->text("@TweetXender", 20, 340, function($font) {
	    $font->file('D:\xampp\htdocs\tweet-xender\io\font\exo.ttf');
	    $font->size(14);
		$font->color(array(255, 255, 255, 0.8));
	});



	$img->save("output/{$i}.png");

	http_response_code(204);
} else http_response_code(400);
