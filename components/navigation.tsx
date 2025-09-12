"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scale, Menu, X, Search, Globe, Type, Contrast } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full">
      <div className="bg-slate-50 border-b border-slate-200 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Scale className="h-4 w-4 text-slate-600" />
                <span className="text-slate-700 font-medium">Official Legal Notice Generator</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-slate-600 hover:text-slate-800 transition-colors">
                <Globe className="h-4 w-4" />
                <span>EN</span>
              </button>
              <button
                className="flex items-center space-x-1 text-slate-600 hover:text-slate-800 transition-colors"
                title="Increase font size"
              >
                <Type className="h-4 w-4" />
                <span className="sr-only">Font Size</span>
              </button>
              <button
                className="flex items-center space-x-1 text-slate-600 hover:text-slate-800 transition-colors"
                title="High contrast"
              >
                <Contrast className="h-4 w-4" />
                <span className="sr-only">High Contrast</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-slate-900">Legal Notice Generator</span>
              <span className="text-xs text-slate-600">Government Grade</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/generator" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Generate Notice
            </Link>
            <Link href="/templates" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Templates
            </Link>
            <Link href="/prompt" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Prompt Mode
            </Link>
            <Link href="/about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Search and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search templates..."
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6">Generate Notice</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/generator"
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Generate Notice
              </Link>
              <Link
                href="/templates"
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link
                href="/prompt"
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Prompt Mode
              </Link>
              <Link
                href="/about"
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Generate Notice
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
