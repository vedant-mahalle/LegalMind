"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, FileText, Star, Clock, Users, Scale, Gavel } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  title: string
  category: string
  complexity: "beginner" | "intermediate" | "advanced"
  language: string
  description: string
  useCase: string
  estimatedTime: string
  rating: number
  usageCount: number
  tags: string[]
  preview: string
}

const templates: Template[] = [
  {
    id: "cease-desist-copyright",
    title: "Copyright Infringement Cease & Desist",
    category: "intellectual-property",
    complexity: "intermediate",
    language: "english",
    description: "Professional template for addressing unauthorized use of copyrighted material",
    useCase: "When someone is using your copyrighted content without permission",
    estimatedTime: "15-20 minutes",
    rating: 4.8,
    usageCount: 1247,
    tags: ["Copyright", "Intellectual Property", "DMCA", "Infringement"],
    preview:
      "CEASE AND DESIST NOTICE\n\nTO: [Infringer Name]\nFROM: [Copyright Owner]\n\nYou are hereby notified that you are infringing upon copyrighted material...",
  },
  {
    id: "payment-demand-invoice",
    title: "Payment Demand for Overdue Invoice",
    category: "debt-collection",
    complexity: "beginner",
    language: "english",
    description: "Standard template for demanding payment of overdue invoices",
    useCase: "When clients or customers have unpaid invoices past due date",
    estimatedTime: "10-15 minutes",
    rating: 4.9,
    usageCount: 2156,
    tags: ["Payment", "Invoice", "Debt Collection", "Business"],
    preview:
      "PAYMENT DEMAND NOTICE\n\nTO: [Debtor Name]\nFROM: [Creditor Name]\n\nYou are hereby notified that payment is overdue...",
  },
  {
    id: "lease-violation-notice",
    title: "Lease Violation Notice to Tenant",
    category: "property-tenancy",
    complexity: "intermediate",
    language: "english",
    description: "Formal notice for lease violations with cure or quit provisions",
    useCase: "When tenants violate lease terms (late rent, unauthorized pets, etc.)",
    estimatedTime: "20-25 minutes",
    rating: 4.7,
    usageCount: 892,
    tags: ["Lease", "Tenant", "Property", "Violation", "Cure or Quit"],
    preview:
      "NOTICE TO CURE OR QUIT\n\nTO: [Tenant Name]\nFROM: [Landlord Name]\n\nYou are hereby notified that you are in violation of your lease...",
  },
  {
    id: "trademark-infringement",
    title: "Trademark Infringement Notice",
    category: "intellectual-property",
    complexity: "advanced",
    language: "english",
    description: "Comprehensive template for trademark infringement cases",
    useCase: "When someone is using your trademark without authorization",
    estimatedTime: "25-30 minutes",
    rating: 4.6,
    usageCount: 634,
    tags: ["Trademark", "Intellectual Property", "Brand Protection", "Infringement"],
    preview:
      "TRADEMARK INFRINGEMENT NOTICE\n\nTO: [Infringer Name]\nFROM: [Trademark Owner]\n\nYou are hereby notified of trademark infringement...",
  },
  {
    id: "breach-contract-notice",
    title: "Breach of Contract Notice",
    category: "contract-dispute",
    complexity: "intermediate",
    language: "english",
    description: "Professional template for notifying parties of contract breaches",
    useCase: "When the other party has violated terms of your contract",
    estimatedTime: "20-25 minutes",
    rating: 4.8,
    usageCount: 1089,
    tags: ["Contract", "Breach", "Agreement", "Legal Action"],
    preview:
      "BREACH OF CONTRACT NOTICE\n\nTO: [Breaching Party]\nFROM: [Non-Breaching Party]\n\nYou are in material breach of contract...",
  },
  {
    id: "harassment-cease-desist",
    title: "Harassment Cease & Desist",
    category: "personal-protection",
    complexity: "beginner",
    language: "english",
    description: "Template to stop harassment, stalking, or unwanted contact",
    useCase: "When someone is harassing you or making unwanted contact",
    estimatedTime: "15-20 minutes",
    rating: 4.9,
    usageCount: 1456,
    tags: ["Harassment", "Stalking", "Personal Protection", "Cease and Desist"],
    preview:
      "CEASE AND DESIST - HARASSMENT\n\nTO: [Harasser Name]\nFROM: [Victim Name]\n\nYou are hereby demanded to cease all harassment...",
  },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "intellectual-property", label: "Intellectual Property" },
  { value: "debt-collection", label: "Debt Collection" },
  { value: "property-tenancy", label: "Property & Tenancy" },
  { value: "contract-dispute", label: "Contract Disputes" },
  { value: "personal-protection", label: "Personal Protection" },
  { value: "employment", label: "Employment" },
  { value: "consumer-protection", label: "Consumer Protection" },
]

const complexityLevels = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner", color: "bg-green-100 text-green-800" },
  { value: "intermediate", label: "Intermediate", color: "bg-yellow-100 text-yellow-800" },
  { value: "advanced", label: "Advanced", color: "bg-red-100 text-red-800" },
]

const languages = [
  { value: "all", label: "All Languages" },
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
]

export function TemplateLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedComplexity, setSelectedComplexity] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesComplexity = selectedComplexity === "all" || template.complexity === selectedComplexity
    const matchesLanguage = selectedLanguage === "all" || template.language === selectedLanguage

    return matchesSearch && matchesCategory && matchesComplexity && matchesLanguage
  })

  const getComplexityColor = (complexity: string) => {
    const level = complexityLevels.find((l) => l.value === complexity)
    return level?.color || "bg-slate-100 text-slate-800"
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "intellectual-property":
        return Scale
      case "debt-collection":
        return FileText
      case "property-tenancy":
        return Users
      case "contract-dispute":
        return Gavel
      default:
        return FileText
    }
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Complexity</label>
              <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {complexityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          Showing {filteredTemplates.length} of {templates.length} templates
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Sort by:</span>
          <Select defaultValue="popularity">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const CategoryIcon = getCategoryIcon(template.category)

          return (
            <Card key={template.id} className="border border-slate-200 hover:border-blue-300 transition-colors group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CategoryIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{template.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-slate-600 ml-1">{template.rating}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-600">{template.usageCount} uses</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getComplexityColor(template.complexity)}>{template.complexity}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">{template.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>{template.estimatedTime}</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    <strong>Use case:</strong> {template.useCase}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs font-mono text-slate-600 leading-relaxed">
                    {template.preview.substring(0, 120)}...
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Link href={`/generator?template=${template.id}`}>Use Template</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No templates found</h3>
          <p className="text-slate-600 mb-4">Try adjusting your filters or search terms</p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
              setSelectedComplexity("all")
              setSelectedLanguage("all")
            }}
            variant="outline"
            className="bg-transparent"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
