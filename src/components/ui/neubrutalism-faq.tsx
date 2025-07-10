import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "What is neubrutalism in web design?",
    answer:
      "Neubrutalism is a bold design movement characterized by thick black borders, high contrast colors, sharp edges, and raw typography. It's inspired by brutalist architecture and embraces an unpolished, rebellious aesthetic.",
  },
  {
    id: 2,
    question: "How do I implement neubrutalist design?",
    answer:
      "Focus on bold borders (usually 3-5px black), avoid rounded corners, use high contrast color combinations, choose bold typography, and embrace geometric shapes. Don't be afraid to make it look 'rough' or unrefined.",
  },
  {
    id: 3,
    question: "What colors work best for neubrutalism?",
    answer:
      "Bright, saturated colors like electric blue, hot pink, lime green, and bright yellow work great. Always pair them with black borders and white or black text for maximum contrast.",
  },
  {
    id: 4,
    question: "Is neubrutalism mobile-friendly?",
    answer:
      "Yes! The bold, high-contrast elements actually work well on mobile devices. Just ensure your touch targets are large enough and the text remains readable at smaller sizes.",
  },
  {
    id: 5,
    question: "Can I mix neubrutalism with other design styles?",
    answer:
      "While purists might disagree, you can incorporate neubrutalist elements into other designs. Try adding bold borders to buttons or using high-contrast color blocks as accents.",
  },
];

export function NeubrutalismFaq() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-6xl font-black rounded mb-4 text-black border-4 border-black bg-purple-400 p-6 inline-block transform -rotate-1 shadow-[4px_4px_0_black]">
          FAQ
        </h1>
        <p className="text-2xl font-bold rounded text-black mt-8 bg-white border-4 border-black shadow-[4px_4px_0_black] p-4 inline-block transform rotate-1">
          FREQUENTLY ASKED QUESTIONS
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-8">
        {faqData.map((item, index) => (
          <div
            key={item.id}
            className={`border-2 border-black shadow-[4px_4px_0_black] hover:shadow-[0px_0px_0_black] rounded-md ${
              index % 4 === 0
                ? "bg-blue-400"
                : index % 4 === 1
                ? "bg-green-400"
                : index % 4 === 2
                ? "bg-rose-400"
                : "bg-orange-400"
            } transform ${
              index % 2 === 0 ? "rotate-1" : "-rotate-1"
            } hover:rotate-0 transition-transform duration-200`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full cursor-pointer p-6 text-left flex items-center justify-between hover:bg-purple-400 rounded hover:text-white transition-colors duration-200"
            >
              <h3 className="text-xl font-black pr-4">{item.question}</h3>
              <div className="flex-shrink-0 w-8 h-8 border-2 border-black bg-white flex items-center justify-center">
                {openItems.includes(item.id) ? (
                  <Minus className="w-4 h-4 text-black" />
                ) : (
                  <Plus className="w-4 h-4 text-black" />
                )}
              </div>
            </button>

            {openItems.includes(item.id) && (
              <div className="border-t-4 border-black bg-white p-6 rounded-b-md">
                <p className="text-lg font-bold text-black leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 text-center">
        <div className="bg-purple-400 border-2 border-black shadow-[4px_4px_0_black] rounded-md p-8 transform -rotate-1 inline-block">
          <h2 className="text-3xl font-black text-black mb-4">
            STILL HAVE QUESTIONS?
          </h2>
          <button className="bg-white cursor-pointer rounded-md shadow-[4px_4px_0_black] hover:shadow-[0px_0px_0_black] font-black text-xl px-8 py-4 border-2 border-black  text-black transition-colors duration-200 transform rotate-2 hover:rotate-0">
            CONTACT US NOW!
          </button>
        </div>
      </div>
    </div>
  );
}
