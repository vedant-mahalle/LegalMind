export interface Template {
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

export const templates: Template[] = [
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
      "CEASE AND DESIST NOTICE\n\nTO: [Infringer Name]\nFROM: [Copyright Owner]\n\nYou are hereby notified that you are infringing upon copyrighted material owned by the sender. The copyrighted work includes [describe the work, e.g., images, text, software]. The infringement occurred on [date or website/platform] where the sender's material was used without permission.\n\nThe sender demands that you immediately cease and desist from all unauthorized use, reproduction, distribution, or display of the copyrighted material. You must remove all infringing content within [timeframe, e.g., 10 days] and provide written confirmation of compliance.\n\nFailure to comply may result in legal action, including claims for damages, attorney's fees, and injunctive relief under applicable copyright laws.",
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
      "PAYMENT DEMAND NOTICE\n\nTO: [Debtor Name]\nFROM: [Creditor Name]\n\nThis notice serves as a formal demand for payment of the outstanding amount due under Invoice #[invoice number] dated [date]. The total amount owed is [amount], which was due on [due date]. Despite previous reminders, payment has not been received.\n\nThe services/goods provided included [brief description of services/goods]. The sender has fulfilled all obligations under the agreement, and the debtor is in breach of payment terms.\n\nYou are required to make full payment within [timeframe, e.g., 14 days] of receipt of this notice. Payment should be made via [payment method, e.g., bank transfer to account details].\n\nFailure to pay may result in additional charges, interest, legal action, and reporting to credit agencies.",
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
      "NOTICE TO CURE OR QUIT\n\nTO: [Tenant Name]\nFROM: [Landlord Name]\n\nThis notice is issued pursuant to the lease agreement dated [lease start date] for the property located at [property address]. You are in violation of the following lease terms:\n\n1. [Specific violation, e.g., Late payment of rent: Rent was due on [date] but received on [date].]\n2. [Additional violations, e.g., Unauthorized pets: The lease prohibits pets, but [describe pets] have been observed.]\n\nYou are hereby required to cure these violations within [timeframe, e.g., 7 days] by [specific actions, e.g., paying the overdue rent and removing pets].\n\nFailure to cure the violations within the specified time will result in termination of the tenancy. You must vacate the premises by [date], or legal action will be initiated for eviction and damages.\n\nPlease contact the sender immediately to discuss resolution.",
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
      "TRADEMARK INFRINGEMENT NOTICE\n\nTO: [Infringer Name]\nFROM: [Trademark Owner]\n\nYou are hereby notified of trademark infringement involving the registered trademark [Trademark Name], Registration No. [Registration Number], owned by the sender. The trademark is used in connection with [describe goods/services, e.g., clothing, software].\n\nThe infringement occurred on [platform/website] where your use of [similar mark] is likely to cause confusion among consumers, diluting the trademark's distinctiveness and harming the sender's brand.\n\nThe sender demands that you immediately cease all use of the infringing mark, including in advertising, packaging, and online presence. You must provide written assurance of compliance and account for all profits derived from the infringement.\n\nFailure to comply will result in legal action under trademark laws, seeking damages, injunctive relief, and recovery of attorney's fees.",
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
      "BREACH OF CONTRACT NOTICE\n\nTO: [Breaching Party]\nFROM: [Non-Breaching Party]\n\nThis notice is issued pursuant to the contract dated [contract date] between the parties. You are in material breach of the following contract terms:\n\n1. [Specific breach, e.g., Failure to deliver goods: The contract required delivery by [date], but delivery has not occurred.]\n2. [Additional breaches, e.g., Non-payment: Payment of [amount] was due on [date] but remains outstanding.]\n\nThe sender has performed all obligations under the contract, including [describe sender's performance]. Your breach has caused [describe damages, e.g., financial loss, project delays].\n\nYou are required to cure the breach within [timeframe, e.g., 10 days] by [specific actions, e.g., making payment and delivering goods].\n\nFailure to cure will result in termination of the contract, and the sender reserves the right to pursue legal remedies for damages and specific performance.",
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
      "CEASE AND DESIST - HARASSMENT\n\nTO: [Harasser Name]\nFROM: [Victim Name]\n\nYou are hereby demanded to cease and desist from all forms of harassment, including but not limited to:\n\n1. Unwanted contact via phone, email, or in person.\n2. Following or stalking the sender.\n3. Making threatening or abusive statements.\n4. Interfering with the sender's work, family, or daily activities.\n\nSpecific incidents include [describe incidents, e.g., repeated calls on [dates], unwanted visits to [location]]. This behavior is causing significant distress and violates laws against harassment.\n\nYou must stop all contact immediately and refrain from any further actions that could be construed as harassment. Do not approach the sender or communicate in any way.\n\nFailure to comply will result in legal action, including restraining orders, civil lawsuits, and potential criminal charges.",
  },
]