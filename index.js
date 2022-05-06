import fs from 'node:fs';
import https from 'node:https';
import got from 'got';
import * as jsdom from 'jsdom';

const { JSDOM: jsDom } = jsdom;

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

const path = './memes';

fs.access(path, (error) => {
  // To check if the given directory
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path, (dirError) => {
      if (dirError) {
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
    const dom = new jsDom(stringReturned);
    // create an array out of the html elements for filtering img
    const nodeList = [...dom.window.document.querySelectorAll('img')];
    // prints out the first element in the array
    // console.log(nodeList[0].src);

    // limit array to only 10
    nodeList.slice(0, 10).forEach((link, index) => {
      const fileName = link.src;

      console.log(fileName);
      https
        .get(fileName, (res) => {
          const path2 = `memes/0${index + 1}.jpg`;
          const writeStream = fs.createWriteStream(path2);

          res.pipe(writeStream);

          writeStream.on('finish', () => {
            writeStream.end();

            console.log('downloaded');
          });
        })
        .end();

      // console.log(typeof fileName);
      // console.log(index);
    });
  })
  .catch(() => {});
