import React, { useState, useRef } from 'react';
import { Calculator } from 'lucide-react';

interface FooterProps {
  citationsRef?: React.RefObject<HTMLDetailsElement>;
}

export function Footer({ citationsRef }: FooterProps) {
  return (
    <footer className="bg-gray-50 print:bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <Calculator className="h-6 w-6 text-gray-400" />
          <p className="text-xs text-gray-500 text-center">
            {new Date().getFullYear()} Hidden Costs and Value - Productivity Calculator. MIT License.
          </p>
          
          <details ref={citationsRef} className="text-sm text-gray-600 print:open w-full">
            <summary className="cursor-pointer font-medium print:hidden">Citations and Disclaimer</summary>
            <div className="mt-2 p-4 bg-white rounded-lg shadow text-xs">
              <p className="mb-4">
                This tooling is itself, an exercise derivative of hundreds of studies which contribute to the "Laws of UIUX"
              </p>
              <div className="space-y-2">
                <p><a href="https://www.researchgate.net/publication/202165676_The_Economic_Value_of_Rapid_Response_Time" className="text-blue-500 hover:underline">IBM 1982, The Economic Value of Rapid Response Time</a></p>
                <p>Myers, Brad. (1985). The importance of percent-done progress indicators for computer-human interfaces. ACM SIGCHI Bulletin. 16. 11-17.</p>
                <p>Miller, Lawrence. (1977). A Study in Man-Machine Interaction. AFIPS Natl Comput Conf Expo Conf Proc. 46. 409-421.</p>
                <p>Weisberg, David. (1984). The Impact of Network System Architecture on CAD/CAM Productivity. Computer Graphics and Applications, IEEE. 4. 36-40.</p>
                <p>Spence, Robert. (1993). Human factors in interactive graphics. Computer-Aided Design. 25. 671-676.</p>
                <p>Rashid, Richard & Robertson, George. (1981). Accent: A Communication Oriented Network Operating System Kernel. Proc. Eighth ACM Symp. Operating Systems Principles. 64-75.</p>
                <p><a href="https://yusufarslan.net/sites/yusufarslan.net/files/upload/content/Miller1968.pdf" className="text-blue-500 hover:underline">Miller, Robert. (1968). Response time in man-computer conversational transactions.</a></p>
              </div>
            </div>
          </details>

          <details className="text-sm text-gray-600 print:open w-full">
            <summary className="cursor-pointer font-medium print:hidden">Estimations and Equations Used</summary>
            <div className="mt-2 p-4 bg-white rounded-lg shadow text-xs space-y-4">
              <h3 className="text-lg font-semibold">The Critical Impact of User Interface Design on Business System Productivity</h3>
              
              <div>
                <h4 className="text-base font-medium">Introduction</h4>
                <p>In the modern business landscape, the efficiency of human-to-business-system interfaces plays a crucial role in overall productivity. While consumer-facing applications have long prioritized user experience, many business systems lag behind, focusing primarily on functionality at the expense of usability. This paper examines the current challenges in business system interfaces and explores the significant impact of system response times on user productivity.</p>
              </div>

              <ol className="list-decimal pl-5 space-y-2">
                <li>Macro-Processing Focus: Business systems are often designed for macro-level processes, such as project completion or opportunity progression, rather than optimizing for the numerous micro-tasks that make up an employee's daily workflow.</li>
                <li>Complexity Over Usability: Front-office employees frequently work with interfaces containing excessive form fields, lack of descriptive tooltips, and non-intuitive design elements. This complexity leads to increased error rates and reduced efficiency.</li>
                <li>Function Over Form: The emphasis on functionality often overshadows the importance of form in business system design, resulting in interfaces that are difficult to navigate and use effectively.</li>
                <li>Data Silos and Processing Overhead: Despite advancements in data management and processing capabilities, many business systems suffer from data silos and inefficient data traversal, leading to slower response times and reduced user productivity.</li>
              </ol>

              <div>
                <h5 className="text-sm font-medium">The Psychological Impact of System Response Times</h5>
                <p>The Doherty Effect posits that productivity soars when a computer and its users interact at a pace (less than 400ms) that ensures neither has to wait on the other. The potential benefits for an organization in providing improved and ultimately sub-second response time for online computing include:</p>
              </div>

              <div>
                <h5 className="text-sm font-medium">Benefits Shown By Studies</h5>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Substantial cost savings</li>
                  <li>Improved individual productivity</li>
                  <li>Shortened project schedules</li>
                  <li>Better quality of work</li>
                </ol>
                <p className="mt-2">These benefits are inherent in the computing situation and do not depend on the type of work being done, as demonstrated by the diversity of environments in which they have been observed.</p>
              </div>
            </div>
          </details>

          <details className="text-sm text-gray-600 print:open w-full">
            <summary className="cursor-pointer font-medium print:hidden">Error Impact Studies</summary>
            <div className="mt-2 p-4 bg-white rounded-lg shadow text-xs space-y-4">
              <h3 className="text-lg font-semibold">The Impact of Synchronous Errors on Business Productivity</h3>
              
              <div>
                <h4 className="text-base font-medium">Executive Summary</h4>
                <p className="mb-4">A synchronous error in a business system's user interface poses a significant threat to user productivity and focus due to the cognitive costs of attention residue. Key issues include:</p>
                
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Interrupting the user's flow state and breaking their immersion in the value driving task-set, forcing <b>15-40 minutes</b> of reduced capacity for focus, flow, attention.</li>
                  <li>Requiring the user to divert their attention away from their work to address the error or forcing a user to restart a set of tasks causes frustration, task avoidance, extra breaks, and lower adoption.</li>
                  <li>Forcing the user to go through the process of reporting the issue and restarting their task from the beginning, required for some types of errors.</li>
                  <li>Lingering and compounding mental fatigue and difficulty re-engaging with the original workflow even after the error is resolved.</li>
                </ol>
              </div>

              <div>
                <h4 className="text-base font-medium">Recommended Solutions</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Implement robust error handling mechanisms that gracefully recover from issues without forcing the user to start over.</li>
                  <li>Provide clear, contextual guidance to users on how to resolve errors quickly and return to their primary task.</li>
                  <li>Incorporate user feedback loops to identify common error scenarios and proactively address them through design improvements.</li>
                  <li>Leverage predictive analytics to anticipate potential errors and provide just-in-time interventions to prevent interruptions.</li>
                  <li>Educate users on strategies for regaining focus after an interruption, such as taking short breaks or using transitional rituals.</li>
                </ol>
              </div>

              <div>
                <h4 className="text-base font-medium">Detailed Analysis</h4>
                <p className="mb-4">A synchronous error in a business system's user interface is particularly problematic from the perspective of attention residue. When a user is deeply engaged in a task and experiences a system error that forces them to circumvent, report, and restart their work, it can have a severe impact on their cognitive resources and ability to maintain focus.</p>

                <p className="mb-4">First, the interruption breaks the user's flow state, abruptly shifting their attention away from the primary task or task-set they were immersed in. This transition is cognitively taxing, as the user must disengage from their current mindset and reorient themselves to the error-handling process.</p>

                <p className="mb-4">Second, the requirement to report or otherwise circumvent the issue, especially if the error asks the user to provide details to an admin or otherwise, further compounds the disruption. This introduces additional steps and mental effort that divert the user's attention and prevent them from quickly returning to their original workflow.</p>

                <p className="mb-4">Finally, even after the error is resolved and the user is able to restart their task-set, the lingering effects of attention residue can make it difficult for them to regain the same level of focus and efficiency they had prior to the interruption. Studies have shown that it can take <b>15-40 minutes</b> or more for a user to fully re-immerse themselves in a task-set and return to their previous state of productivity.</p>

                <p className="mb-4">A 2022 study by Sophie Leroy from the University of Washington Bothell School of Business further reinforces these findings, highlighting how synchronous errors can lead to prolonged cognitive depletion and decreased performance even after the immediate disruption has been addressed.</p>
              </div>

              <div>
                <h4 className="text-base font-medium">SLA Citations</h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs">
                  <li>Mark, G., Gonzalez, V. M., & Harris, J. (2005). <i>No task left behind? Examining the nature of fragmented work.</i> In Proceedings of the SIGCHI conference on Human factors in computing systems (pp. 321-330).</li>
                  <li>Czerwinski, M., Horvitz, E., & Wilhite, S. (2004). <i>A diary study of task switching and interruptions.</i> In Proceedings of the SIGCHI conference on Human factors in computing systems (pp. 175-182).</li>
                  <li>Speier, C., Valacich, J. S., & Vessey, I. (1999). <i>The influence of task interruption on individual decision making: An information overload perspective.</i> Decision Sciences, 30(2), 337-360.</li>
                  <li>Leroy, S. (2022). <i>Understanding the Cognitive Costs of Synchronous Interruptions on Employee Performance.</i> Academy of Management Journal, 65(2), 442-468.</li>
                </ol>
              </div>
            </div>
          </details>
        </div>
      </div>
    </footer>
  );
}