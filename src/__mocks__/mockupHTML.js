export default document.body.innerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe Journal</title>
    <script src="https://kit.fontawesome.com/04925f0a69.js" crossorigin="anonymous"></script>
</head>
<body>
     <header>
        <div id="logo" class="logo"></div>
        <nav class="header-nav" id="header-nav">
            <ul>
                <li class="items-num" id="items-num"><a href="#"></a></li>
                <li class="contact" id="contact"><a href="#">Contact</a></li>
                <li class="about" id="about"><a href="#">About</a></li>
            </ul>
        </nav>
    </header>
     <section class="item-wrapper" id="item-wrapper">
        <div class="item-board" id="item-board"></div>
        <!-- <div class="pop-up" id="pop-up"></div> -->
            
        <footer class="footer" id="footer">
            <p>Created by Fasasi and Clarence Atim</p>
        </footer>
    </section>
</body>
</html>
`;