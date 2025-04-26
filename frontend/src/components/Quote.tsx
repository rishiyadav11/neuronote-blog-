import { useEffect, useState } from "react";

const quotes  = [
    {
      text: "Creativity is not just painting or writing; it’s about thinking differently, solving problems, and making life better every day.",
      author: "Albert Einstein",
      role: "Physicist",
    },
    {
      text: "The best way to predict the future is by taking action today, creating opportunities where none existed before.",
      author: "Alan Kay",
      role: "Computer Scientist",
    },
    {
      text: "Success is not final, and failure is not fatal; the true courage lies in continuing the journey with determination.",
      author: "Winston Churchill",
      role: "Former Prime Minister, UK",
    },
    {
      text: "Your time is too valuable to be spent living someone else’s dream; create your own story, your own legacy.",
      author: "Steve Jobs",
      role: "Co-founder, Apple",
    },
    {
      text: "Dream boldly and take the leap of faith, because only through risks do we uncover what we are truly capable of.",
      author: "Norman Vaughan",
      role: "Explorer",
    },
    {
      text: "It always feels impossible in the beginning, but persistence and vision can transform any distant dream into a stunning reality.",
      author: "Nelson Mandela",
      role: "Former President, South Africa",
    },
    {
      text: "Believe in your potential; even small steps taken today can lead you to mountains you once thought were unreachable.",
      author: "Theodore Roosevelt",
      role: "Former US President",
    },
    {
      text: "Simplicity is the ultimate sophistication because clarity in thought, action, and design leads to timeless greatness and enduring impact.",
      author: "Leonardo da Vinci",
      role: "Artist & Inventor",
    },
    {
      text: "Starting is often the hardest part, but once you begin, momentum builds, and extraordinary things begin to happen around you.",
      author: "Walt Disney",
      role: "Entrepreneur",
    },
    {
      text: "Don’t let the ticking clock intimidate you; let it inspire you to move faster toward your dreams and ambitions.",
      author: "Sam Levenson",
      role: "Author",
    },
    {
      text: "Start where you are with what you have; greatness is never about perfect conditions but about perfect perseverance through them.",
      author: "Arthur Ashe",
      role: "Tennis Player",
    },
    {
      text: "True happiness comes not from what we get, but from what we give and create through our own courageous actions.",
      author: "Dalai Lama",
      role: "Spiritual Leader",
    },
    {
      text: "Everything you imagine holds the potential to shape the world; ideas are seeds waiting for you to water them.",
      author: "Pablo Picasso",
      role: "Artist",
    },
    {
      text: "Wherever you are today is the perfect starting line; your journey only demands your willingness to take the first step.",
      author: "Theodore Roosevelt",
      role: "Former US President",
    },
    {
      text: "Opportunities rarely come gift-wrapped; you create them by pushing boundaries, embracing challenges, and daring to do something different.",
      author: "Chris Grosser",
      role: "Photographer",
    },
    {
      text: "Innovation is about seeing possibilities where others see obstacles; it separates those who lead from those who merely follow.",
      author: "Steve Jobs",
      role: "Co-founder, Apple",
    },
    {
      text: "What you do matters. Every small effort ripples outward, shaping lives, building futures, and changing the course of history.",
      author: "William James",
      role: "Philosopher",
    },
    {
      text: "Achieving a goal is rewarding, but the person you become through struggle, learning, and persistence is far more priceless.",
      author: "Zig Ziglar",
      role: "Motivational Speaker",
    },
    {
      text: "When you lift someone else, you rise too; kindness, generosity, and support are the true engines of meaningful success.",
      author: "Booker T. Washington",
      role: "Educator",
    },
    {
      text: "Great things never happen inside comfort zones; every breakthrough requires courage, discomfort, and a willingness to embrace uncertainty.",
      author: "Anonymous",
      role: "Unknown",
    }
  ];  

const Quote = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="h-full w-full md:w-1/2 bg-zinc-200 hidden md:flex justify-center items-start flex-col px-8 md:px-20 py-10">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">
        "{quote.text}"
      </h1>
      <h3 className="text-lg text-gray-700 capitalize mt-4">{quote.author}</h3>
      <h4 className="text-md text-gray-500">{quote.role}</h4>
    </div>
  );
};

export default Quote;
