/**
 * Created by vla2 on 12/12/16.
 */
import Document from '/imports/ui/components/document' //d
import { generateComponentAsPDF } from './generate-pdf'

Meteor.methods({
  'documents.download': () => {
    const id = Random.id();
    const fileName = `document_${id}.pdf`;
    return generateComponentAsPDF({
      component: Document,
      props: {
        title: "Hello"
      },
      fileName
    })
    .then(result => result)
    .catch(error => { throw new Meteor.Error('500', error) });
  }
});
