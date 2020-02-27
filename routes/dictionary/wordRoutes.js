const express = require('express');
const router = express.Router();
const Word = require('./models/Words')

router.get('/', (req, res) => {
  Word.find({}).then(words => {
    return res.render('viewDictionary', { words });
  }).catch(err=>res.status(500).json({message: 'Server Error', err}))
});

//add a new word
router.post('/addword', (req, res) => {
  // const { word, definition } = req.body;

  // if (!word || !definition) {
    if(!req.body.word || !req.body.definition) {
    return res.status(400).json({ message: 'All Inputs must be filled' });
  }

  Word.findOne({ word: req.body.word })
    .then((word) => {
      if (word) {
        return res
          .status(500)
          .json({ message: 'Word is already in dictionary' });
      }

      const newWord = new Word();
      newWord.word = req.body.word;
      newWord.definition = req.body.definition;

      newWord
        .save()
        .then((word) => {
          return res.status(200).json({ message: 'Success', word });
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json({ message: 'Server Error' }, err));
});

router.get('/addword', (req, res) => {
  return res.render('addWord');
  
});

router.get('/findWord', (req, res) => {
  return res.render('findWord', { word: null });
});

router.get('/foundWord', (req, res) => {
  Word.findOne({ word: req.query.word }).then(word => {
    if (word) {
      //   res.json(word);
      console.log(word);
      return res.render('findWord', { word });
    } else {
      return res.status(400).json({ message: 'Word not found' });
    }
  }).catch(err=> res.status(500).json({message: 'oops Server Error'}));
});

router.put('/:word', (req, res) => {
  Word.findOne({ word: req.params.word }).then(word => {
    if (word) {
      word.definition = req.body.definition
        ? req.body.definition
        : word.definition;

      word
        .save()
        .then(updated => {
          return res
            .status(200)
            .json({ message: 'Definition Updated', updated });
        })
        .catch(err =>
          res.status(500).json({ message: 'Unable to update word', err })
        );
    } else {
      return res.status(200).json({ message: 'Cannot find word' });
    }
  }).catch(err=> res.status(500).json({message: 'Server Error', err}));
});

router.delete('/:word', (req, res) => {
  Word.findOneAndDelete({ word: req.params.word })
    .then(word => {
      if(word) {
        return res.status(200).json({ message: 'Word deleted', word });
      }else {
        return res.status(200).json({message: 'No word to delete'});
      }
      })
    .catch(err => res.status(500).json({ message: 'Problem deleting', err }));
});

module.exports = router;
