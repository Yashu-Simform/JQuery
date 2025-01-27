# JQuery

##  JQuery for DOM Manipulation
### Get and set methods
-   text()
-   html()
-   val()
-   attr()

### How they are used as getters:
-   $('p').text()
-   $('p').html()
-   $('p').val()
-   $('p').attr('href')     ->     return the corresponding value of href attribute of selected element.

### How they are used as setters:
-   $('p').text('Changing the text as New Text!')
-   $('p').html(`<p>This is the html contentI want to set.</p>`)
-   $('input').val('Simform')
-   $('p').attr('href', 'https://www.letsgo.com')

### How callback functions are used for setters
-   $('p').text(function(i, origtext){
        return 'Original text: ' + origtext + 'hi.';
    });
-   $('p').html(function(i, origtext){
        return `<p>This is the html contentI want to set.</p>`;
    });
-   $('p').val(function(i, origtext){
        return 'Old value: ' + origtext + '.';
    });
-   $('p').attr('href', function(i, origtext){
        return 'https://www.letsgo.com';
    });


### Methods to add elements:
-   append()
-   prepend()
-   after()
-   before()


### How to use?
eg. `<body><div><h1>Oho!</h1></div></body>`

-   $('div').append(`<p>This is the appended element.</p>`)     ->      `<body><div><h1>Oho!</h1><p>This is the appended element.</p></div></body>`
-   $('div').prepend(`<p>This is the appended element.</p>`)    ->      `<body><div><p>This is the appended element.</p><h1>Oho!</h1></div></body>`
-   $('div').after(`<p>This is the appended element.</p>`)      ->      `<body><div><h1>Oho!</h1></div><p>This is the appended element.</p></body>`
-   $('div').before(`<p>This is the appended element.</p>`)      ->      `<body><p>This is the appended element.</p><div><h1>Oho!</h1></div></body>`


### How to add multiple elements simultaneously
-   $('div').append(`<p>This is the appended element.</p>`, `<h1>Oho!</h1>`, `<span>Oho!</span>`)


### How to create HTML element using jQuery
-   $("<p></p>").text('This element is created using JQuery.')

### Methods to remove the elements
-   remove()    ->      removes the specific element
-   empty()     ->      remove all children from the specific element

### How to use
eg. `<body><div><h1>Oho!</h1></div></body>`

-   $('div').remove()       ->      `<body></body>`
-   $('div').empty()        ->      `<body><div></div></body>`

#### Can use filters to select specific elements
-   $('div').remove('.class1, .class2, .class3')       ->      `<body></body>`
-   $('div').empty('.class1, .class2, .class3')        ->      `<body><div></div></body>`


### Methods to add CSS classes
You can specify as many classes as you want in these methods.
-   addClass()
-   removeClass()
-   toggleClass()


### CSS styles getters and setters
-   eg. $('p').css('background-color')          ->      gets the value of the background-color property for the p element
-   eg. $('p').css('background-color', 'red')   ->      sets the value of the background-color property as "red" for the p element


### Methods to get and set Dimensons
-   height()
-   width()
-   innerheight()
-   innerwidth()
-   outerHeight()
-   outerWidth()

-   To Set the values:
    e.g.    $('p').height(500).width(800)

### Methods to traverse the DOM tree

#### Traversing towards Ancestors:
-   parent()        ->      Return a single parent of the selected element
-   parents()       ->      Returns all parents of the selected element till root element
-   parentsUntil(default = root element)  ->      Returns all parents until the specified parent element for the selected element

-   can add filters to get only selective parent elements


#### Traversing towards children:
-   children()                  ->      Returns all the direct children of the selected element  
-   find(requires a param)      ->      Returns the specified elements which are descendent to the selected element
-   find('*')                   ->      Returns all the descendent elements to the selected element

-   can add filters to get only selective descendent elements

#### Traversing to same level elements (siblings):
-   siblings()      ->      Returns all siblings of the selected element
-   next()          ->      Returns the immediate next element to the selected element
-   nextAll()       ->      Return all elements after the selected element (in same level)
-   nextUntil(default=parent element)     ->      Return all elements until the specified element which comes after the selected element
-   previous()      ->      Return the immediate previous element to the selected element
-   previousAll()   ->      Return all previous elements for the selected element
-   previousUntil(default=parent element) ->      Return all elements until the specified element which comes before the selected element

-   can add filters to get the selective siblings


#### Filter methods while Traversing:
-   first()     ->      Returns first of its kind
-   last()      ->      Returns last of its kind
-   filter()    ->      Returns all the elements which matches the specified criteria
-   not()       ->      Opposite of filter method, returns all elements which does not match the criteria
-   eq()        ->      Returns the element at the specified index


### AJAX (Asynchronous JavaScript and XML):
-   AJAX provide the way to load the data to a perticular HTML element, without re-loading the entire page.
-   Thus no need to reload the page again and again, just load only the part of the page which requires to be loaded.  
-   If we try to write the AJAX code without JQuery it is going to be bit tricky, as different browsers have different syntactical requirements for AJAX.
    So we need to write code multiple times to get work upon different browsers.
-   But JQuery has a support which enables us to write the code which is supported by all browsers.


#### AJAX Methods provides by JQuery:
-   load(url, data, callback)
    e.g.    $('p').load('https://www.mongodb.com/yashu/getm')       ->      Loads the data to the p tag

    callback function:
    $('p').load(url, function(responseTxt, statusText, xhr){
        if(statusText == 'success'):
            print('Request called successfully!')
        if(statusText == 'error'):
            print('Got an error while processing request!')
            alert('Status Code: ', xhr.status, ' Message:', xhr.statusText)
    })


-   get(url, callback)
    e.g.    $.get('https://www.mongodb.com/yashu/getm', function(responseData, status){
        if(status == 'success'):
            print('Request called successfully!')
            print('Response': responseData)
        if(status == 'error'):
            print('Got an error while pricessing the request.')
    })


-   post(url, data, callback)
    e.g.    $.post('https://www.mongodb.com/yashu/getm',
            {
                name: 'Yashu',
                'dept': ''Python
            },
            function(responseData, status){
                if(status == 'success'){
                    console.log('Request processed successfully!')
                }

                if(status == 'error'){
                    console.log('Got an error while processing the request!')
                }
            }
    )