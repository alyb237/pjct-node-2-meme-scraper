import fs from 'fs';
import { link } from 'fs/promises';
import got from 'got';
import https from 'https';
import * as jsdom from 'jsdom';

const { JSDOM } = jsdom;

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

const path = './memes';

fs.access(path, (error) => {
  // To check if the given directory
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('New Directory created successfully !!');
      }
    });
  } else {
    console.log('Directory already exists !!');
  }
});

// create DOM and get link
got(url)
  .then((response) => {
    const stringReturned = response.body;
    // console.log(typeof response.body);
    const dom = new JSDOM(stringReturned);
    // create an array out of the html elements for filtering img
    const nodeList = [...dom.window.document.querySelectorAll('img')];
    // prints out the first element in the array
    // console.log(nodeList[0].src);
    const fileName = link.src;
    // limit array to only 10
    nodeList.slice(0, 10).forEach((link, index) => {
      const fileName = link.src;
      const streamUrl = fileName;

      // A function to reset
      function reset() {
        renewHTML = renewHTML.slice(indexL + 10);
      }

      for (let i = 0; i < 10; i++) {
        //console.log(streamUrl);
        https.get(streamUrl, (res) => {
          const path = `memes/0${i + 1}.jpg`;
          const writeStream = fs.createWriteStream(path);

          res.pipe(writeStream);

          writeStream.on('finish', () => {
            writeStream.close();
            console.log('downloaded');
          });
        });
      }

      // console.log(fileName);
      // console.log(index);
    });
  })
  .catch(() => {});

// This function renews the indexes
function reset() {
  // beginning 37 characters in the src link
  indexF = renewHTML.indexOf(`src="https://api.memegen.link/images/`);
  // last characters in the src link
  indexL = renewHTML.indexOf('?width=300');
  indexSlash = renewHTML.indexOf('/', indexF + 37);
  srcString = renewHTML.slice(indexF + 5, indexL);
  srcTemplate = renewHTML.slice(indexF + 37, indexSlash);
}

// download img
// for (i = 0; i < 10; i++) {
// got
//   .stream(`${url}/${fileName}`)
//   .on('error', (err) => {
//     console.log(err);
//     console.log(`Error1 on ${url}/${fileName}`);
//   })
//   .pipe(fs.createWriteStream(`./memes/0${`[i + 1]`}.jpg/${fileName}`))
//   .on('error', (err) => {
//     console.log(err);
//     console.log(`Error2 on ${url}/${fileName}`);
//   })
//   .on('finish', () => console.log(`Downloaded: ${fileName}`));
// }

//     console.log(fileName);
//     // console.log(index);
//   });
// })
// .catch(() => {});

// const data = scraper();
// //console.log(data);

// const isImg = (link) => {
//   // Return false if there is no src attribute.
//   if (typeof link.src === 'undefined') {
//     return false;
//   }
//   return link.src.includes('.jpg');

// };
// for (let i = 0; i < 10; i++) {
//   got
//     .stream(`${url}/${fileName}`)
//     .on('error', (err) => {
//       console.log(err);
//       console.log(`Error1 on ${url}/${fileName}`);
//     })
//     .pipe(fs.createWriteStream(`memes/0${i + 1}.jpg`/${fileName}`))
//     .on('error', (err) => {
//       console.log(err);
//       console.log(`Error2 on ${url}/${fileName}`);
//     })
//     .on('finish', () => console.log(`Downloaded: ${fileName}`));
// }

// const downloadImg = download();
// console.log(downloadImg);
// .catch((err) => {
//   console.log(err);
// });

// }
// logs out undefined and memegen.link
