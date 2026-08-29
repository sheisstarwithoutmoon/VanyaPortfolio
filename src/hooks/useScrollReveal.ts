"use client";
import { useEffect, useRef, useCallback } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

type ScrollRevealOptions = {
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * Hook that animates an element when it enters the viewport.
 * Uses inline styles for maximum reliability (no CSS class conflicts).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    direction = 'up',
    distance = 50,
    duration = 800,
    delay = 0,
    threshold = 0.12,
    rootMargin = '0px 0px -50px 0px',
    once = true,
  } = options;

  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial hidden state via inline styles
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    switch (direction) {
      case 'up':
        element.style.transform = `translateY(${distance}px)`;
        break;
      case 'down':
        element.style.transform = `translateY(-${distance}px)`;
        break;
      case 'left':
        element.style.transform = `translateX(-${distance}px)`;
        break;
      case 'right':
        element.style.transform = `translateX(${distance}px)`;
        break;
      case 'scale':
        element.style.transform = `scale(0.9)`;
        break;
      case 'none':
        element.style.transform = 'none';
        break;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0) translateX(0) scale(1)';
          if (once) {
            hasAnimated.current = true;
            observer.unobserve(element);
          }
        } else if (!once && !entry.isIntersecting) {
          element.style.opacity = '0';
          switch (direction) {
            case 'up':
              element.style.transform = `translateY(${distance}px)`;
              break;
            case 'down':
              element.style.transform = `translateY(-${distance}px)`;
              break;
            case 'left':
              element.style.transform = `translateX(-${distance}px)`;
              break;
            case 'right':
              element.style.transform = `translateX(${distance}px)`;
              break;
            case 'scale':
              element.style.transform = `scale(0.9)`;
              break;
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [direction, distance, duration, delay, threshold, rootMargin, once]);

  return ref;
}

/**
 * Hook that staggers child element reveals within a container.
 * Children are selected by a data attribute for reliability.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions & { staggerMs?: number; childSelector?: string } = {}
) {
  const {
    direction = 'up',
    distance = 40,
    duration = 700,
    staggerMs = 120,
    threshold = 0.08,
    rootMargin = '0px 0px -30px 0px',
    once = true,
    childSelector = '[data-reveal]',
  } = options;

  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll<HTMLElement>(childSelector);

    // Set initial hidden state for each child
    children.forEach((child, index) => {
      const childDelay = index * staggerMs;
      child.style.opacity = '0';
      child.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms`;

      switch (direction) {
        case 'up':
          child.style.transform = `translateY(${distance}px)`;
          break;
        case 'left':
          child.style.transform = `translateX(-${distance}px)`;
          break;
        case 'right':
          child.style.transform = `translateX(${distance}px)`;
          break;
        case 'scale':
          child.style.transform = `scale(0.9)`;
          break;
        default:
          child.style.transform = `translateY(${distance}px)`;
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          children.forEach((child) => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0) translateX(0) scale(1)';
          });
          if (once) {
            hasAnimated.current = true;
            observer.unobserve(container);
          }
        } else if (!once && !entry.isIntersecting) {
          children.forEach((child, index) => {
            const childDelay = index * staggerMs;
            child.style.opacity = '0';
            child.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms`;
            switch (direction) {
              case 'up':
                child.style.transform = `translateY(${distance}px)`;
                break;
              case 'left':
                child.style.transform = `translateX(-${distance}px)`;
                break;
              case 'right':
                child.style.transform = `translateX(${distance}px)`;
                break;
              case 'scale':
                child.style.transform = `scale(0.9)`;
                break;
              default:
                child.style.transform = `translateY(${distance}px)`;
            }
          });
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [direction, distance, duration, staggerMs, threshold, rootMargin, once, childSelector]);

  return ref;
}
