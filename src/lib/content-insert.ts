/**
 * Inserts CTA content into blog post HTML at the optimal position
 * Mimics the WordPress implementation that splits content by H2 tags
 * and inserts the CTA before the second H2 section
 */
export function insertCTAIntoContent(htmlContent: string): { 
  beforeCTA: string; 
  afterCTA: string; 
  hasCTA: boolean 
} {
  // Split content by h2 tags (case insensitive)
  const h2Regex = /<h2(?:\s[^>]*)?>/gi;
  const parts = htmlContent.split(h2Regex);
  
  // Get the actual h2 tags that were split out
  const h2Tags = htmlContent.match(h2Regex) || [];
  
  // Only insert CTA if we have at least 2 h2 tags (which creates 3+ parts)
  if (parts.length >= 3 && h2Tags.length >= 2) {
    // Reconstruct content before CTA (first part + first H2 + second part)
    const beforeCTA = parts[0] + (h2Tags[0] || '') + parts[1];
    
    // Reconstruct content after CTA (second H2 + remaining parts)
    const afterCTA = (h2Tags[1] || '') + parts.slice(2).map((part, index) => {
      const h2Tag = h2Tags[index + 2] || '';
      return part + h2Tag;
    }).join('');
    
    return {
      beforeCTA: beforeCTA.trim(),
      afterCTA: afterCTA.trim(),
      hasCTA: true
    };
  }
  
  // If fewer than 2 H2 tags, don't insert CTA in middle
  return {
    beforeCTA: htmlContent,
    afterCTA: '',
    hasCTA: false
  };
}