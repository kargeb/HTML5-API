<?php

/**
 * LoaderClass.php
 *
 * System ten pozwoli Ci w przystępny sposób, bez zbędnego kodu HTML
 * przeglądać oraz testować przykłady aplikacji napisanych w kursie.
 *
 * @author     Piotr Palarz <piotr@depalage.com>
 * @copyright  eduweb.pl
 * @version    1.2
 * @link       http://eduweb.pl
 */

class Loader
{

    /*
        VARS
    */

    private static $config;
    private static $page;
    public static $is_main_page = true;

    /*
        HTML ELEMENTS
    */

    public static function make_menu()
    {
        $output = '';
        $counter = 0;

        foreach(self::$config as $section) {
            $output .= '<li><a href="#" data-toggle="dropdown"><strong><span class="label label-danger">' . ++$counter . '</span> ' . $section->sectionTitle . '</strong></a></li>' . PHP_EOL;
            $output .= '<li class="divider"></li>' . PHP_EOL;

            foreach($section->examples as $page) {
                $output .= '<li';
                if(!self::$is_main_page && $page->fileName == self::$page->fileName)
                    $output .= ' class="active"';
                $output .= '><a href="index.php?e=' . $page->fileName . '">' . $page->exampleTitle . '</a></li>' . PHP_EOL;
            }

            $output .= '<li class="divider"></li>' . PHP_EOL;
        }

        return $output;
    }

    public static function make_breadcrumbs()
    {
        $output = '<ol class="breadcrumb">' . PHP_EOL;
        $output .= '<li>' . self::get_page_attr("sectionTitle") . '</li>' . PHP_EOL;
        $output .= '<li class="active">' . self::get_page_attr("exampleTitle") . '</li>' . PHP_EOL;
        $output .= '</ol>';

        return $output;
    }

    public static function get_example()
    {
        $path_to_file =  self::get_example_dir() . self::get_page_attr("fileName") . ".html";

        if(file_exists($path_to_file))
            include_once($path_to_file);
    }

    public static function get_script_source_preview()
    {
        $path_to_file =  self::get_script_source();

        if(file_exists($path_to_file))
            return htmlspecialchars(file_get_contents($path_to_file));
    }

    public static function get_header()
    {
        include_once "assets/template-parts/header.php";
    }

    public static function get_footer()
    {
        include_once "assets/template-parts/footer.php";
    }

    /*
        LOGIC
    */

    private static function get_example_dir()
    {
        return "examples/" . self::get_page_attr("sectionNumber") . "/" . self::get_page_attr("dirName") . "/";
    }

    public static function get_example_title()
    {
        return self::get_page_attr("exampleTitle");
    }

    public static function has_script()
    {
        return (bool) self::get_page_attr("scriptName");
    }

    public static function get_script_source()
    {
        return self::get_example_dir() . "js/" . self::get_page_attr("scriptName") . ".js";
    }

    public static function get_page_title()
    {
        return self::get_page_attr("sectionTitle") . ": " . self::get_page_attr("exampleTitle");
    }

    private static function get_page_attr($key)
    {
        if(self::$page == NULL) return;

        return @ self::$page->{$key};
    }

    private static function filter_pages($file_name)
    {
        $counter = 0;

        foreach(self::$config as $section) {
            ++$counter;

            foreach($section->examples as $page) {
                if($page->fileName == $file_name) {
                    $page->sectionTitle = $section->sectionTitle;
                    $page->sectionNumber = $counter;

                    return $page;
                }
            }

        }

        return NULL;
    }

    private static function get_current_page()
    {
        if(isset($_GET["e"]) && !empty($_GET["e"])) {
            $file_name = $_GET["e"];

            $current_page = self::filter_pages($file_name);
            if($current_page != NULL) {
                self::$is_main_page = false;
                return $current_page;
            }
        }

        return NULL;
    }

    public static function init()
    {
        $config_path = "config.json";
        if(!file_exists($config_path))
            exit("Plik 'config.json' nie zostal znaleziony!");

        self::$config = json_decode(file_get_contents($config_path));
        self::$page = self::get_current_page();
    }

};

Loader::init();

?>