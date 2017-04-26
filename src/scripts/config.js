import {schemeBlues, schemeYlOrRd, schemeRdPu, schemePurples} from 'd3-scale-chromatic'

module.exports = {

  COLORS: ['#f9c280', '#dfad71', '#c59962', '#ab8454', '#917045', '#775b36', '#5e4728'],

  SCHEMES: {
    math: schemeYlOrRd[9],
    german: schemeRdPu[9],
    english_listen: schemeBlues[9],
    english_read: schemePurples[9]
  },

  SUBJECTS: {
    math: 'Mathe',
    german: 'Deutsch',
    english_listen: 'Englisch (Hören)',
    english_read: 'Englisch (Lesen)'
  }

}

