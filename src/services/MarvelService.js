
class MarvelService {

   _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   _apiKey = 'apikey=80e927653d5ee19167c4c0a0bda436f0';
   _baseOffset = 210;

   getResource = async (url) => {
      let res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
   }

   getAllCharacters = async (offset = this._baseOffset) => {
      const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
      return res.data.results.map(this._transformCharacter);
   }

   getCharacter = async (id) => {
      const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
      return this._transformCharacter(res.data.results[0]);
   }

   _transformCharacter = (char) => {
      // const thumbnailPath = char.thumbnail.path;
      // const thumbnailExtension = char.thumbnail.extension;
      return {
         id: char.id,
         name: char.name,
         description: char.description ? `${char.description.slice(0, 200)}...` : 'This is no description for this',
         thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url,
         comics: char.comics.items,
         fakeImage: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      }
   }
}

export default MarvelService;