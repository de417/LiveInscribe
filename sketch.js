  let introWindow = true;
    let popupWindow = false;
    let font;
    let genreSelected;
    let canvas;
    let sentenceTyped;
    let textInput;


    function preload(){
        genreSelected = getGenreData("Romance");
        font = loadFont(genreSelected.font);
    }


    function setup(){
        canvas = createCanvas(windowWidth-100,windowHeight-100);
        background(255,255,255);                //PlaceHolder
        drawTitle();
        drawWelcome();

        radioButtons = createRadio();           //Creating Radio Buttons

        textInput = createInput('');            //Set Position if Needed
        textInput.size(500);
        textInput.input(processText);
        //Inp.position
    }
    
    //DRAW LIVE INSCRIBE TITLE

    function drawTitle(){
        let titleText = "Live Inscribe";
        //textFont(font);
        textStyle(NORMAL);
        textSize(40);
        fill(0);
        text(titleText,80,60);
    }


    //DRAW WELCOME MESSAGE

    function drawWelcome(){
        let welcomeText = "Click below and start typing to use the default world, or pick a genre to get the world you want to write in.";
        textStyle(NORMAL);
        textSize(20);
        fill(255,0,0);      //Use Genre Text Color
        text(welcomeText,95,100);
    }

    //REMOVE TITLE AND WELCOME MESSAGE ON MOUSE CLICKED

    function mouseClicked(){
        if(introWindow){
            clear();
            introWindow = false;
        }
    }
    
    //DRAW EVERY FRAME

    function draw(){
        if(introWindow){
            drawWelcome();
            drawTitle();
        }
        else{
            background(255,255,255);        //Change to genre background color later
            buttons();
            drawWords(sentenceTyped);
        }
    }

    //CREATE BUTTONS (GENRE,SAVE,CLEAR,HIDE)

    function buttons(){
        // Create Button
        genreButton = createButton('Genre');
        clearButton = createButton('Clear');
        saveButton = createButton('Save');
        hideButton = createButton('Hide');

        // Button Position
        genreButton.position(windowWidth-100,100);
        clearButton.position(windowWidth-100,130);
        saveButton.position(windowWidth-100,160);
        hideButton.position(windowWidth-100,190);

        //Button Function;
        genreButton.mousePressed(genre);
        clearButton.mousePressed(customClear);
        saveButton.mousePressed(save);
        hideButton.mousePressed(hide);
      
        //
        genreButton.style('background-color', '#4CAF50')
    }

    //SHOW GENRE POPUP AND RADIO BUTTONS

    function genre(){
        popupWindow = true;
        //let popupCanvas = createCanvas(300,300);
        //popupCanvas.position(innerWidth/2 - 150,innerHeight/4,'fixed');
        background(100);

        radioButtons.show();
        radioButtons.option('Drama');
        radioButtons.option('Fable');
        radioButtons.option('Fairy Tale');
        radioButtons.option('Fantasy');
        radioButtons.option('General Fiction');
        radioButtons.option('Horror');
        radioButtons.option('Mystery');
        radioButtons.option('Poetry');
        radioButtons.option('Romance');
        radioButtons.option('SciFi');
        //radioButtons.option('No Genre');
        radioButtons.position(windowWidth/2 -100, windowHeight/4 + 20);
        radioButtons.style('width', '70px');
        textAlign(CENTER);

        genreSelected = getGenreData(radioButtons.value());

        saveGenreButton = createButton('Save');
        saveGenreButton.position(windowWidth/2 , windowHeight/2)
        saveGenreButton.mousePressed(saveGenre);
        
        
    }

    //CLEAR TEXT ON CLEAR BUTTON PRESSED

    function customClear(){
        //clear();
        //canvas = createCanvas(innerWidth-100,innerHeight-100);
        textInput.value('');
    }

    //SAVE CANVAS AS IMAGE

    function save(){
        saveCanvas(canvas,'jpg');
    }

    //HIDE BUTTONS

    function hide(){
        console.log("Hide Pressed");
    }

    //SAVE THE GENRE SELECTED IN RADIO BUTTONS AND LOAD THE GENRE DATA (FONT,COLOR)

    function saveGenre(){
        if(popupWindow){
            font = loadFont(genreSelected.font);
            radioButtons.hide();
            saveGenreButton.hide();
            //clear();
            //canvas = createCanvas(innerWidth-100,innerHeight-100);
            console.log(canvas);
            popupWindow = false;
        }
    }

    //DRAW TEXT ON TO CANVAS

    function drawWords(words){
        textFont(font);
        text(words,50,windowHeight/2 - 100);
    }

    //PROCESS THE TEXT USING RITA

    function processText(){
        sentenceTyped = this.value();
        console.log(sentenceTyped);
    }

    //STORE GENRE DATA (FONT,COLOR)

    function getGenreData(genre){
        let canvasData;

        switch(genre){
            case "Drama":
                font = 'Font/Limelight-Regular.ttf'
                break;
            case "Fable":
                font = 'Font/FaunaOne-Regular.ttf'
                break;
            case "Fairy Tale":
                font = 'Font/HennyPenny-Regular.ttf'
                break;
            case "Fantasy":
                font = 'Font/MedievalSharp-Regular.ttf'
                break;
            case "General Fiction":
                font = 'Font/Limelight-Regular.ttf'
                break;
            case "Horror":
                font = 'Font/CosmicNeue-Regular.ttf'
                break;
            case "Mystery":
                font = 'Font/SpecialElite-Regular.ttf'
                break;
            case "Poetry":
                font = 'Font/Esteban-Regular.ttf'
                break;
            case "Romance":
                font = 'Font/LoveLight-Regular.ttf'
                break;
            case "SciFi":
                font = 'Font/Orbitron-Regular.ttf'  
                break;
            default:
                font = 'Font/Limelight-Regular.ttf'           
                break;
        }
        canvasData = { 
            font: font,
        };
        return canvasData;
    } 