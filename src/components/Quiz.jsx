import React, { useState } from 'react';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "hard",
      question: "What was the name of the hero in the 80s animated video game 'Dragon's Lair'?",
      correct_answer: "Dirk the Daring",
      incorrect_answers: ["Arthur", "Sir Toby Belch", "Guy of Gisbourne"]
    },
    {
      category: "Animals",
      type: "multiple",
      difficulty: "easy",
      question: "What is the scientific name for modern day humans?",
      correct_answer: "Homo Sapiens",
      incorrect_answers: ["Homo Ergaster", "Homo Erectus", "Homo Neanderthalensis"]
    },
    {
      category: "Entertainment: Books",
      type: "multiple",
      difficulty: "hard",
      question: "What is Ron Weasley's middle name?",
      correct_answer: "Bilius",
      incorrect_answers: ["Arthur", "John", "Dominic"]
    },
    {
      category: "Entertainment: Comics",
      type: "multiple",
      difficulty: "easy",
      question: "Who is the creator of the comic series 'The Walking Dead'?",
      correct_answer: "Robert Kirkman",
      incorrect_answers: ["Stan Lee", "Malcolm Wheeler-Nicholson", "Robert Crumb"]
    },
    {
      category: "Entertainment: Board Games",
      type: "multiple",
      difficulty: "medium",
      question: "At the start of a standard game of the Monopoly, if you throw a double six, which square would you land on?",
      correct_answer: "Electric Company",
      incorrect_answers: ["Water Works", "Chance", "Community Chest"]
    },
    {
      category: "Geography",
      type: "multiple",
      difficulty: "easy",
      question: "What is the capital of Jamaica?",
      correct_answer: "Kingston",
      incorrect_answers: ["Rio de Janeiro", "Dar es Salaam", "Kano"]
    },
    {
      category: "History",
      type: "multiple",
      difficulty: "medium",
      question: "When did Jamaica receive its independence from England?",
      correct_answer: "1962",
      incorrect_answers: ["1492", "1963", "1987"]
    },
    {
      category: "Animals",
      type: "boolean",
      difficulty: "easy",
      question: "Kangaroos keep food in their pouches next to their children.",
      correct_answer: "False",
      incorrect_answers: ["True"]
    },
    {
      category: "General Knowledge",
      type: "multiple",
      difficulty: "medium",
      question: "In 2013 how much money was lost by Nigerian scams?",
      correct_answer: "$12.7 Billion",
      incorrect_answers: ["$95 Million", "$956 Million", "$2.7 Billion"]
    },
    {
      category: "History",
      type: "multiple",
      difficulty: "medium",
      question: "How old was Lyndon B. Johnson when he assumed the role of President of the United States?",
      correct_answer: "55",
      incorrect_answers: ["50", "60", "54"]
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "hard",
      question: "In World of Warcraft lore, who organized the creation of the Paladins?",
      correct_answer: "Alonsus Faol",
      incorrect_answers: ["Uther the Lightbringer", "Alexandros Mograine", "Sargeras, The Daemon Lord"]
    },
    {
      category: "Entertainment: Video Games",
      type: "boolean",
      difficulty: "medium",
      question: "In the game 'Subnautica', a 'Cave Crawler' will attack you.",
      correct_answer: "True",
      incorrect_answers: ["False"]
    },
    {
      category: "Entertainment: Japanese Anime & Manga",
      type: "multiple",
      difficulty: "medium",
      question: "What is the name of the device that allows for infinite energy in the anime 'Dimension W'?",
      correct_answer: "Coils",
      incorrect_answers: ["Wires", "Collectors", "Tesla"]
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "medium",
      question: "What is the name of Cream the Rabbit's mom in the 'Sonic the Hedgehog' series?",
      correct_answer: "Vanilla",
      incorrect_answers: ["Peach", "Strawberry", "Mint"]
    },
    {
      category: "History",
      type: "multiple",
      difficulty: "easy",
      question: "These two countries held a commonwealth from the 16th to 18th century.",
      correct_answer: "Poland and Lithuania",
      incorrect_answers: ["Hutu and Rwanda", "North Korea and South Korea", "Bangladesh and Bhutan"]
    },
    {
      category: "Entertainment: Television",
      type: "multiple",
      difficulty: "hard",
      question: "Which of these voices wasn't a choice for the House AI in 'The Simpsons Treehouse of Horror' short, House of Whacks?",
      correct_answer: "George Clooney",
      incorrect_answers: ["Matthew Perry", "Dennis Miller", "Pierce Brosnan"]
    },
    {
      category: "Entertainment: Music",
      type: "multiple",
      difficulty: "medium",
      question: "From which album is the Gorillaz song, 'On Melancholy Hill' featured in?",
      correct_answer: "Plastic Beach",
      incorrect_answers: ["Demon Days", "Humanz", "The Fall"]
    },
    {
      category: "General Knowledge",
      type: "boolean",
      difficulty: "easy",
      question: "Scotland voted to become an independent country during the referendum from September 2014.",
      correct_answer: "False",
      incorrect_answers: ["True"]
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "medium",
      question: "In Left 4 Dead, which campaign has the protagonists going through a subway in order to reach a hospital for evacuation?",
      correct_answer: "No Mercy",
      incorrect_answers: ["Subway Sprint", "Hospital Havoc", "Blood Harvest"]
    },
    {
      category: "History",
      type: "multiple",
      difficulty: "hard",
      question: "What was the last colony the UK ceded marking the end of the British Empire?",
      correct_answer: "Hong Kong",
      incorrect_answers: ["India", "Australia", "Ireland"]
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setHasAnswered(true);
    const correct = answer === currentQuestion.correct_answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(false);
    setHasAnswered(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const scoreProgress = (score / questions.length) * 100;

  const renderStars = (difficulty) => {
    let stars;
    if (difficulty === 'easy') {
      stars = 1;
    } else if (difficulty === 'medium') {
      stars = 2;
    } else if (difficulty === 'hard') {
      stars = 3;
    }

    return (
      <div style={{ marginBottom: '20px' }}>
        {Array.from({ length: stars }).map((_, index) => (
          <span key={index} style={{ color: '#FFD700', fontSize: '20px' }}>
            ★
          </span>
        ))}
        {Array.from({ length: 3 - stars }).map((_, index) => (
          <span key={index + stars} style={{ color: '#ccc', fontSize: '20px' }}>
            ★
          </span>
        ))}
      </div>
    );
  };

  


  return (
    <div style={{ width: '80%', margin: '0 auto', textAlign: 'center' }}>
      
      {/* Overall Progress Bar */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: '#007BFF',
          borderRadius: '5px',
        }} />
        <p style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          margin: '0',
          color: '#000',
          fontWeight: 'bold',
        }}>
          Question {currentQuestionIndex + 1} / {questions.length}
        </p>
      </div>

      <h2>{currentQuestion.question}</h2>

      {/* Star Rating based on Difficulty */}
      {renderStars(currentQuestion.difficulty)}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {allAnswers.map((answer, index) => (
          <li key={index} style={{ margin: '10px 0' }}>
            <button 
              onClick={() => handleAnswerClick(answer)} 
              disabled={hasAnswered}
              style={{
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: hasAnswered 
                  ? answer === currentQuestion.correct_answer 
                    ? 'green' 
                    : answer === selectedAnswer 
                      ? 'red' 
                      : '' 
                  : '',
                color: hasAnswered && (answer === currentQuestion.correct_answer || answer === selectedAnswer) ? 'white' : '',
                border: '1px solid #ccc',
                width: '100%',
                maxWidth: '400px',
                fontSize: '16px',
              }}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>


      {hasAnswered && (
        <div>
          {isCorrect ? <p style={{ color: 'green' }}>Correct!</p> : <p style={{ color: 'red' }}>Incorrect! The correct answer was {currentQuestion.correct_answer}.</p>}
          {currentQuestionIndex < questions.length - 1 ? (
            <button 
              onClick={handleNextQuestion}
              style={{
                padding: '10px 20px',
                marginTop: '20px',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
              }}
            >
              Next Question
            </button>
          ) : (
            <p>Your final score is {score} out of {questions.length}</p>
          )}
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <div style={{
          height: '10px',
          backgroundColor: '#ccc',
          borderRadius: '5px',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{
            height: '10px',
            backgroundColor: '#28a745',
            borderRadius: '5px',
            width: `${scoreProgress}%`
          }} />
        </div>
        <p>Score: {score} / {questions.length}</p>
      </div>
    </div>
  );
};

export default Quiz;
