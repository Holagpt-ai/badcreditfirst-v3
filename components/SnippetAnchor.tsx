type SnippetAnchorProps = {
  title?: string;
  description: string;
  className?: string;
};

export default function SnippetAnchor({
  title = "What is BadCreditFirst?",
  description,
  className,
}: SnippetAnchorProps) {
  return (
    <section className={className ? `snippet-anchor ${className}` : "snippet-anchor"}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="trust-line">
        Content is reviewed for accuracy and updated regularly to reflect current credit card and credit scoring
        practices.
      </p>
    </section>
  );
}
