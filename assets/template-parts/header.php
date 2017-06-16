<!DOCTYPE html>
<html>
<head>
    <?php if(Loader::$is_main_page) : ?>
    <title>HTML5: Programowanie aplikacji</title>
    <?php else : ?>
    <title><?php echo Loader::get_page_title(); ?></title>
    <?php endif; ?>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="template/images/favicon.ico" type="image/x-icon">
    <link href="template/css/bootstrap.css" rel="stylesheet">
    <link href="template/css/prettify.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <![endif]-->
</head>
<body>

<div class="container">
    <nav class="navbar navbar-default navbar-inverse" role="navigation">

        <div class="navbar-header">
            <a class="navbar-brand navbar-brand-img" href="http://eduweb.pl">
                <img src="template/images/eduweb_logo.png" alt="Eduweb.pl">
            </a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Lista przykładów <b class="caret"></b></a>
                    <ul class="dropdown-menu">

                        <?php echo Loader::make_menu(); ?>

                        <li><a href="examples/"><span class="glyphicon glyphicon-folder-open"></span>Przejdź do folderu z przykładami</a></li>
                    </ul>
                </li>
            </ul>
            <p class="navbar-text navbar-right"><a href="index.php" class="navbar-link">HTML5: Programowanie aplikacji</a></p>
        </div><!-- /.navbar-collapse -->
    </nav>