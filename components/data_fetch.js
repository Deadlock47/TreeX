
import axios from 'axios';

function getJsonResult(data) {
  const result = { id: data.dvd_id };
  
  result.title = data.title_en;
  result.title_ja = data.title_ja;
  result.page = `https://r18.dev/videos/vod/movies/detail/-/id=${data.content_id}/`;
  result.poster = data.jacket_full_url || null;
  result.preview = data.sample_url || null;
  result.poster_thumb = data.jacket_thumb_url || null;
  // result.details
  result.details = {
      director: null,
      release_date: null,
      runtime: null,
      studio: null,
  };
  if (data.directors && data.directors.length > 0) {
      result.details.director = data.directors[0].name_romaji;
  }
  result.details.release_date = data.release_date || null;
  result.details.runtime = data.runtime_mins || null;
  result.details.studio = data.maker_name_en || null;
  
  result.actress = data.actresses?.map((a) => ({
      id : a.id,
      name: a.name_romaji,
      image: new URL(a.image_url, 'https://pics.dmm.co.jp/mono/actjpgs/').toString(),
  }));

  result.screenshots = data.gallery?.map(ss => ss.image_full);
  result.tags = data.categories?.map((c) => ({name : c.name_en , tag_id : c.id}));

  return result;
}





async function get_data(c){
  try {
    
    const temp = c;
    console.log(temp)
    const url = `https://r18.dev/videos/vod/movies/detail/-/combined=${temp}/json`;
    console.log(url)
    const result = await axios.get(url);
    // console.log(result)
    if(!result.data) {
      console.log("no data found!!!!!");
      throw new Error("Invalid response data");
    }
    const final_result = getJsonResult(result.data)
    return final_result;
  
  }
    catch (error) {
      try {
        
        const temp = c;
        const second_url = `https://r18.dev/videos/vod/movies/detail/-/dvd_id=${temp}/json`;
        console.log('2nd : ',second_url);
        const result = await axios.get(second_url);
        if(!result.data) {  
          console.log("no data found!!!!!");
          throw new Error("Invalid response data");
        }
        console.log(result.data?.content_id)
        const url = `https://r18.dev/videos/vod/movies/detail/-/combined=${result.data.content_id}/json`;
        
        const result_2 = await axios.get(url);
        console.log('catch'+typeof result_2.data);
        const final_result_2 = getJsonResult(result_2.data);
        return final_result_2;
      } catch (error) {
          console.log(error);
          return {status : "404",err : "code does not exist or its wrong"};
      }
      
    }
  
}

export default get_data;