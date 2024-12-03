"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function CareerCard() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 bg-black">
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Be a part of crafting intuitive and cutting-edge user
                experiences.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/assets/frontend.jpg"
              alt="Frontend Team"
              height="80"
              width="80"
              className="md:w-1/4 md:h-1/4 h-full w-full mx-auto  object-cover"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Frontend Team",
    title: "You can do more with Frontend.",
    src: "/assets/frontend.jpg",
    content: <DummyContent />,
  },
  {
    category: "Backend Team",
    title: "Enhance your productivity.",
    src: "/assets/backend.jpg",
    content: <DummyContent />,
  },
  {
    category: "Artificial Intelegence Team",
    title: "Launching the new new Idea.",
    src: "/assets/Ai1.jpg",
    content: <DummyContent />,
  },
];
