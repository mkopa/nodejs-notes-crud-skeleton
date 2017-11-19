'use strict';

/* global it, describe */

const { Storage } = require('./../app/storage');
const _ = require('lodash');

describe('Sqlite3 test', () => {
  const storage = new Storage('notes_test');
  const createDate = Date.now();
  const modifiedDate = createDate;

  const testNote1 = {
    title: 'example title1',
    message: 'example message1',
    createDate,
    modifiedDate,
  };

  const testNote2 = {
    title: 'example title2',
    message: 'example message2',
    createDate: 123,
    modifiedDate: 456,
  };

  let allNotes = [];

  it('it should remove all notes', (done) => {
    storage.removeAllNotes()
      .then(() => {
        done();
      })
      .catch((error) => {
        done(new Error(error));
      });
  });

  it('it should insert note1', (done) => {
    storage.insertNote(testNote1)
      .then(() => {
        done();
      })
      .catch((error) => {
        done(new Error(error));
      });
  });

  it('it should insert note2', (done) => {
    storage.insertNote(testNote2)
      .then(() => {
        done();
      })
      .catch((error) => {
        done(new Error(error));
      });
  });

  it('it should read all notes where length of that is 2', (done) => {
    storage.readNotes()
      .then((notes) => {
        if (notes && notes.length === 2) {
          allNotes = notes;
          done();
        } else {
          done(new Error(`Wrong length (${notes.length})`));
        }
      })
      .catch((error) => {
        done(new Error(error));
      });
  });

  it('read testNote1 and it must be equal with oryginal', (done) => {
    storage.readNote(allNotes[0].id)
      .then((note) => {
        if (_.isEqual(note, allNotes[0])) {
          done();
        } else {
          done(new Error('note is not equal'));
        }
      })
      .catch((error) => {
        done(new Error(error));
      });
  });

  it('it should update testNote1 and testNote2', (done) => {
    allNotes[0].title = 'updated title1';
    allNotes[0].message = 'updated message1';
    allNotes[0].modifiedDate = allNotes[0].modified_date;
    allNotes[1].title = 'updated title2';
    allNotes[1].message = 'updated message2';
    allNotes[1].modifiedDate = allNotes[1].modified_date;

    storage.updateNote(allNotes[0].id, allNotes[0])
      .then(() => storage.updateNote(allNotes[1].id, allNotes[1]))
      .then(() => storage.readNotes())
      .then((notes) => {
        if (notes &&
            notes.length === 2 &&
            notes[0].title === allNotes[0].title &&
            notes[1].title === allNotes[1].title) {
          done();
        } else {
          done(new Error('Error while updating notes'));
        }
      })
      .catch((error) => {
        done(new Error(error));
      });
  });

  it('it should remove testNote1', (done) => {
    storage.removeNote(allNotes[0].id)
      .then(() => storage.readNotes())
      .then((notes) => {
        if (notes && notes.length === 1 && notes[0].id === allNotes[1].id) {
          done();
        } else {
          done(new Error('Error while deleting testNote1'));
        }
      })
      .catch((error) => {
        done(new Error(error));
      });
  });
});
