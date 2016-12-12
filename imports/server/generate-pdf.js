/**
 * Created by vla2 on 12/12/16.
 */
import ReactDOMServer from 'react-dom/server'
import pdf from 'html-pdf'
import fs from 'fs'

let module;

const getBase64String = (path) => {
  try {
    const file = fs.readFileSync(path);
    return new Buffer(file).toString('base64');
  } catch(e) {
    console.log(e);
    module.reject(e);
  }
};

const generatePDF = (html, fileName) => {
  try {
    const b = '0.6in';
    
    pdf.create(html, {
      format: 'letter',
      border: { top: b, right: b, bottom: b, left: b }
    }).toFile(`.tmp/${fileName}`, (error, response) => {
      if (error) {
        module.reject(error);
      } else {
        module.resolve({ fileName, base64: getBase64String(response.filename) });
        fs.unlink(response.filename);
      }
    });
  } catch(e) {
    module.reject(e);
  }
};

const getComponentAsHTML = (component, props) => {
  try {
    return ReactDOMServer.renderToStaticMarkup(component(props));
  } catch(e) {
    module.reject(e);
  }
};

const handler = ({ component, props, fileName }, promise) => {
  module = promise;
  const html = getComponentAsHTML(component, props);
  if (html && fileName) {
    generatePDF(html, fileName);
  }
};

export const generateComponentAsPDF = (options) => {
  return new Promise((resolve, reject) => {
    return handler(options, { resolve, reject });
  });
};
