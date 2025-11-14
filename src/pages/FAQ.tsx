import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "What is the 'Ferry/Train' rule?",
      answer:
        "When you travel by ferry or train, you can interrupt your daily rest period or regular weekly rest period once. The journey must be at least 1 hour long. Before and after the journey, you must complete your rest period. This allows flexibility for drivers who need to cross bodies of water or travel long distances by train. The key requirement is that the interruption must be documented, and the total rest period must still meet the minimum requirements when combined (before + after the journey). This rule is specifically mentioned in Article 9 of EC 561/2006.",
    },
    {
      question: "What do I do if I am stuck in a traffic jam and go over my time?",
      answer:
        "If you exceed your driving time due to unforeseen circumstances (like traffic jams, accidents, or severe weather), you should take the following steps: 1) Stop driving as soon as it is safe to do so. 2) Document the incident thoroughly on your tachograph by adding manual entries explaining the situation. 3) Inform your fleet manager immediately. 4) Take the required rest period before continuing. According to EC 561/2006, exceeding driving times by a small margin due to genuine emergencies may be treated more leniently by enforcement authorities if you can demonstrate it was unavoidable and you took steps to minimize the excess. However, this is NOT a free pass to regularly exceed limits.",
    },
    {
      question: "How do I log 'Other Work' (Puna Tjetër) vs. 'Period of Availability' (POA)?",
      answer:
        "'Other Work' and 'Period of Availability' are two distinct activities on your tachograph: **Other Work** includes any work-related activities that are NOT driving, such as loading/unloading, vehicle maintenance, administrative tasks, or training. During Other Work, you must be actively engaged in the task. **Period of Availability (POA)** is time when you are not driving but must remain available to answer a call to start or resume driving or other work. During POA, you can rest but must be 'on standby.' The key difference: Other Work counts toward your working time limits, while POA is less restrictive. You should mark Other Work when you are actively doing tasks, and POA when you are waiting (e.g., waiting at a loading dock where someone else is loading).",
    },
    {
      question: "How are 'Weekly' and 'Fortnightly' rests calculated?",
      answer:
        "Weekly rest periods are more complex than daily rests: A **regular weekly rest** is at least 45 consecutive hours. This must be taken after no more than 6 consecutive daily periods (6 days of work). A **reduced weekly rest** is between 24 and 45 hours. You can take a reduced weekly rest, but you must compensate for the reduction by taking an equivalent amount of rest en bloc (all at once) before the end of the third week following the reduction. **Fortnightly rule**: In any two consecutive weeks, you must take at least: 1 regular weekly rest (45h) + 1 reduced weekly rest (min 24h), OR 2 regular weekly rests (45h each). You cannot take 2 reduced rests in a row without compensation. This ensures drivers get adequate long rest periods to recover from accumulated fatigue.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12 fade-slide-up">
          <h2 className="text-4xl font-bold text-foreground">Expert Hub: Complex Rules</h2>
          <p className="text-lg text-muted-foreground">
            Detailed explanations of EC 561/2006 regulations and special cases
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden float-shadow fade-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <span className="text-lg font-semibold text-foreground pr-4">{item.question}</span>
                <ChevronRight
                  className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-muted-foreground leading-relaxed">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl fade-slide-up">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">!</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Need More Help?</h3>
              <p className="text-sm text-muted-foreground">
                These rules are complex and can vary by situation. When in doubt, always err on the side of safety
                and compliance. Contact your fleet manager or a compliance expert for clarification on your specific
                case.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
