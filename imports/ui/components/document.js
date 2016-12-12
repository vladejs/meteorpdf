/**
 * Created by vla2 on 12/12/16.
 */
import React from 'react'
import InlineCss from 'react-inline-css'
import fileSaver from 'file-saver'
import { base64ToBlob } from '../../base64-to-blob'

const downloadPDF = (event) => {
  event.preventDefault();
  const { target } = event;

  target.innerHTML = '<em> Downloading </em>';
  Meteor.call('documents.download', (error, response) => {
    if (error) {
      console.log(error);
      target.innerHTML = 'Download';
    } else {
      const blob = base64ToBlob(response.base64);

      fileSaver.saveAs(blob, response.fileName);

      target.innerHTML = 'Download';
    }
  });
};

export default ({ document }) => (
  <InlineCss stylesheet={`
    .Document { font-family: "Helvetica Neue", font-size:11px }

    @media print {
      .Document {
        display: block;
        border: 1px solid red;
        padding: 20px;
      }

      button { display: none; }

      h4 { color: blue }
      p { font-weight: bold }
    }
  `}>

    <button onClick={ downloadPDF }>
      Download
    </button>

    <h3>
      This will be PDF printed
    </h3>

    <h4>
      Welcome
    </h4>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dicta explicabo hic itaque modi molestias nobis odit, officiis omnis quo, repellat totam velit vero voluptas voluptatibus. Autem commodi cum obcaecati.
    </p>

  </InlineCss>
);
