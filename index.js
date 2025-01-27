$(document).ready(
    function(){
        $.get('https://jsonplaceholder.org/users', async function(responseData, status){
            if(status == 'success'){
                if(responseData.length > 0){
                    console.log('There is some data: ', responseData)

                    //  Made the table visible only if there is some data coming through APIs
                    $('#mytable').removeClass('tableBefore')
                    $('#mytable').addClass('tableAfter')

                    const totalCols = Object.keys(responseData[0]).length;
                    const totalRows = responseData.length;
                    console.log('Total Rows: ', totalRows);
                    console.log('Total Columns: ', totalCols);

                    const requiredCols = ['firstname', 'lastname', 'email', 'birthDate', 'phone', 'website', 'company']
                    const colNames = ['FirstName' , 'LastName', 'Email', 'BirthDate', 'Phone', 'Website', 'Company']

                
                    
                    let columnHeads = $('<tr></tr>')
                    const keys = Object.keys(responseData[0]);

                    // Setting the heading of the columns
                    for(let colh of colNames){
                        let tdel = $('<td></td>').text(colh).height(30).width(60).css(
                            {
                                'border': '2px solid black', 
                                'border-collapse': 'collapse', 
                                'text-align': 'center',
                                'margin': '0',
                                'padding': '4px 8px',
                                'font-weight': '600'
                            }
                        )
                        console.log(keys[colh])

                        columnHeads.append(tdel)
                    }
                    columnHeads.attr('id', 'colHeads')
                    $('#mytable').append(columnHeads)


                    // Adding each records as rows
                    for(let r = 0;r<totalRows;r++){
                        let row = $('<tr></tr>')
                        for(let colh = 0; colh<requiredCols.length;colh++){
                            let dataVal = (requiredCols[colh] == 'company') ? responseData[r][requiredCols[colh]]['name'] : responseData[r][requiredCols[colh]]
                            console.log(dataVal)
                            let tdel = $('<td></td>').text(dataVal).height(30).width(60).css( 
                                {
                                    'border-collapse': 'collapse',
                                    'padding': '4px 8px',
                                    'border': '2px solid grey', 
                                    'text-align': 'center',
                                }
                            )
                            row.append(tdel)
                        }
                        $('#mytable').append(row)
                    }


                    //Making the rows clickable


                    $('tr').not('#colHeads').click(
                        function(){
                            let popup = $('<div></div>')
                            popup.addClass('popup')
                            $('body').append(popup)

                            let closebtn = $('<span></span>').text('X')
                                            .css(
                                                {
                                                    'position': 'absolute',
                                                    'right': '2px',
                                                    'top': '2px',
                                                    'cursor': 'pointer',
                                                    'border': '2px solid red',
                                                    'border-radius': '4px',
                                                    'padding': '4px'
                                                }
                                            )
                                            .click(
                                                function(){
                                                    $(this).parent().hide()
                                                }
                                            )
                            popup.append(closebtn)

                            const data = $(this).children()
                            let ind = 0
                            for(d of data){
                                let p = $('<p></p>')
                                .append(
                                    $('<span></span>')
                                    .text(`${colNames[ind++]}: `)
                                    .css(
                                        {
                                            'font-weight': 500
                                        }
                                    )
                                )
                                .append(
                                    $('<span></span>')
                                    .text(d.textContent)
                                )
                                .css(
                                    {
                                        'text-align': 'center'
                                    }
                                )
                                popup.append(p)
                                // console.log(colNames[ind++],': ',d.textContent)
                            }
                            popup.toggle()
                        }
                    )
                }


                $('#searchbar:focus').focus(
                    function(){
                        const valu = $(this).val()
                        $('tr').not('#colHeads').filter(
                            function(){
                                // if($(this).children())
                            }
                        )
                    }
                )
                
            }
            
            if(status == 'error'){
                alert('Something went wrong!')
            }
        })
    }
)