/**
 * Response formatting utilities for Pipedrive MCP Server
 */
/**
 * Formats a currency value with symbol
 */
export function formatCurrency(value, currency) {
    if (value === null || value === undefined) {
        return "N/A";
    }
    const curr = currency || "USD";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: curr,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}
/**
 * Formats a date string to a readable format
 */
export function formatDate(date) {
    if (!date)
        return "N/A";
    try {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    catch {
        return date;
    }
}
/**
 * Creates a summary line for a deal
 */
export function summarizeDeal(deal) {
    const parts = [`Deal: ${deal.title}`];
    if (deal.value) {
        parts.push(`(${formatCurrency(deal.value, deal.currency)})`);
    }
    if (deal.status) {
        parts.push(`[${deal.status}]`);
    }
    const contacts = [deal.person_name, deal.org_name].filter(Boolean);
    if (contacts.length > 0) {
        parts.push(`- ${contacts.join(" @ ")}`);
    }
    return parts.join(" ");
}
/**
 * Creates a summary line for a person
 */
export function summarizePerson(person) {
    const parts = [`Person: ${person.name}`];
    const email = Array.isArray(person.email)
        ? person.email[0]?.value
        : person.email;
    if (email) {
        parts.push(`<${email}>`);
    }
    if (person.org_name) {
        parts.push(`@ ${person.org_name}`);
    }
    return parts.join(" ");
}
/**
 * Creates a summary line for an organization
 */
export function summarizeOrganization(org) {
    const parts = [`Organization: ${org.name}`];
    if (org.address) {
        parts.push(`(${org.address})`);
    }
    const stats = [];
    if (org.people_count)
        stats.push(`${org.people_count} contacts`);
    if (org.open_deals_count)
        stats.push(`${org.open_deals_count} open deals`);
    if (stats.length > 0) {
        parts.push(`- ${stats.join(", ")}`);
    }
    return parts.join(" ");
}
/**
 * Creates a summary line for an activity
 */
export function summarizeActivity(activity) {
    const parts = [`Activity: ${activity.subject}`];
    parts.push(`[${activity.type}]`);
    if (activity.due_date) {
        let dateStr = formatDate(activity.due_date);
        if (activity.due_time) {
            dateStr += ` ${activity.due_time}`;
        }
        parts.push(`Due: ${dateStr}`);
    }
    if (activity.done !== undefined) {
        parts.push(activity.done ? "(Done)" : "(Pending)");
    }
    return parts.join(" ");
}
/**
 * Creates a list summary (e.g., "Found 25 deals ($1.2M total). 15 more available.")
 */
export function createListSummary(entityName, count, hasMore, additionalInfo) {
    const parts = [`Found ${count} ${entityName}${count !== 1 ? "s" : ""}`];
    if (additionalInfo) {
        parts.push(`(${additionalInfo})`);
    }
    if (hasMore) {
        parts.push("More available with cursor pagination.");
    }
    return parts.join(". ") + ".";
}
/**
 * Truncates text to a maximum length with ellipsis
 */
export function truncate(text, maxLength = 100) {
    if (!text)
        return "";
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength - 3) + "...";
}
//# sourceMappingURL=formatting.js.map