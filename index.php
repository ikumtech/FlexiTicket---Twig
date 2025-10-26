<?php
require_once __DIR__ . '../vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$templatesPath = __DIR__ . '../templates';
$loader = new FilesystemLoader($templatesPath);
$twig = new Environment($loader, ['cache' => false]);

$page = $_GET['page'] ?? 'landing';

$template = match ($page) {
    'login' => 'login.html.twig',
    'signup' => 'signup.html.twig',
    'dashboard' => 'dashboard.html.twig',
    'tickets' => 'tickets.html.twig',
    default => 'landing.html.twig',
};

// 👇  debug before rendering
$templateFile = $templatesPath . '/' . $template;
if (!file_exists($templateFile)) {
    die("<p style='color:red;font-family:sans-serif'>
         Template not found: <b>$templateFile</b>
       </p>");
}

try {
    echo $twig->render($template, ['page' => $page]);
} catch (Throwable $e) {
    echo "<pre style='color:red;font-family:monospace'>";
    echo "Twig error: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
    echo "</pre>";
}
