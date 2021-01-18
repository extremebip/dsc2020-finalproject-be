const provinceNames = [
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Banten',
  'Bangka Belitung',
  'Bali'
];

exports.seed = function (knex) {
  return knex('provinces').del()
    .then(async function () {
      for (let i = 0; i < provinceNames.length; i++) {
        let name = provinceNames[i];
        await knex('provinces').insert({
          name: name,
          recovered: Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000,
          death: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
          positive: Math.floor(Math.random() * (20000 - 1000 + 1)) + 1000,
          created_at: new Date()
        });
      }
    });
};