export default function getQuestions(gameOptions) {
    const { category, difficulty, type } = gameOptions;

    let categoryQuery = "";
	let difficultyQuery = "";
	let typeQuery = "";

    if(category !== ""){
        categoryQuery = `&category=${category}`;
    }

    if(difficulty !== ""){
        difficultyQuery = `&difficulty=${difficulty}`;
    }

    if(type !== ""){
        typeQuery = `&type=${type}`;
    }
    
    let apiUrl = `https://opentdb.com/api.php?amount=5${categoryQuery}${difficultyQuery}${typeQuery}`;
    return fetch(apiUrl)
    .then(res => res.json())
    .then(data => data.results);
}
