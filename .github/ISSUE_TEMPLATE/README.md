# Issue Templates

This repository uses modern GitHub Issue Forms (YAML-based templates) to ensure structured and comprehensive issue reporting. These templates help maintainers and contributors by standardizing the information collection process.

## Available Templates

### 🐛 Bug Report (`bug_report.yml`)
Use this template to report bugs, errors, or unexpected behavior.

**Features:**
- Required prerequisite checks
- Structured bug description
- Step-by-step reproduction guide
- Environment information collection
- Support for screenshots and logs
- Dropdown menus for OS and browser selection

### ✨ Feature Request (`feature_request.yml`)
Use this template to suggest new features or enhancements.

**Features:**
- Required prerequisite checks
- Clear problem/use case definition
- Feature type categorization
- Priority level selection
- Implementation ideas collection
- Contribution willingness tracking
- Support for mockups and examples

### ❓ Question or Discussion (`question.yml`)
Use this template for general questions, usage help, or discussions.

**Features:**
- Question type categorization
- Context collection
- Search requirement verification

## Configuration

The `config.yml` file customizes the issue template selection page:
- Disables blank issues to encourage using structured templates
- Provides quick links to documentation and discussions
- Enhances the user experience when creating issues

## Benefits of YAML Issue Forms

1. **Structured Data**: Forms ensure consistent information collection
2. **Required Fields**: Critical information can be marked as mandatory
3. **Validation**: Input validation prevents incomplete submissions
4. **User-Friendly**: Dropdowns, checkboxes, and text areas improve UX
5. **Maintainer Efficiency**: Standardized format makes issues easier to process
6. **Better Analytics**: Structured data enables better issue categorization

## Migration from Markdown Templates

The previous Markdown-based templates have been converted to YAML forms with the following improvements:

- **Bug Reports**: Added OS/browser dropdowns, required field validation, and better structure
- **Feature Requests**: Added feature type categorization, priority levels, and contribution tracking
- **New Template**: Added question/discussion template for general inquiries

## Usage Guidelines

### For Contributors
1. Select the appropriate template when creating an issue
2. Fill out all required fields (marked with red asterisks)
3. Provide as much detail as possible for faster resolution
4. Use the checkboxes to confirm you've followed prerequisites

### For Maintainers
- Review the structured data in each issue
- Use labels automatically applied by templates
- Reference the consistent format when requesting additional information
- Leverage the standardized categories for project analytics

## Customization

To modify these templates:

1. Edit the respective `.yml` files in `.github/ISSUE_TEMPLATE/`
2. Follow the [GitHub Issue Forms syntax](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
3. Test changes in a development repository before applying to main
4. Update this README when adding new templates or significant changes

## Template Syntax Reference

Each YAML template includes:
- `name`: Display name for the template
- `description`: Brief description of when to use it
- `title`: Auto-generated title prefix
- `labels`: Automatically applied labels
- `body`: Form fields definition

Common field types:
- `textarea`: Multi-line text input
- `input`: Single-line text input
- `dropdown`: Selection from predefined options
- `checkboxes`: Multiple selection options
- `markdown`: Static text/instructions