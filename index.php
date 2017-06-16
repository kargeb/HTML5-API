<?php

require_once "assets/LoaderClass.php";

?>
<!-- HEADER -->
<?php Loader::get_header(); ?>

<?php if(!Loader::$is_main_page) : ?>

    <!-- BREADCRUMBS -->
    <?php echo Loader::make_breadcrumbs(); ?>

    <!-- TITLE -->
    <h2><?php echo Loader::get_example_title(); ?></h2>

    <!--  EXAMPLE -->
    <div class="panel panel-default">
        <div id="playground" class="panel-body">
            <?php Loader::get_example(); ?>
        </div>
    </div>

    <!-- SCRIPT SOURCE -->
    <?php if(Loader::has_script()) : ?>
    <button type="button" class="btn btn-primary btn-sm" data-toggle="collapse" data-target="#script-preview">Pokaż skrypt dla tego przykładu</button>
    <div id="script-preview" class="collapse">
        <pre class="prettyprint"><?php echo Loader::get_script_source_preview(); ?></pre>
    </div>
    <?php endif; ?>

<?php else : ?>

    <!-- WELCOME MESSAGE -->
    <div class="jumbotron">
        <h2>Witaj w kursie programowania z HTML5!</h2>
        <p>Strona, którą masz przed sobą, pozwoli Ci szybko oraz w przyjazny sposób zapoznać się z aplikacjami, które stworzymy w kursie.</p>

        <br>

        <h3>Jak korzystać z systemu?</h3>
        <p>Aby przejść do konkretnego przykładu, skorzystaj z rozwijanego menu <a href="#menu">Lista przykładów</a>.</p>
        <p>Na podstronie większości z aplikacji, widoczny będzie przycisk <button type="button" class="btn btn-primary btn-sm">Pokaż skrypt dla tego przykładu</button>
        za pomocą którego, szybko podejrzysz kod źródłowy stworzonej aplikacji.</p>
        <p>&nbsp;</p>
        <p>Na końcu menu <a href="#menu">Lista przykładów</a> znajdziesz również link, który przeniesie Cię do katalogu z przykładami.</p>

        <p>&nbsp;</p>
        <h3>Dobrej zabawy!</h3>
    </div>

<?php endif; ?>

<!-- FOOTER -->
<?php Loader::get_footer(); ?>