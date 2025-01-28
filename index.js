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

                    $('#searchbar').val('')
                
                    
                    function setColHeads(responseData, colNames){
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

                            columnHeads.append(tdel)
                        }
                        columnHeads.attr('id', 'colHeads')
                        $('#mytable').append(columnHeads)
                    }


                    // Adding each records as rows
                    function addRecords(responseData, totalRows, requiredCols){
                        for(let r = 0;r<totalRows;r++){
                            let row = $('<tr></tr>').attr('id', responseData[r]['id'])
                            for(let colh = 0; colh<requiredCols.length;colh++){
                                let dataVal = (requiredCols[colh] == 'company') ? responseData[r][requiredCols[colh]]['name'] : responseData[r][requiredCols[colh]]
                                
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
                    }


                    //Making the rows clickable
                    function rowClicks(colNames){
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
                                }
                                popup.toggle()
                            }
                        )
                    }

                    async function makeTable(responseData, totalRows, requiredCols, colNames){
                        setColHeads(responseData, colNames);
                        addRecords(responseData, totalRows, requiredCols);
                        rowClicks(colNames);
                    }

                    await makeTable(responseData, totalRows, requiredCols, colNames)
                    pagination(10, totalRows)
                    searchBar()
                }


                // Filtering using searchbar
                function searchBar(){
                    $('#searchbar').on('input',
                        function(){
                            console.log('Search bar is being focused.')
                            const valu = ($(this).val()).toLowerCase()
    
                            const currPage = findCurrPage()
    
                            filterLogic(currPage, valu)
                        }
                    )
                }

                function findCurrPage() {
                    const currPage = $('#pageNav').children('.active').text()
                    console.log('Current Page: ', currPage)

                    return currPage
                }

                function filterLogic(currPage, valu) {
                    $(`.page${currPage.toString()}`)
                    .filter(
                        function(){
                            const cs = $(this).children(':first')
                            const str = (cs[0].textContent).toString().toLowerCase()
                            if((valu.length == 0) || (str.includes(valu))){
                                return true;
                            }else{
                                return false
                            }
                        }
                    ).show()
                
                    $(`.page${currPage.toString()}`).not(
                        $(`.page${currPage.toString()}`).filter(
                            function(){
                                const cs = $(this).children(':first')
                                const str = (cs[0].textContent).toString().toLowerCase()
                                if((valu.length == 0) || (str.includes(valu))){
                                    return true;
                                }else{
                                    return false
                                }
                            }
                        )
                    ).hide()
                }


                // Pagination

                function pagination(thresh, rows){
                    const pagesNeeded = Math.ceil(rows/thresh)
                    if(pagesNeeded > 1){
                        // Apply pagination
                        const pageNav = $('<div></div>').css(
                            {
                                'display': 'flex',
                                'flex-direction': 'row',
                                'border-collapse': 'collapse',
                                'border': '2px solid black',
                                'background-color': '#fff',
                                'border-radius': '4px'
                            }
                        ).attr('id', 'pageNav')

                        for(let p = 1;p<=pagesNeeded;p++){
                            for(let el = ((p-1)*thresh);el<((p-1)*thresh)+thresh;el++){
                                if(el >= rows) break;
                                ($('tr').not('#colHeads')).filter(
                                    function(){
                                        if(($(this).attr('id')).toString() == `${el+1}`){
                                            return true
                                        }else{
                                            return false
                                        }
                                    }
                                ).addClass(`page${p}`)
                            }

                            pageNav.append(
                                $('<span></span>')
                                .text(p.toString())
                                .click(
                                    function(){
                                        $('tr').filter(`.page${p}`).show()
                                        $('tr').not('#colHeads').not(`.page${p}`).hide()
                                        $(this).siblings('.active').removeClass('active')
                                        $(this).addClass('active')
                                        const currPage = findCurrPage()
                                        const valu = ($('#searchbar').val()).toLowerCase()
                                        filterLogic(currPage,valu)
                                    }
                                )
                                .attr('id',`page${p}`)
                                .addClass('inactive')
                            )
                        }

                        $('body').append(pageNav)
                    }

                    // default
                    $('tr').not('#colHeads').not('.page1').hide()
                    $('#page1').addClass('active')
                }
                
            }
            
            if(status == 'error'){
                alert('Something went wrong!')
            }
        })
    }
)