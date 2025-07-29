<<<<<<< HEAD
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Wish {
  id: string;
  name: string;
  attendance: "yes" | "no" | "";
  message: string;
  timestamp: Date;
}

const WishesAndPrayers: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    message: ""
  });
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load wishes from API on component mount
  useEffect(() => {
    const loadWishes = async () => {
      try {
        const response = await fetch('/api/wishes');
        const data = await response.json();
        
        if (data.wishes && Array.isArray(data.wishes)) {
          // Convert timestamp strings back to Date objects
          const wishesWithDates = data.wishes.map((wish: { id: string; name: string; attendance: string; message: string; timestamp: string }) => ({
            ...wish,
            timestamp: new Date(wish.timestamp)
          }));
          setWishes(wishesWithDates);
        }
      } catch (error) {
        console.error('Error loading wishes:', error);
        // Fallback to localStorage if API fails
        const savedWishes = localStorage.getItem('wedding-wishes');
        if (savedWishes) {
          const parsedWishes = JSON.parse(savedWishes);
          const wishesWithDates = parsedWishes.map((wish: { id: string; name: string; attendance: string; message: string; timestamp: string }) => ({
            ...wish,
            timestamp: new Date(wish.timestamp)
          }));
          setWishes(wishesWithDates);
        }
      }
    };

    loadWishes();
  }, []);

  // Save wishes to localStorage whenever wishes change
  useEffect(() => {
    if (wishes.length > 0) {
      localStorage.setItem('wedding-wishes', JSON.stringify(wishes));
    }
  }, [wishes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.attendance || !formData.message) {
      alert('Mohon lengkapi semua field');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to API
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Add new wish to local state
        const newWish: Wish = {
          ...data.wish,
          timestamp: new Date(data.wish.timestamp)
        };
        
        setWishes(prev => [newWish, ...prev]);
        
        // Reset form
        setFormData({
          name: "",
          attendance: "",
          message: ""
        });
        
        alert('Terima kasih atas ucapan dan doanya! 💕');
      } else {
        throw new Error('Failed to save wish');
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
      
      // Fallback to localStorage if API fails
      const newWish: Wish = {
        id: Date.now().toString(),
        name: formData.name,
        attendance: formData.attendance as "yes" | "no",
        message: formData.message,
        timestamp: new Date()
      };

      setWishes(prev => [newWish, ...prev]);
      
      // Save to localStorage as backup
      const updatedWishes = [newWish, ...wishes];
      localStorage.setItem('wedding-wishes', JSON.stringify(updatedWishes));
      
      setFormData({
        name: "",
        attendance: "",
        message: ""
      });
      
      alert('Ucapan tersimpan secara lokal. Terima kasih! 💕');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes < 1 ? 'Baru saja' : `${diffInMinutes} menit yang lalu`;
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} hari yang lalu`;
    }
  };

  return (
    <div className="relative py-8 min-h-[100vh] -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/Greetingcard.jpg"
          alt="Wishes Background"
          fill
          className="object-cover opacity-70"
          style={{
            filter: "brightness(0.6) blur(0.3px)",
            transform: `scale(${1 + scrollY * 0.0002})`,
            transformOrigin: "center",
            transition: "transform 0.3s ease-out"
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center animate-fade-in-slow">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-serif tracking-wider drop-shadow-lg animate-zoom-in-delay-1">
              Ucapan & Doa
            </h2>
            
            {/* Decorative ornament */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="text-white/80 text-2xl sm:text-3xl opacity-80 animate-wiggle">
                ❦ ❦ ❦
              </div>
            </div>

            <p className="text-lg sm:text-xl text-white/90 mb-8 drop-shadow-md animate-slide-up-delay-2">
              Kirimkan ucapan & doa kepada mempelai
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 sm:p-8 mb-8 animate-slide-up-delay-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Tuliskan nama anda:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="..."
                  className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* Attendance Selection */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Will you be attending?
                </label>
                <select
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Pilih jawaban</option>
                  <option value="yes">Ya, saya akan hadir</option>
                  <option value="no">Maaf, saya tidak dapat hadir</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Berikan ucapan & doa:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="....."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                  required
                />
                <div className="text-right text-white/60 text-xs mt-1">
                  {formData.message.length}/1000
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed animate-zoom-in-delay-4 border border-gray-600 shadow-lg"
              >
                {isSubmitting ? 'Mengirim...' : 'SEND'}
              </button>
            </form>
          </div>

          {/* Wishes List */}
          <div className="space-y-4 animate-fade-in-slow px-2">
            <h3 className="text-2xl font-bold text-white mb-6 text-center animate-slide-up-delay-5">
              Ucapan dari Tamu
            </h3>
            
            <div className="max-h-96 overflow-y-auto space-y-4 px-2">
              {wishes.length === 0 ? (
                <div className="text-center text-white/60 py-8 mx-4">
                  <p>Belum ada ucapan. Jadilah yang pertama! 💕</p>
                </div>
              ) : (
                wishes.map((wish, index) => (
                  <div
                    key={wish.id}
                    className={`bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 mx-2 animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}-delay-1`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-amber-300 font-semibold">
                          {wish.name}
                        </h4>
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      </div>
                      <span className="text-white/60 text-xs">
                        {formatTime(wish.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-white/90 text-sm leading-relaxed mb-2">
                      {wish.message}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-white/60">
                        {wish.attendance === 'yes' ? '✅ Akan hadir' : '❌ Tidak dapat hadir'}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-xs text-white/60">
                        💕
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishesAndPrayers;
=======
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Wish {
  id: string;
  name: string;
  attendance: "yes" | "no" | "";
  message: string;
  timestamp: Date;
}

const WishesAndPrayers: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    message: ""
  });
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load wishes from API on component mount
  useEffect(() => {
    const loadWishes = async () => {
      try {
        const response = await fetch('/api/wishes');
        const data = await response.json();
        
        if (data.wishes && Array.isArray(data.wishes)) {
          // Convert timestamp strings back to Date objects
          const wishesWithDates = data.wishes.map((wish: { id: string; name: string; attendance: string; message: string; timestamp: string }) => ({
            ...wish,
            timestamp: new Date(wish.timestamp)
          }));
          setWishes(wishesWithDates);
        }
      } catch (error) {
        console.error('Error loading wishes:', error);
        // Fallback to localStorage if API fails
        const savedWishes = localStorage.getItem('wedding-wishes');
        if (savedWishes) {
          const parsedWishes = JSON.parse(savedWishes);
          const wishesWithDates = parsedWishes.map((wish: { id: string; name: string; attendance: string; message: string; timestamp: string }) => ({
            ...wish,
            timestamp: new Date(wish.timestamp)
          }));
          setWishes(wishesWithDates);
        }
      }
    };

    loadWishes();
  }, []);

  // Save wishes to localStorage whenever wishes change
  useEffect(() => {
    if (wishes.length > 0) {
      localStorage.setItem('wedding-wishes', JSON.stringify(wishes));
    }
  }, [wishes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.attendance || !formData.message) {
      alert('Mohon lengkapi semua field');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to API
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Add new wish to local state
        const newWish: Wish = {
          ...data.wish,
          timestamp: new Date(data.wish.timestamp)
        };
        
        setWishes(prev => [newWish, ...prev]);
        
        // Reset form
        setFormData({
          name: "",
          attendance: "",
          message: ""
        });
        
        alert('Terima kasih atas ucapan dan doanya! 💕');
      } else {
        throw new Error('Failed to save wish');
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
      
      // Fallback to localStorage if API fails
      const newWish: Wish = {
        id: Date.now().toString(),
        name: formData.name,
        attendance: formData.attendance as "yes" | "no",
        message: formData.message,
        timestamp: new Date()
      };

      setWishes(prev => [newWish, ...prev]);
      
      // Save to localStorage as backup
      const updatedWishes = [newWish, ...wishes];
      localStorage.setItem('wedding-wishes', JSON.stringify(updatedWishes));
      
      setFormData({
        name: "",
        attendance: "",
        message: ""
      });
      
      alert('Ucapan tersimpan secara lokal. Terima kasih! 💕');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes < 1 ? 'Baru saja' : `${diffInMinutes} menit yang lalu`;
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} hari yang lalu`;
    }
  };

  return (
    <div className="relative py-8 min-h-[100vh] -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/Greetingcard.jpg"
          alt="Wishes Background"
          fill
          className="object-cover opacity-70"
          style={{
            filter: "brightness(0.6) blur(0.3px)",
            transform: `scale(${1 + scrollY * 0.0002})`,
            transformOrigin: "center",
            transition: "transform 0.3s ease-out"
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center animate-fade-in-slow">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-serif tracking-wider drop-shadow-lg animate-zoom-in-delay-1">
              Ucapan & Doa
            </h2>
            
            {/* Decorative ornament */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="text-white/80 text-2xl sm:text-3xl opacity-80 animate-wiggle">
                ❦ ❦ ❦
              </div>
            </div>

            <p className="text-lg sm:text-xl text-white/90 mb-8 drop-shadow-md animate-slide-up-delay-2">
              Kirimkan ucapan & doa kepada mempelai
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 sm:p-8 mb-8 animate-slide-up-delay-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Tuliskan nama anda:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="..."
                  className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* Attendance Selection */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Will you be attending?
                </label>
                <select
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Pilih jawaban</option>
                  <option value="yes">Ya, saya akan hadir</option>
                  <option value="no">Maaf, saya tidak dapat hadir</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Berikan ucapan & doa:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="....."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                  required
                />
                <div className="text-right text-white/60 text-xs mt-1">
                  {formData.message.length}/1000
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed animate-zoom-in-delay-4 border border-gray-600 shadow-lg"
              >
                {isSubmitting ? 'Mengirim...' : 'SEND'}
              </button>
            </form>
          </div>

          {/* Wishes List */}
          <div className="space-y-4 animate-fade-in-slow px-2">
            <h3 className="text-2xl font-bold text-white mb-6 text-center animate-slide-up-delay-5">
              Ucapan dari Tamu
            </h3>
            
            <div className="max-h-96 overflow-y-auto space-y-4 px-2">
              {wishes.length === 0 ? (
                <div className="text-center text-white/60 py-8 mx-4">
                  <p>Belum ada ucapan. Jadilah yang pertama! 💕</p>
                </div>
              ) : (
                wishes.map((wish, index) => (
                  <div
                    key={wish.id}
                    className={`bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 mx-2 animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}-delay-1`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-amber-300 font-semibold">
                          {wish.name}
                        </h4>
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      </div>
                      <span className="text-white/60 text-xs">
                        {formatTime(wish.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-white/90 text-sm leading-relaxed mb-2">
                      {wish.message}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-white/60">
                        {wish.attendance === 'yes' ? '✅ Akan hadir' : '❌ Tidak dapat hadir'}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-xs text-white/60">
                        💕
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishesAndPrayers;
>>>>>>> 5630643a154bf98ee068e0cf240e019e1d05a226
