import React from 'react';
import Timer from '../components/timer/Timer';
import TodoList from '../components/todo/TodoList';
import { Clock, Target, TrendingUp, Brain, CheckCircle, Users } from 'lucide-react';

const Home = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Timer and Todo Section */}
        <section className="mb-16">
          <Timer />
          <TodoList />
        </section>

        {/* What is Pomodoro Technique Section */}
        <section className="mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              What is the Pomodoro Technique?
            </h2>
            <div className="text-white/90 space-y-4 max-w-3xl mx-auto">
              <p className="text-lg">
                The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. 
                It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
              </p>
              <p>
                This technique is based on the idea that frequent breaks can improve mental agility and help maintain 
                focus throughout the day. It's named after the tomato-shaped kitchen timer that Cirillo used as a university student.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How PomodoroFocus Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Set Timer</h3>
              <p className="text-white/80 text-sm">
                Choose your task and set the timer for 25 minutes of focused work.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Work Focused</h3>
              <p className="text-white/80 text-sm">
                Work on your task with complete focus until the timer rings.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Take Break</h3>
              <p className="text-white/80 text-sm">
                Take a 5-minute break to rest and recharge your mind.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Long Break</h3>
              <p className="text-white/80 text-sm">
                After 4 cycles, take a longer 15-30 minute break.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Benefits of Using PomodoroFocus
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Improved Focus</h3>
                  <p className="text-white/80">
                    Break large tasks into manageable chunks and maintain concentration for longer periods.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Enhanced Productivity</h3>
                  <p className="text-white/80">
                    Accomplish more in less time by working in focused, time-boxed sessions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Reduced Burnout</h3>
                  <p className="text-white/80">
                    Regular breaks prevent mental fatigue and help maintain energy throughout the day.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Better Time Management</h3>
                  <p className="text-white/80">
                    Develop a better understanding of how long tasks actually take to complete.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Goal Achievement</h3>
                  <p className="text-white/80">
                    Track your progress and celebrate small wins to stay motivated and reach your goals.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Work-Life Balance</h3>
                  <p className="text-white/80">
                    Create clear boundaries between work and rest time for a healthier lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of users who have transformed their work habits with PomodoroFocus. 
              Start your first focused session today and experience the difference.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 border border-white/30"
            >
              Start Your First Session
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;