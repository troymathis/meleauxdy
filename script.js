const $test = $('#info')
const $form = $('form');
const $input = $('input[type="text"]')
const $found = $('#artists')
const $sList = $('#sList');
const $select = $('#select');
$form.on('submit',handleData)

// function pullInfo(id) {
//     $.ajax(`https://itunes.apple.com/lookup?id=${id}&entity=album`).then(function(albumData) {
//         const parsedAlbumData = $.parseJSON(albumData);
//         const albumList = parsedAlbumData.results
//         albumList.forEach(album => {
//             if (album.artistName == artName && album.collectionType == "Album") {
//                 $(``)
//             }
//         })
//     })
// }


// $.ajax({
//     url : `https://itunes.apple.com/lookup?id=${artID}&entity=album`,
//     dataType: "jsonp",
//     success: function (albumData) {
//         const parsedAlbumData = $.parseJSON(albumData);
//         const albumList = parsedAlbumData.results;
//         console.log(albumList);
//         albumList.forEach(album => {
//             if (album.artistName == artName && album.collectionType == "Album") {
//                 $sList.append(`<li>${album.collectionName}</li>`);
//             }})
//         }
//     })
//     const parsedAlbumData = $.parseJSON(albumData);
//     const albumList = parsedAlbumData.results
//     console.log(albumList);
//     albumList.forEach(album => {
//      if (album.artistName == artName && album.collectionType == "Album") {
//         $sList.append(`<li>${album.collectionName}</li>`);
// }
// })
// })

const months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function handleData(event) {
    event.preventDefault();
    const userReq = $input.val();
    $.ajax(`https://itunes.apple.com/search?term=${userReq}&entity=musicArtist`).then(function(data) {
        $found.text('');
        $select.text('');
        $sList.text('');
        const parsedData = $.parseJSON(data);
        console.log(parsedData);
        $found.text(`Artist/s Found: ${parsedData.resultCount}`) 
        $select.text('Select your artist...')
        const artistList = parsedData.results
        //comment out log
        console.log(artistList);
        artistList.forEach(element => {
            const artID = element.artistId;
            const artName = element.artistName;
            const primGen = element.primaryGenreName;
            $sList.append(`<li id=${artID}>${artName}</li> <p>Primary Genre: ${primGen}</p>`)
            $(`#${artID}`).on('click', function() {
                $sList.text('');
                $select.text('Click on an album for expanded info! / Search for more meleauxdies!');
                $found.text('');
                $.ajax({
                    url : `https://itunes.apple.com/lookup?id=${artID}&entity=album`,
                    dataType: "jsonp",
                    success: function (albumData) {
                        const albumList = albumData.results;
                        console.log(albumList);
                        albumList.forEach(album => {
                            const nameOfAlbum = album.collectionName
                            if (album.artistName == artName && album.collectionType == "Album") {
                                $sList.append(`<li id="${album.collectionId}">${nameOfAlbum}<img src=${album.artworkUrl60}></li>`);
                            }
                            const $albumiD = $(`#${album.collectionId}`);
                            $albumiD.on('click', function() {
                                $albumiD.text(`Track Count: ${album.trackCount}  Released: ${months[parseInt((album.releaseDate).substr(5,2))-1]} ${(album.releaseDate).substr(0,4)}`);
                            })
                        })

                        }
                    })
            })

        });
    }, function() {
        console.log("Something went wrong...");
        console.log(error); 
    });

}

//function takes user request and console logs every artist with the keyword in the itunes library
