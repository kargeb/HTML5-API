</div><!-- /.container -->

<footer class="navbar navbar-default">
    <div class="container">
        <p class="text-center">HTML5: Programowanie aplikacji &copy; <a href="http://eduweb.pl">eduweb.pl</a></p>
    </div>
</footer>

<script src="template/js/jquery.js"></script>
<script src="template/js/bootstrap.min.js"></script>
<script src="template/js/prettify.js"></script>
<script>
    window.prettyPrint && prettyPrint();
</script>

<?php if(!Loader::$is_main_page && Loader::has_script()) : ?>
<script src="<?php echo Loader::get_script_source(); ?>"></script>
<?php endif; ?>
</body>
</html>