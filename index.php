<?php
// Enable error display
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Tell Twig where to find templates
$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader, ['cache' => false]);

// Decide which page to render
$page = $_GET['page'] ?? 'landing';

$template = match ($page) {
    'login' => 'login.html.twig',
    'signup' => 'signup.html.twig',
    'dashboard' => 'dashboard.html.twig',
    'tickets' => 'tickets.html.twig',
    default => 'landing.html.twig',
};

// Render the correct Twig file
echo $twig->render($template, ['page' => $page]);
