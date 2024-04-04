"use client";

import { EventoEvent } from "@/lib/types";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

const MotionLink = motion(Link);

export default function EventCard({ event }: { event: EventoEvent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <MotionLink
      ref={ref}
      className="flex-1 basis-80 h-[380px] max-w-[500px]"
      href={`/event/${event.slug}`}
      style={{
        // @ts-ignore
        scale: scaleProgress,
        // @ts-ignore
        opacity: opacityProgress,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
    >
      <section className="w-full h-full flex flex-col  bg-white/[3%] rounded-xl overflow-hidden relative state-effects">
        <Image
          className="h-[60%] object-cover"
          src={event.imageUrl}
          alt={event.name}
          width={500}
          height={280}
        />
        <div className="flex flex-col justify-center items-center flex-1">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/75">{event.organizerName}</p>
          <p className="text-sm text-white/50 mt-4">{event.location}</p>
        </div>
        <section
          className="absolute left-[12px] top-[12px] h-[45px] w-[45px] bg-black/30 rounded-md
      flex flex-col justify-center items-center"
        >
          <p className="text-xl font-bold -mb-[5x]">
            {new Date(event.date).getDate().toString().padStart(2, "0")}
            {/* {new Date(event.date).toLocaleDateString("en-US", { day: "2-digit" })} */}
          </p>
          <p className="text-xs uppercase text-accent">
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "short",
            })}
          </p>
        </section>
      </section>
    </MotionLink>
  );
}
