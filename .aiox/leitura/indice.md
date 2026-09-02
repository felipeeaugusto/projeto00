# Índice estrutural do framework — FASE 1 / passo 1.1

> Gerado em 2026-09-02T10:49:40.643Z por `.aiox/leitura/gerar-indice.js` — determinístico, sem LLM.
> Cada arquivo aparece com sua contagem de linhas e o esqueleto extraído (headings, chaves, exports).

## Totais

| Métrica | Valor |
|---|---|
| Arquivos | **1605** |
| Linhas | **586.668** |
| Pastas (2 níveis) | 160 |
| Erros de leitura | 0 |
| Alvos ausentes | nenhum |

| Extensão | Arquivos | Linhas |
|---|---|---|
| `.md` | 585 | 230.154 |
| `.js` | 584 | 206.243 |
| `.yaml` | 219 | 95.966 |
| `.json` | 34 | 18.000 |
| `.py` | 60 | 17.462 |
| `.sh` | 24 | 5.886 |
| `.hbs` | 15 | 2.946 |
| `.cjs` | 5 | 1.741 |
| `.sql` | 15 | 1.701 |
| `.css` | 14 | 1.633 |
| `.template` | 6 | 1.227 |
| `.jsx` | 13 | 1.066 |
| `.ps1` | 7 | 531 |
| `.html` | 2 | 515 |
| `.cmd` | 6 | 440 |
| `.yml` | 2 | 384 |
| `.tmpl` | 4 | 311 |
| `.txt` | 5 | 296 |
| `.tsx` | 1 | 98 |
| `.mjs` | 1 | 41 |
| `.csv` | 2 | 25 |
| `.jsonl` | 1 | 2 |

---

## `.aiox-core/base-rules/project-log.md/` — 1 arquivos · 82 linhas

### `.aiox-core/base-rules/project-log.md` — 82 linhas
- *(sem estrutura extraível)*

## `.aiox-core/cli/commands/` — 39 arquivos · 9.442 linhas

### `.aiox-core/cli/commands/pro/index.js` — 783 linhas
- fn resolveLicensePath()
- fn loadLicenseModules()
- fn getAioxCoreVersion()
- fn formatDate()
- fn confirm()
- fn activateAction()
- fn statusAction()
- fn deactivateAction()
- fn featuresAction()
- fn validateAction()
- fn loadProSetupWizard()
- fn setupAction()
- fn updateAction()
- fn createProCommand()
- exports = {

### `.aiox-core/cli/commands/config/index.js` — 607 linhas
- fn loadModules()
- fn getProjectRoot()
- fn showAction()
- fn printDebugConfig()
- fn diffAction()
- fn computeDiff()
- fn isObj()
- fn formatValue()
- fn migrateAction()
- fn splitL1()
- fn splitL2()
- fn splitL4()
- fn ensureGitignore()
- fn validateAction()
- fn validateYamlSyntax()
- fn initLocalAction()
- fn createConfigCommand()
- exports = {

### `.aiox-core/cli/commands/validate/index.js` — 495 linhas
- fn createValidateCommand()
- fn runValidation()
- fn resolveSignatureRequirement()
- fn isTruthyEnv()
- fn runRepair()
- fn truncatePath()
- exports = {

### `.aiox-core/cli/commands/migrate/validate.js` — 452 linhas
- fn validateStructure()
- fn countFiles()
- fn walk()
- fn runLintCheck()
- fn runTests()
- fn runFullValidation()
- fn generateSummary()
- exports = {

### `.aiox-core/cli/commands/migrate/index.js` — 441 linhas
- fn printHeader()
- fn askConfirmation()
- fn createProgressReporter()
- fn runMigration()
- fn runRollbackCommand()
- fn showBackupStatus()
- fn formatDuration()
- fn createMigrateCommand()
- exports = {

### `.aiox-core/cli/commands/migrate/update-imports.js` — 396 linhas
- fn buildPathTransformMap()
- fn scanFileImports()
- fn transformImportPath()
- fn updateFileImports()
- fn updateAllImports()
- fn getJsFiles()
- fn verifyImports()
- exports = {

### `.aiox-core/cli/commands/pro/buyer.js` — 379 linhas
- fn resolveLicensePath()
- fn loadClient()
- fn isValidEmail()
- fn classifyError()
- fn emitValidateResult()
- fn validateAction()
- fn mapWithConcurrency()
- fn next()
- fn parseEmailsFile()
- fn validateBatchAction()
- fn registerAction()
- fn createBuyerCommand()
- exports = {

### `.aiox-core/cli/commands/migrate/analyze.js` — 353 linhas
- fn detectV2Structure()
- fn categorizeFile()
- fn analyzeMigrationPlan()
- fn formatSize()
- fn formatMigrationPlan()
- fn analyzeImports()
- exports = {

### `.aiox-core/cli/commands/migrate/backup.js` — 352 linhas
- fn createBackupDirName()
- fn calculateChecksum()
- fn getFileStats()
- fn copyFileWithMetadata()
- fn getAllFiles()
- fn createBackup()
- fn verifyBackup()
- fn findLatestBackup()
- fn listBackups()
- exports = {

### `.aiox-core/cli/commands/migrate/rollback.js` — 323 linhas
- fn removeV21Structure()
- fn restoreFromBackup()
- fn executeRollback()
- fn formatRollbackSummary()
- fn canRollback()
- exports = {

### `.aiox-core/cli/commands/workers/search-keyword.js` — 310 linhas
- fn levenshteinDistance()
- fn fuzzyMatchScore()
- fn escapeRegex()
- fn buildSearchFields()
- fn searchKeyword()
- fn idLower()
- fn nameLower()
- fn tags()
- fn searchByTags()
- exports = {

### `.aiox-core/cli/commands/workers/search-semantic.js` — 293 linhas
- fn isSemanticAvailable()
- fn getEmbedding()
- fn cosineSimilarity()
- fn loadWorkerEmbeddings()
- fn buildSearchText()
- fn searchSemantic()
- fn precomputeEmbeddings()
- exports = {

### `.aiox-core/cli/commands/migrate/execute.js` — 292 linhas
- fn createModuleDirectories()
- fn migrateModule()
- fn executeMigration()
- fn saveMigrationState()
- fn loadMigrationState()
- fn clearMigrationState()
- exports = {

### `.aiox-core/cli/commands/workers/formatters/info-formatter.js` — 274 linhas
- fn formatInfoPretty()
- fn formatInfoJSON()
- fn formatInfoYAML()
- fn formatInfo()
- fn format()
- fn formatNotFoundError()
- fn wrapText()
- exports = {

### `.aiox-core/cli/commands/workers/formatters/list-table.js` — 265 linhas
- fn formatTable()
- fn num()
- fn formatJSON()
- fn formatYAML()
- fn formatCount()
- fn formatList()
- fn format()
- fn truncate()
- fn formatPaginationLine()
- exports = {

### `.aiox-core/cli/commands/mcp/add.js` — 234 linhas
- fn createAddCommand()
- fn executeAdd()
- exports = {

### `.aiox-core/cli/commands/generate/index.js` — 222 linhas
- fn getTemplateEngine()
- fn generateDocument()
- fn listTemplates()
- fn showTemplateInfo()
- fn createGenerateCommand()
- exports = {

### `.aiox-core/cli/commands/mcp/link.js` — 217 linhas
- fn createLinkCommand()
- fn executeLink()
- exports = {

### `.aiox-core/cli/commands/workers/list.js` — 214 linhas
- fn createListCommand()
- fn executeList()
- fn format()
- fn executeCountMode()
- fn logPerformance()
- exports = {

### `.aiox-core/cli/commands/metrics/show.js` — 209 linhas
- fn formatPercent()
- fn formatDuration()
- fn formatRelativeTime()
- fn createShowCommand()
- exports = {

### `.aiox-core/cli/commands/qa/status.js` — 195 linhas
- fn createStatusCommand()
- fn printStatus()
- fn printLayerStatus()
- fn getStatusIcon()
- fn formatOverallStatus()
- fn formatDuration()
- fn formatTimeAgo()
- exports = {

### `.aiox-core/cli/commands/workers/info.js` — 194 linhas
- fn createInfoCommand()
- fn executeInfo()
- fn findSuggestions()
- fn findRelatedWorkers()
- exports = {

### `.aiox-core/cli/commands/workers/search-filters.js` — 185 linhas
- fn applyFilters()
- fn workerCategory()
- fn workerTags()
- fn filterByCategory()
- fn workerCategory()
- fn filterByTags()
- fn filterByAnyTag()
- fn filterBySubcategory()
- fn workerSubcategory()
- fn filterByTaskFormat()
- fn filterByExecutorType()
- fn applyMultipleFilters()
- exports = {

### `.aiox-core/cli/commands/mcp/status.js` — 183 linhas
- fn createStatusCommand()
- fn executeStatus()
- exports = {

### `.aiox-core/cli/commands/mcp/setup.js` — 164 linhas
- fn createSetupCommand()
- fn executeSetup()
- exports = {

### `.aiox-core/cli/commands/qa/run.js` — 163 linhas
- fn createRunCommand()
- fn printLayerResult()
- fn printSummary()
- fn formatDuration()
- exports = {

### `.aiox-core/cli/commands/workers/formatters/list-tree.js` — 159 linhas
- fn groupWorkers()
- fn formatTree()
- fn formatTreeCollapsed()
- fn capitalize()
- exports = {

### `.aiox-core/cli/commands/metrics/record.js` — 154 linhas
- fn createRecordCommand()
- exports = {

### `.aiox-core/cli/commands/workers/search.js` — 154 linhas
- fn createSearchCommand()
- fn executeSearch()
- fn duration()
- exports = {

### `.aiox-core/cli/commands/metrics/seed.js` — 126 linhas
- fn createSeedCommand()
- exports = {

### `.aiox-core/cli/commands/workers/utils/pagination.js` — 102 linhas
- fn paginate()
- fn startIndex()
- fn formatPaginationInfo()
- fn formatPaginationHint()
- exports = {

### `.aiox-core/cli/commands/manifest/regenerate.js` — 96 linhas
- fn createRegenerateCommand()
- fn formatResult()
- exports = {

### `.aiox-core/cli/commands/metrics/cleanup.js` — 91 linhas
- fn createCleanupCommand()
- exports = {

### `.aiox-core/cli/commands/mcp/index.js` — 76 linhas
- fn createMcpCommand()
- exports = {

### `.aiox-core/cli/commands/manifest/validate.js` — 66 linhas
- fn createValidateCommand()
- exports = {

### `.aiox-core/cli/commands/metrics/index.js` — 65 linhas
- fn createMetricsCommand()
- exports = {

### `.aiox-core/cli/commands/qa/index.js` — 56 linhas
- fn createQaCommand()
- exports = {

### `.aiox-core/cli/commands/workers/index.js` — 56 linhas
- fn createWorkersCommand()
- exports = {

### `.aiox-core/cli/commands/manifest/index.js` — 46 linhas
- fn createManifestCommand()
- exports = {

## `.aiox-core/cli/index.js/` — 1 arquivos · 149 linhas

### `.aiox-core/cli/index.js` — 149 linhas
- fn createProgram()
- fn run()
- exports = {

## `.aiox-core/cli/utils/` — 2 arquivos · 453 linhas

### `.aiox-core/cli/utils/output-formatter-cli.js` — 232 linhas
- fn formatOutput()
- fn formatTable()
- fn num()
- fn formatJSON()
- fn formatYAML()
- fn truncate()
- fn formatWorkerDetails()
- fn formatCategories()
- exports = {

### `.aiox-core/cli/utils/score-calculator.js` — 221 linhas
- fn calculateScores()
- fn tags()
- fn sortByScore()
- fn normalizeScores()
- fn calculateRelevanceScore()
- fn tags()
- fn boostExactMatches()
- fn calculateSearchAccuracy()
- exports = {

## `.aiox-core/constitution.md/` — 1 arquivos · 171 linhas

### `.aiox-core/constitution.md` — 171 linhas
- # Synkra AIOX Constitution
-   ## Core Principles
-     ### I. CLI First (NON-NEGOTIABLE)
-     ### II. Agent Authority (NON-NEGOTIABLE)
-     ### III. Story-Driven Development (MUST)
-     ### IV. No Invention (MUST)
-     ### V. Quality First (MUST)
-     ### VI. Absolute Imports (SHOULD)
-   ## Governance
-     ### Amendment Process
-     ### Versioning
-     ### Compliance
-     ### Gate Severity Levels
-   ## References

## `.aiox-core/core-config.yaml/` — 1 arquivos · 408 linhas

### `.aiox-core/core-config.yaml` — 408 linhas
- markdownExploder:
- project:
-   type:
-   installedAt:
-   version:
- user_profile:
- qa:
-   qaLocation:
- prd:
-   prdFile:
-   prdVersion:
-   prdSharded:
-   prdShardedLocation:
-   epicFilePattern:
- architecture:
-   architectureFile:
-   architectureVersion:
-   architectureSharded:
-   architectureShardedLocation:
- customTechnicalDocuments:
- devLoadAlwaysFiles:
- devLoadAlwaysFilesFallback:
- devDebugLog:
- devStoryLocation:
- slashPrefix:
- toolsLocation:
- scriptsLocation:
-   core:
-   development:
-   infrastructure:
- … (+88 itens)

## `.aiox-core/core/code-intel/` — 14 arquivos · 3.088 linhas

### `.aiox-core/core/code-intel/providers/registry-provider.js` — 515 linhas
- class RegistryProvider
- exports = { RegistryProvider, LAYER_PRIORITY };

### `.aiox-core/core/code-intel/registry-syncer.js` — 334 linhas
- fn inferRole()
- class RegistrySyncer
- exports = { RegistrySyncer, inferRole, ROLE_MAP };

### `.aiox-core/core/code-intel/code-intel-client.js` — 294 linhas
- class CodeIntelClient
- exports = {

### `.aiox-core/core/code-intel/helpers/planning-helper.js` — 248 linhas
- fn getCodebaseOverview()
- fn getDependencyGraph()
- fn getComplexityAnalysis()
- fn getImplementationContext()
- fn getImplementationImpact()
- fn _buildDependencySummary()
- fn _calculateRiskLevel()
- exports = {

### `.aiox-core/core/code-intel/providers/code-graph-provider.js` — 209 linhas
- class CodeGraphProvider
- exports = { CodeGraphProvider, TOOL_MAP };

### `.aiox-core/core/code-intel/helpers/dev-helper.js` — 206 linhas
- fn checkBeforeWriting()
- fn hasMatches()
- fn suggestReuse()
- fn getConventionsForPath()
- fn assessRefactoringImpact()
- fn _formatSuggestion()
- fn _calculateRiskLevel()
- exports = {

### `.aiox-core/core/code-intel/helpers/qa-helper.js` — 187 linhas
- fn getBlastRadius()
- fn getTestCoverage()
- fn getReferenceImpact()
- fn suggestGateInfluence()
- fn _calculateRiskLevel()
- fn _calculateCoverageStatus()
- exports = {

### `.aiox-core/core/code-intel/hook-runtime.js` — 186 linhas
- fn getProvider()
- fn resolveCodeIntel()
- fn formatAsXml()
- fn escapeXml()
- fn _resetForTesting()
- exports = {

### `.aiox-core/core/code-intel/helpers/creation-helper.js` — 183 linhas
- fn getCodebaseContext()
- fn checkDuplicateArtefact()
- fn hasMatches()
- fn enrichRegistryEntry()
- fn _formatDuplicateWarning()
- exports = {

### `.aiox-core/core/code-intel/helpers/devops-helper.js` — 165 linhas
- fn assessPrePushImpact()
- fn generateImpactSummary()
- fn topFiles()
- fn classifyRiskLevel()
- fn _formatImpactReport()
- fn topFiles()
- exports = {

### `.aiox-core/core/code-intel/code-intel-enricher.js` — 159 linhas
- class CodeIntelEnricher
- fn file()
- exports = { CodeIntelEnricher };

### `.aiox-core/core/code-intel/helpers/story-helper.js` — 146 linhas
- fn detectDuplicateStory()
- fn suggestRelevantFiles()
- fn validateNoDuplicates()
- fn _formatDuplicateWarning()
- exports = {

### `.aiox-core/core/code-intel/index.js` — 139 linhas
- fn getClient()
- fn getEnricher()
- fn isCodeIntelAvailable()
- fn enrichWithCodeIntel()
- fn _resetForTesting()
- exports = {

### `.aiox-core/core/code-intel/providers/provider-interface.js` — 117 linhas
- class CodeIntelProvider
- exports = { CodeIntelProvider, CAPABILITIES };

## `.aiox-core/core/config/` — 12 arquivos · 2.438 linhas

### `.aiox-core/core/config/config-resolver.js` — 607 linhas
- fn getAjvInstance()
- fn loadSchema()
- fn validateConfig()
- fn clearSchemaCache()
- fn loadYaml()
- fn loadYamlAbsolute()
- fn isLegacyMode()
- fn loadLayeredConfig()
- fn loadLegacyConfig()
- fn trackSources()
- fn resolveConfig()
- fn getConfigAtLevel()
- fn ensureUserConfigDir()
- fn setUserConfigValue()
- fn toggleUserProfile()
- exports = {

### `.aiox-core/core/config/schemas/project-config.schema.json` — 344 linhas
- $schema:
- $id:
- title:
- description:
- type:
- properties:
- additionalProperties:

### `.aiox-core/core/config/config-loader.js` — 326 linhas
- fn isCacheValid()
- fn loadFullConfig()
- fn loadConfigSections()
- fn loadAgentConfig()
- fn sizeKB()
- fn loadMinimalConfig()
- fn preloadConfig()
- fn clearCache()
- fn getPerformanceMetrics()
- fn validateAgentConfig()
- fn getConfigSection()
- exports = {

### `.aiox-core/core/config/migrate-config.js` — 291 linhas
- fn isLegacyMode()
- fn createBackup()
- fn extractUserFields()
- fn extractProjectFields()
- fn ensureUserConfigDir()
- fn writeUserConfig()
- fn writeProjectConfig()
- fn migrateConfig()
- exports = {

### `.aiox-core/core/config/config-cache.js` — 246 linhas
- class ConfigCache
- exports = {

### `.aiox-core/core/config/schemas/framework-config.schema.json` — 244 linhas
- $schema:
- $id:
- title:
- description:
- type:
- properties:
- additionalProperties:

### `.aiox-core/core/config/env-interpolator.js` — 122 linhas
- fn interpolateString()
- fn interpolateEnvVars()
- fn lintEnvPatterns()
- fn walk()
- exports = {

### `.aiox-core/core/config/merge-utils.js` — 101 linhas
- fn isPlainObject()
- fn deepMerge()
- fn mergeAll()
- exports = {

### `.aiox-core/core/config/template-overrides.js` — 84 linhas
- fn getTemplateOverrides()
- fn isSectionOptional()
- exports = {

### `.aiox-core/core/config/schemas/user-config.schema.json` — 32 linhas
- $schema:
- $id:
- title:
- description:
- type:
- required:
- properties:
- additionalProperties:

### `.aiox-core/core/config/templates/user-config.yaml` — 23 linhas
- user_profile:
- default_model:
- default_language:
- coderabbit_integration:
- educational_mode:

### `.aiox-core/core/config/schemas/local-config.schema.json` — 18 linhas
- $schema:
- $id:
- title:
- description:
- type:
- properties:
- additionalProperties:

## `.aiox-core/core/docs/` — 5 arquivos · 1.996 linhas

### `.aiox-core/core/docs/troubleshooting-guide.md` — 624 linhas
- # Synkra AIOX Meta-Agent Troubleshooting Guide
-   ## Overview
-   ## Table of Contents
-   ## Component Creation Issues
-     ### Issue: "Component already exists"
-     ### Issue: "Invalid name format"
-     ### Issue: "Template not found"
-   ## Template Processing Problems
-     ### Issue: Variables not replaced
-     ### Issue: Malformed output
-   ## Elicitation Workflow Issues
-     ### Issue: Prompts not appearing
-     ### Issue: Session not saving
-   ## Security Validation Errors
-     ### Issue: "Security check failed"
-     ### Issue: "Path traversal detected"
-   ## Transaction and Rollback Problems
-     ### Issue: "No transaction to rollback"
-     ### Issue: Partial rollback failure
-   ## Batch Creation Failures
-     ### Issue: "Circular dependency detected"
-     ### Issue: Batch creation partially fails
-   ## Dependency Resolution Issues
-     ### Issue: "Missing dependencies"
-   ## Performance Problems
-     ### Issue: Slow component creation
-     ### Issue: Memory usage high
-   ## Debug Techniques
-     ### Enable Debug Output
-     ### Check Logs
- … (+7 itens)

### `.aiox-core/core/docs/component-creation-guide.md` — 457 linhas
- # Component Creation Guide
-   ## Overview
-   ## Table of Contents
-   ## Creating Agents
-     ### Using the Interactive Command
-     ### Interactive Elicitation Process
-     ### Example Session
-     ### Generated Agent Structure
-   ## Creating Tasks
-     ### Using the Interactive Command
-     ### Task Elicitation Process
-     ### Example Task Creation
-     ### Generated Task Structure
-   ## Creating Workflows
-     ### Using the Interactive Command
-     ### Workflow Configuration
-     ### Example Workflow
-   ## Batch Component Creation
-     ### Creating a Complete Agent Package
-     ### Creating Related Components
-     ### Example Suite Creation
-   ## Best Practices
-     ### Naming Conventions
-     ### Component Dependencies
-     ### Security Considerations
-     ### Documentation Standards
-   ## Troubleshooting
-     ### Common Issues
-       #### Component Creation Fails
-       #### Duplicate Component Names
- … (+13 itens)

### `.aiox-core/core/docs/SHARD-TRANSLATION-GUIDE.md` — 335 linhas
- # Document Sharding with Portuguese-to-English Translation
-   ## Overview
-   ## Problem Solved
-   ## How It Works
-     ### 1. Automatic Translation During Shard
-     ### 2. Translation Dictionary
-     ### 3. Fallback System
-   ## Usage
-     ### Creating New Documentation
-       #### Option 1: Write in English (Recommended)
-       #### Option 2: Write in Portuguese
-     ### Validating Filenames
-     ### Fixing Existing Projects
-   ## Translation Examples
-   ## Advanced: Adding Custom Translations
-     ### For Project-Specific Terms
-     ### For New Languages
-   ## Troubleshooting
-     ### Problem: Files still have Portuguese names
-     ### Problem: core-config references missing files
-     ### Problem: Some terms aren't translating
-     ### Problem: Validation shows false positives
-   ## Best Practices
-     ### ✅ Do
-     ### ❌ Don't
-   ## Configuration Reference
-     ### Files Modified by This Feature
-     ### Key Configuration Options
-   ## Migration Guide
-     ### From Portuguese to English Filenames
- … (+7 itens)

### `.aiox-core/core/docs/session-update-pattern.md` — 314 linhas
- # Session Update Pattern
-   ## Overview
-   ## Architecture
-   ## Integration Points
-     ### 1. Command Execution Wrapper
-     ### 2. Agent Transition Tracking
-     ### 3. Session-Aware Greeting
-   ## Session State Structure
-   ## Session Types
-     ### New Session
-     ### Existing Session
-     ### Workflow Session
-   ## Implementation Checklist
-     ### Phase 1: Core Integration (Story 6.1.4)
-     ### Phase 2: Agent Integration (Future)
-     ### Phase 3: Advanced Features (Future)
-   ## Usage Examples
-     ### Example 1: Single Agent Session
-     ### Example 2: Multi-Agent Workflow
-   ## Performance Considerations
-     ### Session File Location
-     ### Caching Strategy
-     ### Error Handling
-   ## Testing
-     ### Unit Tests
-     ### Integration Tests
-     ### Manual Testing
-   ## Troubleshooting
-     ### Session Not Updating
-     ### Wrong Session Type
- … (+7 itens)

### `.aiox-core/core/docs/template-syntax.md` — 266 linhas
- # Template Variable Syntax Guide
-   ## Overview
-   ## Basic Variable Substitution
-     ### Example:
-   ## Conditional Blocks
-     ### Example:
-   ## Loops
-     ### Loop Variables:
-     ### Example with Objects:
-   ## Nested Structures
-   ## Special Characters
-     ### Escaping Braces
-     ### Handling Quotes
-   ## Variable Naming Conventions
-     ### Standard Variable Prefixes:
-   ## Common Template Variables
-     ### Agent Templates:
-     ### Task Templates:
-     ### Workflow Templates:
-   ## Advanced Features
-     ### Conditional with Defaults
-     ### Complex Object Arrays
-     ### Preserving Indentation
-   ## Best Practices
-   ## Error Handling
-   ## Examples
-     ### Complete Agent Template Example:
-   ## Troubleshooting
-     ### Common Issues:
-     ### Debug Mode:

## `.aiox-core/core/doctor/` — 20 arquivos · 1.604 linhas

### `.aiox-core/core/doctor/fix-handler.js` — 165 linhas
- fn applyFixes()
- exports = { applyFixes };

### `.aiox-core/core/doctor/checks/ide-sync.js` — 141 linhas
- fn readMarkdownAgents()
- fn readSkillAgents()
- fn diffAgents()
- fn formatList()
- fn run()
- exports = {

### `.aiox-core/core/doctor/checks/skills-count.js` — 140 linhas
- fn countSkillFiles()
- fn countAgentSkillFiles()
- fn countSourceAgents()
- fn run()
- exports = {

### `.aiox-core/core/doctor/checks/code-intel.js` — 131 linhas
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/checks/settings-json.js` — 121 linhas
- fn checkBoundaryAlignment()
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/checks/hooks-claude-count.js` — 118 linhas
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/index.js` — 94 linhas
- fn runDoctorChecks()
- exports = { runDoctorChecks, DOCTOR_VERSION };

### `.aiox-core/core/doctor/checks/commands-count.js` — 81 linhas
- fn countMdFiles()
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/checks/npm-packages.js` — 78 linhas
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/checks/agent-memory.js` — 63 linhas
- fn run()
- exports = { name, run, EXPECTED_AGENTS };

### `.aiox-core/core/doctor/checks/rules-files.js` — 60 linhas
- fn run()
- exports = { name, run, EXPECTED_RULES };

### `.aiox-core/core/doctor/formatters/text.js` — 59 linhas
- fn formatText()
- exports = { formatText };

### `.aiox-core/core/doctor/checks/claude-md.js` — 56 linhas
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/checks/core-config.js` — 53 linhas
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/checks/entity-registry.js` — 53 linhas
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/checks/git-hooks.js` — 50 linhas
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/checks/graph-dashboard.js` — 48 linhas
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/checks/index.js` — 46 linhas
- fn loadChecks()
- exports = { loadChecks };

### `.aiox-core/core/doctor/checks/node-version.js` — 33 linhas
- fn run()
- exports = { name, run };

### `.aiox-core/core/doctor/formatters/json.js` — 14 linhas
- fn formatJson()
- exports = { formatJson };

## `.aiox-core/core/elicitation/` — 5 arquivos · 1.704 linhas

### `.aiox-core/core/elicitation/elicitation-engine.js` — 484 linhas
- class BasicInputValidator
- fn isSafePattern()
- class ElicitationEngine
- exports = ElicitationEngine;

### `.aiox-core/core/elicitation/workflow-elicitation.js` — 348 linhas
- exports = workflowElicitationSteps;

### `.aiox-core/core/elicitation/session-manager.js` — 321 linhas
- class ElicitationSessionManager
- exports = ElicitationSessionManager;

### `.aiox-core/core/elicitation/task-elicitation.js` — 280 linhas
- exports = taskElicitationSteps;

### `.aiox-core/core/elicitation/agent-elicitation.js` — 271 linhas
- exports = agentElicitationSteps;

## `.aiox-core/core/errors/` — 7 arquivos · 811 linhas

### `.aiox-core/core/errors/serializer.js` — 170 linhas
- fn shouldExposeErrorStack()
- fn sanitizeValue()
- fn serializeError()
- exports = {

### `.aiox-core/core/errors/error-registry.js` — 164 linhas
- fn freezeDefinition()
- fn createUnknownDefinition()
- class ErrorRegistry
- exports = {

### `.aiox-core/core/errors/constants.js` — 137 linhas
- exports = {

### `.aiox-core/core/errors/aiox-error.js` — 134 linhas
- class AIOXError
- fn isAIOXError()
- fn collectErrorOwnProperties()
- fn normalizeError()
- exports = {

### `.aiox-core/core/errors/utils.js` — 95 linhas
- fn isPlainObject()
- fn cloneMetadataValue()
- fn deepMerge()
- fn normalizeErrorCode()
- fn normalizeRecovery()
- fn hasOwn()
- exports = {

### `.aiox-core/core/errors/pro-error-registry.js` — 83 linhas
- exports = { proErrorRegistry, PRO_ERROR_DEFINITIONS };

### `.aiox-core/core/errors/index.js` — 28 linhas
- exports = {

## `.aiox-core/core/events/` — 3 arquivos · 470 linhas

### `.aiox-core/core/events/dashboard-emitter.js` — 403 linhas
- class DashboardEmitter
- fn getDashboardEmitter()
- exports = {

### `.aiox-core/core/events/types.js` — 51 linhas
- exports = {

### `.aiox-core/core/events/index.js` — 16 linhas
- exports = {

## `.aiox-core/core/execution/` — 11 arquivos · 8.992 linhas

### `.aiox-core/core/execution/semantic-merge-engine.js` — 1735 linhas
- class SemanticAnalyzer
- fn beforeLines()
- fn afterLines()
- class ConflictDetector
- class AutoMerger
- class AIResolver
- class CustomRulesLoader
- class SemanticMergeEngine
- exports = SemanticMergeEngine;

### `.aiox-core/core/execution/build-state-manager.js` — 1681 linhas
- fn sanitizeLogValue()
- fn shouldExposeLogErrorStack()
- fn stringifyLogDetails()
- fn normalizeFailureError()
- fn validateBuildState()
- class BuildStateManager
- fn main()
- exports = {

### `.aiox-core/core/execution/build-orchestrator.js` — 1095 linhas
- class BuildOrchestrator
- fn executor()
- fn resolveOnce()
- fn rejectOnce()
- fn main()
- exports = {

### `.aiox-core/core/execution/autonomous-build-loop.js` — 1066 linhas
- class AutonomousBuildLoop
- fn main()
- exports = {

### `.aiox-core/core/execution/subagent-dispatcher.js` — 942 linhas
- class SubagentDispatcher
- fn description()
- fn description()
- fn gotchaKeywords()
- fn resolveOnce()
- fn rejectOnce()
- exports = SubagentDispatcher;

### `.aiox-core/core/execution/context-injector.js` — 554 linhas
- class ContextInjector
- exports = ContextInjector;

### `.aiox-core/core/execution/result-aggregator.js` — 487 linhas
- class ResultAggregator
- exports = ResultAggregator;

### `.aiox-core/core/execution/parallel-monitor.js` — 429 linhas
- class ParallelMonitor
- fn getMonitor()
- exports = ParallelMonitor;

### `.aiox-core/core/execution/wave-executor.js` — 397 linhas
- class WaveExecutor
- exports = WaveExecutor;

### `.aiox-core/core/execution/rate-limit-manager.js` — 314 linhas
- class RateLimitManager
- fn withRateLimit()
- fn getGlobalManager()
- exports = RateLimitManager;

### `.aiox-core/core/execution/parallel-executor.js` — 292 linhas
- class ParallelExecutor
- exports = { ParallelExecutor, ParallelMode };

## `.aiox-core/core/external-executors/` — 2 arquivos · 598 linhas

### `.aiox-core/core/external-executors/delegate-cli.js` — 585 linhas
- class DelegateCliError
- fn showHelp()
- fn parseArgs()
- fn readValue()
- fn validateOptions()
- fn sanitizeSlug()
- fn formatTimestamp()
- fn pad()
- fn resolvePathFrom()
- fn loadPrompt()
- fn shellQuote()
- fn formatCommand()
- fn commandExists()
- fn assertExecutorAvailable()
- fn gitStatus()
- fn assertGitReady()
- fn createDelegatePlan()
- fn writeRunFiles()
- fn spawnExecutor()
- fn closeLog()
- fn recordSpawnError()
- fn sanitizeResultValue()
- fn printResult()
- fn runCli()
- fn main()
- exports = {

### `.aiox-core/core/external-executors/index.js` — 13 linhas
- exports = {

## `.aiox-core/core/graph-dashboard/` — 12 arquivos · 2.831 linhas

### `.aiox-core/core/graph-dashboard/formatters/html-formatter.js` — 1437 linhas
- fn _sanitize()
- fn _buildVisNodes()
- fn category()
- fn _buildVisEdges()
- fn _buildSidebar()
- fn cat()
- fn _buildLegend()
- fn formatAsHtml()
- fn refreshFilters()
- fn showTooltip()
- fn hideTooltip()
- fn bindNetworkEvents()
- fn getNeighborsAtDepth()
- fn applyDepthVisuals()
- fn updateDepthCount()
- fn setDepth()
- fn enterFocusMode()
- fn exitFocusMode()
- fn _debounce()
- fn applyPhysics()
- fn setupSlider()
- fn computeDegrees()
- fn applySizing()
- fn rebuildNetwork()
- fn switchLayout()
- fn angle()
- fn updateMetrics()
- fn getTimestampFilename()
- fn drawMinimap()
- fn vx()
- … (+7 itens)

### `.aiox-core/core/graph-dashboard/cli.js` — 360 linhas
- fn parseArgs()
- fn handleDeps()
- fn handleHtmlOutput()
- fn nodeCount()
- fn openInBrowser()
- fn handleWatch()
- fn intervalMs()
- fn regenerate()
- fn nodeCount()
- fn cleanup()
- fn handleStats()
- fn handleHelp()
- fn handleSummary()
- fn run()
- exports = {

### `.aiox-core/core/graph-dashboard/data-sources/code-intel-source.js` — 234 linhas
- fn _classifyScript()
- fn _detectCategory()
- fn path()
- class CodeIntelSource
- exports = { CodeIntelSource, _classifyScript, _detectCategory };

### `.aiox-core/core/graph-dashboard/renderers/stats-renderer.js` — 217 linhas
- fn renderStats()
- fn _renderEntityTable()
- fn _renderCachePerformance()
- fn hitPct()
- fn missPct()
- fn _generateSparkline()
- fn _renderLatencyChart()
- fn _timeAgo()
- exports = {

### `.aiox-core/core/graph-dashboard/renderers/status-renderer.js` — 125 linhas
- fn renderStatus()
- fn _renderHeader()
- fn _renderProviderLine()
- fn _renderCircuitBreaker()
- fn _renderFailures()
- fn _renderCacheEntries()
- fn entries()
- fn _renderUptime()
- exports = {

### `.aiox-core/core/graph-dashboard/renderers/tree-renderer.js` — 119 linhas
- fn renderTree()
- fn _buildDepsMap()
- fn _groupByCategory()
- exports = {

### `.aiox-core/core/graph-dashboard/data-sources/registry-source.js` — 106 linhas
- class RegistrySource
- exports = { RegistrySource };

### `.aiox-core/core/graph-dashboard/data-sources/metrics-source.js` — 95 linhas
- class MetricsSource
- exports = { MetricsSource };

### `.aiox-core/core/graph-dashboard/formatters/mermaid-formatter.js` — 59 linhas
- fn formatAsMermaid()
- fn _safeId()
- fn _escapeMermaid()
- exports = { formatAsMermaid, _safeId, _escapeMermaid };

### `.aiox-core/core/graph-dashboard/formatters/dot-formatter.js` — 45 linhas
- fn formatAsDot()
- fn _escapeDot()
- exports = { formatAsDot, _escapeDot };

### `.aiox-core/core/graph-dashboard/index.js` — 21 linhas
- fn getGraphData()
- exports = {

### `.aiox-core/core/graph-dashboard/formatters/json-formatter.js` — 13 linhas
- fn formatAsJson()
- exports = { formatAsJson };

## `.aiox-core/core/health-check/` — 50 arquivos · 8.267 linhas

### `.aiox-core/core/health-check/engine.js` — 405 linhas
- class ResultCache
- class HealthCheckEngine
- exports = HealthCheckEngine;

### `.aiox-core/core/health-check/index.js` — 375 linhas
- class HealthCheck
- exports = {

### `.aiox-core/core/health-check/healers/backup-manager.js` — 338 linhas
- class BackupManager
- exports = BackupManager;

### `.aiox-core/core/health-check/reporters/console.js` — 329 linhas
- class ConsoleReporter
- exports = ConsoleReporter;

### `.aiox-core/core/health-check/healers/index.js` — 328 linhas
- class HealerManager
- exports = HealerManager;

### `.aiox-core/core/health-check/reporters/markdown.js` — 321 linhas
- class MarkdownReporter
- exports = MarkdownReporter;

### `.aiox-core/core/health-check/reporters/json.js` — 299 linhas
- class JSONReporter
- exports = JSONReporter;

### `.aiox-core/core/health-check/check-registry.js` — 251 linhas
- class CheckRegistry
- exports = CheckRegistry;

### `.aiox-core/core/health-check/checks/services/gemini-cli.js` — 239 linhas
- class GeminiCliCheck
- exports = GeminiCliCheck;

### `.aiox-core/core/health-check/base-check.js` — 222 linhas
- class BaseCheck
- exports = {

### `.aiox-core/core/health-check/checks/local/disk-space.js` — 212 linhas
- class DiskSpaceCheck
- exports = DiskSpaceCheck;

### `.aiox-core/core/health-check/checks/project/workflow-dependencies.js` — 212 linhas
- class WorkflowDependenciesCheck
- exports = WorkflowDependenciesCheck;

### `.aiox-core/core/health-check/checks/repository/gitignore.js` — 192 linhas
- class GitignoreCheck
- exports = GitignoreCheck;

### `.aiox-core/core/health-check/checks/project/task-definitions.js` — 190 linhas
- class TaskDefinitionsCheck
- exports = TaskDefinitionsCheck;

### `.aiox-core/core/health-check/checks/repository/large-files.js` — 181 linhas
- class LargeFilesCheck
- exports = LargeFilesCheck;

### `.aiox-core/core/health-check/checks/local/network.js` — 168 linhas
- class NetworkCheck
- exports = NetworkCheck;

### `.aiox-core/core/health-check/checks/services/api-endpoints.js` — 166 linhas
- class ApiEndpointsCheck
- exports = ApiEndpointsCheck;

### `.aiox-core/core/health-check/checks/project/agent-config.js` — 165 linhas
- class AgentConfigCheck
- exports = AgentConfigCheck;

### `.aiox-core/core/health-check/checks/project/node-version.js` — 161 linhas
- class NodeVersionCheck
- exports = NodeVersionCheck;

### `.aiox-core/core/health-check/checks/repository/git-repo.js` — 157 linhas
- class GitRepoCheck
- exports = GitRepoCheck;

### `.aiox-core/core/health-check/checks/local/git-install.js` — 156 linhas
- class GitInstallCheck
- exports = GitInstallCheck;

### `.aiox-core/core/health-check/checks/deployment/deployment-readiness.js` — 150 linhas
- class DeploymentReadinessCheck
- exports = DeploymentReadinessCheck;

### `.aiox-core/core/health-check/checks/repository/conflicts.js` — 150 linhas
- class ConflictsCheck
- exports = ConflictsCheck;

### `.aiox-core/core/health-check/checks/project/dependencies.js` — 148 linhas
- class DependenciesCheck
- exports = DependenciesCheck;

### `.aiox-core/core/health-check/checks/local/npm-install.js` — 147 linhas
- class NpmInstallCheck
- exports = NpmInstallCheck;

### `.aiox-core/core/health-check/checks/repository/git-status.js` — 147 linhas
- class GitStatusCheck
- exports = GitStatusCheck;

### `.aiox-core/core/health-check/checks/local/ide-detection.js` — 146 linhas
- class IdeDetectionCheck
- exports = IdeDetectionCheck;

### `.aiox-core/core/health-check/checks/repository/commit-history.js` — 142 linhas
- class CommitHistoryCheck
- exports = CommitHistoryCheck;

### `.aiox-core/core/health-check/checks/repository/lockfile-integrity.js` — 142 linhas
- class LockfileIntegrityCheck
- exports = LockfileIntegrityCheck;

### `.aiox-core/core/health-check/checks/project/aiox-directory.js` — 141 linhas
- class AioxDirectoryCheck
- exports = AioxDirectoryCheck;

### `.aiox-core/core/health-check/checks/services/claude-code.js` — 137 linhas
- class ClaudeCodeCheck
- exports = ClaudeCodeCheck;

### `.aiox-core/core/health-check/checks/local/memory.js` — 136 linhas
- class MemoryCheck
- exports = MemoryCheck;

### `.aiox-core/core/health-check/checks/local/environment-vars.js` — 134 linhas
- class EnvironmentVarsCheck
- exports = EnvironmentVarsCheck;

### `.aiox-core/core/health-check/checks/project/framework-config.js` — 131 linhas
- class FrameworkConfigCheck
- exports = FrameworkConfigCheck;

### `.aiox-core/core/health-check/checks/deployment/ci-config.js` — 123 linhas
- class CiConfigCheck
- exports = CiConfigCheck;

### `.aiox-core/core/health-check/checks/services/mcp-integration.js` — 123 linhas
- class McpIntegrationCheck
- exports = McpIntegrationCheck;

### `.aiox-core/core/health-check/checks/deployment/docker-config.js` — 120 linhas
- class DockerConfigCheck
- exports = DockerConfigCheck;

### `.aiox-core/core/health-check/checks/local/shell-environment.js` — 118 linhas
- class ShellEnvironmentCheck
- fn pathDirs()
- exports = ShellEnvironmentCheck;

### `.aiox-core/core/health-check/checks/services/github-cli.js` — 115 linhas
- class GithubCliCheck
- exports = GithubCliCheck;

### `.aiox-core/core/health-check/reporters/index.js` — 115 linhas
- class ReporterManager
- exports = ReporterManager;

### `.aiox-core/core/health-check/checks/deployment/build-config.js` — 109 linhas
- class BuildConfigCheck
- exports = BuildConfigCheck;

### `.aiox-core/core/health-check/checks/deployment/env-file.js` — 109 linhas
- class EnvFileCheck
- exports = EnvFileCheck;

### `.aiox-core/core/health-check/checks/project/package-json.js` — 105 linhas
- class PackageJsonCheck
- exports = PackageJsonCheck;

### `.aiox-core/core/health-check/checks/repository/branch-protection.js` — 105 linhas
- class BranchProtectionCheck
- exports = BranchProtectionCheck;

### `.aiox-core/core/health-check/checks/index.js` — 54 linhas
- exports = {

### `.aiox-core/core/health-check/checks/local/index.js` — 33 linhas
- exports = {

### `.aiox-core/core/health-check/checks/project/index.js` — 33 linhas
- exports = {

### `.aiox-core/core/health-check/checks/repository/index.js` — 33 linhas
- exports = {

### `.aiox-core/core/health-check/checks/deployment/index.js` — 27 linhas
- exports = {

### `.aiox-core/core/health-check/checks/services/index.js` — 27 linhas
- exports = {

## `.aiox-core/core/ideation/` — 1 arquivos · 855 linhas

### `.aiox-core/core/ideation/ideation-engine.js` — 855 linhas
- fn recordGotchasMemoryLoadError()
- class IdeationEngine
- class PerformanceAnalyzer
- class SecurityAnalyzer
- class CodeQualityAnalyzer
- class UXAnalyzer
- class ArchitectureAnalyzer
- fn circularCount()
- exports = IdeationEngine;

## `.aiox-core/core/ids/` — 15 arquivos · 4.718 linhas

### `.aiox-core/core/ids/registry-healer.js` — 866 linhas
- fn daysSince()
- fn buildEntityIndex()
- class RegistryHealer
- exports = {

### `.aiox-core/core/ids/registry-updater.js` — 819 linhas
- class RegistryUpdater
- exports = {

### `.aiox-core/core/ids/incremental-decision-engine.js` — 651 linhas
- class IncrementalDecisionEngine
- fn entityKeywords()
- fn reusageCount()
- fn daysSince()
- exports = {

### `.aiox-core/core/ids/framework-governor.js` — 565 linhas
- class FrameworkGovernor
- exports = { FrameworkGovernor, TIMEOUT_MS, RISK_THRESHOLDS };

### `.aiox-core/core/ids/registry-loader.js` — 310 linhas
- class RegistryLoader
- exports = { RegistryLoader, DEFAULT_REGISTRY_PATH, EMPTY_REGISTRY };

### `.aiox-core/core/ids/verification-gate.js` — 306 linhas
- fn createGateResult()
- class VerificationGate
- exports = {

### `.aiox-core/core/ids/gates/g3-story-validation.js` — 166 linhas
- class G3StoryValidationGate
- fn duplicates()
- fn otherOpportunities()
- exports = { G3StoryValidationGate };

### `.aiox-core/core/ids/index.js` — 162 linhas
- fn daysSince()
- fn buildEntityIndex()
- exports = {

### `.aiox-core/core/ids/circuit-breaker.js` — 161 linhas
- class CircuitBreaker
- exports = {

### `.aiox-core/core/ids/gates/g4-dev-context.js` — 155 linhas
- class G4DevContextGate
- fn opportunities()
- exports = { G4DevContextGate, G4_DEFAULT_TIMEOUT_MS };

### `.aiox-core/core/ids/gates/g5-semantic-handshake.js` — 137 linhas
- class G5SemanticHandshakeGate
- exports = {

### `.aiox-core/core/ids/gates/g2-story-creation.js` — 133 linhas
- class G2StoryCreationGate
- fn taskMatches()
- fn templateMatches()
- exports = { G2StoryCreationGate };

### `.aiox-core/core/ids/README.md` — 121 linhas
- # IDS: Entity Registry Foundation
-   ## Schema
-     ### Structure
-     ### Adaptability Scores
-   ## RegistryLoader API
-     ### Methods
-     ### Examples
-   ## Population Script
-     ### Current Stats
-   ## Scalability

### `.aiox-core/core/ids/gates/g1-epic-creation.js` — 101 linhas
- class G1EpicCreationGate
- fn opportunities()
- exports = { G1EpicCreationGate };

### `.aiox-core/core/ids/layer-classifier.js` — 65 linhas
- fn classifyLayer()
- exports = { classifyLayer, LAYER_RULES };

## `.aiox-core/core/index.esm.js/` — 1 arquivos · 42 linhas

### `.aiox-core/core/index.esm.js` — 42 linhas
- *(sem estrutura extraível)*

## `.aiox-core/core/index.js/` — 1 arquivos · 100 linhas

### `.aiox-core/core/index.js` — 100 linhas
- exports = {

## `.aiox-core/core/manifest/` — 2 arquivos · 815 linhas

### `.aiox-core/core/manifest/manifest-validator.js` — 429 linhas
- fn parseCSV()
- fn parseCSVContent()
- fn parseCSVLine()
- class ManifestValidator
- fn createManifestValidator()
- exports = {

### `.aiox-core/core/manifest/manifest-generator.js` — 386 linhas
- fn escapeCSV()
- fn parseYAMLFromMarkdown()
- fn extractAgentSection()
- class ManifestGenerator
- fn createManifestGenerator()
- exports = {

## `.aiox-core/core/mcp/` — 5 arquivos · 1.344 linhas

### `.aiox-core/core/mcp/symlink-manager.js` — 413 linhas
- fn getProjectMcpPath()
- fn isLink()
- fn isWindowsJunction()
- fn getLinkTarget()
- fn getWindowsJunctionTarget()
- fn checkLinkStatus()
- fn createLink()
- fn removeLink()
- exports = {

### `.aiox-core/core/mcp/global-config-manager.js` — 369 linhas
- fn globalDirExists()
- fn globalMcpDirExists()
- fn globalConfigExists()
- fn createGlobalStructure()
- fn createGlobalConfig()
- fn readGlobalConfig()
- fn writeGlobalConfig()
- fn addServer()
- fn removeServer()
- fn setServerEnabled()
- fn listServers()
- fn getAvailableTemplates()
- fn getServerTemplate()
- exports = {

### `.aiox-core/core/mcp/config-migrator.js` — 340 linhas
- fn detectProjectConfig()
- fn analyzeMigration()
- fn mergeServers()
- fn executeMigration()
- fn restoreFromBackup()
- exports = {

### `.aiox-core/core/mcp/os-detector.js` — 188 linhas
- fn detectOS()
- fn isWindows()
- fn isMacOS()
- fn isLinux()
- fn isUnix()
- fn getHomeDir()
- fn getGlobalAioxDir()
- fn getGlobalMcpDir()
- fn getGlobalConfigPath()
- fn getServersDir()
- fn getCacheDir()
- fn getCredentialsDir()
- fn getOSInfo()
- fn hasWindowsSymlinkSupport()
- fn getLinkType()
- exports = {

### `.aiox-core/core/mcp/index.js` — 34 linhas
- exports = {

## `.aiox-core/core/memory/` — 2 arquivos · 1.437 linhas

### `.aiox-core/core/memory/gotchas-memory.js` — 1184 linhas
- class GotchasMemory
- fn severityDiff()
- fn lower()
- exports = {

### `.aiox-core/core/memory/__tests__/active-modules.verify.js` — 253 linhas
- fn test()
- fn assertEqual()
- fn assertTrue()
- fn assertDefined()

## `.aiox-core/core/migration/` — 2 arquivos · 172 linhas

### `.aiox-core/core/migration/module-mapping.yaml` — 89 linhas
- version:
- mapping:
-   core:
-   development:
-   product:
-   infrastructure:
- import_transforms:
-   patterns:
-   file_extensions:
- exclusions:
-   files:
-   directories:
- cleanup:
-   removeEmptyDirs:
-   removeOldStructure:
-   preserveGitHistory:

### `.aiox-core/core/migration/migration-config.yaml` — 83 linhas
- version:
- story:
- migrations:
- backup:
-   prefix:
-   format:
-   include:
-   exclude:
-   verification:
- modules:
-   core:
-   development:
-   product:
-   infrastructure:
- validation:
-   structure:
-   imports:
-   lint:
-   tests:
-   timeout:
- safety:
-   requireBackup:
-   verifyBackup:
-   confirmBeforeExecute:
-   atomicOperations:

## `.aiox-core/core/orchestration/` — 39 arquivos · 19.933 linhas

### `.aiox-core/core/orchestration/master-orchestrator.js` — 1633 linhas
- class MasterOrchestrator
- class StubEpicExecutor
- exports = MasterOrchestrator;

### `.aiox-core/core/orchestration/workflow-executor.js` — 1222 linhas
- class WorkflowExecutor
- fn createWorkflowExecutor()
- fn executeDevelopmentCycle()
- exports = {

### `.aiox-core/core/orchestration/bob-orchestrator.js` — 1049 linhas
- class BobOrchestrator
- exports = {

### `.aiox-core/core/orchestration/terminal-spawner.js` — 1043 linhas
- fn detectEnvironment()
- fn getScriptPath()
- fn validateArgs()
- fn createContextFile()
- fn pollForOutput()
- fn sleep()
- fn spawnInline()
- fn spawnAgent()
- fn isSpawnerAvailable()
- fn getPlatform()
- fn cleanupOldFiles()
- fn getSystemInfo()
- fn generateCompatibilityReport()
- fn formatCompatibilityReport()
- fn registerLockFile()
- fn unregisterLockFile()
- fn registerChildProcess()
- fn cleanupLocks()
- fn terminateChildProcesses()
- fn cleanupHandler()
- exports = {

### `.aiox-core/core/orchestration/workflow-orchestrator.js` — 906 linhas
- class WorkflowOrchestrator
- exports = WorkflowOrchestrator;

### `.aiox-core/core/orchestration/greenfield-handler.js` — 903 linhas
- class GreenfieldHandler
- exports = {

### `.aiox-core/core/orchestration/recovery-handler.js` — 902 linhas
- class RecoveryHandler
- fn attemptCount()
- fn attempts()
- exports = {

### `.aiox-core/core/orchestration/session-state.js` — 902 linhas
- class SessionState
- fn minutesSinceUpdate()
- fn createSessionState()
- fn sessionStateExists()
- fn loadSessionState()
- exports = {

### `.aiox-core/core/orchestration/brownfield-handler.js` — 755 linhas
- class BrownfieldHandler
- exports = {

### `.aiox-core/core/orchestration/context-manager.js` — 646 linhas
- fn mergeMetadata()
- fn describeMetadataInput()
- class ContextManager
- exports = ContextManager;

### `.aiox-core/core/orchestration/agent-invoker.js` — 611 linhas
- class AgentInvoker
- exports = {

### `.aiox-core/core/orchestration/tech-stack-detector.js` — 599 linhas
- class TechStackDetector
- exports = TechStackDetector;

### `.aiox-core/core/orchestration/cli-commands.js` — 580 linhas
- fn orchestrate()
- fn orchestrateDryRun()
- fn orchestrateStatus()
- fn errorCount()
- fn orchestrateStop()
- fn orchestrateResume()
- fn setupEventHandlers()
- fn displayResult()
- fn formatState()
- fn formatEpicStatus()
- fn formatProgress()
- fn formatDate()
- fn calculateProgress()
- exports = {

### `.aiox-core/core/orchestration/dashboard-integration.js` — 519 linhas
- class DashboardIntegration
- exports = {

### `.aiox-core/core/orchestration/gate-evaluator.js` — 515 linhas
- class GateEvaluator
- fn criticalErrors()
- exports = {

### `.aiox-core/core/orchestration/bob-status-writer.js` — 481 linhas
- fn createDefaultBobStatus()
- class BobStatusWriter
- exports = {

### `.aiox-core/core/orchestration/condition-evaluator.js` — 432 linhas
- class ConditionEvaluator
- exports = ConditionEvaluator;

### `.aiox-core/core/orchestration/executor-assignment.js` — 412 linhas
- fn detectStoryType()
- fn assignExecutor()
- fn assignExecutorFromContent()
- fn validateExecutorAssignment()
- fn getStoryTypes()
- fn getStoryTypeConfig()
- fn getExecutorWorkTypes()
- exports = {

### `.aiox-core/core/orchestration/surface-checker.js` — 403 linhas
- class SurfaceChecker
- fn createSurfaceChecker()
- fn shouldSurface()
- exports = {

### `.aiox-core/core/orchestration/epic-context-accumulator.js` — 396 linhas
- fn estimateTokens()
- fn getCompressionLevel()
- fn buildFileIndex()
- fn hasFileOverlap()
- fn truncateToTokens()
- fn formatStoryEntry()
- class EpicContextAccumulator
- fn createEpicContextAccumulator()
- exports = {

### `.aiox-core/core/orchestration/data-lifecycle-manager.js` — 369 linhas
- class DataLifecycleManager
- fn ageInDays()
- fn createDataLifecycleManager()
- fn runStartupCleanup()
- exports = {

### `.aiox-core/core/orchestration/subagent-prompt-builder.js` — 368 linhas
- class SubagentPromptBuilder
- exports = SubagentPromptBuilder;

### `.aiox-core/core/orchestration/skill-dispatcher.js` — 363 linhas
- class SkillDispatcher
- exports = SkillDispatcher;

### `.aiox-core/core/orchestration/fast-path-gate.js` — 356 linhas
- fn clonePatternDefinition()
- fn getStructuredFileExtensions()
- fn getAutomationPatterns()
- fn getRiskPatterns()
- fn parseBoolean()
- fn normalizeConfig()
- fn clamp01()
- fn positiveInteger()
- fn normalizeTask()
- fn normalizePathExtension()
- fn collectSignals()
- fn getTaskText()
- fn scoreFastPath()
- fn chooseMode()
- fn buildActions()
- fn evaluateFastPath()
- fn parallelizable()
- exports = {

### `.aiox-core/core/orchestration/lock-manager.js` — 346 linhas
- class LockManager
- fn ttlMs()
- exports = LockManager;

### `.aiox-core/core/orchestration/executors/epic-5-executor.js` — 328 linhas
- class Epic5Executor
- exports = Epic5Executor;

### `.aiox-core/core/orchestration/checklist-runner.js` — 327 linhas
- class ChecklistRunner
- exports = ChecklistRunner;

### `.aiox-core/core/orchestration/index.js` — 325 linhas
- exports = {

### `.aiox-core/core/orchestration/message-formatter.js` — 279 linhas
- class MessageFormatter
- fn createMessageFormatter()
- exports = {

### `.aiox-core/core/orchestration/bob-surface-criteria.yaml` — 271 linhas
- version:
- description:
- criteria:
-   cost_threshold:
- actions:
-   confirm_before_proceed:
-   present_and_ask_go_nogo:
-   present_options_with_tradeoffs:
-   pause_and_ask_help:
-   always_confirm:
-   confirm_scope_expansion:
- evaluation_order:
- metadata:
-   author:
-   story:
-   epic:
-   created_date:
-   prd_reference:
-   tags:

### `.aiox-core/core/orchestration/executors/epic-4-executor.js` — 268 linhas
- class Epic4Executor
- exports = Epic4Executor;

### `.aiox-core/core/orchestration/executors/epic-6-executor.js` — 264 linhas
- class Epic6Executor
- exports = Epic6Executor;

### `.aiox-core/core/orchestration/executors/epic-executor.js` — 237 linhas
- class EpicExecutor
- exports = EpicExecutor;

### `.aiox-core/core/orchestration/parallel-executor.js` — 225 linhas
- class ParallelExecutor
- exports = ParallelExecutor;

### `.aiox-core/core/orchestration/executors/epic-3-executor.js` — 221 linhas
- class Epic3Executor
- exports = Epic3Executor;

### `.aiox-core/core/orchestration/gemini-model-selector.js` — 161 linhas
- class GeminiModelSelector
- fn proOnlyCost()
- exports = { GeminiModelSelector, MODELS, AGENT_OVERRIDES };

### `.aiox-core/core/orchestration/task-complexity-classifier.js` — 123 linhas
- class TaskComplexityClassifier
- fn description()
- exports = { TaskComplexityClassifier, COMPLEXITY_INDICATORS };

### `.aiox-core/core/orchestration/execution-profile-resolver.js` — 107 linhas
- fn normalizeProfile()
- fn normalizeContext()
- fn resolveExecutionProfile()
- exports = {

### `.aiox-core/core/orchestration/executors/index.js` — 86 linhas
- fn createExecutor()
- fn hasExecutor()
- fn getAvailableEpics()
- exports = {

## `.aiox-core/core/permissions/` — 4 arquivos · 1.096 linhas

### `.aiox-core/core/permissions/operation-guard.js` — 395 linhas
- class OperationGuard
- exports = { OperationGuard };

### `.aiox-core/core/permissions/__tests__/permission-mode.test.js` — 292 linhas
- *(sem estrutura extraível)*

### `.aiox-core/core/permissions/permission-mode.js` — 270 linhas
- class PermissionMode
- fn nextIndex()
- exports = { PermissionMode };

### `.aiox-core/core/permissions/index.js` — 139 linhas
- fn createGuard()
- fn checkOperation()
- fn getModeBadge()
- fn setMode()
- fn cycleMode()
- fn enforcePermission()
- exports = {

## `.aiox-core/core/pro/` — 1 arquivos · 640 linhas

### `.aiox-core/core/pro/pro-updater.js` — 640 linhas
- fn detectPackageManager()
- fn fetchLatestFromNpm()
- fn resolveInstalledPro()
- fn readProjectPackageJson()
- fn buildNodeModulesPackageJsonPath()
- fn detectCorePackageName()
- fn assertValidProjectRoot()
- fn getCoreVersion()
- fn satisfiesPeer()
- fn loadInstallerScaffolder()
- fn applyScaffoldStep()
- fn buildInstallCmd()
- fn updatePro()
- fn runScaffold()
- fn formatUpdateResult()
- exports = {

## `.aiox-core/core/quality-gates/` — 10 arquivos · 3.664 linhas

### `.aiox-core/core/quality-gates/quality-gate-manager.js` — 601 linhas
- class QualityGateManager
- exports = { QualityGateManager };

### `.aiox-core/core/quality-gates/notification-manager.js` — 550 linhas
- class NotificationManager
- exports = { NotificationManager };

### `.aiox-core/core/quality-gates/human-review-orchestrator.js` — 529 linhas
- class HumanReviewOrchestrator
- fn areaCount()
- fn nextIndex()
- exports = { HumanReviewOrchestrator };

### `.aiox-core/core/quality-gates/layer2-pr-automation.js` — 383 linhas
- class Layer2PRAutomation
- exports = { Layer2PRAutomation };

### `.aiox-core/core/quality-gates/focus-area-recommender.js` — 359 linhas
- class FocusAreaRecommender
- exports = { FocusAreaRecommender };

### `.aiox-core/core/quality-gates/layer3-human-review.js` — 348 linhas
- class Layer3HumanReview
- fn nextIndex()
- exports = { Layer3HumanReview };

### `.aiox-core/core/quality-gates/layer1-precommit.js` — 336 linhas
- class Layer1PreCommit
- exports = { Layer1PreCommit };

### `.aiox-core/core/quality-gates/checklist-generator.js` — 329 linhas
- class ChecklistGenerator
- exports = { ChecklistGenerator };

### `.aiox-core/core/quality-gates/base-layer.js` — 134 linhas
- class BaseLayer
- exports = { BaseLayer };

### `.aiox-core/core/quality-gates/quality-gate-config.yaml` — 95 linhas
- version:
- layer1:
-   enabled:
-   failFast:
-   checks:
- layer2:
-   enabled:
-   coderabbit:
-   quinn:
- layer3:
-   enabled:
-   requireSignoff:
-   assignmentStrategy:
-   defaultReviewer:
-   checklist:
-   signoff:
- reports:
-   location:
-   format:
-   retention:
-   includeMetrics:
- status:
-   location:
-   updateOnChange:
- verbose:
-   enabled:
-   showCommands:
-   showOutput:
-   showTimings:

## `.aiox-core/core/README.md/` — 1 arquivos · 229 linhas

### `.aiox-core/core/README.md` — 229 linhas
- # AIOX Core Module
-   ## Overview
-   ## Installation
-   ## Module Structure
-   ## API Reference
-     ### Configuration
-       #### `ConfigCache` / `globalConfigCache`
-       #### `loadAgentConfig(agentId)`
-       #### `loadConfigSections(sections)`
-     ### Session Management
-       #### `ContextDetector`
-       #### `SessionContextLoader`
-     ### Elicitation System
-       #### `ElicitationEngine`
-       #### `ElicitationSessionManager`
-       #### Elicitation Steps
-     ### Utilities
-       #### `YAMLValidator`
-       #### `PersonalizedOutputFormatter`
-   ## Exports Summary
-   ## Regression Tests
-   ## Dependencies
-   ## Migration Notes

## `.aiox-core/core/registry/` — 6 arquivos · 7.969 linhas

### `.aiox-core/core/registry/service-registry.json` — 6466 linhas
- version:
- generated:
- totalWorkers:
- categories:
- workers:

### `.aiox-core/core/registry/build-registry.js` — 452 linhas
- fn toKebabId()
- fn toTitleCase()
- fn extractMarkdownDescription()
- fn extractJSDescription()
- fn extractTags()
- fn extractAgents()
- fn getExecutorTypes()
- fn estimatePerformance()
- fn buildWorkerEntry()
- fn buildCategorySummary()
- fn getCategoryDescription()
- fn buildRegistry()
- fn saveRegistry()
- fn main()
- exports = {

### `.aiox-core/core/registry/registry-loader.js` — 366 linhas
- fn uniquePaths()
- fn getDefaultRegistryPaths()
- fn readRegistryFile()
- class ServiceRegistry
- fn getRegistry()
- fn loadRegistry()
- exports = {

### `.aiox-core/core/registry/validate-registry.js` — 340 linhas
- fn runSmokeTests()
- fn validateFields()
- fn main()
- exports = {

### `.aiox-core/core/registry/README.md` — 179 linhas
- # AIOX Service Registry
-   ## Overview
-   ## Files
-   ## Quick Start
-     ### Loading the Registry
-     ### Querying Workers
-     ### Registry Info
-   ## Building the Registry
-   ## Validating the Registry
-     ### Smoke Tests
-   ## Worker Entry Schema
-   ## Caching
-   ## Categories
-   ## Integration
-   ## Story Reference

### `.aiox-core/core/registry/registry-schema.json` — 166 linhas
- $schema:
- $id:
- title:
- description:
- type:
- required:
- properties:
- definitions:

## `.aiox-core/core/resilience/` — 3 arquivos · 711 linhas

### `.aiox-core/core/resilience/agent-immortality.js` — 666 linhas
- fn nextId()
- fn ensureDir()
- fn readJsonArray()
- fn writeJsonAtomic()
- fn quarantineJsonFile()
- fn sleepSync()
- fn removeStaleLock()
- fn acquireFileLock()
- fn releaseFileLock()
- fn withFileLock()
- fn cloneValue()
- fn truncate()
- fn normalizeError()
- fn diagnoseCause()
- fn normalizeState()
- fn buildLegacy()
- fn suggestPivot()
- fn generateDirectives()
- fn buildReincarnationContext()
- class StateCommitLog
- class EvolutionLog
- class ReincarnationQueue
- class AutopsyEngine
- class AgentImmortalityProtocol
- exports = AgentImmortalityProtocol;

### `.aiox-core/core/resilience/README.md` — 38 linhas
- # AIOX Resilience
-   ## Agent Immortality Protocol

### `.aiox-core/core/resilience/index.js` — 7 linhas
- exports = {

## `.aiox-core/core/session/` — 2 arquivos · 669 linhas

### `.aiox-core/core/session/context-loader.js` — 442 linhas
- class SessionContextLoader
- exports = SessionContextLoader;

### `.aiox-core/core/session/context-detector.js` — 227 linhas
- class ContextDetector
- exports = ContextDetector;

## `.aiox-core/core/synapse/` — 39 arquivos · 7.178 linhas

### `.aiox-core/core/synapse/output/formatter.js` — 561 linhas
- fn formatContextBracket()
- fn formatConstitution()
- fn formatAgent()
- fn formatWorkflow()
- fn formatTask()
- fn formatSquad()
- fn formatKeyword()
- fn formatStarCommands()
- fn formatMemoryHints()
- fn formatDevmode()
- fn formatSummary()
- fn source()
- fn enforceTokenBudget()
- fn formatSynapseRules()
- exports = {

### `.aiox-core/core/synapse/context/semantic-handshake-engine.js` — 555 linhas
- fn escapeRegExp()
- fn normalizeSeverity()
- fn normalizeType()
- fn cloneValue()
- fn normalizePattern()
- fn normalizePatterns()
- fn patternMatches()
- fn findPatternMatches()
- fn normalizeContent()
- fn normalizeFiles()
- fn buildCodeContext()
- class SemanticHandshakeEngine
- exports = {

### `.aiox-core/core/synapse/context/hierarchical-context-manager.js` — 532 linhas
- fn isPositiveNumber()
- fn normalizeThreshold()
- fn cloneValue()
- fn normalizeContent()
- fn normalizeTokenCount()
- fn buildDefaultSummary()
- class HierarchicalContextManager
- exports = {

### `.aiox-core/core/synapse/diagnostics/report-formatter.js` — 484 linhas
- fn formatReport()
- fn _extractAgentId()
- fn _bracketNeedsMemory()
- fn _collectGaps()
- fn _formatTimingSection()
- fn _formatQualitySection()
- fn _formatConsistencySection()
- fn _formatOutputSection()
- fn _formatRelevanceSection()
- exports = { formatReport };

### `.aiox-core/core/synapse/engine.js` — 440 linhas
- fn loadLayerModule()
- class PipelineMetrics
- fn getLayerError()
- class SynapseEngine
- fn safeProcessConfig()
- fn promptCount()
- exports = {

### `.aiox-core/core/synapse/session/session-manager.js` — 404 linhas
- fn buildDefaultSession()
- fn resolveSessionFile()
- fn ensureDir()
- fn ensureGitignore()
- fn createSession()
- fn loadSession()
- fn updateSession()
- fn mergeHistory()
- fn deleteSession()
- fn cleanStaleSessions()
- fn generateTitle()
- exports = {

### `.aiox-core/core/synapse/domain/domain-loader.js` — 322 linhas
- fn parseManifest()
- fn loadDomainFile()
- fn isExcluded()
- fn matchKeywords()
- fn extractDomainInfo()
- fn domainNameToFile()
- fn parseCommaSeparated()
- exports = {

### `.aiox-core/core/synapse/context/context-tracker.js` — 296 linhas
- fn cloneModelConfig()
- fn cacheModelConfig()
- fn isPositiveFiniteNumber()
- fn resolveConfigRoot()
- fn getModelConfig()
- fn calculateBracket()
- fn estimateContextPercent()
- fn getTokenBudget()
- fn getActiveLayers()
- fn needsHandoffWarning()
- fn needsMemoryHints()
- fn resetModelConfigCache()
- exports = {

### `.aiox-core/core/synapse/diagnostics/collectors/quality-collector.js` — 252 linhas
- fn _getGrade()
- fn _getGradeLabel()
- fn collectQualityMetrics()
- fn _scoreUap()
- fn _scoreHook()
- exports = {

### `.aiox-core/core/synapse/layers/l5-squad.js` — 244 linhas
- class L5SquadProcessor
- exports = L5SquadProcessor;

### `.aiox-core/core/synapse/memory/memory-bridge.js` — 220 linhas
- class MemoryBridge
- exports = {

### `.aiox-core/core/synapse/scripts/generate-constitution.js` — 204 linhas
- fn cleanText()
- fn parseConstitution()
- fn extractRules()
- fn generateConstitution()
- fn main()
- exports = { parseConstitution, extractRules, generateConstitution, cleanText, main, ROMAN_TO_ARABIC };

### `.aiox-core/core/synapse/memory/synapse-memory-provider.js` — 201 linhas
- class SynapseMemoryProvider
- exports = {

### `.aiox-core/core/synapse/diagnostics/collectors/relevance-matrix.js` — 174 linhas
- fn collectRelevanceMatrix()
- fn agentId()
- fn _getRelevanceForAgent()
- fn _getComponentStatus()
- exports = {

### `.aiox-core/core/synapse/layers/l7-star-command.js` — 169 linhas
- class L7StarCommandProcessor
- exports = L7StarCommandProcessor;

### `.aiox-core/core/synapse/diagnostics/collectors/consistency-collector.js` — 168 linhas
- fn collectConsistencyMetrics()
- fn _checkBracket()
- fn _checkAgent()
- fn _checkTimestamp()
- fn _checkQuality()
- exports = { collectConsistencyMetrics, MAX_TIMESTAMP_GAP_MS };

### `.aiox-core/core/synapse/layers/l6-keyword.js` — 154 linhas
- class L6KeywordProcessor
- exports = L6KeywordProcessor;

### `.aiox-core/core/synapse/diagnostics/collectors/output-analyzer.js` — 134 linhas
- fn collectOutputAnalysis()
- fn _analyzeUapOutput()
- fn _analyzeHookOutput()
- exports = { collectOutputAnalysis, UAP_OUTPUT_EXPECTATIONS };

### `.aiox-core/core/synapse/diagnostics/collectors/hook-collector.js` — 129 linhas
- fn collectHookStatus()
- exports = { collectHookStatus };

### `.aiox-core/core/synapse/diagnostics/collectors/timing-collector.js` — 126 linhas
- fn collectTimingMetrics()
- fn _buildUapTiming()
- fn _buildHookTiming()
- exports = { collectTimingMetrics, LOADER_TIER_MAP, MAX_STALENESS_MS };

### `.aiox-core/core/synapse/runtime/hook-runtime.js` — 112 linhas
- fn getStaleSessionTTL()
- fn resolveHookRuntime()
- fn buildHookOutput()
- exports = {

### `.aiox-core/core/synapse/diagnostics/collectors/session-collector.js` — 102 linhas
- fn collectSessionStatus()
- fn _readJsonSafe()
- exports = { collectSessionStatus };

### `.aiox-core/core/synapse/layers/l1-global.js` — 102 linhas
- class L1GlobalProcessor
- exports = L1GlobalProcessor;

### `.aiox-core/core/synapse/diagnostics/synapse-diagnostics.js` — 95 linhas
- fn _safeCollect()
- fn _collectAll()
- fn runDiagnostics()
- fn runDiagnosticsRaw()
- exports = { runDiagnostics, runDiagnosticsRaw };

### `.aiox-core/core/synapse/layers/l2-agent.js` — 94 linhas
- class L2AgentProcessor
- exports = L2AgentProcessor;

### `.aiox-core/core/synapse/layers/l3-workflow.js` — 94 linhas
- class L3WorkflowProcessor
- exports = L3WorkflowProcessor;

### `.aiox-core/core/synapse/layers/layer-processor.js` — 94 linhas
- class LayerProcessor
- exports = LayerProcessor;

### `.aiox-core/core/synapse/diagnostics/collectors/uap-collector.js` — 83 linhas
- fn collectUapBridgeStatus()
- exports = { collectUapBridgeStatus };

### `.aiox-core/core/synapse/layers/l4-task.js` — 83 linhas
- class L4TaskProcessor
- exports = L4TaskProcessor;

### `.aiox-core/core/synapse/diagnostics/collectors/manifest-collector.js` — 82 linhas
- fn collectManifestIntegrity()
- exports = { collectManifestIntegrity };

### `.aiox-core/core/synapse/layers/l0-constitution.js` — 80 linhas
- class L0ConstitutionProcessor
- exports = L0ConstitutionProcessor;

### `.aiox-core/core/synapse/utils/atomic-write.js` — 79 linhas
- fn atomicWriteSync()
- exports = {

### `.aiox-core/core/synapse/diagnostics/collectors/pipeline-collector.js` — 75 linhas
- fn collectPipelineSimulation()
- exports = { collectPipelineSimulation };

### `.aiox-core/core/synapse/context/README.md` — 66 linhas
- # SYNAPSE Context Runtime
-   ## HierarchicalContextManager
-   ## SemanticHandshakeEngine

### `.aiox-core/core/synapse/utils/paths.js` — 57 linhas
- fn resolveSynapsePath()
- fn resolveDomainPath()
- exports = {

### `.aiox-core/core/synapse/context/context-builder.js` — 34 linhas
- fn buildLayerContext()
- exports = {

### `.aiox-core/core/synapse/diagnostics/collectors/safe-read-json.js` — 31 linhas
- fn safeReadJson()
- exports = { safeReadJson };

### `.aiox-core/core/synapse/utils/tokens.js` — 25 linhas
- fn estimateTokens()
- exports = { estimateTokens };

### `.aiox-core/core/synapse/context/index.js` — 21 linhas
- exports = {

## `.aiox-core/core/ui/` — 3 arquivos · 773 linhas

### `.aiox-core/core/ui/observability-panel.js` — 394 linhas
- fn createDefaultState()
- class ObservabilityPanel
- fn formatDuration()
- fn createPanel()
- exports = {

### `.aiox-core/core/ui/panel-renderer.js` — 337 linhas
- class PanelRenderer
- fn formatDuration()
- exports = {

### `.aiox-core/core/ui/index.js` — 42 linhas
- exports = {

## `.aiox-core/core/utils/` — 3 arquivos · 1.048 linhas

### `.aiox-core/core/utils/yaml-validator.js` — 415 linhas
- class YAMLValidator
- fn validateYAML()
- exports = YAMLValidator;

### `.aiox-core/core/utils/security-utils.js` — 335 linhas
- fn validatePath()
- fn sanitizeInput()
- fn validateJSON()
- fn getObjectDepth()
- class RateLimiter
- fn safePath()
- fn isSafeString()
- exports = {

### `.aiox-core/core/utils/output-formatter.js` — 298 linhas
- class PersonalizedOutputFormatter
- exports = PersonalizedOutputFormatter;

## `.aiox-core/data/agent-config-requirements.yaml/` — 1 arquivos · 407 linhas

### `.aiox-core/data/agent-config-requirements.yaml` — 407 linhas
- agents:
-   aiox-master:
-   dev:
-   qa:
-   devops:
-   github-devops:
-   architect:
-   po:
-   sm:
-   data-engineer:
-   db-sage:
-   pm:
-   analyst:
-   ux-design-expert:
-   aiox-developer:
-   aiox-orchestrator:
-   squad-creator:
-   default:
- lazy_loading_strategy:
-   heavy_sections:
-   shared_files:
- performance_baseline:
-   dev:
-   aiox_master:
-   qa:
- cache_strategy:
-   ttl:
-   high_priority_files:
-   cache_invalidation_triggers:
-   expected_cache_hit_rate:
- … (+3 itens)

## `.aiox-core/data/aiox-kb.md/` — 1 arquivos · 916 linhas

### `.aiox-core/data/aiox-kb.md` — 916 linhas
- # AIOX Knowledge Base
-   ## Overview
-     ### Key Features
-     ### When to Use AIOX
-   ## How AIOX Works
-     ### The Core Method
-     ### The Two-Phase Approach
-       #### Phase 1: Planning (Web UI - Cost Effective)
-       #### Phase 2: Development (IDE - Implementation)
-     ### The Development Loop
-     ### Why This Works
-   ## Getting Started
-     ### Quick Start Options
-       #### Option 1: Web UI
-       #### Option 2: IDE Integration
-     ### Environment Selection Guide
-     ### IDE-Only Workflow Considerations
-   ## Core Configuration (core-config.yaml)
-     ### What is core-config.yaml?
-     ### Key Configuration Areas
-       #### PRD Configuration
-       #### Architecture Configuration
-       #### Developer Files
-     ### Why It Matters
-     ### Common Configurations
-   ## Core Philosophy
-     ### Vibe CEO'ing
-     ### Core Principles
-     ### Key Workflow Principles
-   ## Agent System
- … (+61 itens)

## `.aiox-core/data/capability-detection.js/` — 1 arquivos · 290 linhas

### `.aiox-core/data/capability-detection.js` — 290 linhas
- fn detectToolSearch()
- fn detectDeferLoading()
- fn detectProjectMcps()
- fn detectGlobalMcps()
- fn detectDockerGateway()
- fn loadToolRegistry()
- fn tier1()
- fn tier2()
- fn tier3()
- fn determineStrategy()
- fn run()
- exports = { run, detectToolSearch, detectProjectMcps, detectGlobalMcps, detectDockerGateway };

## `.aiox-core/data/entity-registry.yaml/` — 1 arquivos · 19.677 linhas

### `.aiox-core/data/entity-registry.yaml` — 19677 linhas
- metadata:
-   version:
-   lastUpdated:
-   entityCount:
-   checksumAlgorithm:
-   resolutionRate:
- entities:
-   tasks:
- categories:

## `.aiox-core/data/learned-patterns.yaml/` — 1 arquivos · 3 linhas

### `.aiox-core/data/learned-patterns.yaml` — 3 linhas
- version:
- lastUpdated:
- patterns:

## `.aiox-core/data/mcp-discipline.js/` — 1 arquivos · 166 linhas

### `.aiox-core/data/mcp-discipline.js` — 166 linhas
- fn loadCapabilities()
- fn loadMcpConfig()
- fn saveMcpConfig()
- fn backupConfig()
- fn getEssentialServers()
- fn apply()
- fn restore()
- fn enableServer()
- fn status()

## `.aiox-core/data/mcp-tool-examples.yaml/` — 1 arquivos · 215 linhas

### `.aiox-core/data/mcp-tool-examples.yaml` — 215 linhas
- version:
- metadata:
-   lastUpdated:
-   story:
-   adrs:
-   limits:
- tools:
-   context7:
-   git:
-   coderabbit:
-   browser:
-   supabase:
-   exa:
-   github-cli:
-   nogic:
-   code-graph:
-   docker-gateway:

## `.aiox-core/data/registry-update-log.jsonl/` — 1 arquivos · 2 linhas

### `.aiox-core/data/registry-update-log.jsonl` — 2 linhas
- (json inválido)

## `.aiox-core/data/tech-presets/` — 8 arquivos · 4.438 linhas

### `.aiox-core/data/tech-presets/nextjs-react.md` — 931 linhas
- # Next.js + React Tech Preset
-   ## Metadata
-   ## Design Patterns (The Essential 5)
-     ### Pattern 1: Contract Pattern
-     ### Pattern 2: Service Pattern
-     ### Pattern 3: Repository Pattern
-     ### Pattern 4: Event Bus Pattern (Observer)
-     ### Pattern 5: Builder Pattern (Tests Only)
-   ## Project Structure
-     ### Structure Rationale
-   ## Tech Stack
-     ### Required Dependencies
-   ## Coding Standards
-     ### Naming Conventions
-     ### Critical Rules
-     ### Next.js 16+ Proxy (substitui Middleware)
-     ### TypeScript Config
-   ## Testing Strategy
-     ### Test Pyramid
-     ### What to Test
-       #### Always Test (Critical)
-       #### Consider Testing
-       #### Never Test
-     ### Coverage Goals
-     ### Test Template
-   ## Token Economy Strategies
-     ### Strategy 1: Show, Don't Tell
-     ### Strategy 2: Reference Feature
-     ### Strategy 3: Schemas as Documentation
-     ### Strategy 4: Tests as Specifications
- … (+15 itens)

### `.aiox-core/data/tech-presets/angular-nestjs.md` — 807 linhas
- # Angular 21 + NestJS Tech Preset
-   ## Metadata
-   ## Design Patterns (The Essential 5)
-     ### Pattern 1: Contract Pattern (Shared DTOs)
-     ### Pattern 2: NestJS Module Pattern
-     ### Pattern 3: Angular Signals + Service Pattern
-     ### Pattern 4: NestJS Guard + Decorator Pattern
-     ### Pattern 5: Builder Pattern (Tests Only)
-   ## Project Structure
-   ## Tech Stack
-     ### Required Dependencies
-   ## Coding Standards
-     ### Naming Conventions
-     ### Critical Rules
-     ### Angular Signals — Padrões Críticos
-     ### NestJS Error Handling
-     ### TypeScript Config (ambos frontend e backend)
-   ## Testing Strategy
-     ### Test Pyramid
-     ### NestJS Unit Test Template
-     ### Angular Unit Test Template
-   ## Token Economy Strategies
-     ### Strategy 1: Mostrar o módulo de referência
-     ### Strategy 2: DTOs como documentação
-     ### Strategy 3: Testes como especificação
-   ## Bug Prevention Stack
-   ## Patterns to AVOID

### `.aiox-core/data/tech-presets/go.md` — 515 linhas
- # Go Tech Preset
-   ## Metadata
-   ## Design Patterns (The Essential 5)
-     ### Pattern 1: Port Interface Pattern
-     ### Pattern 2: Application Service Pattern
-     ### Pattern 3: Repository Pattern
-     ### Pattern 4: Worker + Channel Pattern
-     ### Pattern 5: Builder Pattern (Tests Only)
-   ## Project Structure
-     ### Structure Rationale
-   ## Tech Stack
-     ### Required Dependencies
-   ## Coding Standards
-     ### Naming Conventions
-     ### Critical Rules
-     ### Go Toolchain Baseline
-   ## Testing Strategy
-     ### Test Pyramid
-     ### What to Test
-       #### Always Test (Critical)
-       #### Consider Testing
-       #### Never Test
-     ### Coverage Goals
-     ### Test Template
-   ## Token Economy Strategies
-     ### Strategy 1: Reference by Package
-     ### Strategy 2: Tests as Spec
-     ### Strategy 3: Reuse DTO Contracts
-   ## Bug Prevention Stack
-   ## Patterns to AVOID
- … (+12 itens)

### `.aiox-core/data/tech-presets/java.md` — 499 linhas
- # Java Tech Preset
-   ## Metadata
-   ## Design Patterns (The Essential 5)
-     ### Pattern 1: Hexagonal Port Pattern
-     ### Pattern 2: Application Service Pattern
-     ### Pattern 3: Repository Adapter Pattern
-     ### Pattern 4: Domain Event Pattern
-     ### Pattern 5: Test Data Builder Pattern
-   ## Project Structure
-     ### Structure Rationale
-   ## Tech Stack
-     ### Required Dependencies
-   ## Coding Standards
-     ### Naming Conventions
-     ### Critical Rules
-     ### Spring Baseline
-   ## Testing Strategy
-     ### Test Pyramid
-     ### What to Test
-       #### Always Test (Critical)
-       #### Consider Testing
-       #### Never Test
-     ### Coverage Goals
-     ### Test Template
-   ## Token Economy Strategies
-     ### Strategy 1: Reuse Existing Adapter
-     ### Strategy 2: Contract-First Prompts
-     ### Strategy 3: Keep Framework at Edges
-   ## Bug Prevention Stack
-   ## Patterns to AVOID
- … (+12 itens)

### `.aiox-core/data/tech-presets/php.md` — 484 linhas
- # PHP Tech Preset
-   ## Metadata
-   ## Design Patterns (The Essential 5)
-     ### Pattern 1: Contract Interface Pattern
-     ### Pattern 2: Service / Action Pattern
-     ### Pattern 3: Repository Adapter Pattern
-     ### Pattern 4: Domain Event Pattern
-     ### Pattern 5: Factory/Builder Pattern (Tests Only)
-   ## Project Structure
-     ### Structure Rationale
-   ## Tech Stack
-     ### Required Dependencies
-   ## Coding Standards
-     ### Naming Conventions
-     ### Critical Rules
-     ### PHP Quality Baseline
-   ## Testing Strategy
-     ### Test Pyramid
-     ### What to Test
-       #### Always Test (Critical)
-       #### Consider Testing
-       #### Never Test
-     ### Coverage Goals
-     ### Test Template
-   ## Token Economy Strategies
-     ### Strategy 1: Action-First Instructions
-     ### Strategy 2: Reuse Form Request
-     ### Strategy 3: Feature Tests as Spec
-   ## Bug Prevention Stack
-   ## Patterns to AVOID
- … (+12 itens)

### `.aiox-core/data/tech-presets/rust.md` — 477 linhas
- # Rust Tech Preset
-   ## Metadata
-   ## Design Patterns (The Essential 5)
-     ### Pattern 1: Trait Contract Pattern
-     ### Pattern 2: Use Case Service Pattern
-     ### Pattern 3: Error Enum Pattern
-     ### Pattern 4: Tokio Task Supervisor Pattern
-     ### Pattern 5: Builder Pattern (Tests Only)
-   ## Project Structure
-     ### Structure Rationale
-   ## Tech Stack
-     ### Required Dependencies
-   ## Coding Standards
-     ### Naming Conventions
-     ### Critical Rules
-     ### Rust Quality Baseline
-   ## Testing Strategy
-     ### Test Pyramid
-     ### What to Test
-       #### Always Test (Critical)
-       #### Consider Testing
-       #### Never Test
-     ### Coverage Goals
-     ### Test Template
-   ## Token Economy Strategies
-     ### Strategy 1: Pass Trait + Test First
-     ### Strategy 2: Reuse Module Skeleton
-     ### Strategy 3: Keep Lifetimes Hidden Where Possible
-   ## Bug Prevention Stack
-   ## Patterns to AVOID
- … (+12 itens)

### `.aiox-core/data/tech-presets/csharp.md` — 468 linhas
- # C# Tech Preset
-   ## Metadata
-   ## Design Patterns (The Essential 5)
-     ### Pattern 1: Contract Interface Pattern
-     ### Pattern 2: Use Case Handler Pattern
-     ### Pattern 3: Repository Adapter Pattern
-     ### Pattern 4: Domain Event + Outbox Pattern
-     ### Pattern 5: Test Builder Pattern
-   ## Project Structure
-     ### Structure Rationale
-   ## Tech Stack
-     ### Required Dependencies
-   ## Coding Standards
-     ### Naming Conventions
-     ### Critical Rules
-     ### .NET Quality Baseline
-   ## Testing Strategy
-     ### Test Pyramid
-     ### What to Test
-       #### Always Test (Critical)
-       #### Consider Testing
-       #### Never Test
-     ### Coverage Goals
-     ### Test Template
-   ## Token Economy Strategies
-     ### Strategy 1: Command + Handler Focus
-     ### Strategy 2: Reuse Existing Layer Skeleton
-     ### Strategy 3: Infrastructure as Secondary Step
-   ## Bug Prevention Stack
-   ## Patterns to AVOID
- … (+12 itens)

### `.aiox-core/data/tech-presets/_template.md` — 257 linhas
- # Tech Preset Template
-   ## Metadata
-   ## Design Patterns
-     ### Pattern 1: [Nome do Pattern]
-   ## Project Structure
-     ### Structure Rationale
-   ## Tech Stack
-     ### Required Dependencies
-   ## Coding Standards
-     ### Naming Conventions
-     ### Critical Rules
-     ### Code Examples
-       #### Good Example
-       #### Bad Example
-   ## Testing Strategy
-     ### Test Pyramid
-     ### What to Test
-       #### Always Test (Critical)
-       #### Consider Testing
-       #### Never Test
-     ### Test File Template
-   ## File Templates
-     ### Template 1: [Name]
-     ### Template 2: [Name]
-   ## Error Handling
-     ### Error Handling Pattern
-     ### Common Errors and Solutions
-   ## Performance Guidelines
-     ### Do's
-     ### Don'ts
- … (+4 itens)

## `.aiox-core/data/technical-preferences.md/` — 1 arquivos · 88 linhas

### `.aiox-core/data/technical-preferences.md` — 88 linhas
- # User-Defined Preferred Patterns and Preferences
-   ## Tech Presets
-     ### Available Presets
-     ### How to Use Presets
-     ### Preset Contents
-   ## Active Preset
-   ## User Preferences
-     ### Preferred Technologies
-     ### Coding Style Preferences
-     ### Project-Specific Rules

## `.aiox-core/data/tok2-validation.js/` — 1 arquivos · 168 linhas

### `.aiox-core/data/tok2-validation.js` — 168 linhas
- fn check()
- fn run()

## `.aiox-core/data/tok3-token-comparison.js/` — 1 arquivos · 119 linhas

### `.aiox-core/data/tok3-token-comparison.js` — 119 linhas
- fn reduction()
- fn avgReduction()

## `.aiox-core/data/tool-registry.yaml/` — 1 arquivos · 648 linhas

### `.aiox-core/data/tool-registry.yaml` — 648 linhas
- version:
- metadata:
-   lastUpdated:
-   runtimeDetection:
-   layer:
-   description:
-   epic:
-   story:
- tools:
-   Read:
-   Write:
-   Edit:
-   Bash:
-   Grep:
-   Glob:
-   Task:
-   Skill:
-   WebSearch:
-   WebFetch:
-   NotebookEdit:
-   AskUserQuestion:
-   git:
-   github-cli:
-   coderabbit:
-   context7:
-   supabase:
-   supabase-cli:
-   browser:
-   clickup:
-   n8n:
- … (+34 itens)

## `.aiox-core/data/tool-search-validation.js/` — 1 arquivos · 174 linhas

### `.aiox-core/data/tool-search-validation.js` — 174 linhas
- fn parseKeywords()
- fn matchQuery()
- fn category()
- fn validate()
- exports = { validate };

## `.aiox-core/data/workflow-chains.yaml/` — 1 arquivos · 156 linhas

### `.aiox-core/data/workflow-chains.yaml` — 156 linhas
- workflows:

## `.aiox-core/data/workflow-patterns.yaml/` — 1 arquivos · 803 linhas

### `.aiox-core/data/workflow-patterns.yaml` — 803 linhas
- workflows:
-   story_development:
-   epic_creation:
-   backlog_management:
-   architecture_review:
-   git_workflow:
-   database_workflow:
-   code_quality_workflow:
-   documentation_workflow:
-   ux_workflow:
-   research_workflow:
-   bob_orchestration:
- state_integration:
-   description:
-   state_file_location:
-   state_file_schema:
-   manager_script:
-   behavior:
-   commands:
- cross_context:
-   description:
-   resolution_rules:

## `.aiox-core/data/workflow-state-schema.yaml/` — 1 arquivos · 202 linhas

### `.aiox-core/data/workflow-state-schema.yaml` — 202 linhas
- schema:
-   version:
- fields:
-   workflow_id:
-   workflow_name:
-   instance_id:
-   target_context:
-   squad_name:
-   started_at:
-   updated_at:
-   status:
-   current_phase:
-   current_step_index:
-   steps:
-   artifacts:
-   decisions:

## `.aiox-core/development/agent-teams/` — 5 arquivos · 211 linhas

### `.aiox-core/development/agent-teams/team-qa-focused.yaml` — 155 linhas
- bundle:
-   name:
-   icon:
-   description:
- agents:
- workflows:
- tasks:
- purpose:
- when_to_use:
- quality_gates:
-   pre_commit:
-   pre_pr:
-   pre_merge:
-   pre_deployment:
- coderabbit_integration:
-   enabled:
-   version:
-   severity_thresholds:
-   workflows_with_integration:
-   github_actions:
-   scripts:
-   report_directories:
- usage_example:
- notes:

### `.aiox-core/development/agent-teams/team-fullstack.yaml` — 18 linhas
- bundle:
-   name:
-   icon:
-   description:
- agents:
- workflows:

### `.aiox-core/development/agent-teams/team-all.yaml` — 15 linhas
- bundle:
-   name:
-   icon:
-   description:
- agents:
- workflows:

### `.aiox-core/development/agent-teams/team-no-ui.yaml` — 13 linhas
- bundle:
-   name:
-   icon:
-   description:
- agents:
- workflows:

### `.aiox-core/development/agent-teams/team-ide-minimal.yaml` — 10 linhas
- bundle:
-   name:
-   icon:
-   description:
- agents:
- workflows:

## `.aiox-core/development/agents/` — 22 arquivos · 5.600 linhas

### `.aiox-core/development/agents/devops.md` — 613 linhas
- # devops
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## ⚡ DevOps Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Release Procedure (NON-NEGOTIABLE Reference)
-     ### Related Agents

### `.aiox-core/development/agents/dev.md` — 572 linhas
- # dev
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## 💻 Developer Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/aiox-master.md` — 503 linhas
- # aiox-master
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## 👑 AIOX Master Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/data-engineer.md` — 500 linhas
- # data-engineer
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## 📊 Data Engineer Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/ux-design-expert.md` — 493 linhas
- # ux-design-expert
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## 🎨 UX Design Expert Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/architect.md` — 482 linhas
- # architect
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## 🏛️ Architect Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/qa.md` — 455 linhas
- # qa
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## ✅ QA Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/pm.md` — 375 linhas
- # pm
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## Handoff Protocol
-   ## 📋 Product Manager Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/squad-creator.md` — 342 linhas
- # squad-creator
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## 🏗️ Squad Creator Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Squad Structure
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/po.md` — 333 linhas
- # po
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## Handoff Protocol
-   ## 🎯 Product Owner Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/sm.md` — 285 linhas
- # sm
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## Handoff Protocol
-   ## 🌊 Scrum Master Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/analyst.md` — 271 linhas
- # analyst
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## Quick Commands
-   ## Agent Collaboration
-   ## 🔍 Analyst Guide (\*guide command)
-     ### When to Use Me
-     ### Prerequisites
-     ### Typical Workflow
-     ### Common Pitfalls
-     ### Related Agents

### `.aiox-core/development/agents/dev/MEMORY.md` — 46 linhas
- # Dev Agent Memory (Dex)
-   ## Active Patterns
-     ### Key Patterns
-     ### Project Structure
-     ### Git Rules
-     ### Common Gotchas
-     ### Story Workflow
-   ## Promotion Candidates
-   ## Archived

### `.aiox-core/development/agents/po/MEMORY.md` — 45 linhas
- # PO Agent Memory (Pax)
-   ## Active Patterns
-     ### Responsibilities
-     ### Validation Checklist (10 Points)
-     ### Story File Permissions
-     ### Delegation
-     ### Key Locations
-   ## Promotion Candidates
-   ## Archived

### `.aiox-core/development/agents/qa/MEMORY.md` — 42 linhas
- # QA Agent Memory (Quinn)
-   ## Active Patterns
-     ### Review Patterns
-     ### Test Infrastructure
-     ### Quality Checks (7-point)
-     ### Common Issues
-     ### Git Rules
-   ## Promotion Candidates
-   ## Archived

### `.aiox-core/development/agents/architect/MEMORY.md` — 39 linhas
- # Architect Agent Memory (Aria)
-   ## Active Patterns
-     ### Architecture Decisions
-     ### Key Architectural Patterns
-     ### Technology Stack
-     ### Delegation Rules
-     ### Project Structure
-   ## Promotion Candidates
-   ## Archived

### `.aiox-core/development/agents/devops/MEMORY.md` — 39 linhas
- # DevOps Agent Memory (Gage)
-   ## Active Patterns
-     ### Exclusive Authority
-     ### Quality Gates (Pre-Push)
-     ### Git Conventions
-     ### MCP Infrastructure
-     ### Repository Detection
-   ## Promotion Candidates
-   ## Archived

### `.aiox-core/development/agents/pm/MEMORY.md` — 38 linhas
- # PM Agent Memory (Morgan)
-   ## Active Patterns
-     ### Responsibilities
-     ### Epic Orchestration
-     ### Delegation
-     ### Bob Mode (user_profile=bob)
-     ### Key Locations
-   ## Promotion Candidates
-   ## Archived

### `.aiox-core/development/agents/analyst/MEMORY.md` — 33 linhas
- # Analyst Agent Memory (Atlas)
-   ## Active Patterns
-     ### Key Patterns
-     ### Project Structure
-     ### Git Rules
-     ### Research Conventions
-   ## Promotion Candidates
-   ## Archived

### `.aiox-core/development/agents/data-engineer/MEMORY.md` — 32 linhas
- # Data Engineer Agent Memory (Dara)
-   ## Active Patterns
-     ### Key Patterns
-     ### Project Structure
-     ### Git Rules
-     ### Database Conventions
-   ## Promotion Candidates
-   ## Archived

### `.aiox-core/development/agents/sm/MEMORY.md` — 31 linhas
- # Scrum Master Agent Memory (River)
-   ## Active Patterns
-     ### Key Patterns
-     ### Project Structure
-     ### Git Rules
-     ### Story Conventions
-   ## Promotion Candidates
-   ## Archived

### `.aiox-core/development/agents/ux/MEMORY.md` — 31 linhas
- # UX Design Expert Agent Memory (Uma)
-   ## Active Patterns
-     ### Key Patterns
-     ### Project Structure
-     ### Git Rules
-     ### Design Conventions
-   ## Promotion Candidates
-   ## Archived

## `.aiox-core/development/checklists/` — 5 arquivos · 1.034 linhas

### `.aiox-core/development/checklists/agent-quality-gate.md` — 559 linhas
- # Agent Quality Gate Checklist
-   ## Pre-Validation: File Basics
-   ## Level 0: Loader Configuration (All Required - NEW)
-   ## Level 1: Identity (All Required)
-   ## Level 2: Operational (All Required)
-   ## Level 3: Voice DNA (All Required)
-   ## Level 4: Quality Assurance (All Required)
-   ## Level 5: Credibility (Domain-Specific)
-   ## Operational Completeness (SC_AGT_004 - NEW)
-   ## Level 6: Integration (All Required)
-   ## Validation Execution
-     ### Quick Validation (CLI)
-     ### Manual Validation Checklist
-   ## Scoring
-   ## Integration with Workflow

### `.aiox-core/development/checklists/self-critique-checklist.md` — 273 linhas
- # Self-Critique Checklist
-   ## Purpose
-   ## Step 5.5: Post-Code Self-Critique
-     ### 5.5.1 Predicted Bugs (minimum 3)
-     ### 5.5.2 Edge Cases (minimum 3)
-     ### 5.5.3 Error Handling
-     ### 5.5.4 Security Review
-   ## Step 6.5: Post-Test Self-Critique
-     ### 6.5.1 Pattern Adherence
-     ### 6.5.2 No Hardcoded Values
-     ### 6.5.3 Tests Added
-     ### 6.5.4 Documentation Updated
-     ### 6.5.5 Cleanup Verification
-   ## Verdict Determination
-   ## JSON Output Schema
-     ### Field Descriptions
-   ## Integration with Subtask Executor
-     ### Skip Flag Behavior

### `.aiox-core/development/checklists/brownfield-compatibility-checklist.md` — 114 linhas
- # Brownfield Compatibility Checklist
-   ## Pre-Migration Compatibility Check
-     ### 1. Source Control Status
-     ### 2. Existing Configuration Preservation
-     ### 3. Dependency Compatibility
-     ### 4. Directory Structure Analysis
-   ## During Migration Checks
-     ### 5. Non-Destructive Operations
-     ### 6. Configuration Merge Strategy
-     ### 7. Rollback Points
-   ## Post-Migration Validation
-     ### 8. Existing Functionality
-     ### 9. AIOX Integration
-     ### 10. Rollback Verification
-   ## Compatibility Matrix
-   ## Rollback Procedure
-   ## Checklist Usage

### `.aiox-core/development/checklists/memory-audit-checklist.md` — 53 linhas
- # Memory Audit Checklist
-   ## Steps
-     ### Step 1: Read All MEMORY.md Files
-     ### Step 2: Identify Cross-Agent Patterns
-     ### Step 3: Record Promotion Candidates
-     ### Step 4: Identify Stale Entries
-     ### Step 5: Archive Stale Entries
-     ### Step 6: Report Summary
-   ## Expected Cross-Agent Patterns

### `.aiox-core/development/checklists/issue-triage-checklist.md` — 35 linhas
- # Issue Triage Checklist
-   ## Per-Issue Checklist
-     ### Classification
-     ### Status Resolution
-     ### Community
-     ### Quality
-   ## Session Checklist

## `.aiox-core/development/data/` — 3 arquivos · 1.522 linhas

### `.aiox-core/development/data/decision-heuristics-framework.md` — 621 linhas
- # Decision Heuristics Framework
-   ## 1. Heuristic Anatomy
-   ## 2. Decision Tree Structure
-   ## 3. Standard Heuristic Templates
-     ### 3.1 Strategic Alignment Heuristic
-     ### 3.2 Coherence Scan Heuristic
-     ### 3.3 Automation Decision Heuristic
-   ## 4. Evaluation Criteria Table
-   ## 5. Failure Modes Documentation
-   ## 6. Checkpoint Integration
-   ## 7. Performance Metrics
-   ## 8. Creating Custom Heuristics
-     ### Step 1: Identify the Decision Point
-     ### Step 2: Define Criteria
-     ### Step 3: Define Veto Conditions
-     ### Step 4: Build Decision Tree
-     ### Step 5: Document Failure Modes
-     ### Step 6: Integrate with Checkpoint
-   ## 9. Quality Gate Pattern
-   ## 10. Scope Complexity Heuristic (PRD Gate)
-     ### 10.1 The Problem
-     ### 10.2 Scope Complexity Decision
-     ### 10.3 PRD Structure for Large Squads
-     ### 10.4 Examples
-   ## 11. Specialist Selection Heuristic
-     ### 10.1 Available Specialists
-     ### 10.2 Decision Matrix
-     ### 10.3 Handoff Protocol
-     ### 10.4 Anti-Patterns

### `.aiox-core/development/data/tier-system-framework.md` — 475 linhas
- # Tier System Framework
-   ## 1. Overview
-   ## 2. Tier Definitions
-     ### Orchestrator
-     ### Tier 0: Foundation & Diagnosis
-     ### Tier 1: Core Execution
-     ### Tier 2: Systematizers
-     ### Tier 3: Format Specialists
-     ### Tools
-   ## 3. Config.yaml Structure
-   ## 4. Orchestration Workflow
-     ### Standard Flow
-     ### Routing Rules
-   ## 5. Agent Selection Criteria
-     ### For Tier 0 (Diagnosis)
-     ### For Tier 1 (Core)
-     ### For Tier 2 (Systematizers)
-     ### For Tier 3 (Format)
-   ## 6. Tier Collaboration Patterns
-     ### Handoff Pattern
-     ### Support Pattern
-     ### Enhancement Pattern
-   ## 7. Adding New Agents
-     ### Checklist
-     ### Tier Assignment Decision Tree
-   ## 8. Quality Gates by Tier

### `.aiox-core/development/data/quality-dimensions-framework.md` — 426 linhas
- # Quality Dimensions Framework
-   ## 1. Overview
-   ## 2. Standard Quality Dimensions
-     ### Configuration
-   ## 3. Dimension Details
-     ### 3.1 Accuracy (Weight: 1.0, VETO)
-     ### 3.2 Coherence (Weight: 0.9)
-     ### 3.3 Strategic Alignment (Weight: 0.9)
-     ### 3.4 Operational Excellence (Weight: 0.8)
-     ### 3.5 Innovation Capacity (Weight: 0.7)
-     ### 3.6 Risk Management (Weight: 0.8)
-     ### 3.7 Resource Optimization (Weight: 0.8)
-     ### 3.8 Stakeholder Value (Weight: 0.7)
-     ### 3.9 Sustainability (Weight: 0.7)
-     ### 3.10 Adaptability (Weight: 0.6)
-   ## 4. Assessment Template
-   ## 5. Scoring Calculation
-     ### Weighted Average Formula
-     ### Pass/Fail Logic
-   ## 6. Domain-Specific Weights
-     ### Software Development
-     ### Marketing/Copy
-     ### Operations/Process
-   ## 7. Integration with Workflows
-   ## 8. Continuous Improvement

## `.aiox-core/development/external-executors/` — 2 arquivos · 76 linhas

### `.aiox-core/development/external-executors/codex.md` — 57 linhas
- # Codex External Executor Adapter
-   ## Provider ID
-   ## Invocation
-   ## Sandbox Mapping
-   ## Supported Options
-   ## Exit Code Semantics
-   ## Run Artifacts

### `.aiox-core/development/external-executors/README.md` — 19 linhas
- # External Executors
-   ## Contract
-   ## Providers

## `.aiox-core/development/README.md/` — 1 arquivos · 142 linhas

### `.aiox-core/development/README.md` — 142 linhas
- # Development Module
-   ## Structure
-   ## Agents (11 files)
-     ### Activation
-   ## Agent Teams (5 files)
-   ## Tasks (115+ files)
-     ### Categories
-     ### Example Usage
-   ## Workflows (7 files)
-   ## Scripts (24 files)
-     ### Key APIs
-   ## Dependencies
-   ## Migration Notes
-   ## Testing

## `.aiox-core/development/scripts/` — 76 arquivos · 35.789 linhas

### `.aiox-core/development/scripts/greeting-builder.js` — 1421 linhas
- class GreetingBuilder
- exports = GreetingBuilder;

### `.aiox-core/development/scripts/squad/squad-generator.js` — 1405 linhas
- class SquadGeneratorError
- fn getGitUserName()
- fn isValidSquadName()
- fn extractSlashPrefix()
- fn safeYamlValue()
- fn generateSquadYaml()
- fn generateReadme()
- fn generateCodingStandards()
- fn generateTechStack()
- fn generateSourceTree()
- fn generateExampleAgent()
- fn generateExampleTask()
- fn execute()
- class SquadGenerator
- fn formatData()
- exports = { formatData };
- fn commandsList()
- fn entradaList()
- fn saidaList()
- fn checklistItems()
- exports = {

### `.aiox-core/development/scripts/code-quality-improver.js` — 1328 linhas
- class CodeQualityImprover
- fn comments()
- fn coverage()
- fn score()
- exports = CodeQualityImprover;

### `.aiox-core/development/scripts/pattern-learner.js` — 1224 linhas
- class PatternLearner
- fn daysSinceLastSeen()
- exports = PatternLearner;

### `.aiox-core/development/scripts/refactoring-suggester.js` — 1147 linhas
- class RefactoringSuggester
- fn checkNesting()
- exports = RefactoringSuggester;

### `.aiox-core/development/scripts/verify-workflow-gaps.js` — 1032 linhas
- fn pass()
- fn fail()
- fn assert()
- fn section()
- fn verifyGap1()
- fn verifyGap2()
- fn verifyGap3()
- fn verifyGap4()
- fn main()

### `.aiox-core/development/scripts/squad/squad-designer.js` — 1010 linhas
- class SquadDesignerError
- class SquadDesigner
- exports = {

### `.aiox-core/development/scripts/populate-entity-registry.js` — 886 linhas
- fn isSentinel()
- fn isNoise()
- fn computeChecksum()
- fn extractEntityId()
- fn toScopedEntityId()
- fn resolveEntityId()
- fn findScanConfigForPath()
- fn resolveRelativeDependencyId()
- fn extractKeywords()
- fn looksLikePlaceholder()
- fn extractPurpose()
- fn extractYamlDependencies()
- fn extractMarkdownCrossReferences()
- fn addDep()
- fn detectDependencies()
- fn scanCategory()
- fn buildNameIndex()
- fn countResolution()
- fn resolveUsedBy()
- fn classifyDependencies()
- fn detectLifecycle()
- fn assignLifecycles()
- fn populate()
- fn syncSelfRegistryEntry()
- fn getCategoryDescription()
- exports = {

### `.aiox-core/development/scripts/squad/squad-extender.js` — 871 linhas
- class SquadExtenderError
- class SquadExtender
- fn $()
- exports = {
- fn main()
- exports = { main };
- exports = {

### `.aiox-core/development/scripts/squad/squad-validator.js` — 855 linhas
- fn loadSchema()
- class SquadValidator
- exports = {

### `.aiox-core/development/scripts/commit-message-generator.js` — 849 linhas
- class CommitMessageGenerator
- fn originalElicits()
- fn modifiedElicits()
- fn originalSteps()
- fn modifiedSteps()
- exports = CommitMessageGenerator;

### `.aiox-core/development/scripts/test-generator.js` — 843 linhas
- class TestGenerator
- fn openBrackets()
- fn closeBrackets()
- exports.push
- exports.push
- exports = TestGenerator;

### `.aiox-core/development/scripts/unified-activation-pipeline.js` — 841 linhas
- class UnifiedActivationPipeline
- fn effectiveProfile()
- exports = {

### `.aiox-core/development/scripts/metrics-tracker.js` — 775 linhas
- class MetricsTracker
- exports = MetricsTracker;

### `.aiox-core/development/scripts/workflow-validator.js` — 769 linhas
- class WorkflowValidator
- fn hasCycle()
- fn openBrackets()
- fn closeBrackets()
- exports = {

### `.aiox-core/development/scripts/performance-analyzer.js` — 757 linhas
- class PerformanceAnalyzer
- exports = PerformanceAnalyzer;

### `.aiox-core/development/scripts/conflict-resolver.js` — 674 linhas
- class ConflictResolver
- exports = ConflictResolver;

### `.aiox-core/development/scripts/usage-tracker.js` — 673 linhas
- class UsageTracker
- exports = UsageTracker;

### `.aiox-core/development/scripts/workflow-state-manager.js` — 651 linhas
- class WorkflowStateManager
- exports = { WorkflowStateManager };

### `.aiox-core/development/scripts/approval-workflow.js` — 642 linhas
- class ApprovalWorkflow
- exports = ApprovalWorkflow;

### `.aiox-core/development/scripts/dependency-analyzer.js` — 637 linhas
- class DependencyAnalyzer
- fn hasCycle()
- exports = DependencyAnalyzer;

### `.aiox-core/development/scripts/squad/squad-analyzer.js` — 637 linhas
- class SquadAnalyzerError
- class SquadAnalyzer
- exports = {

### `.aiox-core/development/scripts/squad/squad-publisher.js` — 629 linhas
- fn sanitizeForShell()
- fn isValidName()
- class SquadPublisherError
- class SquadPublisher
- fn prUrl()
- exports = {

### `.aiox-core/development/scripts/squad/squad-migrator.js` — 627 linhas
- class SquadMigratorError
- class SquadMigrator
- exports = {

### `.aiox-core/development/scripts/agent-config-loader.js` — 626 linhas
- fn loadAgentRequirements()
- class AgentConfigLoader
- fn loadAgentConfig()
- fn preloadAgents()
- exports = {

### `.aiox-core/development/scripts/backup-manager.js` — 606 linhas
- class BackupManager
- exports = BackupManager;

### `.aiox-core/development/scripts/transaction-manager.js` — 589 linhas
- class TransactionManager
- exports = TransactionManager;

### `.aiox-core/development/scripts/modification-validator.js` — 554 linhas
- class ModificationValidator
- exports = ModificationValidator;

### `.aiox-core/development/scripts/rollback-handler.js` — 530 linhas
- class RollbackHandler
- exports = RollbackHandler;

### `.aiox-core/development/scripts/version-tracker.js` — 526 linhas
- class VersionTracker
- exports = VersionTracker;

### `.aiox-core/development/scripts/squad/squad-downloader.js` — 510 linhas
- class SquadDownloaderError
- class SquadDownloader
- exports = {

### `.aiox-core/development/scripts/git-wrapper.js` — 462 linhas
- class GitWrapper
- exports = GitWrapper;

### `.aiox-core/development/scripts/backlog-manager.js` — 407 linhas
- class BacklogItem
- class BacklogManager
- exports = {

### `.aiox-core/development/scripts/yaml-validator.js` — 396 linhas
- class YAMLValidator
- exports = YAMLValidator;

### `.aiox-core/development/scripts/branch-manager.js` — 389 linhas
- class BranchManager
- exports = BranchManager;

### `.aiox-core/development/scripts/elicitation-engine.js` — 384 linhas
- class ElicitationEngine
- exports = ElicitationEngine;

### `.aiox-core/development/scripts/audit-agent-config.js` — 380 linhas
- fn extractAgentDependencies()
- fn analyzeConfigNeeds()
- fn estimateConfigSize()
- fn calculateSavings()
- fn generateAuditReport()
- fn avgSavings()
- fn auditAllAgents()
- exports = {

### `.aiox-core/development/scripts/migrate-task-to-v2.js` — 377 linhas
- fn analyzeMissingSections()
- fn migrateTask()
- fn main()
- exports = { migrateTask, analyzeMissingSections };

### `.aiox-core/development/scripts/story-manager.js` — 375 linhas
- fn getClickUpTool()
- fn parseStoryFile()
- fn saveStoryFile()
- fn updateFrontmatter()
- fn updateFrontmatterTimestamp()
- fn createStoryInClickUp()
- fn syncStoryToPM()
- fn pullStoryFromPM()
- exports = {

### `.aiox-core/development/scripts/squad/squad-loader.js` — 359 linhas
- class SquadLoaderError
- class SquadLoader
- exports = {

### `.aiox-core/development/scripts/security-checker.js` — 358 linhas
- class SecurityChecker
- exports = SecurityChecker;

### `.aiox-core/development/scripts/diff-generator.js` — 351 linhas
- class DiffGenerator
- fn origLine()
- fn modLine()
- exports = DiffGenerator;

### `.aiox-core/development/scripts/skill-validator.js` — 341 linhas
- class SkillValidator
- exports = { SkillValidator };

### `.aiox-core/development/scripts/story-index-generator.js` — 337 linhas
- fn extractStoryMetadata()
- fn scanStoriesDirectory()
- fn groupStoriesByEpic()
- fn generateStoryRow()
- fn generateIndexMarkdown()
- fn generateStoryIndex()
- exports = {

### `.aiox-core/development/scripts/workflow-navigator.js` — 334 linhas
- class WorkflowNavigator
- exports = WorkflowNavigator;

### `.aiox-core/development/scripts/validate-task-v2.js` — 319 linhas
- fn validateTask()
- fn validateAllTasks()
- fn printResult()
- fn main()
- exports = { validateTask, validateAllTasks, validationRules };

### `.aiox-core/development/scripts/elicitation-session-manager.js` — 299 linhas
- class ElicitationSessionManager
- exports = ElicitationSessionManager;

### `.aiox-core/development/scripts/dev-context-loader.js` — 296 linhas
- class DevContextLoader
- fn fileList()
- exports = DevContextLoader;

### `.aiox-core/development/scripts/decision-log-generator.js` — 293 linhas
- fn calculateDuration()
- fn formatDuration()
- fn generateDecisionsList()
- fn generateFilesList()
- fn generateTestsList()
- fn generateRollbackFilesList()
- fn generateDecisionLog()
- exports = {

### `.aiox-core/development/scripts/decision-log-indexer.js` — 284 linhas
- fn loadConfig()
- fn parseLogMetadata()
- fn generateIndexContent()
- fn addToIndex()
- fn rebuildIndex()
- exports = {

### `.aiox-core/development/scripts/template-validator.js` — 278 linhas
- class TemplateValidator
- exports = TemplateValidator;

### `.aiox-core/development/scripts/story-update-hook.js` — 259 linhas
- fn detectChanges()
- fn extractStatus()
- fn extractTasks()
- fn extractFileList()
- fn extractSection()
- fn generateChangelog()
- fn hasChanges()
- fn syncStoryToClickUp()
- fn updateFrontmatterTimestamp()
- exports = {

### `.aiox-core/development/scripts/manifest-preview.js` — 244 linhas
- class ManifestPreview
- exports = ManifestPreview;

### `.aiox-core/development/scripts/template-engine.js` — 239 linhas
- class TemplateEngine
- exports = TemplateEngine;

### `.aiox-core/development/scripts/agent-assignment-resolver.js` — 231 linhas
- fn determineAgent()
- fn processTaskFile()
- fn main()
- fn exitCode()
- exports = { determineAgent, processTaskFile };

### `.aiox-core/development/scripts/decision-context.js` — 228 linhas
- class DecisionContext
- exports = {

### `.aiox-core/development/scripts/validate-filenames.js` — 226 linhas
- class FilenameValidator

### `.aiox-core/development/scripts/issue-triage.js` — 171 linhas
- fn gh()
- fn listUntriaged()
- fn applyLabels()
- fn generateReport()

### `.aiox-core/development/scripts/greeting-preference-manager.js` — 169 linhas
- class GreetingPreferenceManager
- exports = GreetingPreferenceManager;

### `.aiox-core/development/scripts/decision-recorder.js` — 168 linhas
- fn initializeDecisionLogging()
- fn recordDecision()
- fn trackFile()
- fn trackTest()
- fn updateMetrics()
- fn completeDecisionLogging()
- fn getCurrentContext()
- exports = {

### `.aiox-core/development/scripts/apply-inline-greeting-all-agents.js` — 146 linhas
- fn updateAgent()
- fn main()

### `.aiox-core/development/scripts/modo-navegador/minimize-chrome.test.js` — 145 linhas
- fn findWindowState()
- fn waitForWindow()
- fn launchChrome()
- fn killProcessTree()

### `.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js` — 145 linhas
- fn setClipboard()
- fn readClipboard()
- fn esperarPlanilhaCarregar()
- fn irParaCelula()
- fn escreverCelula()
- fn lerCelula()
- fn limparCelula()
- fn escreverLinha()
- fn mesclarRange()
- fn desfazerMesclagem()
- exports = {

### `.aiox-core/development/scripts/task-identifier-resolver.js` — 145 linhas
- fn filenameToCamelCase()
- fn createBackup()
- fn processTaskFile()
- fn main()
- exports = { filenameToCamelCase, processTaskFile };

### `.aiox-core/development/scripts/test-greeting-system.js` — 142 linhas
- fn testGreetings()

### `.aiox-core/development/scripts/squad/index.js` — 123 linhas
- exports = {

### `.aiox-core/development/scripts/modo-navegador/focus-watchdog.ps1` — 114 linhas
- fn Get-WindowTitleSafe()
- fn Get-ProcessNameSafe()
- fn Log-Event()

### `.aiox-core/development/scripts/squad/README.md` — 112 linhas
- # Squad Scripts Module
-   ## Overview
-   ## Components
-   ## Usage
-     ### Squad Loader
-     ### Error Handling
-     ### Error Codes
-   ## Manifest Files
-   ## Integration with squad-creator Agent
-   ## Related Stories
-   ## Dependencies
-   ## Testing
-   ## Version History

### `.aiox-core/development/scripts/generate-greeting.js` — 109 linhas
- fn generateGreeting()
- fn generateFallbackGreeting()
- exports = { generateGreeting };

### `.aiox-core/development/scripts/agent-exit-hooks.js` — 96 linhas
- fn onCommandComplete()
- fn detectWorkflowState()
- fn registerHook()
- exports = {

### `.aiox-core/development/scripts/batch-update-agents-session-context.js` — 95 linhas
- fn updateAgent()
- fn main()
- exports = { updateAgent };

### `.aiox-core/development/scripts/modo-navegador/abrir-aba-background.js` — 88 linhas
- fn createBackgroundTarget()
- fn ensurePageWithoutErrorTitle()
- fn openBackgroundPage()
- exports = { openBackgroundPage };

### `.aiox-core/development/scripts/greeting-config-cli.js` — 85 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/scripts/activation-runtime.js` — 63 linhas
- class ActivationRuntime
- fn activateAgent()
- exports = {

### `.aiox-core/development/scripts/modo-navegador/minimize-chrome.js` — 60 linhas
- fn minimizeChrome()
- exports = { minimizeChrome };

### `.aiox-core/development/scripts/modo-navegador/achar-abas-mercadolivre.js` — 43 linhas
- fn acharAbaAnuncios()
- fn acharAbaAdsPatrocinados()
- exports = {

## `.aiox-core/development/tasks/` — 224 arquivos · 96.527 linhas

### `.aiox-core/development/tasks/environment-bootstrap.md` — 1395 linhas
- # environment-bootstrap
-   ## Purpose
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Elicitation
-   ## Process
-     ### Step 1: Detect Operating System
-     ### Step 2: CLI Tools Audit
-     ### Step 3: Interactive Installation
-     ### Step 4: Service Authentication
-     ### Step 5: Git Repository Initialization
-     ### Step 6: Project Structure Scaffold
-     ### Step 6.1: User Profile Selection (Story 12.1)
-     ### Step 6.5: Docker MCP Setup (Optional but Recommended)
-     ### Step 7: Environment Report Generation
-     ### Step 8: Final Validation & Summary
-   ## Validation Checklist
-   ## Troubleshooting
-     ### Issue 1: winget not recognized
-     ### Issue 2: gh auth login fails
- … (+4 itens)

### `.aiox-core/development/tasks/qa-review-build.md` — 1224 linhas
- # QA Review Build: 10-Phase Quality Assurance Review
-   ## Purpose
-   ## autoClaude
-   ## 10 Review Phases
-     ### Phase 0: Load Context
-     ### Phase 1: Verify Subtasks Completed
-     ### Phase 2: Initialize Environment
-     ### Phase 3: Automated Testing
-     ### Phase 4: Browser Verification
-     ### Phase 5: Database Validation
-     ### Phase 6: Code Review (Enhanced with Auto-Claude Absorption)
-     ### Phase 7: Regression Testing
-     ### Phase 8: Generate Report
-     ### Phase 9: Update Implementation Plan
-     ### Phase 10: Signal Completion
-   ## Signal Logic
-   ## Command Integration
-   ## Output Files
-     ### Primary Output: qa_report.md
-     ### Secondary Output: status.json
-   ## Error Handling
-   ## Integration with QA Agent
-   ## Metadata

### `.aiox-core/development/tasks/create-agent.md` — 1198 linhas
- # Task: Create Squad Agent
-   ## Step 0: IDS Registry Check (Advisory)
-   ## Overview
-   ## Inputs
-   ## Preconditions
-   ## PHASE 0: CONTEXT
-     ### Step 0.1: Identify Target Pack
-     ### Step 0.2: Classify Agent Type
-   ## PHASE 1: RESEARCH
-     ### Step 1.1: Check Local Knowledge (If Specialist)
-     ### Step 1.2: Generate Research Prompt
-     ### Step 1.3: Execute Deep Research
-   ## PHASE 2: EXTRACTION
-     ### Step 2.1: Extract Framework from Research
-     ### Step 2.2: Classify Tier
-     ### Step 2.3: Define Persona
-   ## PHASE 3: CREATION
-     ### Step 3.1: Generate Agent Using Template
-     ### Step 3.2: Apply Voice DNA
-     ### Step 3.3: Add Completion Criteria
-   ## PHASE 4: VALIDATION
-     ### Step 4.1: Run Quality Gate SC_AGT_001
-     ### Step 4.2: Fix Blocking Issues
-     ### Step 4.3: Save Agent File
-   ## PHASE 5: OPERATIONAL INFRASTRUCTURE
-     ### Step 5.1: Generate Command Loader
-     ### Step 5.2: Create Task Stubs
-     ### Step 5.3: Create Template Stubs
-     ### Step 5.4: Create Operational Checklist
-     ### Step 5.5: Update Agent with Command Loader
- … (+18 itens)

### `.aiox-core/development/tasks/qa-generate-tests.md` — 1174 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # TODO: Create test-generation-checklist.md for validation (follow-up story needed)
- # checklists:
- # - test-generation-checklist.md
- # Generate Tests - AIOX Developer Task
-   ## Purpose
-   ## Command Pattern
-   ## Parameters
-     ### Options
-   ## Examples
-   ## Implementation
-   ## Validation Rules
-     ### Input Validation
-     ### Safety Checks
-     ### Generation Requirements
-   ## Integration Points
-     ### Test Template System
-     ### Test Generator
- … (+6 itens)

### `.aiox-core/development/tasks/qa-review-proposal.md` — 1157 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Review Proposal - AIOX Developer Task
-   ## Purpose
-   ## Command Pattern
-   ## Parameters
-     ### Options
-   ## Examples
-   ## Implementation
-   ## Validation Rules
-     ### Review Validation
-     ### Status Transitions
-     ### Review Requirements
-   ## Integration Points
-     ### Proposal System
-     ### Impact Analysis
-     ### Notification Service
-     ### Diff Generator
-   ## Security Considerations

### `.aiox-core/development/tasks/collaborative-edit.md` — 1108 linhas
- # collaborative-edit
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # No checklists needed - this task manages real-time collaborative editing sessions, no document validation req…
- # Collaborative Edit - AIOX Developer Task
-   ## Purpose
-   ## Command Pattern
-   ## Actions
-   ## Parameters
-     ### Start Session
-     ### Join Session
-   ## Examples
-   ## Implementation
-   ## Validation Rules
-     ### Session Management
-     ### Editing Modes
-     ### Conflict Prevention
-   ## Integration Points
-     ### Modification Synchronizer
- … (+3 itens)

### `.aiox-core/development/tasks/dev-optimize-performance.md` — 1033 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Optimize Performance - AIOX Developer Task
-   ## Purpose
-   ## Command Pattern
-   ## Parameters
-     ### Options
-   ## Optimization Patterns
-   ## Examples
-   ## Implementation
-   ## Integration Points
-     ### Performance Optimizer
-     ### Analysis Categories
-     ### Metrics Collection
-   ## Performance Analysis Workflow
-     ### Detection Phase
-     ### Analysis Phase
-     ### Optimization Phase
-   ## Best Practices
- … (+4 itens)

### `.aiox-core/development/tasks/db-schema-audit.md` — 1011 linhas
- # Task: Schema Audit
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Overview
-   ## Process
-     ### 1. Collect Schema Metadata
-     ### 2. Check Design Best Practices
-     ### 3. Check Performance Issues
-     ### 4. Check Security
-     ### 5. Check Data Integrity
-     ### 6. Generate Audit Report
-   ## Output
-   ## Scoring Rubric
-   ## Advanced Auditing Tools
-     ### 1. Audit Triggers (Change Tracking)
-     ### 2. pgAudit Extension (PostgreSQL Auditing)
-     ### 3. pgTAP Extension (Database Testing)
-     ### 4. Named Constraints (Best Practice)
-   ## References

### `.aiox-core/development/tasks/dev-develop-story.md` — 970 linhas
- # Develop Story Task
-   ## Purpose
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Constitutional Gates
-     ### Gate 1: Story-Driven Development (Article III)
-     ### Gate 2: CLI First (Article I)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Mode: YOLO (Autonomous)
-     ### Workflow
-   ## Mode: Interactive (Balanced) **[DEFAULT]**
-     ### Workflow
-   ## Mode: Pre-Flight Planning (Comprehensive)
-     ### Workflow
-   ## Common Workflow (All Modes)
-     ### Order of Execution
-     ### Story File Updates (All Modes)
-     ### Blocking Conditions (All Modes)
-     ### InReview Criteria (All Modes)
-     ### Completion Checklist (All Modes)
-   ## CodeRabbit Self-Healing Loop (Story 6.3.3)
- … (+24 itens)

### `.aiox-core/development/tasks/plan-execute-subtask.md` — 960 linhas
- # Execute Subtask (Coder Agent)
-   ## Purpose
-   ## autoClaude
-   ## Command Integration (@dev)
-   ## The 13 Steps of the Coder Agent
-     ### CRITICAL RULE: No Step Skipping
-   ## Step-by-Step Execution Flow
-     ### Step 1: Load Context
-     ### Step 2: Read Implementation Plan
-     ### Step 3: Understand Current Subtask
-     ### Step 4: Plan Approach
-     ### Step 5: Write Code
-     ### Step 5.5: Self-Critique (Post-Code)
-     ### Step 6: Run Tests
-     ### Step 6.5: Self-Critique (Post-Test)
-     ### Step 7: Fix Issues
-     ### Step 8: Run Linter
-     ### Step 9: Fix Lint Issues
-     ### Step 10: Verify Manually (If Needed)
-     ### Step 11: Update Plan Status
-     ### Step 12: Commit Changes
-     ### Step 13: Signal Completion
-   ## Recovery System Integration
-   ## Error Handling
-   ## Quality Gates
-   ## Self-Critique Checklist Reference
-   ## Examples
-     ### Example 1: Execute Simple Subtask
-     ### Example 2: Subtask with Retry
-   ## Pipeline Integration
- … (+1 itens)

### `.aiox-core/development/tasks/deprecate-component.md` — 956 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # TODO: Create deprecation-checklist.md for validation (follow-up story needed)
- # checklists:
- # - deprecation-checklist.md
- # Deprecate Component - AIOX Developer Task
-   ## Purpose
-   ## Command Pattern
-   ## Parameters
-     ### Options
-   ## Examples
-   ## Implementation
-   ## Validation Rules
-     ### Input Validation
-     ### Safety Checks
-     ### Deprecation Requirements
-   ## Integration Points
-     ### Deprecation Manager
-     ### Usage Tracker
- … (+5 itens)

### `.aiox-core/development/tasks/learn-patterns.md` — 900 linhas
- # learn-patterns
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # No checklists needed - analytical pattern learning task, no deliverables requiring validation
- # Learn Patterns - AIOX Developer Task
-   ## Purpose
-   ## Command Pattern
-   ## Parameters
-     ### Options
-   ## Examples
-   ## Implementation
-   ## Pattern Types
-     ### Code Transformation Patterns
-     ### Structural Patterns
-     ### Refactoring Patterns
-     ### Dependency Patterns
-     ### Performance Patterns
-   ## Learning Process
-     ### Pattern Extraction
- … (+8 itens)

### `.aiox-core/development/tasks/execute-epic-plan.md` — 885 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Autonomous (0-2 prompts)
-     ### 2. Interactive Mode - Balanced (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Analysis
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Execute Epic Plan Task
-   ## Purpose
-   ## Prerequisites
-   ## Command
-     ### Examples
-   ## Task Execution
-     ### Action: `start`
-     ### Action: `continue`
-     ### Action: `status`
-     ### Action: `skip-story`
-     ### Action: `abort`
-   ## Wave Executor (Core Algorithm)
-   ## Final Gate
-   ## State Persistence
-     ### Resume Across Sessions
-   ## Integration with Existing Infrastructure
-     ### development-cycle.yaml (inner loop)
-     ### epic-orchestration.yaml (template)
- … (+6 itens)

### `.aiox-core/development/tasks/github-devops-pre-push-quality-gate.md` — 885 linhas
- # pre-push-quality-gate.md
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Constitutional Gate: Quality First
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Prerequisites
-   ## Quality Gate Checks
-     ### 1. Repository Context Detection
-     ### 2. Check for Uncommitted Changes
-     ### 3. Check for Merge Conflicts
-     ### 4. Run npm run lint (if script exists)
-     ### 5. Run npm test (if script exists)
-     ### 6. Run npm run typecheck (if script exists)
-     ### 7. Run npm run build (if script exists)
-     ### 8. Run CodeRabbit CLI Review (TR-3.14.12)
-     ### 9. Run Security Scan (TR-3.14.11)
-     ### 9.1 Impact Analysis (Code Intelligence — Advisory Only)
-     ### 10. Verify Story Status (Optional - if using story-driven workflow)
-   ## Summary Report
-     ### If FAIL status:
-     ### If CONCERNS status:
- … (+5 itens)

### `.aiox-core/development/tasks/dev-suggest-refactoring.md` — 876 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Suggest Refactoring - AIOX Developer Task
-   ## Purpose
-   ## Command Pattern
-   ## Parameters
-     ### Options
-   ## Refactoring Patterns
-   ## Examples
-   ## Implementation
-   ## Integration Points
-     ### Refactoring Suggester
-     ### AST Processing
-     ### Pattern Library
-     ### Code Metrics
-   ## Refactoring Workflow
-     ### Analysis Phase
-     ### Review Phase
-     ### Application Phase
- … (+5 itens)

### `.aiox-core/development/tasks/setup-github.md` — 874 linhas
- # setup-github
-   ## Purpose
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Elicitation
-   ## Process
-     ### Step 1: Verify Pre-Conditions
-     ### Step 2: Detect Project Type
-     ### Step 3: Install GitHub Actions Workflows
-     ### Step 4: Configure CodeRabbit
-     ### Step 5: Configure Branch Protection
-     ### Step 6: Secrets Wizard
-     ### Step 7: Generate Setup Report
-     ### Step 8: Final Summary
-   ## Validation Checklist
-   ## Troubleshooting
-     ### Issue 1: Branch protection API returns 403
-     ### Issue 2: Workflow validation fails
-     ### Issue 3: CodeRabbit not reviewing PRs
-   ## References

### `.aiox-core/development/tasks/dev-improve-code-quality.md` — 872 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # No checklists needed - this task performs automated code refactoring, validation is through linting and testi…
- # Improve Code Quality - AIOX Developer Task
-   ## Purpose
-   ## Command Pattern
-   ## Parameters
-     ### Options
-   ## Improvement Patterns
-   ## Examples
-   ## Implementation
-   ## Integration Points
-     ### Code Quality Improver
-     ### Tool Integration
-     ### Configuration System
-     ### Backup System
-   ## Improvement Workflow
-     ### Analysis Phase
-     ### Review Phase
- … (+6 itens)

### `.aiox-core/development/tasks/sync-documentation.md` — 864 linhas
- # sync-documentation
-   ## Purpose
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Step-by-Step Execution
-     ### Step 1: Parse Parameters
-     ### Step 2: Initialize Dependencies
-     ### Step 3: Execute Requested Action
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools (External/Shared)
-   ## Scripts (Agent-Specific)
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Command Pattern
-   ## Parameters
-     ### Options
-   ## Examples
-   ## Implementation
-   ## Integration Points
-     ### Documentation Synchronizer
-     ### Sync Strategies
-     ### Documentation Sources
-     ### Code Sources
-   ## Synchronization Workflow
- … (+8 itens)

### `.aiox-core/development/tasks/run-workflow-engine.md` — 860 linhas
-   ## Execution Modes
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Workflow Runtime Engine Task
-   ## Purpose
-   ## Prerequisites
-   ## Engine Loop (Step-by-Step)
-     ### Action: `start`
-     ### Action: `continue`
-     ### Action: `status`
-     ### Action: `skip`
-     ### Action: `abort`
-     ### Sequence Advancer (Core Algorithm)
-     ### Final Report
-   ## Elicitation Handler
-     ### Process
-     ### Rules
-   ## Subagent Prompt Builder
-     ### Process
-     ### Path Resolution for Agent Files
-     ### Path Resolution for Task Files (uses field)
-     ### Path Resolution for Data Files
-   ## Output Parser
-     ### Process
- … (+12 itens)

### `.aiox-core/development/tasks/plan-create-context.md` — 856 linhas
- # Plan Pipeline: Create Context
-   ## Purpose
-   ## autoClaude
-   ## Data Sources
-     ### Source 1: Core Configuration
-     ### Source 2: Tech Stack Documentation
-     ### Source 3: Source Tree Documentation
-     ### Source 4: Package Manifest
-     ### Source 5: TypeScript Configuration
-   ## Execution Flow
-     ### Step 1: Validate Inputs
-     ### Step 2: Extract Project Context
-     ### Step 3: Analyze Story Scope
-     ### Step 3.5: Code Intelligence: Implementation Context (Optional — Auto-skip if unavailable)
-     ### Step 4: Generate Outputs
-   ## Output Templates
-     ### project-context.yaml Template
-     ### files-context.yaml Template
-   ## Output Schemas
-     ### project-context-schema
-     ### files-context-schema
-   ## Integration
-     ### Command Integration (@architect)
-     ### Pipeline Integration
-     ### Usage in Implementation Plan
-   ## Error Handling
-   ## Examples
-     ### Example 1: Basic Story Context Generation
-     ### Example 2: Story with Spec Available
-   ## Metadata

### `.aiox-core/development/tasks/plan-create-implementation.md` — 852 linhas
- # Execution Pipeline: Create Implementation Plan
-   ## Purpose
-   ## autoClaude
-   ## Core Rules
-   ## Output Schema
-   ## Execution Flow
-     ### Step 1: Load and Validate Inputs
-     ### Step 2: Extract Implementation Requirements
-     ### Step 3: Determine Phase Structure
-     ### Step 4: Generate Subtasks
-     ### Step 5: Assign Verification
-     ### Step 6: Build Implementation Plan
-     ### Step 6.5: Code Intelligence: Impact Analysis (Optional — Auto-skip if unavailable)
-     ### Step 7: Validate Plan
-     ### Step 8: Elicit Approval
-     ### Step 9: Save Output
-   ## Integration
-     ### Command Integration (@architect)
-     ### Pipeline Integration
-   ## Error Handling
-   ## Examples
-     ### Example 1: SIMPLE Story - Add Environment Variable
-     ### Example 2: STANDARD Story - Google OAuth Login
-   ## Quality Checks
-   ## Metadata

### `.aiox-core/development/tasks/propose-modification.md` — 842 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Propose Modification - AIOX Developer Task
-   ## Purpose
-   ## Command Pattern
-   ## Parameters
-     ### Options
-   ## Examples
-   ## Implementation
-   ## Validation Rules
-     ### Input Validation
-     ### Proposal Requirements
-     ### Review Process
-   ## Integration Points
-     ### Proposal System
-     ### Impact Analysis
-     ### Notification Service
-   ## Security Considerations

### `.aiox-core/development/tasks/architect-analyze-impact.md` — 833 linhas
- # An
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Purpose
-   ## Command Pattern
-   ## Parameters
-     ### Options
-   ## Examples
-   ## Implementation
-   ## Validation Rules
-     ### Input Validation
-     ### Safety Checks
-     ### Analysis Requirements
-   ## Integration Points
-     ### Dependency Impact Analyzer
-     ### Change Propagation Predictor
-     ### Risk Assessment System
-     ### Visual Impact Generator
-     ### Approval Workflow
- … (+5 itens)

### `.aiox-core/development/tasks/improve-self.md` — 822 linhas
- # improve-self
-   ## Purpose
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Step-by-Step Execution
-     ### Step 1: Request Validation
-     ### Step 2: Capability Analysis
-     ### Step 3: Improvement Planning
-     ### Step 4: Safety Validation
-     ### Step 5: Backup Creation
-     ### Step 6: Sandbox Testing
-     ### Step 7: User Approval
-     ### Step 8: Change Application
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools (External/Shared)
-   ## Scripts (Agent-Specific)
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Task Flow
-   ## Required Input
-   ## Execution Steps
-   ## Output Format
-   ## Safety Rules
-     ### Mandatory Safeguards
- … (+7 itens)

### `.aiox-core/development/tasks/create-next-story.md` — 791 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Create Next Story Task
-   ## Purpose
-   ## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)
-     ### 0. Load Core Configuration and Check Workflow
-     ### 1. Identify Next Story for Preparation
-       #### 1.1 Locate Epic Files and Review Existing Stories
-     ### 1.2 Code Intelligence: Duplicate Detection & File Suggestions (Auto-skip if unavailable)
-     ### 2. Gather Story Requirements and Previous Story Context
-     ### 3. Gather Architecture Context
-       #### 3.1 Determine Architecture Reading Strategy
-       #### 3.2 Read Architecture Documents Based on Story Type
-   ## Configuration Dependencies
-       #### 3.3 Extract Story-Specific Technical Details
-     ### 4. Verify Project Structure Alignment
-     ### 5. Populate Story Template with Full Context
-       #### 5.1 Get Workspace Structure and Verify Epic
-       #### 5.2 Prepare Story File and Metadata
- … (+5 itens)

### `.aiox-core/development/tasks/security-scan.md` — 790 linhas
- # security-scan
-   ## Purpose
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Step-by-Step Execution
-     ### Step 1: Setup Security Tools
-     ### Step 2: Dependency Vulnerability Scan
-     ### Step 3: Code Security Pattern Scan
-     ### Step 4: Secret Detection
-     ### Step 5: Generate Security Report
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools (External/Shared)
-   ## Scripts (Agent-Specific)
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Prerequisites
-   ## Ferramentas (Instaladas Automaticamente)
-   ## Configuration Dependencies
-   ## Processo de Scan
-     ### Fase 1: Setup Automático
-     ### Fase 2: Dependency Vulnerability Scan
-     ### Fase 3: Code Security Pattern Scan
-     ### Fase 4: Secret Detection
- … (+6 itens)

### `.aiox-core/development/tasks/ci-cd-configuration.md` — 764 linhas
- # Configure CI/CD Pipeline
-   ## Purpose
-   ## Supported CI Providers
-   ## Input
-     ### Required Parameters
-     ### Optional Parameters
-   ## Output
-   ## Process
-     ### Phase 1: Repository Analysis & Validation (2 min)
-     ### Phase 2: CodeRabbit Free Setup (2 min) 🆓
-     ### Phase 3: GitHub Actions Workflow Creation (5 min)
-     ### Phase 4: Branch Protection Rules (3 min)
-     ### Phase 5: Documentation & Testing (3 min)
-   ## Checklist
-     ### Pre-conditions
-     ### Post-conditions
-     ### Acceptance Criteria
-   ## Templates
-     ### README CI/CD Section
-   ## Tools
-   ## Performance
-   ## Error Handling
-   ## Metadata
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
- … (+9 itens)

### `.aiox-core/development/tasks/setup-database.md` — 741 linhas
- # Task: Setup Database
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Elicitation
-   ## Process by Database Type
-     ### Type: Supabase
-       #### Step 1: Install Supabase CLI
-       #### Step 2: Initialize Supabase Project
-       #### Step 3: Create Standard Directories
-       #### Step 5: Create Starter Seed Data
-       #### Step 6: Start Local Development
-     ### Type: PostgreSQL (Standard)
-       #### Step 1: Create Project Structure
-       #### Step 2: Create Connection Config
-       #### Step 3: Create Initial Migration
-       #### Step 4: Create Migration Runner Script
-     ### Type: MongoDB
-       #### Step 1: Create Project Structure
-       #### Step 2: Create Connection Config
- … (+15 itens)

### `.aiox-core/development/tasks/db-rollback.md` — 739 linhas
- # Task: Rollback Database
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Confirm Rollback
-     ### 2. Pre-Rollback Safety Checks
-     ### 3. Validate Rollback Target
-     ### 4. Acquire Exclusive Lock
-     ### 5. Execute Rollback
-     ### 6. Post-Rollback Validation
-     ### 7. Release Lock & Create Post-Rollback Snapshot
-     ### 8. Report Results
-   ## Rollback Strategies
-     ### Strategy 1: Snapshot Restore (Recommended)
-     ### Strategy 2: Explicit Rollback Script
-     ### Strategy 3: Forward Fix
-   ## Rollback Decision Matrix
-   ## Safety Checklist
- … (+24 itens)

### `.aiox-core/development/tasks/create-brownfield-story.md` — 726 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Create Brownfield Story Task
-   ## Purpose
-   ## When to Use This Task
-   ## Task Execution Instructions
-     ### 0. Documentation Context
-     ### 1. Story Identification and Context Gathering
-       #### 1.1 Identify Story Source
-       #### 1.2 Gather Essential Context
-     ### 2. Extract Technical Context from Available Sources
-       #### 2.1 From Document-Project Output
-   ## Configuration Dependencies
-       #### 2.2 From Brownfield PRD
-       #### 2.3 From User Documentation
-     ### 3. Story Creation with Progressive Detail Gathering
-       #### 3.1 Create Initial Story Structure
-       #### 3.2 Develop Acceptance Criteria
-       #### 3.3 Gather Technical Guidance
- … (+7 itens)

### `.aiox-core/development/tasks/github-devops-github-pr-automation.md` — 720 linhas
- # github-pr-automation.md
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Prerequisites
-   ## Workflow Steps
-     ### Step 1: Detect Repository Context
-     ### Step 2: Get Current Branch
-     ### Step 3: Extract Story Information (if available)
-     ### Step 4: Generate PR Title (Configurable Format)
-   ## Configuration Reference
-   ## Title Format Examples
-     ### Step 5: Generate PR Description
-     ### Step 5.1: Enrich PR Description with Impact Analysis (Code Intelligence — Advisory)
-     ### Step 6: Determine Base Branch
-     ### Step 7: Create PR via GitHub CLI
-     ### Step 8: Assign Reviewers (Optional)
-   ## Example Usage
-   ## Integration
-   ## Validation
- … (+7 itens)

### `.aiox-core/development/tasks/qa-review-story.md` — 716 linhas
- # review-story
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Prerequisites
-   ## Review Process - Adaptive Test Architecture
-     ### 0. CodeRabbit Full Self-Healing Loop (Story 6.3.3)
-       #### Severity Handling
-       #### Implementation Code
-       #### Timeout
-       #### Integration with Gate Decision
-     ### 0b. Code Intelligence: Reference Impact (Optional)
-     ### 1. Risk Assessment (Determines Review Depth)
-     ### 2. Comprehensive Analysis
-     ### 3. Active Refactoring
-     ### 4. Standards Compliance Check
-     ### 5. Acceptance Criteria Validation
-     ### 6. Documentation and Comments
-   ## Output 1: Update Story File - QA Results Section ONLY
- … (+9 itens)

### `.aiox-core/development/tasks/db-supabase-setup.md` — 712 linhas
- # Task: Supabase Setup Guide
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Overview
-   ## Process
-     ### 1. Prerequisites Check
-     ### 2. Choose Setup Path
-     ### 3a. New Project Path
-     ### 3b. Existing Project Path
-     ### 3c. Local Only Path
-     ### 4. Initialize DB Sage Structure
-     ### 5. Configure .gitignore
-     ### 6. Set Up Environment Variables
-     ### 7. Apply Initial Schema
-     ### 8. Enable Recommended Extensions
-     ### 9. Configure Database Settings
-     ### 10. Set Up Development Workflow
-   ## Output
-   ## Common Next Steps
- … (+10 itens)

### `.aiox-core/development/tasks/pr-automation.md` — 701 linhas
- # Automate Pull Request Creation for Open-Source Contributions
-   ## Purpose
-   ## Input
-     ### Required Parameters
-     ### Optional Parameters
-   ## Output
-   ## Process
-     ### Phase 1: Pre-Submission Validation (3 min)
-     ### Phase 2: Quality Pre-Check (5 min)
-     ### Phase 3: Branch & Commit Preparation (2 min)
-     ### Phase 4: PR Creation (2 min)
-     ### Phase 5: Post-Submission (1 min)
-   ## Checklist
-     ### Pre-conditions
-     ### Post-conditions
-     ### Acceptance Criteria
-   ## Templates
-     ### PR Template (Auto-Generated)
-     ### Contribution Guidelines Reference
-   ## Tools
-   ## Performance
-   ## Error Handling
-   ## Metadata
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
- … (+14 itens)

### `.aiox-core/development/tasks/analyze-framework.md` — 696 linhas
- # Task: Analyze Framework
-   ## Description
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Type
-   ## Complexity
-   ## Categories
-   ## Dependencies
-   ## Parameters
-   ## Implementation
-   ## Usage Examples
-     ### Basic Analysis
-     ### Scope-specific Analysis
-     ### Summary Output
-     ### Performance-focused Analysis
-   ## Expected Output
-   ## Security Considerations
-   ## Integration

### `.aiox-core/development/tasks/db-domain-modeling.md` — 693 linhas
- # Task: Domain Modeling Session
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Overview
-   ## Process
-     ### 1. Understand the Domain
-     ### 2. Identify Core Entities
-     ### 3. Map Relationships
-     ### 4. Design Tables
-     ### 5. Handle Many-to-Many Relationships
-     ### 6. Apply Business Rules
-     ### 7. Design for Access Patterns
-     ### 8. Add RLS Policies
-     ### 9. Generate Schema Document
-     ### 10. Generate Migration
-   ## Output
-   ## Best Practices
-     ### 1. Start Simple
-     ### 2. Use Standard Patterns
- … (+9 itens)

### `.aiox-core/development/tasks/qa-fix-issues.md` — 692 linhas
- # QA Issue Fixer Task
-   ## Purpose
-   ## autoClaude
-   ## Command Integration (@dev)
-   ## The 8 Phases of QA Issue Fixing
-     ### CRITICAL RULE: No Scope Creep
-   ## Phase-by-Phase Execution Flow
-     ### Phase 0: Load Context
-     ### Phase 1: Parse Requirements
-     ### Phase 2: Start Development
-     ### Phase 3: Fix Issues Sequentially
-     ### Phase 4: Run Tests
-     ### Phase 5: Self-Verification
-     ### Phase 6: Commit Fixes
-     ### Phase 7: Update Plan & Signal
-   ## Summary Output Format
-   ## Error Handling
-   ## Integration with QA Loop
-   ## Examples
-     ### Example 1: Simple Fix
-     ### Example 2: Partial Fix (Some Issues Cannot Be Fixed)
-   ## Metadata
-   ## Handoff

### `.aiox-core/development/tasks/ux-ds-scan-artifact.md` — 672 linhas
- # Design System Artifact Scanner
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## 📋 Description
-   ## 🎯 Objectives
-   ## 📊 Supported Artifact Types
-     ### Type 1: HTML Files
-     ### Type 2: React Components
-     ### Type 3: Screenshots
-     ### Type 4: Live URLs
-   ## 🔄 Workflow
-     ### Step 1: Specify Artifact
-     ### Step 2: Scan & Parse Artifact
-     ### Step 3: Extract Design Tokens
-     ### Step 4: Identify Components (Atomic Design)
-     ### Step 5: Calculate Pattern Redundancy
-     ### Step 6: Generate Build Recommendations
-   ## 📤 Outputs
-     ### Required Files:
- … (+12 itens)

### `.aiox-core/development/tasks/cleanup-utilities.md` — 670 linhas
- # Cleanup Utilities Task
-   ## Purpose
-   ## Safety Principles
-   ## Prerequisites
-   ## Classification Review
-     ### ✅ SAFE TO ARCHIVE
-     ### ⚠️ NEEDS REVIEW
-     ### ❌ DO NOT ARCHIVE
-   ## Configuration Dependencies
-   ## Execution Steps
-     ### Step 1: Pre-Cleanup Preparation
-     ### Step 2: Dependency Verification (CRITICAL)
-     ### Step 3: Create Archive Structure
-     ### Step 4: Execute Cleanup
-     ### Step 5: Update Documentation
-     ### Step 6: Validation (CRITICAL)
-     ### Step 7: Create Rollback Documentation
-   ## Output
-   ## Success Criteria
-   ## Notes
-     ### Windows Compatibility
-     ### Safety Reminders
-     ### Integration with safe-removal-handler.js
-   ## Estimated Time
-   ## Common Issues

### `.aiox-core/development/tasks/analyze-project-structure.md` — 669 linhas
- # Analyze Project Structure
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (3-5 prompts) **[DEFAULT]**
-     ### 3. Comprehensive Mode - Full Analysis
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Task Instructions
-     ### Step 1: Elicitation - Gather Requirements
-     ### Step 2: Project Structure Scan
-     ### Step 3: Pattern Analysis
-       #### 3.1 Language Usage
-       #### 3.2 Testing Approach
-       #### 3.3 Documentation Style
-       #### 3.4 Configuration Patterns
-     ### Step 4: Generate Recommendations
-       #### 4.1 Service Type Recommendation
-       #### 4.2 File Structure Suggestion
-       #### 4.3 Agent Assignment
-     ### Step 5: Generate Output Documents
-       #### 5.1 Project Analysis Document
-       #### 5.2 Recommended Approach Document
-     ### Step 5.5: Code Intelligence: Dependency & Complexity (Optional — Auto-skip if unavailable)
-     ### Step 6: Present Results
- … (+3 itens)

### `.aiox-core/development/tasks/db-squad-integration.md` — 663 linhas
- # Database Integration Analysis for Squad
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Step 1: Identify Target Squad
-     ### Step 2: Audit Squad Data Flows
-     ### Step 3: Analyze Current Database Schema
-     ### Step 4: Design Integration Schema
-     ### Step 5: Validate Integration Design
-     ### Step 6: Generate Migration Plan
-     ### Step 7: Generate Integration Documentation
-     ### Step 8: Output Integration Report
-   ## Success Criteria
-   ## Output Files
-   ## Examples
-     ### CreatorOS Integration
-     ### InnerLens Integration
- … (+2 itens)

### `.aiox-core/development/tasks/db-policy-apply.md` — 653 linhas
- # Task: Apply RLS Policy Template
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## 🚀 NEW: Use Automated RLS Policy Installer (RECOMMENDED)
-   ## Inputs
-   ## Process (Manual Method)
-     ### 1. Validate Inputs
-     ### 2. Check Existing Policies
-     ### 3. Ask User Confirmation
-     ### 4. Generate Policy SQL
-     ### 5. Create Migration File
-     ### 6. Apply Migration
-     ### 7. Test Policies
-   ## Output
-   ## Notes
-     ### KISS vs Granular
-     ### Common Patterns
-     ### Performance Tips
-   ## Security Warnings ⚠️
- … (+5 itens)

### `.aiox-core/development/tasks/db-bootstrap.md` — 642 linhas
- # Task: Bootstrap Supabase Project
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Process
-     ### 1. Confirm Project Setup
-     ### 2. Create Directory Structure
-     ### 3. Create Core Files
-       #### supabase/migrations/README.md
-       #### supabase/seeds/README.md
-       #### supabase/tests/README.md
-       #### supabase/rollback/README.md
-       #### supabase/.gitignore
-     ### 4. Generate config.toml (if Standard or Full)
-     ### 5. Create Baseline Schema (if Full option)
-       #### supabase/migrations/00000000000000_baseline.sql
-     ### 6. Create Initial Smoke Test
-       #### supabase/tests/smoke_test.sql
-     ### 7. Create Migration Log
-       #### supabase/docs/migration-log.md
- … (+17 itens)

### `.aiox-core/development/tasks/run-design-system-pipeline.md` — 640 linhas
- # Run Design System Pipeline
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Pipeline Sequence
-     ### Step 1: Build Components
-     ### Step 2: Generate Documentation
-     ### Step 3: Accessibility Audit
-     ### Step 4: Calculate ROI
-   ## Output
-     ### Final Pipeline Report
-   ## Success Criteria
-   ## Examples
-     ### Example 1: Execução Completa (YOLO Mode)
-     ### Example 2: Execução Interativa
-     ### Example 3: Skip Steps
-   ## Integration
-     ### CI/CD Integration
- … (+2 itens)

### `.aiox-core/development/tasks/analyze-performance.md` — 637 linhas
- # Task: Analyze Performance
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Elicitation
-   ## Process
-     ### Type: Query Analysis (EXPLAIN)
-       #### Step 1: Validate Query
-       #### Step 2: Run EXPLAIN ANALYZE
-       #### Step 3: Analyze Results
-     ### Type: Hotpaths Analysis
-     ### Type: Interactive Optimization
-   ## Output Examples
-     ### Query Analysis Output
-     ### Hotpaths Output
-   ## Recommendations by Analysis Type
-     ### After Query Analysis
-     ### After Hotpaths Analysis
-     ### After Interactive Optimization
-   ## Related Commands

### `.aiox-core/development/tasks/db-explain.md` — 631 linhas
- # Task: EXPLAIN (ANALYZE, BUFFERS)
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Confirm Query
-     ### 2. Run EXPLAIN ANALYZE
-     ### 3. Interpret Results
-   ## Understanding EXPLAIN Output
-     ### Top-Level Metrics
-     ### Node Types (Common Patterns)
-     ### Buffer Analysis
-   ## Common Performance Issues
-     ### Issue 1: Sequential Scan on Large Table
-     ### Issue 2: Missing Index on Join
-     ### Issue 3: High Temp File Usage
-     ### Issue 4: Poor Row Estimate
-     ### Issue 5: Slow RLS Policy
-   ## Optimization Workflow
- … (+19 itens)

### `.aiox-core/development/tasks/qa-create-fix-request.md` — 630 linhas
- # Create Fix Request Task
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Configuration Dependencies
-   ## Command
-   ## Workflow
-     ### Phase 1: Load QA Report
-     ### Phase 2: Extract Issues
-     ### Phase 3: Generate Fix Request
-     ### Phase 4: Notify
-   ## Fix Request Template
-   ## Constraints
-   ## After Fixing
- # QA Fix Request: 6.3
-   ## Instructions for @dev
-   ## Summary
-   ## Issues to Fix
-     ### 1. [CRITICAL] Missing input validation in parseStoryId
-     ### 2. [MAJOR] Test coverage below threshold for QA module
- … (+3 itens)

### `.aiox-core/development/tasks/setup-mcp-docker.md` — 627 linhas
- # Setup Docker MCP Toolkit
-   ## Purpose
-   ## AIOX Default MCPs
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
- # Setup Docker MCP Toolkit
-   ## Purpose
-   ## Architecture Overview
-   ## Prerequisites
-   ## Interactive Elicitation Process
-     ### Step 1: Docker Verification
-     ### Step 2: MCP Selection
-     ### Step 3: Preset Configuration
-     ### Step 4: Credentials Configuration
-   ## Implementation Steps
-     ### 1. Create Project MCP Directory
-     ### 2. Start Gateway as Persistent Service (HTTP Transport)
-     ### 3. Enable AIOX Default MCPs
-     ### 4. Configure Desktop-Commander Path
-     ### 4.1 Configure API Keys (CRITICAL - Known Bug Workaround)
-     ### 5. Configure Claude Code (HTTP Transport)
-     ### 6. Verify Integration
-     ### 7. Test in Claude Code
- … (+15 itens)

### `.aiox-core/development/tasks/test-as-user.md` — 621 linhas
- # Task: Test As User (RLS Testing)
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Elicitation
-   ## Process
-     ### Step 1: Set Session Claims
-     ### Step 2: Test Query Examples
-     ### Step 3: Interactive Testing Session
-   ## Common Testing Scenarios
-     ### Scenario 1: User Can Read Own Data Only
-     ### Scenario 2: User Cannot Read Other Users' Data
-     ### Scenario 3: User Can Insert Own Data
-     ### Scenario 4: User Cannot Update Other Users' Data
-     ### Scenario 5: Admin Can See All Data
-   ## Troubleshooting
-     ### Issue: auth.uid() returns NULL
-     ### Issue: RLS policy not applying
-     ### Issue: "Permission denied" error
- … (+8 itens)

### `.aiox-core/development/tasks/ux-create-wireframe.md` — 617 linhas
- # Create Wireframes & Interaction Flows
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## 📋 Description
-   ## 🎯 Objectives
-   ## 📊 Fidelity Levels
-     ### Low-Fidelity (Lo-Fi)
-     ### Mid-Fidelity (Mid-Fi)
-     ### High-Fidelity (Hi-Fi)
-   ## 🔄 Workflow
-     ### Step 1: Define Wireframe Scope
-     ### Step 2: Review Research Insights
-     ### Step 3: Create Information Architecture
-     ### Step 4: Design Wireframes
-       #### Low-Fidelity (ASCII/Text-Based)
-       #### Mid-Fidelity Wireframe Components
-     ### Step 5: Document Interaction Flows
-     ### Step 6: Add Annotations
-     ### Step 7: Create Component Inventory
-     ### Step 8: Prepare Developer Handoff
- … (+12 itens)

### `.aiox-core/development/tasks/db-run-sql.md` — 613 linhas
- # Task: Run SQL
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Determine Input Type
-     ### 2. Preview SQL
-     ### 3. Safety Checks
-     ### 4. Transaction Mode Selection
-     ### 5. Execute SQL
-     ### 6. Check Results
-   ## Output
-   ## Usage Examples
-     ### Example 1: Run SQL File
-     ### Example 2: Inline Query
-     ### Example 3: Multi-Line Inline
-     ### Example 4: Complex Script
-   ## Safety Features
-     ### 1. Destructive Operation Detection
- … (+16 itens)

### `.aiox-core/development/tasks/resolve-github-issue.md` — 608 linhas
- # resolve-github-issue.md
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Workflow Steps
-     ### Phase 1: Investigate (understand the issue)
-     ### Phase 2: Plan (design the solution)
-     ### Phase 3: Implement (make the changes)
-     ### Phase 4: Validate (test and verify)
-     ### Phase 5: Commit & Push
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Dependencies
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Lessons Learned (from past sessions)
-     ### Issue #159 (Bulk Rename) — Parallel + Edge Cases
-     ### Issue #138 (Copilot Format) — Research-First
-     ### Issue #174 (Package Name) — Quick Win
-     ### Email Removal — User Feedback Mid-Session
-   ## Integration with @devops Agent

### `.aiox-core/development/tasks/spec-critique.md` — 603 linhas
- # Spec Pipeline: Critique Specification
-   ## Purpose
-   ## autoClaude
-   ## Critique Dimensions
-     ### Dimension 1: Accuracy
-     ### Dimension 2: Completeness
-     ### Dimension 3: Consistency
-     ### Dimension 4: Feasibility
-     ### Dimension 5: Alignment
-   ## Verdict Logic
-   ## Execution Flow
-     ### Step 1: Load Artifacts
-     ### Step 2: Run Dimension Checks
-     ### Step 3: Generate Issues
-     ### Step 4: Calculate Verdict
-     ### Step 5: Generate Output
-   ## Output Schema
-   ## Integration
-     ### Command Integration (@qa)
-     ### Pipeline Integration
-   ## Error Handling
-   ## Examples
-     ### Example: Critique with Issues
-   ## Metadata
-   ## Handoff

### `.aiox-core/development/tasks/db-load-csv.md` — 593 linhas
- # Task: Load CSV Data Safely
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Validate Inputs
-     ### 2. Preview CSV Structure
-     ### 3. Create Staging Table
-     ### 4. COPY Data to Staging
-     ### 5. Validate Data
-     ### 6. Merge to Target Table
-     ### 7. Cleanup
-   ## Output
-   ## Best Practices
-     ### CSV Format Requirements
-     ### Handling Large Files
-     ### Data Type Conversion
-   ## Common Issues
-     ### Issue 1: Character Encoding
- … (+6 itens)

### `.aiox-core/development/tasks/qa-migration-validation.md` — 583 linhas
- # Migration Validation Task
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Supported Frameworks
-     ### 1. Supabase
-     ### 2. Prisma
-     ### 3. Drizzle
-     ### 4. Django
-     ### 5. Rails (ActiveRecord)
-     ### 6. Sequelize
-   ## Command
-   ## Workflow
-     ### Phase 1: Detect Framework
-     ### Phase 2: Detect Schema Changes
-     ### Phase 3: Validate Migrations
-     ### Phase 4: Additional Checks
-     ### Phase 5: Generate Report
-   ## Issue Format
-   ## Severity Mapping
-   ## Integration with QA Review
-   ## Example Output
-   ## Checklist Template
-   ## Exit Criteria

### `.aiox-core/development/tasks/brownfield-create-epic.md` — 572 linhas
- # Create Brownfield Epic Task
-   ## Purpose
-   ## When to Use This Task
-   ## Configuration Dependencies
-   ## Instructions
-     ### 0. Code Intelligence: Codebase Overview (Optional — Auto-skip if unavailable)
-       #### Codebase Intelligence
-     ### 1. Project Analysis (Required)
-     ### 2. Epic Creation
-       #### Epic Title
-       #### Epic Goal
-       #### Epic Description
-       #### Stories (Enhanced with Quality Planning)
-       #### Compatibility Requirements
-       #### Risk Mitigation
-       #### Definition of Done
-     ### 3. Validation Checklist
-     ### 4. Handoff to Story Manager
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
- … (+3 itens)

### `.aiox-core/development/tasks/db-analyze-hotpaths.md` — 572 linhas
- # Task: Analyze Hot Query Paths
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Enable Required Extensions
-     ### 2. Identify Hot Queries
-     ### 3. Run EXPLAIN ANALYZE with BUFFERS
-     ### 4. Generate Index Recommendations
-     ### 5. Analyze Results
-     ### 6. Create Analysis Report
-   ## Output
-   ## Common Query Patterns to Check
-     ### Pattern 1: User-Specific Data
-     ### Pattern 2: Joins
-     ### Pattern 3: Filters + Sorts
-     ### Pattern 4: Aggregations
-   ## BUFFERS Output Interpretation
-   ## Supabase-Specific Notes
- … (+5 itens)

### `.aiox-core/development/tasks/db-snapshot.md` — 569 linhas
- # Task: Create Database Snapshot
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Confirm Snapshot Details
-     ### 2. Create Snapshots Directory
-     ### 3. Generate Snapshot
-     ### 4. Verify Snapshot
-     ### 5. Create Snapshot Metadata
-   ## Output
-   ## Snapshot Options
-     ### Schema-Only (Default)
-     ### Schema + Data
-     ### Specific Tables Only
-   ## Best Practices
-     ### When to Snapshot
-     ### Snapshot Naming
-     ### Retention
- … (+18 itens)

### `.aiox-core/development/tasks/qa-risk-profile.md` — 566 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # risk-profile
-   ## Inputs
-   ## Purpose
-   ## Risk Assessment Framework
-     ### Risk Categories
-   ## Risk Analysis Process
-     ### 1. Risk Identification
-     ### 2. Risk Assessment
-     ### Risk Score = Probability × Impact
-     ### 3. Risk Prioritization
-     ### 4. Risk Mitigation Strategies
-   ## Outputs
-     ### Output 1: Gate YAML Block
-     ### Output 2: Markdown Report
-   ## Risk Scoring Algorithm
-   ## Risk-Based Recommendations
-   ## Integration with Quality Gates
- … (+2 itens)

### `.aiox-core/development/tasks/ux-user-research.md` — 559 linhas
- # User Research & Needs Analysis
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## 📋 Description
-   ## 🎯 Objectives
-   ## 📊 Research Methods
-     ### Method 1: User Interviews
-     ### Method 2: Surveys
-     ### Method 3: Analytics Review
-     ### Method 4: Competitor Analysis
-     ### Method 5: Contextual Inquiry
-   ## 🔄 Workflow
-     ### Step 1: Define Research Objectives
-     ### Step 2: Select Research Methods
-     ### Step 3: Prepare Research Materials
-     ### Step 4: Conduct Research
-     ### Step 5: Analyze Findings
-     ### Step 6: Create Personas
-     ### Step 7: Document User Journeys
- … (+8 itens)

### `.aiox-core/development/tasks/qa-nfr-assess.md` — 557 linhas
- # nfr-assess
-   ## Inputs
-   ## Purpose
-   ## Process
-     ### 0. Fail-safe for Missing Inputs
-     ### 1. Elicit Scope
-     ### 2. Check for Thresholds
-     ### 3. Quick Assessment
-     ### 4. Generate Outputs
-   ## Output 1: Gate YAML Block
-   ## Deterministic Status Rules
-   ## Quality Score Calculation
-   ## Output 2: Brief Assessment Report
-   ## Output 3: Story Update Line
-   ## Output 4: Gate Integration Line
-   ## Assessment Criteria
-     ### Security
-     ### Performance
-     ### Reliability
-     ### Maintainability
-   ## Quick Reference
-     ### What to Check
-   ## Key Principles
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
- … (+8 itens)

### `.aiox-core/development/tasks/security-audit.md` — 554 linhas
- # Task: Security Audit
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Elicitation
-   ## Process
-     ### Scope: RLS Audit
-     ### Scope: Schema Audit
-     ### Scope: Full Audit
-   ## Output
-     ### RLS Audit Output
-     ### Schema Audit Output
-   ## Interpretation
-     ### Critical Issues (Fix Immediately)
-     ### High Priority Issues (Fix Soon)
-     ### Medium Priority Issues (Technical Debt)
-   ## Recommendations
-   ## Related Commands

### `.aiox-core/development/tasks/document-project.md` — 552 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # TODO: Create project-documentation-checklist.md for validation (follow-up story needed)
- # checklists:
- # - project-documentation-checklist.md
- # Document an Existing Project
-   ## Purpose
-   ## Task Instructions
-     ### 1. Initial Project Analysis
-     ### 2. Deep Codebase Analysis
-     ### 3. Core Documentation Generation
- # [Project Name] Brownfield Architecture Document
-   ## Introduction
-     ### Document Scope
-     ### Change Log
-   ## Quick Reference - Key Files and Entry Points
-     ### Critical Files for Understanding the System
-     ### If PRD Provided - Enhancement Impact Areas
-   ## High Level Architecture
- … (+32 itens)

### `.aiox-core/development/tasks/spec-gather-requirements.md` — 552 linhas
- # Spec Pipeline: Gather Requirements
-   ## Purpose
-   ## autoClaude
-   ## Execution Flow
-     ### Phase 1: Context Detection
-     ### Phase 2: Elicitation (if source=user)
-     ### Phase 3: PRD Extraction (if source=prd)
-     ### Phase 4: Structuring
-   ## Output Schema
-   ## Integration
-     ### Command Integration (@pm)
-     ### Pipeline Integration
-   ## Error Handling
-   ## Examples
-     ### Example 1: User Elicitation
-   ## Metadata
-   ## Handoff

### `.aiox-core/development/tasks/qa-security-checklist.md` — 551 linhas
- # Security Checklist Task
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Security Patterns (8 Checks)
-     ### Check 1: eval() and Dynamic Code Execution
-     ### Check 2: innerHTML and DOM XSS
-     ### Check 3: dangerouslySetInnerHTML (React)
-     ### Check 4: shell=True (Python)
-     ### Check 5: Hardcoded Secrets
-     ### Check 6: SQL Injection Patterns
-     ### Check 7: Missing Input Validation
-     ### Check 8: Insecure CORS Configuration
-   ## Command
-   ## Workflow
-     ### Phase 1: Collect Files
-     ### Phase 2: Run Security Scans
-     ### Phase 3: Context Analysis
-     ### Phase 4: Generate Report
-   ## Issue Format
-   ## Severity Mapping
-   ## Integration with QA Review
-   ## False Positive Handling
-     ### Known False Positives
-     ### Suppression
-   ## Example Output
- … (+1 itens)

### `.aiox-core/development/tasks/po-pull-story-from-clickup.md` — 540 linhas
- # pull-story-from-clickup
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Task Inputs
-   ## Prerequisites
-   ## Task Execution Steps
-     ### Step 1: Locate Story File
-     ### Step 2: Get ClickUp Task Data
-     ### Step 3: Parse ClickUp Description
-     ### Step 4: Merge with Local Frontmatter
-     ### Step 5: Reconstruct Story File
-     ### Step 6: Write Updated Story File
-     ### Step 7: Display Sync Summary
-   ## Error Handling
-   ## Usage Examples
-     ### Basic Pull
-     ### Force Pull (even if local is newer)
-     ### After ClickUp Updates
-   ## Integration Notes
- … (+5 itens)

### `.aiox-core/development/tasks/shard-doc.md` — 537 linhas
- # No checklists needed - document processing task with built-in validation via md-tree tool
- # Document Sharding Task
-   ## Purpose
-   ## Primary Method: Automatic with markdown-tree
-     ### Installation and Usage
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Manual Method (if @kayvan/markdown-tree-parser is not available or user indicated manual method)
-     ### Task Instructions
-     ### 3. Create Individual Files
-       #### CRITICAL: Filename Translation Rules (Portuguese → English)
-     ### 4. Create Index File
-     ### 5. Preserve Special Content
-     ### 6. Validation
-     ### 7. Report Results
-   ## Important Notes

### `.aiox-core/development/tasks/spec-write-spec.md` — 536 linhas
- # Spec Pipeline: Write Specification
-   ## Purpose
-   ## autoClaude
-   ## Constitutional Gate: No Invention
-     ### No Invention Rule Details
-   ## Spec Template Structure
-   ## 7. Risks & Mitigations
-   ## 8. Open Questions
-   ## 9. Implementation Checklist
-   ## Metadata
-   ## 3. Technical Approach
-     ### 3.1 Architecture Overview
-   ## 4. Dependencies

### `.aiox-core/development/tasks/po-manage-story-backlog.md` — 523 linhas
- # manage-story-backlog
-   ## Purpose
-   ## Prerequisites
-   ## Backlog File Location
-   ## Operations
-     ### 1. Add New Backlog Item
-     ### 2. Update Backlog Item Status
-     ### 3. Review Backlog
-     ### 4. Archive Completed Items
-     ### 5. Generate Backlog Report
-   ## Configuration Dependencies
-   ## Integration Points
-     ### QA Agent Integration
-     ### Dev Agent Integration
-     ### PO Agent Integration
-   ## Backlog Item Lifecycle
-   ## Best Practices
-   ## Example Workflow
-   ## Success Metrics
-   ## Related Tasks
-   ## Related Templates

### `.aiox-core/development/tasks/generate-migration-strategy.md` — 522 linhas
- # Generate Phased Migration Strategy
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Interactive Elicitation
-     ### Steps
-   ## Output
-     ### Output Format
-   ## Critical References
-   ## Success Criteria
-   ## Error Handling
-   ## Security Considerations
-   ## Examples
-     ### Example 1: Migration Strategy Generation
-     ### Example 2: Component Mapping
-   ## Notes

### `.aiox-core/development/tasks/qa-after-creation.md` — 519 linhas
- # Task: QA After Creation
-   ## When This Task Runs
-   ## Inputs
-   ## QA Flow
-   ## PHASE 1: Quick Checks
-   ## PHASE 2: Security Scan
-   ## PHASE 3: Structure Validation
-   ## PHASE 4: Quality Scoring
-   ## PHASE 5: Report & Action
-     ### Report Format
-     ### Actions Based on Result
-   ## Integration with Creation Tasks
-     ### How to Trigger QA
-     ### Example Flow
-   ## CLI Usage
-   ## Outputs
-   ## Related Tasks
-   ## Changelog

### `.aiox-core/development/tasks/facilitate-brainstorming-session.md` — 518 linhas
- # Facilitate Brainstorming Session
-   ## Purpose
-   ## Input
-     ### Required Parameters
-     ### Optional Parameters
-   ## Output
-   ## Process
-     ### Phase 1: Setup & Context Loading (5 min)
-     ### Phase 2: Divergent Thinking - Idea Generation (10-15 min)
-     ### Phase 3: Convergent Thinking - Categorization (5-10 min)
-     ### Phase 4: Evaluation & Prioritization (5-10 min)
-     ### Phase 5: Documentation & Actionability (5 min)
-   ## Checklist
-     ### Pre-conditions
-     ### Post-conditions
-     ### Acceptance Criteria
-   ## Templates
-     ### Session Report Template
-   ## Tools
-   ## Performance
-   ## Error Handling
-   ## Metadata
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
- … (+8 itens)

### `.aiox-core/development/tasks/db-verify-order.md` — 515 linhas
- # Task: Verify DDL Ordering
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Extract DDL Sections
-     ### 2. Analyze Ordering
-     ### 3. Run Heuristic Checks
-     ### 4. Report Results
-   ## Correct Ordering Examples
-     ### ✅ Good Order
-     ### ❌ Bad Order (Will Fail)
-   ## Common Dependency Patterns
-     ### Pattern 1: Functions Calling Other Functions
-     ### Pattern 2: Tables with Foreign Keys
-     ### Pattern 3: Views on Views
-     ### Pattern 4: RLS Using Functions
-   ## Manual Review Checklist
-   ## Integration with Workflow
- … (+3 itens)

### `.aiox-core/development/tasks/modify-workflow.md` — 509 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Step 0: IDS Impact Analysis (Advisory)
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Modify Workflow Task
-   ## Purpose
-   ## Prerequisites
-   ## Task Execution
-     ### 1. Workflow Analysis and Backup
-     ### 2. Dependency and Impact Analysis
-     ### 3. Modification Intent Processing
-     ### 4. Phase Sequencing Validation
-     ### 5. Mermaid Diagram Update
-     ### 6. Generate Modification Diff
-     ### 7. Validation Pipeline
-     ### 8. Workflow Simulation
-     ### 9. User Approval Flow
-     ### 10. Apply Modifications
-     ### 11. Post-Modification Validation
-     ### 12. Rollback Capability
- … (+4 itens)

### `.aiox-core/development/tasks/validate-next-story.md` — 509 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Validate Next Story Task
-   ## Purpose
-   ## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)
-     ### 0. Load Core Configuration and Inputs
-     ### 1. Template Completeness Validation
-     ### 1.1 Executor Assignment Validation (Story 11.1 - Projeto Bob)
-     ### 2. File Structure and Source Tree Validation
-     ### 3. UI/Frontend Completeness Validation (if applicable)
-     ### 4. Acceptance Criteria Satisfaction Assessment
-     ### 5. Validation and Testing Instructions Review
-     ### 6. Security Considerations Assessment (if applicable)
-     ### 7. Tasks/Subtasks Sequence Validation
-     ### 8. CodeRabbit Integration Validation (CONDITIONAL)
-     ### 8.1 Code Intelligence: No Duplicate Functionality (Auto-skip if unavailable)
-     ### 9. Anti-Hallucination Verification
-     ### 10. Dev Agent Implementation Readiness
-     ### 11. Generate Validation Report
- … (+12 itens)

### `.aiox-core/development/tasks/init-project-status.md` — 506 linhas
- # init-project-status
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Inputs
-   ## Elicitation
-   ## Steps
-     ### Step 1: Detect Git Repository
-     ### Step 2: Check Current Configuration
-     ### Step 3: Enable Project Status in Config
-     ### Step 4: Create .aiox Directory
-     ### Step 5: Initialize Status Cache
-     ### Step 6: Test Status Display
-     ### Step 7: Update .gitignore
-     ### Step 8: Display Success Summary
-   ## Outputs
-     ### Files Created
-     ### Files Modified
-     ### System State
-   ## Validation
- … (+11 itens)

### `.aiox-core/development/tasks/create-deep-research-prompt.md` — 505 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # No checklists needed - this task creates research prompts, validation is built into the research methodology
- # Create Deep Research Prompt Task
-   ## Purpose
-   ## Research Type Selection
-     ### 1. Research Focus Options
-     ### 2. Input Processing
-   ## Process
-     ### 3. Research Prompt Structure
-       #### A. Research Objectives
-       #### B. Research Questions
-       #### C. Research Methodology
-       #### D. Output Requirements
-     ### 4. Prompt Generation
-     ### 5. Review and Refinement
-     ### 6. Next Steps Guidance
-   ## Important Notes
-   ## Handoff

### `.aiox-core/development/tasks/generate-shock-report.md` — 501 linhas
- # Generate Visual Shock Report
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Interactive Elicitation
-     ### Steps
-   ## Output
-     ### Output Format
-   ## Success Criteria
-   ## Error Handling
-   ## Security Considerations
-   ## Examples
-     ### Example 1: Generate Shock Report
-     ### Example 2: Opening the Report
-   ## Notes

### `.aiox-core/development/tasks/qa-library-validation.md` — 496 linhas
- # Library Validation Task
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Command
-   ## Workflow
-     ### Phase 1: Extract Imports
-     ### Phase 2: Resolve Library IDs
-     ### Phase 3: Validate API Usage
-     ### Phase 4: Generate Report
-   ## Validation Checklist
-   ## Issue Severity Mapping
-   ## Integration with QA Review
-   ## Example Output
-   ## Exit Criteria

### `.aiox-core/development/tasks/db-impersonate.md` — 495 linhas
- # Task: Impersonate User (RLS Testing)
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Confirm Impersonation
-     ### 2. Set Session Claims
-     ### 3. Interactive SQL Session
-   ## Testing Scenarios
-     ### Positive Test (Should Succeed)
-     ### Negative Test (Should Fail or Return Empty)
-     ### Multi-Tenant Test
-   ## Common Use Cases
-     ### Test New RLS Policy
-     ### Debug Access Issues
-     ### Validate Multi-User Scenario
-   ## Important Notes
-     ### Session-Local Only
-     ### Not for Production
- … (+9 itens)

### `.aiox-core/development/tasks/modo-navegador-browser-access.md` — 491 linhas
- # modo-navegador-browser-access
-   ## Propósito
-   ## Pré-requisito obrigatório
-   ## Verificação de processo duplicado
-   ## Fechar o Chrome do Modo Navegador (obrigatório após "vou parar", 08-09/08/2026)
-   ## Comando validado (literal — não parafrasear)
-   ## Verificação da porta (obrigatória antes de conectar via Playwright)
-   ## Conexão via Playwright
-   ## Reusar aba já aberta antes de abrir nova — obrigatório (crítico, 18/08/2026)
-   ## Uso de `bringToFront()` — regra obrigatória (crítica, 04/08/2026)
-   ## Sempre desconectar com `browser.close()` — regra obrigatória (crítica, 05/08/2026)
-   ## `context.newPage()` traz a janela pro primeiro plano — regra obrigatória (crítica, 05/08/2026)
-   ## Abrir aba em segundo plano via CDP — correção da causa raiz (crítica, 07/08/2026)
-   ## Vigia de foco por evento — solução definitiva (crítica, 05/08/2026)
-   ## `--headless=new` — por que foi descartado definitivamente (05/08/2026)
-   ## Protocolo de falha (obrigatório, sem exceção)
-   ## Ler texto vs tirar print — critério obrigatório (07/08/2026)
-   ## Ler/escrever no Google Sheets sem API e sem print (crítica, 08/08/2026)
-   ## Mesclar células no Google Sheets — requer 2 cliques, não 1 (crítica, 13/08/2026)
-   ## Achar URLs de favoritos do Chrome (crítica, 08/08/2026)
-   ## Riscos conhecidos (documentados, sem solução técnica — só ciência)
-   ## Pendências relacionadas (não fazem parte deste procedimento — registradas separadamente no caderno do projeto)

### `.aiox-core/development/tasks/github-devops-version-management.md` — 483 linhas
- # version-management.md
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Prerequisites
-   ## Semantic Versioning Rules
-   ## Keywords for Detection
-   ## Workflow Steps
-     ### Step 1: Detect Repository Context
-     ### Step 2: Get Last Git Tag
-     ### Step 3: Analyze Commits Since Last Tag
-     ### Step 4: Recommend Version Bump
-     ### Step 5: User Confirmation
-     ### Step 6: Update package.json
-     ### Step 7: Create Git Tag
-     ### Step 8: Generate Changelog
-   ## Example Implementation
-   ## Usage
-   ## Validation
-   ## Notes

### `.aiox-core/development/tasks/qa-gate.md` — 480 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # qa-gate
-   ## Purpose
-   ## Prerequisites
-   ## Gate File Location
-   ## Minimal Required Schema
-   ## Schema with Issues
-   ## Schema when Waived
-   ## Code Intelligence Enhancement (Optional)
-     ### Code Intelligence: Blast Radius
-     ### Code Intelligence: Test Coverage
-     ### Code Intelligence: Gate Influence
-   ## Gate Decision Criteria
-     ### PASS
-     ### CONCERNS
-     ### FAIL
-     ### WAIVED
-   ## Severity Scale
- … (+10 itens)

### `.aiox-core/development/tasks/sm-create-next-story.md` — 480 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Create Next Story Task
-   ## Purpose
-   ## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)
-     ### 0. Load Core Configuration and Check Workflow
-     ### 1. Identify Next Story for Preparation
-       #### 1.1 Locate Epic Files and Review Existing Stories
-     ### 2. Gather Story Requirements and Previous Story Context
-     ### 3. Gather Architecture Context
-       #### 3.1 Determine Architecture Reading Strategy
-       #### 3.2 Read Architecture Documents Based on Story Type
-       #### 3.3 Extract Story-Specific Technical Details
-     ### 4. Verify Project Structure Alignment
-     ### 5. Populate Story Template with Full Context
-       #### 5.1 Get Workspace Structure and Verify Epic
-       #### 5.2 Prepare Story File and Metadata
-       #### 5.3 Create Story Task in ClickUp
-       #### 5.4 Update Story Frontmatter with ClickUp Data
- … (+1 itens)

### `.aiox-core/development/tasks/build-component.md` — 478 linhas
- # Build Production-Ready Component
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Interactive Elicitation
-     ### Steps
-   ## Output
-     ### Output Format
-   ## Success Criteria
-   ## Error Handling
-   ## Security Considerations
-   ## Examples
-     ### Example 1: Build Button Component
-     ### Example 2: Build Input Component
-   ## Notes

### `.aiox-core/development/tasks/document-gotchas.md` — 477 linhas
- # Document Gotchas Task
-   ## Purpose
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Workflow
-     ### Command: `*list-gotchas` (AC7)
-     ### Command: `*document-gotchas [command] [options]`
-   ## Execution Steps
-     ### 1. Initialize
-     ### 2. Load Existing (if update)
-     ### 3. Scan Insights Files
-     ### 4. Process and Deduplicate
-     ### 5. Generate Output
-   ## Integration Points
-     ### 1. Session Insights Capture (Story 7.1)
-     ### 2. Self-Critique Integration (Epic 4 - AC5)
-     ### 3. Spec Writer Integration (Epic 3)
-   ## Session Insights Schema
-   ## Output Format
-     ### gotchas.md Structure (AC2, AC3)
-     ### gotchas.json Schema (AC6)
-   ## CLI Examples
-   ## Error Handling
-   ## Performance
-   ## Scripts
-   ## Dependencies
-   ## Metadata

### `.aiox-core/development/tasks/qa-trace-requirements.md` — 476 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # trace-requirements
-   ## Purpose
-   ## Prerequisites
-   ## Traceability Process
-     ### 1. Extract Requirements
-     ### 2. Map to Test Cases
-     ### 3. Coverage Analysis
-     ### 4. Gap Identification
-   ## Outputs
-     ### Output 1: Gate YAML Block
-     ### Output 2: Traceability Report
-   ## Traceability Best Practices
-     ### Given-When-Then for Mapping (Not Test Code)
-     ### Coverage Priority
-     ### Test Granularity
-   ## Quality Indicators
-   ## Red Flags
- … (+3 itens)

### `.aiox-core/development/tasks/dev-backlog-debt.md` — 469 linhas
- # Dev Task: Register Technical Debt
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Task Flow
-     ### 1. Elicit Technical Debt Details
-     ### 2. Validate Input
-     ### 3. Add to Backlog
-     ### 4. Regenerate Backlog
-     ### 5. Summary Output
-   ## Example Usage
-   ## Dev-Specific Guidelines
-     ### When to Register Technical Debt
-   ## Error Handling
-   ## Testing
-   ## npm Script Integration

### `.aiox-core/development/tasks/extract-tokens.md` — 467 linhas
- # Extract Design Tokens from Consolidated Patterns
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Interactive Elicitation
-     ### Steps
-   ## Output
-     ### Output Format
-   ## Success Criteria
-   ## Error Handling
-   ## Security Considerations
-   ## Examples
-     ### Example 1: Full Token Generation
-     ### Example 2: CSS Output Preview
-   ## Notes

### `.aiox-core/development/tasks/setup-design-system.md` — 462 linhas
- # Setup Design System Structure
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Interactive Elicitation
-     ### Steps
-   ## Output
-     ### Output Format
-   ## Success Criteria
-   ## Error Handling
-   ## Security Considerations
-   ## Examples
-     ### Example 1: Brownfield Setup (From Brad)
-     ### Example 2: Greenfield Setup
-   ## Notes

### `.aiox-core/development/tasks/spec-assess-complexity.md` — 461 linhas
- # Spec Pipeline: Assess Complexity
-   ## Purpose
-   ## autoClaude
-   ## Complexity Dimensions
-     ### Dimension 1: Scope
-     ### Dimension 2: Integration
-     ### Dimension 3: Infrastructure
-     ### Dimension 4: Knowledge
-     ### Dimension 5: Risk
-   ## Classification Thresholds
-   ## Execution Flow
-     ### Step 1: Load Requirements
-     ### Step 2: Analyze Codebase (if needed)
-     ### Step 3: Score Dimensions
-     ### Step 4: Calculate Result
-     ### Step 5: Generate Output
-   ## Output Schema
-   ## Integration
-     ### Command Integration (@architect)
-     ### Pipeline Integration
-   ## Error Handling
-   ## Examples
-     ### Example: Login Feature Assessment
-   ## Metadata

### `.aiox-core/development/tasks/po-sync-story-to-clickup.md` — 457 linhas
- # sync-story-to-clickup
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Task Inputs
-   ## Prerequisites
-   ## Task Execution Steps
-     ### Step 1: Locate Story File
-     ### Step 2: Parse Story File
-     ### Step 3: Prepare Sync Data
-     ### Step 4: Sync to ClickUp
-     ### Step 5: Verify Sync Success
-     ### Step 6: Output Results
-   ## Error Handling
-   ## Usage Examples
-     ### Basic Sync
-     ### Force Sync (even if no changes)
-     ### After Manual Edits
-   ## Integration Notes
-   ## Technical Implementation
- … (+1 itens)

### `.aiox-core/development/tasks/analyze-brownfield.md` — 456 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Analyze Brownfield Project
-   ## Purpose
-   ## Task Instructions
-     ### 1. Run Project Analysis
-     ### 2. Review Analysis Results
-     ### 3. Display Migration Report
-     ### 4. Interpret Merge Strategy
-     ### 5. Address Manual Review Items
-     ### 6. Handle Conflicts
-     ### 7. Proceed with Integration
-   ## Success Criteria
-   ## Output Options
-   ## Integration with Other Tasks
-   ## Notes

### `.aiox-core/development/tasks/calculate-roi.md` — 455 linhas
- # Calculate ROI and Cost Savings
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Interactive Elicitation
-     ### Steps
-   ## Output
-     ### Output Format
-   ## Success Criteria
-   ## Error Handling
-   ## Security Considerations
-   ## Examples
-     ### Example 1: ROI Calculation
-     ### Example 2: Executive Summary
-   ## Notes

### `.aiox-core/development/tasks/spec-research-dependencies.md` — 449 linhas
- # Spec Pipeline: Research Dependencies
-   ## Purpose
-   ## autoClaude
-   ## Skip Conditions
-   ## Execution Flow
-     ### Step 1: Extract Research Targets
-     ### Step 2: Check Existing Codebase
-     ### Step 3: Research via Context7
-     ### Step 4: Fallback to EXA (if needed)
-     ### Step 5: Check Technical Preferences
-     ### Step 6: Generate Research Output
-   ## Output Schema
-   ## Integration
-     ### Command Integration (@analyst)
-     ### Pipeline Integration
-     ### Tool Configuration
-   ## Error Handling
-   ## Examples
-     ### Example: Zustand Research
-   ## Metadata

### `.aiox-core/development/tasks/modify-task.md` — 440 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Step 0: IDS Impact Analysis (Advisory)
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Modify Task Task
-   ## Purpose
-   ## Prerequisites
-   ## Task Execution
-     ### 1. Task Analysis and Backup
-     ### 2. Usage Impact Analysis
-     ### 3. Modification Intent Processing
-     ### 4. Elicitation Flow Preservation
-     ### 5. Generate Modification Diff
-     ### 6. Validation Pipeline
-     ### 7. Backward Compatibility Check
-     ### 8. User Approval Flow
-     ### 9. Apply Modifications
-     ### 10. Post-Modification Testing
-     ### 11. Rollback Capability
-   ## Safety Measures
- … (+3 itens)

### `.aiox-core/development/tasks/setup-project-docs.md` — 440 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Setup Project Documentation
-   ## Purpose
-   ## Task Instructions
-     ### 1. Detect Installation Mode
-     ### 2. Elicit Deployment Configuration (Greenfield/Brownfield)
-     ### 3. Generate Documentation
-     ### 4. Generate Core Configuration
-     ### 5. Generate/Merge .gitignore
-     ### 6. Verify Configuration-Driven Architecture
-   ## Success Criteria
-   ## Output
-   ## Notes

### `.aiox-core/development/tasks/create-worktree.md` — 437 linhas
- # create-worktree
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts) **[DEFAULT]**
-     ### 2. Interactive Mode - Balanced, Educational (2-3 prompts)
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Description
-   ## Inputs
-   ## Elicitation
-   ## Steps
-     ### Step 1: Validate Git Repository
-     ### Step 2: Parse Story ID
-     ### Step 3: Check Existing Worktree
-     ### Step 4: Check Worktree Limit
-     ### Step 5: Create Worktree
-     ### Step 6: Display Success
-   ## Outputs
-     ### Return Value
-     ### File System
-   ## Validation
-   ## Error Handling
-     ### Not a Git Repository
-     ### Worktree Already Exists
-     ### Max Worktrees Reached
-     ### Git Worktree Command Failed
-   ## Rollback
-   ## Performance Notes
- … (+6 itens)

### `.aiox-core/development/tasks/mcp-workflow.md` — 437 linhas
- # MCP Workflow Creation Task
-   ## Task Definition
-   ## Pre-Conditions
-   ## Interactive Elicitation
-     ### Step 1: Workflow Basics
-     ### Step 2: MCP Selection
-     ### Step 3: Input/Output Specification
-     ### Step 4: Workflow Logic
-     ### Step 5: Error Handling
-   ## Implementation Steps
-     ### 1. Create Workflow File
-     ### 2. Save to Workflows Directory
-     ### 3. Test the Workflow
-     ### 4. Document the Workflow
-   ## Post-Conditions
-   ## Success Output
-   ## Workflow Templates
-     ### Data Processing
-     ### Web Scraping
-     ### API Integration
-   ## Token Savings Comparison
-   ## Metadata

### `.aiox-core/development/tasks/add-mcp.md` — 436 linhas
- # Add MCP Server Task
-   ## Task Definition
-   ## Pre-Conditions
-   ## Interactive Elicitation
-     ### Step 1: Search MCP Catalog
-     ### Step 2: Select from Results
-     ### Step 3: Configure Credentials
-     ### Step 4: Confirm Addition
-   ## Implementation Steps
-     ### 1. Search Catalog
-     ### 2. Get MCP Details
-     ### 3. Add MCP Server
-     ### 3.1 Configure Credentials (CRITICAL - Known Bug Workaround)
-     ### 4. Update Gordon Config (Optional)
-     ### 5. Verify Addition
-     ### 6. Add to Preset (Optional)
-     ### 7. Update AIOX Documentation (REQUIRED)
-     ### 8. Notify User About Session Restart (CRITICAL)
-     ### 9. Verify Tools Available in New Session
-   ## Post-Conditions
-   ## Error Handling
-     ### Error: MCP Not Found
-     ### Error: Credentials Missing / Tools Not Loading
-     ### Error: MCP Fails to Start
-   ## Success Output
-   ## Common MCPs Reference
-   ## Metadata

### `.aiox-core/development/tasks/po-close-story.md` — 434 linhas
- # PO Task: Close Story
-   ## Overview
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Task Flow
-     ### 1. Elicit Story and Merge Info
-     ### 2. Read and Parse Story
-     ### 3. Update Story Status and Changelog
-     ### 4. Update Epic Index (if applicable)
-     ### 5. Suggest Next Story
-     ### 6. Update Backlog Statistics (optional)
-     ### 7. Summary Output
-   ## Error Handling
-   ## Example Usage
-   ## Integration Points
-   ## Testing
-   ## Metadata
-   ## Handoff

### `.aiox-core/development/tasks/remove-worktree.md` — 433 linhas
- # remove-worktree
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Safe, Confirming (2-3 prompts) **[DEFAULT]**
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Description
-   ## Inputs
-   ## Elicitation
-   ## Steps
-     ### Step 1: Validate Git Repository
-     ### Step 2: Parse Story ID
-     ### Step 3: Check Worktree Exists
-     ### Step 4: Get Worktree Info
-     ### Step 5: Check Uncommitted Changes
-     ### Step 6: Confirm Removal (Interactive)
-     ### Step 7: Remove Worktree
-     ### Step 8: Display Success
-   ## Outputs
-     ### Return Value
-   ## Validation
-   ## Error Handling
-     ### Worktree Not Found
-     ### Currently Inside Worktree
-     ### Uncommitted Changes (without --force)
-     ### Git Command Failed
-   ## Manual Cleanup
-   ## Performance Notes
-   ## Dependencies
- … (+4 itens)

### `.aiox-core/development/tasks/create-workflow.md` — 430 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Step 0: IDS Registry Check (Advisory)
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # TODO: Create workflow-validation-checklist.md for validation (follow-up story needed)
- # checklists:
- # - workflow-validation-checklist.md
- # Create Workflow
-   ## Purpose
-   ## Prerequisites
-   ## Interactive Elicitation Process
-     ### Step 0: Target Context
-     ### Step 1: Workflow Overview
-     ### Step 2: Workflow Sequence Design
-     ### Step 3: Agent Orchestration
-     ### Step 4: Resource Requirements
-   ## Implementation Steps
-   ## Validation Checklist
-   ## Error Handling
-   ## Success Output
- … (+1 itens)

### `.aiox-core/development/tasks/audit-codebase.md` — 429 linhas
- # Audit Codebase for UI Pattern Redundancy
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Interactive Elicitation
-     ### Steps
-   ## Output
-     ### Output Format
-   ## Success Criteria
-   ## Error Handling
-   ## Security Considerations
-   ## Examples
-     ### Example 1: React Codebase Scan
-     ### Example 2: Vue Codebase Scan
-   ## Notes

### `.aiox-core/development/tasks/qa-backlog-add-followup.md` — 425 linhas
- # QA Task: Add Follow-up to Backlog
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Task Flow
-     ### 1. Elicit Follow-up Details
-     ### 2. Validate Related Story
-     ### 3. Add to Backlog
-     ### 4. Update Story QA Results (Optional)
-     ### 5. Regenerate Backlog
-     ### 6. Summary Output
-   ## Example Usage
-   ## QA-Specific Rules
-   ## Error Handling
-   ## Testing

### `.aiox-core/development/tasks/consolidate-patterns.md` — 414 linhas
- # Consolidate Patterns Using Intelligent Clustering
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Interactive Elicitation
-     ### Steps
-   ## Output
-     ### Output Format
-   ## Success Criteria
-   ## Error Handling
-   ## Security Considerations
-   ## Examples
-     ### Example 1: Successful Consolidation
-     ### Example 2: User Override
-   ## Notes

### `.aiox-core/development/tasks/create-service.md` — 414 linhas
- # Create Service
-   ## Purpose
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Interactive Elicitation Process
-     ### Step 1: Service Name
-     ### Step 2: Service Type
-     ### Step 3: Authentication
-     ### Step 4: Description
-     ### Step 5: Environment Variables
-   ## Implementation Steps
-     ### Step 0: Code Intelligence Duplicate Check (Pre-Scaffold)
-     ### Step 1: Validate Inputs
-     ### Step 2: Load Templates
-     ### Step 3: Prepare Template Context
-     ### Step 4: Generate Files
-     ### Step 5: Post-Generation
-   ## Handlebars Helpers Required
-   ## Post-Conditions
-   ## Error Handling
-   ## Performance
-   ## Success Output
-   ## Metadata

### `.aiox-core/development/tasks/db-rls-audit.md` — 411 linhas
- # Task: RLS Audit
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Process
-     ### Run Comprehensive RLS Audit
-   ## Output Interpretation
-     ### RLS Status
-     ### Policy Coverage
-   ## Common Issues & Fixes
-     ### Issue: Table has RLS but no policies
-     ### Issue: Table has no RLS
-     ### Issue: Incomplete policy coverage (granular)
-   ## Recommended Actions
-     ### For Public Data
-     ### For User-Owned Data
-     ### For Multi-Tenant Data
-   ## Testing RLS Policies
-   ## Best Practices
-   ## Integration with Workflow

### `.aiox-core/development/tasks/squad-creator-extend.md` — 411 linhas
- # Extend Squad Task
-   ## Purpose
-   ## Story Reference
-   ## Pre-Conditions
-   ## Elicitation Flow (Interactive Mode)
-   ## Direct Mode (Flags)
-   ## Execution Steps
-     ### Step 1: Validate Squad Exists
-     ### Step 2: Collect Component Info
-     ### Step 3: Create Component File
-     ### Step 4: Update Manifest
-     ### Step 5: Validate
-     ### Step 6: Display Result
-   ## Component Templates
-   ## Error Handling
-     ### Error 1: Squad Not Found
-     ### Error 2: Invalid Component Name
-     ### Error 3: Component Already Exists
-     ### Error 4: Agent Not Found (for tasks)
-     ### Error 5: Manifest Update Failed
-   ## Security Considerations
-     ### Path Traversal Prevention
-     ### Overwrite Protection
-     ### Backup Before Update
-   ## Post-Conditions
-   ## Dependencies
-   ## Metadata

### `.aiox-core/development/tasks/update-manifest.md` — 409 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Update Manifest
-   ## Purpose
-   ## Prerequisites
-   ## Interactive Elicitation Process
-     ### Step 1: Manifest Selection
-     ### Step 2: Agent Categorization
-     ### Step 3: Team Composition
-   ## Implementation Steps
-   ## Validation Checklist
-   ## Error Handling
-   ## Rollback Procedure
-   ## Success Output
-   ## Security Notes

### `.aiox-core/development/tasks/squad-creator-sync-ide-command.md` — 402 linhas
- # \*command
-   ## Uso
-   ## Output Exemplo
-   ## Configuração
-     ### .aiox-sync.yaml
-     ### Squad Aliases
-   ## Workflow Interno
-   ## Conversão de Formatos
-     ### MD → MDC (Cursor)
-     ### Extração de Description
-   ## Flags
-   ## Tipos de Componentes
-     ### Agent (`*command agent {name}`)
-     ### Task (`*command task {name}`)
-     ### Workflow (`*command workflow {name}`)
-     ### Squad (`*command squad {name}`)
-   ## Error Handling
-   ## Implementation Guide
-     ### Para Execução pelo Agent
-   ## Related Tasks
-   ## Changelog

### `.aiox-core/development/tasks/extract-patterns.md` — 397 linhas
- # Extract Patterns
-   ## Purpose
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Implementation Steps
-     ### Step 1: Check Help Flag
-     ### Step 2: Initialize Pattern Extractor
-     ### Step 3: Detect Patterns
-     ### Step 4: Execute Subcommand
-       #### Extract (Default)
-       #### JSON Output
-       #### Save to Default Location
-       #### Merge with Existing
-   ## Help Text
-   ## Output Formats
-     ### Markdown Output (Default)
-     ### JSON Output
-     ### Summary Output
-   ## Post-Conditions
-   ## Integration with Spec Writer
-     ### Reference in Spec Writer
-   ## Error Handling
-   ## Performance
-   ## CLI Script
-   ## Metadata

### `.aiox-core/development/tasks/modify-agent.md` — 397 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Step 0: IDS Impact Analysis (Advisory)
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Modify Agent Task
-   ## Purpose
-   ## Prerequisites
-   ## Task Execution
-     ### 1. Agent Analysis and Backup
-     ### 2. Modification Intent Processing
-     ### 3. Dependency Resolution
-     ### 4. Generate Modification Diff
-     ### 5. Validation Pipeline
-     ### 6. User Approval Flow
-     ### 7. Apply Modifications
-     ### 8. Post-Modification Validation
-     ### 9. Rollback Capability
-   ## Safety Measures
-   ## Output Format
-   ## Error Handling
- … (+1 itens)

### `.aiox-core/development/tasks/db-seed.md` — 390 linhas
- # Task: Apply Seed Data
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Pre-Flight Checks
-     ### 2. Validate Seed File
-     ### 3. Create Snapshot (Optional but Recommended)
-     ### 4. Apply Seed Data
-     ### 5. Verify Seed Data
-     ### 6. Document Seed
-   ## Output
-   ## Idempotent Seed Pattern
-   ## Error Handling
-   ## Notes

### `.aiox-core/development/tasks/create-task.md` — 389 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Step 0: IDS Registry Check (Advisory)
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # TODO: Create task-validation-checklist.md for validation (follow-up story needed)
- # checklists:
- # - task-validation-checklist.md
- # Create Task
-   ## Purpose
-   ## Prerequisites
-   ## Interactive Elicitation Process
-     ### Step 1: Task Definition
-     ### Step 2: Task Workflow
-     ### Step 3: Elicitation Requirements
-     ### Step 4: Dependencies and Integration
-   ## Implementation Steps
-   ## Validation Checklist
-   ## Error Handling
-   ## Success Output

### `.aiox-core/development/tasks/run-workflow.md` — 388 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Run Workflow Task
-   ## Purpose
-   ## Prerequisites
-   ## Elicitation Points
-   ## Task Execution
-     ### Mode Dispatch
-     ### Action: `start`
-     ### Action: `continue` (default)
-     ### Action: `status`
-     ### Action: `skip`
-     ### Action: `abort`
-   ## Multi-Session Continuity
-   ## Output Format

### `.aiox-core/development/tasks/index-docs.md` — 387 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # No checklists needed - this task maintains documentation index, validation is through file system checks
- # Index Documentation Task
-   ## Purpose
-   ## Task Instructions
-     ### Required Steps
-     ### Index Structure Format
-     ### Index Entry Format
-     ### Rules of Operation
-     ### Process Output
-     ### Handling Missing Files
-     ### Special Cases
-   ## Required Input

### `.aiox-core/development/tasks/qa-test-design.md` — 387 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # test-design
-   ## Inputs
-   ## Purpose
-   ## Dependencies
-   ## Process
-     ### 1. Analyze Story Requirements
-     ### 2. Apply Test Level Framework
-     ### 3. Assign Priorities
-     ### 4. Design Test Scenarios
-     ### 5. Validate Coverage
-   ## Outputs
-     ### Output 1: Test Design Document
-     ### Output 2: Gate YAML Block
-     ### Output 3: Trace References
-   ## Quality Checklist
-   ## Key Principles

### `.aiox-core/development/tasks/db-apply-migration.md` — 381 linhas
- # Task: Apply Migration (with snapshot + advisory lock)
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Pre-Flight Checks
-     ### 2. Acquire Advisory Lock
-     ### 3. Pre-Migration Snapshot
-     ### 4. Apply Migration
-     ### 5. Post-Migration Snapshot
-     ### 6. Generate Diff (Optional)
-     ### 7. Release Advisory Lock
-     ### 8. Post-Migration Actions
-   ## Success Output
-   ## Rollback Instructions
-   ## Error Handling
-     ### Migration Fails Mid-Execution
-     ### Lock Already Held
-     ### Snapshot Creation Fails
- … (+1 itens)

### `.aiox-core/development/tasks/github-devops-repository-cleanup.md` — 374 linhas
- # repository-cleanup.md
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Prerequisites
-   ## Cleanup Operations
-     ### 1. Identify Stale Branches
-     ### 2. Identify Temporary Files
-     ### 3. Present Cleanup Suggestions
-     ### 4. Execute Cleanup
-   ## Safety Checks
-   ## Integration
-   ## Validation
-   ## Notes

### `.aiox-core/development/tasks/qa-false-positive-detection.md` — 374 linhas
- # False Positive Detection Task
-   ## Task Definition
-   ## The Problem: Confirmation Bias in QA
-   ## Verification Checklist
-     ### 1. Assumptions Verification
-     ### 2. Causation Tests
-     ### 3. Confirmation Bias Checks
-     ### 4. Edge Case Verification
-   ## Confidence Scoring
-   ## Command
-   ## Workflow
-     ### Phase 1: Collect Context
-     ### Phase 2: Run Verification Checklist
-     ### Phase 3: Generate Report
-   ## Report Template
-   ## Integration with QA Review
-   ## Quick Reference: Red Flags
-   ## Metadata

### `.aiox-core/development/tasks/po-backlog-add.md` — 370 linhas
- # PO Task: Add Backlog Item
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Task Flow
-     ### 1. Elicit Item Details
-     ### 2. Validate Input
-     ### 3. Add Item to Backlog
-     ### 4. Regenerate Backlog File
-     ### 5. Summary Output
-   ## Example Usage
-   ## Error Handling
-   ## Testing

### `.aiox-core/development/tasks/brownfield-create-story.md` — 363 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Create Brownfield Story Task
-   ## Purpose
-   ## When to Use This Task
-   ## Instructions
-     ### 1. Quick Project Assessment
-     ### 2. Story Creation
-       #### Story Title
-       #### User Story
-       #### Story Context
-       #### Acceptance Criteria
-       #### Technical Notes
-       #### Definition of Done
-     ### 3. Risk and Compatibility Check
-     ### 4. Validation Checklist
-   ## Success Criteria
-   ## Important Notes
-   ## Handoff

### `.aiox-core/development/tasks/create-doc.md` — 360 linhas
- # Template selection determined dynamically during task execution
- # User selects from available templates in .aiox-core/product/templates/
- # Create Document from Template (YAML Driven)
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Execution Dependencies
-   ## ⚠️ CRITICAL EXECUTION NOTICE ⚠️
-   ## Critical: Template Discovery
-   ## CRITICAL: Mandatory Elicitation Format
-   ## Code Intelligence: Codebase Intelligence Section (Optional — Auto-skip if unavailable)
-   ## Processing Flow
-   ## Detailed Rationale Requirements
-   ## Elicitation Results Flow
-   ## Agent Permissions
-   ## YOLO Mode
-   ## CRITICAL REMINDERS

### `.aiox-core/development/tasks/story-checkpoint.md` — 360 linhas
- # Task: Story Checkpoint
-   ## Story 11.3: Development Cycle Workflow
-   ## Metadata
-   ## Purpose
-   ## Inputs
-   ## Execution
-     ### Step 1: Generate Summary
-     ### Step 2: Display Summary
-     ### Step 3: Elicit Decision
-   ## Actions
-     ### GO Action: Suggest Next Story
-     ### PAUSE Action: Save Session State
-     ### REVIEW Action: Show Detailed Summary
-     ### ABORT Action: Stop Epic
-   ## Output
-   ## Error Handling
-   ## Related

### `.aiox-core/development/tasks/audit-utilities.md` — 358 linhas
- # audit-utilities
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Configuration Dependencies
-   ## Purpose
-   ## Classification Criteria
-     ### ✅ WORKING
-     ### 🔧 FIXABLE
-     ### 🗑️ DEPRECATED
-   ## Execution Steps
-     ### Step 1: Run Automated Testing
-     ### Step 2: Verify Integration Status
-     ### Step 3: Manual Classification Review
-     ### Step 4: Generate Priority Scoring
-     ### Step 5: Make Story 3.19 Decision
-     ### Step 6: Generate Audit Report
-   ## Output
-   ## Success Criteria
-   ## Notes

### `.aiox-core/development/tasks/analyze-cross-artifact.md` — 357 linhas
- # Cross-Artifact Analysis Task
-   ## Purpose
-   ## autoClaude
-   ## Constitutional Reference
-   ## Analysis Passes
-     ### Pass 1: Coverage Gaps
-     ### Pass 2: Consistency Check
-     ### Pass 3: Ambiguity Detection
-     ### Pass 4: Constitution Compliance
-   ## Severity Levels
-   ## Execution Flow
-   ## Report Format
-   ## Usage Examples
-   ## Integration with Existing Checklists
-   ## Error Handling
-   ## Metadata

### `.aiox-core/development/tasks/triage-github-issues.md` — 356 linhas
- # triage-github-issues.md
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Workflow Steps
-     ### Phase 1: Fetch Issues
-     ### Phase 2: Classify Each Issue
-     ### Phase 3: Prioritize
-     ### Phase 4: Present to User
-     ### Phase 5: User Decision
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Integration with @devops Agent

### `.aiox-core/development/tasks/db-smoke-test.md` — 351 linhas
- # Task: DB Smoke Test
-   ## Process
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-     ### 1. Locate Smoke Test File
-     ### 2. Run Smoke Test
-     ### 3. Report Results
-   ## What Is Tested
-     ### Schema Objects
-     ### RLS Coverage
-     ### Data Integrity
-     ### Performance
-   ## Creating Custom Smoke Tests
-   ## Best Practices
-   ## Next Steps After Pass
-   ## Next Steps After Fail

### `.aiox-core/development/tasks/po-stories-index.md` — 351 linhas
- # PO Task: Regenerate Story Index
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Task Flow
-     ### 1. Confirm Regeneration
-     ### 2. Generate Story Index
-     ### 3. Display Summary
-     ### 4. Preview Mode (if selected)
-   ## Example Usage
-   ## Error Handling
-   ## Testing
-   ## npm Script Integration

### `.aiox-core/development/tasks/dev-validate-next-story.md` — 348 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Validate Next Story Task
-   ## Purpose
-   ## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)
-     ### 0. Load Core Configuration and Inputs
-     ### 1. Template Completeness Validation
-     ### 2. File Structure and Source Tree Validation
-     ### 3. UI/Frontend Completeness Validation (if applicable)
-     ### 4. Acceptance Criteria Satisfaction Assessment
-     ### 5. Validation and Testing Instructions Review
-     ### 6. Security Considerations Assessment (if applicable)
-     ### 7. Tasks/Subtasks Sequence Validation
-     ### 8. Anti-Hallucination Verification
-     ### 9. Dev Agent Implementation Readiness
-     ### 10. Generate Validation Report
-       #### Template Compliance Issues
-       #### Critical Issues (Must Fix - Story Blocked)
-       #### Should-Fix Issues (Important Quality Improvements)
- … (+3 itens)

### `.aiox-core/development/tasks/apply-qa-fixes.md` — 347 linhas
- # Ap
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Purpose
-   ## Configuration Dependencies
-   ## Instructions
-   ## Best Practices
-   ## Common QA Issue Types
-     ### Code Quality Issues
-     ### Testing Issues
-     ### Documentation Issues
-     ### Architecture Issues
-   ## Exit Criteria
-   ## Handoff

### `.aiox-core/development/tasks/undo-last.md` — 346 linhas
- # No checklists needed - rollback operation with built-in transaction validation
- # Task: Undo Last Component Operation
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Context Required
-   ## Prerequisites
-   ## Input Requirements
-   ## Process Flow
-     ### Step 1: Identify Transaction
-     ### Step 2: Analyze Changes
-     ### Step 3: Execute Rollback
-     ### Step 4: Verify Rollback
-   ## Output
-     ### Success Response
-     ### Failure Response
-   ## Error Handling
-     ### Common Errors
-   ## Security Considerations
- … (+4 itens)

### `.aiox-core/development/tasks/qa-browser-console-check.md` — 343 linhas
- # Browser Console Check Task
-   ## Task Definition
-   ## What This Checks
-   ## Workflow
-     ### Phase 1: Detect Pages to Test
-     ### Phase 2: Start Dev Server
-     ### Phase 3: Visit Each Page
-     ### Phase 4: Analyze Results
-     ### Phase 5: Generate Report
-   ## Command
-   ## Console Report Format
-   ## Ignore List
-   ## Integration with QA Review
-   ## Playwright Integration
-   ## Metadata

### `.aiox-core/development/tasks/list-worktrees.md` — 342 linhas
- # list-worktrees
-   ## Execution Modes
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Description
-   ## Inputs
-   ## Elicitation
-   ## Steps
-     ### Step 1: Validate Git Repository
-     ### Step 2: Load Worktrees
-     ### Step 3: Apply Filter
-     ### Step 4: Format Output
-       #### Table Format (default)
-       #### JSON Format
-       #### Minimal Format
-     ### Step 5: Display Summary
-     ### Step 6: Handle Empty
-   ## Outputs
-     ### Return Value
-     ### Console Output
-   ## Validation
-   ## Error Handling
-     ### Not a Git Repository
-     ### WorktreeManager Not Found
-   ## Performance Notes
-   ## Dependencies
-     ### Scripts
-     ### Git Commands Used
-   ## Related
-   ## Command Registration

### `.aiox-core/development/tasks/analyst-facilitate-brainstorming.md` — 341 linhas
- # No checklists needed - this task facilitates brainstorming sessions, validation is through user interaction
- # Facilitate Brainstorming Session Task
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Process
-     ### Step 1: Session Setup
-     ### Step 2: Present Approach Options
-     ### Step 3: Execute Techniques Interactively
-     ### Step 4: Session Flow
-     ### Step 5: Document Output (if requested)
-   ## Key Principles
-   ## Advanced Engagement Strategies

### `.aiox-core/development/tasks/patterns.md` — 334 linhas
- # Learned Patterns Management
-   ## Purpose
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Implementation Steps
-     ### Step 1: Check Help Flag
-     ### Step 2: Load Learning Module
-     ### Step 3: Execute Subcommand
-       #### List Patterns
-       #### Show Stats
-       #### Prune Patterns
-       #### Review Patterns
-   ## Help Text
-   ## Output Formats
-     ### List Output
-     ### Stats Output
-     ### Review Output
-   ## Post-Conditions
-   ## Error Handling
-   ## Performance
-   ## Metadata

### `.aiox-core/development/tasks/squad-creator-design.md` — 334 linhas
- # *design-squad
-   ## Usage
-   ## Parameters
-   ## Interactive Flow
-     ### Phase 1: Documentation Input
-     ### Phase 2: Domain Confirmation
-     ### Phase 3: Agent Review
-     ### Phase 4: Task Review
-     ### Phase 5: Custom Additions
-     ### Phase 6: Blueprint Generation
-   ## Analysis Pipeline
-   ## Recommendation Engine
-   ## Output: Blueprint Schema
-   ## Integration with *create-squad
-   ## Error Handling
-   ## Implementation
-   ## Related

### `.aiox-core/development/tasks/next.md` — 327 linhas
- # Next Command Suggestions
-   ## Purpose
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Implementation Steps
-     ### Step 1: Check Help Flag
-     ### Step 2: Build Context
-     ### Step 3: Runtime-First Deterministic Recommendation (Preferred)
-     ### Step 4: Get WIS Suggestions (Fallback / enrichment)
-     ### Step 5: Format Output
-   ## Help Text
-   ## Output Format
-     ### Standard Output
-     ### Low Confidence Output
-     ### No Workflow Match
-   ## Post-Conditions
-   ## Error Handling
-   ## Performance
-   ## Success Output
-   ## Metadata

### `.aiox-core/development/tasks/validate-workflow.md` — 321 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Validate Workflow Task
-   ## Purpose
-   ## Prerequisites
-   ## Elicitation Points
-   ## Task Execution
-     ### 1. Resolve Target Path(s)
-     ### 2. Run Validation
-     ### 3. Consolidate Results
-     ### 4. Display Report
-     ### 5. Return Exit Code
-   ## Integration

### `.aiox-core/development/tasks/advanced-elicitation.md` — 318 linhas
- # advanced-elicitation
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Purpose
-   ## Usage Scenarios
-     ### Scenario 1: Template Document Creation
-     ### Scenario 2: General Chat Elicitation
-   ## Task Instructions
-     ### 1. Intelligent Method Selection
-     ### 2. Section Context and Review
-     ### 3. Present Elicitation Options
-     ### 4. Method Execution Framework

### `.aiox-core/development/tasks/dev-apply-qa-fixes.md` — 318 linhas
- # Ap
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Purpose
-   ## Instructions
-   ## Best Practices
-   ## Common QA Issue Types
-     ### Code Quality Issues
-     ### Testing Issues
-     ### Documentation Issues
-     ### Architecture Issues
-   ## Exit Criteria

### `.aiox-core/development/tasks/po-pull-story.md` — 316 linhas
- # pull-story
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Task Inputs
-   ## Prerequisites
-   ## Task Execution Steps
-     ### Step 1: Get PM Adapter
-     ### Step 2: Pull Updates
-     ### Step 3: Display Updates (if any)
-     ### Step 4: Optional Auto-Merge
-   ## Error Handling
-   ## Notes
-   ## Limitations (v1.0)
-   ## Integration with Story Manager

### `.aiox-core/development/tasks/squad-creator-analyze.md` — 315 linhas
- # Analyze Squad Task
-   ## Purpose
-   ## Story Reference
-   ## Pre-Conditions
-   ## Elicitation Flow
-   ## Execution Steps
-     ### Step 1: Validate Squad Exists
-     ### Step 2: Load Squad Manifest
-     ### Step 3: Inventory Components
-     ### Step 4: Calculate Coverage Metrics
-     ### Step 5: Generate Suggestions
-     ### Step 6: Format and Display Report
-   ## Output Format (Console)
-   ## Error Handling
-     ### Error 1: Squad Not Found
-     ### Error 2: Invalid Manifest
-     ### Error 3: Permission Denied
-   ## Post-Conditions
-   ## Dependencies
-   ## Metadata

### `.aiox-core/development/tasks/squad-creator-sync-synkra.md` — 315 linhas
- # *sync-squad-synkra
-   ## Uso
-   ## Autenticação
-   ## Output Exemplo
-   ## Flags
-   ## Workflow
-   ## API Integration
-     ### Request
-     ### Response (Success)
-     ### Response (Error)
-   ## Implementation Guide
-     ### For Agent Execution
-   ## Error Handling
-   ## Related Tasks
-   ## Related Story
-   ## Changelog

### `.aiox-core/development/tasks/integrate-squad.md` — 314 linhas
- # Integrate with Squad
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Steps
-   ## Output
-   ## Success Criteria
-   ## Examples
-     ### MMOS Integration
-     ### CreatorOS Integration
-     ### InnerLens Integration
-   ## Notes

### `.aiox-core/development/tasks/qa-evidence-requirements.md` — 314 linhas
- # Evidence Requirements Task
-   ## Task Definition
-   ## Evidence Checklists by Issue Type
-     ### Bug Fix Evidence
-     ### Feature Implementation Evidence
-     ### Dependency Update Evidence
-     ### Refactor Evidence
-   ## Workflow
-     ### Phase 1: Detect Issue Type
-     ### Phase 2: Generate Checklist
-     ### Phase 3: Verify Evidence
-   ## Command
-   ## Evidence Checklist Template
-   ## Integration with QA Review
-   ## Metadata

### `.aiox-core/development/tasks/squad-creator-create.md` — 312 linhas
- # *create-squad
-   ## Uso
-   ## Parametros
-   ## Elicitacao Interativa
-   ## Templates Disponiveis
-   ## Estrutura Gerada
-     ### Com Project Configs (SQS-10)
-     ### Sem Project Configs (Fallback)
-   ## squad.yaml Gerado
-   ## Flow
-   ## Output de Sucesso
-   ## Error Handling
-   ## Implementation
-   ## Related

### `.aiox-core/development/tasks/search-mcp.md` — 309 linhas
- # Search MCP Catalog Task
-   ## Task Definition
-   ## Pre-Conditions
-   ## Interactive Elicitation
-     ### Step 1: Search Query
-     ### Step 2: Display Results
-     ### Step 3: Show MCP Details (Optional)
-   ## Implementation Steps
-     ### 1. Search the Catalog
-     ### 2. Get MCP Details
-     ### 3. Filter by Category (if supported)
-   ## Post-Conditions
-   ## Error Handling
-     ### Error: No Results Found
-     ### Error: Docker MCP Not Available
-     ### Error: Catalog Timeout
-   ## Success Output
-   ## Common Search Examples
-   ## Related Commands
-   ## Performance
-   ## Metadata

### `.aiox-core/development/tasks/execute-checklist.md` — 308 linhas
- # No templates needed - this task executes existing checklists, doesn't create document outputs
- # Checklist Validation Task
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts) **[DEFAULT]**
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts)
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Available Checklists
-   ## Instructions
-   ## Checklist Execution Methodology
-   ## Handoff

### `.aiox-core/development/tasks/po-sync-story.md` — 303 linhas
- # sync-story
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Task Inputs
-   ## Prerequisites
-   ## Task Execution Steps
-     ### Step 1: Load Story File
-     ### Step 2: Get PM Adapter
-     ### Step 3: Sync to PM Tool
-     ### Step 4: Output Results
-   ## Error Handling
-   ## Notes
-   ## Integration with Story Manager

### `.aiox-core/development/tasks/tailwind-upgrade.md` — 294 linhas
- # Tailwind CSS v4 Upgrade Playbook
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### 1. Discovery & Planning
-     ### 2. Dry Run Upgrade
-     ### 3. Token & Utility Validation
-     ### 4. Benchmark Oxide Engine
-     ### 5. Regression Testing
-     ### 6. Documentation & Rollout
-     ### 7. Update State
-   ## Deliverables
-   ## Success Criteria
-   ## Rollback Plan
-   ## Notes

### `.aiox-core/development/tasks/db-dry-run.md` — 293 linhas
- # Task: Migration Dry-Run
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Inputs
-   ## Process
-     ### 1. Confirm Migration File
-     ### 2. Execute Dry-Run
-     ### 3. Report Results
-   ## What This Validates
-   ## Next Steps After Success
-   ## Error Handling

### `.aiox-core/development/tasks/create-suite.md` — 290 linhas
- # TODO: Create test-suite-checklist.md for validation (follow-up story needed)
- # checklists:
- # - test-suite-checklist.md
- # Task: Create Component Suite
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Context Required
-   ## Prerequisites
-   ## Interactive Elicitation
-   ## Workflow Steps
-     ### 1. Suite Type Selection
-     ### 2. Configure Components
-     ### 3. Analyze Dependencies
-     ### 4. Preview Suite
-     ### 5. Create Components
-     ### 6. Update Manifest
-   ## Error Handling
-   ## Output
- … (+3 itens)

### `.aiox-core/development/tasks/bootstrap-shadcn-library.md` — 286 linhas
- # Bootstrap Shadcn/Radix Component Library
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-   ## Deliverables
-   ## Success Criteria
-   ## Error Handling
-   ## Notes

### `.aiox-core/development/tasks/compose-molecule.md` — 284 linhas
- # Compose Molecule from Atoms
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Steps
-   ## Output
-   ## Success Criteria
-   ## Example
-   ## Notes

### `.aiox-core/development/tasks/generate-documentation.md` — 284 linhas
- # Generate Pattern Library Documentation
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Steps
-   ## Output
-   ## Success Criteria
-   ## Example
-   ## Notes

### `.aiox-core/development/tasks/kb-mode-interaction.md` — 283 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # No checklists needed - interactive KB mode facilitation task, no validation workflow required
- # KB Mode Interaction Task
-   ## Purpose
-   ## Instructions
-     ### 1. Welcome and Guide
-     ### 2. Present Topic Areas
-     ### 3. Respond Contextually
-     ### 4. Interactive Exploration
-     ### 5. Exit Gracefully
-   ## Example Interaction

### `.aiox-core/development/tasks/project-status.md` — 280 linhas
- # Task: Project Status — Full Panorama
-   ## Purpose
-   ## Usage
-     ### Arguments
-   ## CRITICAL RULES
-     ### Rule 1: Source of Truth
-     ### Rule 2: Read Every File
-     ### Rule 3: Divergence Detection
-   ## Workflow
-   ## Output Format
-     ### Full Panorama
-     ### Status Icons
-   ## Divergence Resolution
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Anti-Patterns (NEVER DO)
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Related Commands
-   ## User Preferences

### `.aiox-core/development/tasks/correct-course.md` — 279 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # Correct Course Task
-   ## Purpose
-   ## Instructions
-     ### 1. Initial Setup & Mode Selection
-     ### 2. Execute Checklist Analysis (Iteratively or Batched, per Interaction Mode)
-     ### 3. Draft Proposed Changes (Iteratively or Batched)
-     ### 4. Generate "Sprint Change Proposal" with Edits
-     ### 5. Finalize & Determine Next Steps
-   ## Output Deliverables

### `.aiox-core/development/tasks/qa-run-tests.md` — 277 linhas
- # Run Tests (with Code Quality Gate)
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Steps
-     ### 1. Run Unit Tests
-     ### 2. Run Integration Tests
-     ### 3. Code Quality Review
-     ### 4. Generate QA Report
-     ### 5. Update Story Status
-   ## Integration with CodeRabbit
-   ## Config

### `.aiox-core/development/tasks/export-design-tokens-dtcg.md` — 274 linhas
- # Export Design Tokens to W3C DTCG
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-   ## Output
-   ## Success Criteria
-   ## Error Handling
-   ## Notes

### `.aiox-core/development/tasks/audit-tailwind-config.md` — 270 linhas
- # Audit Tailwind v4 Configuration & Utility Health
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-   ## Output
-   ## Success Criteria
-   ## Tools & Commands
-   ## Notes

### `.aiox-core/development/tasks/extend-pattern.md` — 269 linhas
- # Extend Existing Pattern
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Steps
-   ## Output
-   ## Success Criteria
-   ## Example
-   ## Notes

### `.aiox-core/development/tasks/mapeamento-skus-ads-catalogo-mercadolivre.md` — 267 linhas
- # mapeamento-skus-ads-catalogo-mercadolivre
-   ## Propósito
-   ## Cuidado com scripts PowerShell e nomes/textos acentuados (13/08/2026)
-   ## Passo A — Achar o SKU e a listagem completa de MLBs
-   ## Passo A.1 — Identificar os MLBs de catálogo (Clássico/Premium) pra coluna "MLB's" (crítico, 12/08/2026)
-   ## Passo B — Confirmar se o produto está em Ads
-   ## Passo A.2 — Capturar Título de catálogo, Depósito/FULL e Status do Produto (12/08/2026)
-   ## Passo C — Marcar o progresso na planilha (Excel)
-   ## Passo D — Escrever nas 2 páginas do `Analise Oficial.xlsx` (depois replicar pro Google Sheets)
-   ## Cuidado com foco de janela

### `.aiox-core/development/tasks/health-check.yaml` — 265 linhas
- name:
- id:
- version:
- description:
- category:
- owner:
- command:
- aliases:
- parameters:
- instructions:
- governance_map:
-   settings-json:
-   rules-files:
-   agent-memory:
-   entity-registry:
-   git-hooks:
-   core-config:
-   claude-md:
-   ide-sync:
-   graph-dashboard:
-   code-intel:
-   node-version:
-   npm-packages:
-   skills-count:
-   commands-count:
-   hooks-claude-count:
- output:
-   type:
-   properties:
- examples:
- … (+1 itens)

### `.aiox-core/development/tasks/db-env-check.md` — 260 linhas
- # Task: DB Env Check
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
-   ## Steps
-     ### 1. Validate Required Environment Variables
-     ### 2. Check SSL Mode and Pooler
-     ### 3. Check Client Versions
-     ### 4. Check Server Connectivity
-   ## Success Criteria
-   ## Error Handling

### `.aiox-core/development/tasks/generate-ai-frontend-prompt.md` — 260 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Tools
-   ## Scripts
-   ## Error Handling
-   ## Performance
-   ## Metadata
- # No checklists needed - this task generates prompts, validation is built into prompt generation methodology
- # Create AI Frontend Prompt Task
-   ## Purpose
-   ## Inputs
-   ## Key Activities & Instructions
-     ### 1. Core Prompting Principles
-     ### 2. The Structured Prompting Framework
-     ### 3. Assembling the Master Prompt

### `.aiox-core/development/tasks/squad-creator-migrate.md` — 243 linhas
- # *migrate-squad
-   ## Usage
-   ## Parameters
-   ## Migration Detection
-   ## Flow
-   ## Output Example
-     ### Analysis Phase
-     ### Migration Result
-     ### Dry-Run Mode
-   ## Rollback Procedure
-   ## Error Codes
-   ## Implementation
-   ## Related

### `.aiox-core/development/tasks/verify-subtask.md` — 235 linhas
- # Verify Subtask
-   ## Purpose
-   ## autoClaude
-   ## Command Integration (@dev)
-   ## Execution
-     ### Step 1: Locate Implementation Plan
-     ### Step 2: Run Verification Script
-     ### Step 3: Report Results
-   ## Verification Types Supported
-   ## Examples
-     ### Command Verification
-     ### API Verification
-     ### Browser Verification
-   ## Error Handling
-   ## Metadata

### `.aiox-core/development/tasks/setup-llm-routing.md` — 229 linhas
- # setup-llm-routing
-   ## Purpose
-   ## Quick Install
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous
-     ### 2. Interactive Mode **[DEFAULT]**
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Process
-     ### Step 1: Run Installer
-     ### Step 2: Configure DeepSeek API Key (for claude-free)
-       #### Option A: Project .env file
-       #### Option B: Global environment variable
-     ### Step 3: Verify Installation
-   ## Usage
-     ### claude-max
-     ### claude-free
-   ## Cost Comparison
-   ## Troubleshooting
-     ### Command not found
-     ### API key error
-     ### Tool calling fails
-   ## References
-   ## Metadata

### `.aiox-core/development/tasks/squad-creator-publish.md` — 229 linhas
- # *publish-squad
-   ## Prerequisites
-   ## Usage
-   ## Examples
-     ### Dry Run (Preview)
-     ### Publish (Create PR)
-   ## Options
-   ## Workflow
-   ## PR Body Template
-   ## Error Handling
-   ## Requirements
-     ### Manifest Fields
-     ### Validation Rules
-   ## Implementation
-   ## Related Tasks
-   ## Related Story

### `.aiox-core/development/tasks/squad-creator-list.md` — 225 linhas
- # *list-squads
-   ## Uso
-   ## Parametros
-   ## Output Exemplo (Table)
-   ## Output Exemplo (JSON)
-   ## Output Exemplo (YAML)
-   ## Status Indicators
-   ## Flow
-   ## Implementation
-   ## Empty State
-   ## Error Handling
-   ## Related

### `.aiox-core/development/tasks/waves.md` — 205 linhas
- # Task: `*waves` - Wave Analysis
-   ## Overview
-   ## Usage
-   ## Arguments
-   ## Options
-   ## Examples
-   ## Output
-     ### Standard Output
-     ### Visual Output (--visual)
-     ### JSON Output (--json)
-   ## Circular Dependency Handling
-   ## Integration
-     ### With `*next` Command
-   ## Implementation
-   ## Performance
-   ## Related Commands
-   ## Agent Integration
-   ## Change Log

### `.aiox-core/development/tasks/build-autonomous.md` — 199 linhas
- # Task: Build Autonomous
-   ## Purpose
-   ## Usage
-     ### Arguments
-     ### Options
-   ## Workflow
-   ## Events Emitted
-   ## Output Example
-   ## Error Handling
-   ## Integration
-   ## Related Commands
-   ## Handoff

### `.aiox-core/development/tasks/session-resume.md` — 192 linhas
- # Session Resume Task
-   ## Purpose
-   ## Task Definition
-   ## Execution Steps
-     ### Step 1: Load Session State
-     ### Step 2: Check for Crash
-     ### Step 3: Present Resume Summary
-     ### Step 4: Elicit User Choice
-     ### Step 5: Execute Selected Action
-   ## Integration with pm.md
-   ## Error Handling
-   ## Metadata

### `.aiox-core/development/tasks/validate-tech-preset.md` — 186 linhas
- # \*validate-tech-preset
-   ## Usage
-   ## Parameters
-   ## Validation Checks
-     ### 1. Metadata Validation
-     ### 2. Required Sections Validation
-     ### 3. Content Quality Checks
-   ## Flow
-   ## Output Example
-   ## Error Codes
-   ## Fix Story Generation
-   ## Related

### `.aiox-core/development/tasks/blocks/README.md` — 178 linhas
- # AIOX Task Blocks System
-   ## Overview
-   ## Directory Structure
-   ## How to Include a Block
-     ### Method 1: Markdown Include Comment
-     ### Method 2: YAML Reference
-     ### Method 3: Programmatic (JavaScript)
-   ## Block Anatomy
-   ## Naming Conventions
-   ## Design Principles
-     ### 1. Single Responsibility
-     ### 2. Idempotent
-     ### 3. Fail Gracefully
-     ### 4. Under 50 Lines
-     ### 5. Clear Contract
-   ## Available Blocks
-   ## Lines Saved (ROI)
-   ## Creating a New Block
-   ## Future Blocks (Candidates)

### `.aiox-core/development/tasks/test-validation-task.md` — 171 linhas
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V2.0)
-   ## Pre-Conditions
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Purpose
-   ## Implementation
-   ## Error Handling
-   ## Performance
-   ## Metadata

### `.aiox-core/development/tasks/squad-creator-download.md` — 167 linhas
- # *download-squad
-   ## Usage
-   ## Examples
-     ### List Available Squads
-     ### Download Squad
-   ## Options
-   ## How It Works
-   ## Registry Structure
-   ## Error Handling
-   ## Implementation
-   ## Related Tasks
-   ## Related Story

### `.aiox-core/development/tasks/squad-creator-validate.md` — 159 linhas
- # *validate-squad
-   ## Usage
-   ## Parameters
-   ## Validation Checks
-     ### 1. Manifest Validation
-     ### 2. Structure Validation
-     ### 3. Task Validation (TASK-FORMAT-SPECIFICATION-V1)
-     ### 4. Agent Validation
-     ### 5. Config Reference Validation (SQS-10)
-   ## Flow
-   ## Output Example
-   ## Error Codes
-   ## Implementation
-   ## Related

### `.aiox-core/development/tasks/build-status.md` — 155 linhas
- # Task: Build Status
-   ## Purpose
-   ## Usage
-     ### Arguments
-   ## Workflow
-   ## Output Example
-     ### Single Build
-     ### All Builds
-   ## Status Icons
-   ## Health Indicators
-   ## Integration
-   ## Related Commands

### `.aiox-core/development/tasks/ids-query.md` — 154 linhas
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Purpose
-   ## Usage
-     ### CLI Usage
-     ### Programmatic Usage (Agent Context)
-   ## Decision Interpretation
-   ## Output Structure
-   ## Related Commands
-   ## Metadata

### `.aiox-core/development/tasks/gotchas.md` — 153 linhas
- # Task: List Gotchas
-   ## Purpose
-   ## Usage
-     ### Options
-   ## Workflow
-   ## Output Example
-     ### Default List
-     ### With --stats
-   ## Categories
-   ## Integration
-   ## Related Commands

### `.aiox-core/development/tasks/delegate-to-external-executor.md` — 152 linhas
- # delegate-to-external-executor.md
-   ## Task Definition
-   ## Configuration
-   ## Pre-Conditions
-   ## Execution
-     ### 1. Build the Prompt
-     ### 2. Start the Delegate Run
-     ### 3. Monitor Completion
-     ### 4. Review Output and Diff
-     ### 5. Accept or Iterate
-   ## Anti-Patterns

### `.aiox-core/development/tasks/review-contributor-pr.md` — 152 linhas
- # Task: Review External Contributor PR
-   ## Metadata
-   ## Description
-   ## Pre-Conditions
-   ## Inputs
-   ## Execution
-     ### Step 1: Identify PR Scope
-     ### Step 2: Security Checklist (by PR type)
-       #### For CI/Workflow PRs (.github/)
-       #### For Test PRs (tests/)
-       #### For Code PRs (packages/, .aiox-core/, bin/)
-       #### For Config PRs (.gitmodules, *.config.*)
-     ### Step 3: Automated Scan
-     ### Step 4: Decision Matrix
-     ### Step 5: Merge Decision
-   ## Post-Conditions
-   ## Notes

### `.aiox-core/development/tasks/update-aiox.md` — 151 linhas
- # Task: Update AIOX Framework
-   ## Purpose
-   ## Quick Usage
-   ## How It Works
-   ## Protected Files (NEVER overwritten)
-   ## Task Definition
-   ## Verification
-   ## Error Handling
-   ## Rollback
-   ## Changelog

### `.aiox-core/development/tasks/build.md` — 141 linhas
- # Task: Build (Autonomous)
-   ## Purpose
-   ## Usage
-     ### Arguments
-     ### Flags (AC4)
-   ## Pipeline (AC3)
-     ### Phase Details
-   ## Output (AC6)
-   ## Examples
-   ## Integration
-   ## Related Commands

### `.aiox-core/development/tasks/update-source-tree.md` — 137 linhas
- # Update Source Tree Task
-   ## Purpose
-   ## Task Definition
-   ## Execution Steps
-     ### Step 1: Load agent-config-requirements.yaml
-     ### Step 2: Verify file existence
-     ### Step 3: Load source-tree.md
-     ### Step 4: Cross-reference
-     ### Step 5: Check ownership
-     ### Step 6: Report
-     ### Step 7: Fix (if mode=fix)
-   ## Acceptance Criteria
-   ## Error Handling
-   ## Metadata

### `.aiox-core/development/tasks/gotcha.md` — 136 linhas
- # Task: Add Gotcha
-   ## Purpose
-   ## Usage
-     ### Arguments
-     ### Options
-   ## Workflow
-   ## Output Example
-   ## Examples
-   ## Integration
-   ## Related Commands

### `.aiox-core/development/tasks/build-resume.md` — 125 linhas
- # Task: Build Resume
-   ## Purpose
-   ## Usage
-     ### Arguments
-   ## Workflow
-   ## Output Example
-   ## Error Handling
-   ## Integration
-   ## Related Commands

### `.aiox-core/development/tasks/blocks/finalization.md` — 123 linhas
- # Block: Finalization
-   ## Purpose
-   ## Input
-   ## Output
-   ## Core Content
-     ### Step 1: Present Summary to User
-     ### Step 2: Cleanup Agents
-     ### Step 3: Delete Team
-     ### Summary Template
-   ## Usage
-     ### Include in Skill File
-     ### Programmatic Usage
-   ## Error Handling
-   ## Notes

### `.aiox-core/development/tasks/blocks/execution-pattern.md` — 121 linhas
- # Block: Execution Pattern
-   ## Purpose
-   ## Input
-   ## Output
-   ## Core Content
-     ### How Agent Waiting Works
-     ### Sequential Execution
-     ### Parallel Execution
-     ### Mixed Execution
-   ## Anti-Patterns (NEVER DO THIS)
-   ## Usage
-     ### Include in Skill File
-     ### Direct Reference
-   ## Files Accessed
-   ## Error Handling
-   ## Notes

### `.aiox-core/development/tasks/validate-agents.md` — 119 linhas
- # Validate Agents Task
-   ## Purpose
-   ## Parameters
-   ## Execution Steps
-     ### Step 1: Discover Agent Files
-     ### Step 2: Parse YAML Block
-     ### Step 3: Validate Required Fields
-     ### Step 4: Validate Activation Pipeline Reference
-     ### Step 5: Validate Dependencies
-     ### Step 6: Validate Command Structure
-     ### Step 7: Cross-Agent Validation
-     ### Step 8: Generate Report
-   ## Error Handling
-   ## Dependencies

### `.aiox-core/development/tasks/github-issue-triage.md` — 118 linhas
- # GitHub Issue Triage
-   ## Task Metadata
-   ## Description
-   ## Prerequisites
-   ## Workflow
-     ### Step 1: List Untriaged Issues
-     ### Step 2: Per-Issue Triage (Interactive)
-     ### Step 3: Apply Labels
-     ### Step 4: Batch Triage (Optional)
-     ### Step 5: Report
-   ## Triage Decision Tree
-   ## Priority Guidelines
-   ## Command Integration
-   ## Output

### `.aiox-core/development/tasks/blocks/agent-prompt-template.md` — 115 linhas
- # Block: Agent Prompt Template
-   ## Purpose
-   ## Input
-   ## Output
-   ## Core Template
-   ## Usage
-     ### Include in Skill File
-     ### Programmatic Usage
-   ## Files Accessed
-   ## Error Handling
-   ## Notes

### `.aiox-core/development/tasks/check-docs-links.md` — 114 linhas
- # check-docs-links
-   ## Metadata
-   ## Description
-   ## Usage
-   ## Exit Codes
-   ## CI Integration
-   ## Workflow
-     ### Verificação Manual
-     ### Auto-fix
-   ## Output Example
-   ## Related

### `.aiox-core/development/tasks/mapeamento-pausados-campanha-mercadolivre.md` — 113 linhas
- # mapeamento-pausados-campanha-mercadolivre
-   ## Propósito
-   ## Escopo — 7 Campanhas ativas
-   ## Passo A — Achar os produtos pausados dentro de cada campanha (validado 12/08/2026)
-   ## Passo B — Qualidade e Experiência (validado 12/08/2026)
-   ## Passo C — Cruzar com o restante do mapeamento
-   ## Passo D — Escrever na planilha (`Pausados em Campanha - Karzen.xlsx`)
-   ## Pendências resolvidas em produção (12/08/2026)

### `.aiox-core/development/tasks/yolo-toggle.md` — 113 linhas
- # yolo-toggle
-   ## Purpose
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Process
-     ### Step 1: Load Current Mode
-     ### Step 2: Cycle to Next Mode
-     ### Step 3: Save New Mode
-     ### Step 4: Display Confirmation
-   ## Implementation
-   ## Error Handling
-   ## Metadata

### `.aiox-core/development/tasks/analise-acos-catalogo-mercadolivre.md` — 110 linhas
- # analise-acos-catalogo-mercadolivre
-   ## Propósito
-   ## Passo 1 — Extrair ACOS de todos os produtos da Campanha
-   ## Passo 2 — Mapear variações de um produto qualificado
-   ## Passo 3 — Determinar SKU e status de catálogo de cada MLB
-   ## Passo 4 — Quando o catálogo NÃO aparece de forma explícita (regra crítica)
-   ## Passo 5 — Escrever na planilha
-   ## Cuidado com foco de janela (crítico)

### `.aiox-core/development/tasks/blocks/context-loading.md` — 108 linhas
- # Block: Context Loading
-   ## Purpose
-   ## Input
-   ## Output
-   ## Execution Steps
-   ## Usage
-     ### Include in Task File
-     ### Programmatic Usage
-   ## Files Accessed
-   ## Error Handling
-   ## Notes

### `.aiox-core/development/tasks/create-project-log.md` — 96 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/tasks/ids-governor.md` — 94 linhas
- # Task: IDS Governor Commands
-   ## Overview
-     ### Available Commands
-   ## Execution Steps
-     ### *ids query {intent}
-     ### *ids health
-     ### *ids stats
-     ### *ids impact {entity-id}
-   ## CLI Equivalents
-   ## Dependencies
-   ## Error Handling

### `.aiox-core/development/tasks/devops-pro-access-grant.md` — 93 linhas
- # Task: DevOps Pro Access Grant
-   ## Purpose
-   ## Inputs
-   ## Source Of Truth
-   ## Execution Order
-   ## Mandatory Checks
-   ## Guided Validation Checklist
-   ## Failure Branches
-     ### Buyer missing after grant
-     ### `activate-pro` returns invalid input for token
-     ### Email not verified
-     ### Installer validation misses Claude or Codex assets
-   ## Evidence Pack

### `.aiox-core/development/tasks/ids-health.md` — 89 linhas
- # IDS Registry Health Check Task
-   ## Purpose
-   ## Pre-Conditions
-   ## Execution
-     ### Step 1: Run Health Check
-     ### Step 2: Auto-Heal (Optional)
-     ### Step 3: JSON Output (Machine-Readable)
-     ### Step 4: Review Warnings
-   ## Post-Conditions
-   ## Exit Codes
-   ## Programmatic Usage

### `.aiox-core/development/tasks/sync-registry-intel.md` — 79 linhas
- # Task: Sync Registry Intel
-   ## Metadata
-   ## Description
-   ## Prerequisites
-   ## Execution Steps
-     ### Step 1: Parse Arguments
-     ### Step 2: Execute Sync
-     ### Step 3: Report Results
-     ### Step 4: Handle Fallback
-   ## Output
-   ## Error Handling

### `.aiox-core/development/tasks/orchestrate.md` — 65 linhas
- # \*orchestrate Command
-   ## Usage
-   ## Options
-   ## Examples
-   ## Behavior
-   ## Output
-   ## Exit Codes

### `.aiox-core/development/tasks/orchestrate-status.md` — 63 linhas
- # \*orchestrate-status Command
-   ## Usage
-   ## Examples
-   ## Output
-   ## Behavior
-   ## Exit Codes

### `.aiox-core/development/tasks/orchestrate-resume.md` — 59 linhas
- # \*orchestrate-resume Command
-   ## Usage
-   ## Examples
-   ## Output
-   ## Behavior
-   ## Exit Codes

### `.aiox-core/development/tasks/fast-path-gate.md` — 57 linhas
- # Fast Path Gate
-   ## Purpose
-   ## Elicitation
-     ### Before mode selection
-     ### Before external delegation
-   ## Inputs
-   ## Execution
-   ## Acceptance Criteria
-   ## Anti-Patterns

### `.aiox-core/development/tasks/orchestrate-stop.md` — 54 linhas
- # \*orchestrate-stop Command
-   ## Usage
-   ## Examples
-   ## Output
-   ## Behavior
-   ## Exit Codes

### `.aiox-core/development/tasks/release-management.md` — 49 linhas
- # Manage Software Releases
-   ## When this task fires
-   ## Scope split with `publish-npm` task
-   ## TL;DR (full detail in the SOP)
-   ## Historical context

### `.aiox-core/development/tasks/devops-pro-activate.md` — 42 linhas
- # Task: DevOps Pro Activate
-   ## Purpose
-   ## Inputs
-   ## Endpoint
-   ## Execution
-   ## Pass Criteria
-   ## Source Of Truth

### `.aiox-core/development/tasks/merge-worktree.md` — 42 linhas
- # merge-worktree
-   ## Purpose
-   ## Usage
-   ## Parameters
-   ## Steps
-   ## Safety
-   ## Related

### `.aiox-core/development/tasks/cleanup-worktrees.md` — 39 linhas
- # cleanup-worktrees
-   ## Purpose
-   ## Usage
-   ## Parameters
-   ## Steps
-   ## Safety Checks
-   ## Related

### `.aiox-core/development/tasks/publish-npm.md` — 37 linhas
- # npm Publishing Pipeline
-   ## When this task fires
-   ## TL;DR (full detail in the SOP)
-   ## Historical context

### `.aiox-core/development/tasks/devops-pro-reset-password.md` — 36 linhas
- # Task: DevOps Pro Reset Password
-   ## Purpose
-   ## Inputs
-   ## Execution
-   ## Pass Criteria
-   ## Recommended Follow-Up
-   ## Source Of Truth

### `.aiox-core/development/tasks/devops-pro-validate-login.md` — 36 linhas
- # Task: DevOps Pro Validate Login
-   ## Purpose
-   ## Inputs
-   ## Endpoint
-   ## Execution
-   ## Pass Criteria
-   ## Source Of Truth

### `.aiox-core/development/tasks/remove-mcp.md` — 35 linhas
- # remove-mcp
-   ## Purpose
-   ## Usage
-   ## Parameters
-   ## Steps
-   ## Safety
-   ## Related

### `.aiox-core/development/tasks/devops-pro-check-access.md` — 34 linhas
- # Task: DevOps Pro Check Access
-   ## Purpose
-   ## Input
-   ## Endpoint
-   ## Execution
-   ## Pass Criteria
-   ## Source Of Truth

### `.aiox-core/development/tasks/devops-pro-request-reset.md` — 34 linhas
- # Task: DevOps Pro Request Reset
-   ## Purpose
-   ## Input
-   ## Endpoint
-   ## Execution
-   ## Pass Criteria
-   ## Source Of Truth

### `.aiox-core/development/tasks/devops-pro-verify-status.md` — 33 linhas
- # Task: DevOps Pro Verify Status
-   ## Purpose
-   ## Input
-   ## Endpoint
-   ## Execution
-   ## Pass Criteria
-   ## Source Of Truth

### `.aiox-core/development/tasks/list-mcps.md` — 33 linhas
- # list-mcps
-   ## Purpose
-   ## Usage
-   ## Output
-   ## Implementation
-   ## Related

### `.aiox-core/development/tasks/devops-pro-resend-verification.md` — 32 linhas
- # Task: DevOps Pro Resend Verification
-   ## Purpose
-   ## Input
-   ## Endpoint
-   ## Execution
-   ## Pass Criteria
-   ## Source Of Truth

## `.aiox-core/development/templates/` — 34 arquivos · 4.406 linhas

### `.aiox-core/development/templates/aiox-doc-template.md` — 494 linhas
- # AIOX Documentation Template
-   ## Overview
-   ## Usage
-     ### Creating New Documentation
-     ### Template Variables
-   ## Template Structure
-     ### Minimal Template
-     ### Full Template with i18n
-   ## Section Templates
-     ### Architecture Decision Record (ADR)
-     ### Guide Template
-     ### API/Reference Template
-   ## i18n Guidelines
-     ### File Structure
-     ### Language Header
-     ### Translation Notes
-   ## Style Guide
-     ### Headings
-     ### Code Blocks
-     ### Tables
-     ### Links
-   ## Examples
-     ### Example 1: Creating an Agent Guide
-   ## Related Documents

### `.aiox-core/development/templates/research-prompt-tmpl.md` — 486 linhas
- # Deep Research Prompt Template
-   ## Template Variables
-   ## Prompt Template
-   ## Pre-Built Scope Templates by Domain
-     ### Copywriting (Specialist-Based)
-     ### Product Management (Generic)
-     ### Sales (Specialist-Based)
-   ## Requirements Templates by Research Mode
-     ### Comprehensive (No Local Knowledge)
-     ### Complementary (Has Local Knowledge)
-   ## Sources Templates by Domain
-     ### Copywriting
-     ### Product Management
-     ### Sales
-   ## Deliverables Templates
-     ### Standard Deliverables Set
-     ### Extended Deliverables (Deep Research)
-   ## Example: Fully Rendered Prompt
-     ### Input Variables
-     ### Rendered Output
-   ## Usage Notes

### `.aiox-core/development/templates/service-template/client.ts.hbs` — 403 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/templates/service-template/__tests__/index.test.ts.hbs` — 237 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/templates/code-intel-integration-pattern.md` — 199 linhas
- # Code Intelligence Integration Pattern
-   ## Pattern Overview
-   ## Complete Example
-   ## Partial Results Pattern
-   ## Available Capabilities
-     ### Enricher (composite — via `getEnricher()`)
-     ### Client (primitive — via `getClient()`)
-   ## Testing Pattern
-     ### Mock Strategy
-     ### Required Test Scenarios
-     ### Test Helper Setup
-   ## Existing Helpers (Reference)

### `.aiox-core/development/templates/service-template/errors.ts.hbs` — 182 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/templates/squad/script-template.js` — 179 linhas
- fn parseArgs()
- fn showHelp()
- fn log()
- fn execute()
- fn main()
- exports = {

### `.aiox-core/development/templates/service-template/README.md.hbs` — 158 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/templates/squad/task-template.md` — 146 linhas
- # {{COMPONENTNAME}}
-   ## Purpose
-   ## Story Reference
-   ## Pre-Conditions
-   ## Code Intelligence Duplicate Check
-   ## Execution Steps
-     ### Step 1: Initialize
-     ### Step 2: Process
-     ### Step 3: Complete
-   ## Error Handling
-     ### Error 1: Description
-   ## Post-Conditions
-   ## Metadata

### `.aiox-core/development/templates/service-template/types.ts.hbs` — 145 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/templates/squad/workflow-template.yaml` — 123 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:
-   type:
-   scope:
-   metadata:
-   triggers:
-   inputs:
-   phases:
-   sequence:
-   outputs:
-   handoff_prompts:
-   completion:
-   validation:

### `.aiox-core/development/templates/service-template/index.ts.hbs` — 120 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/templates/subagent-step-prompt.md` — 120 linhas
- # Subagent Step Prompt Template
-   ## Template
-   ## Variable Reference
-   ## Resolution Rules
-     ### Path Resolution by Context
-     ### Hybrid Resolution Order
-     ### Agent YAML Extraction
-     ### Task Content Extraction
-   ## Notes

### `.aiox-core/development/templates/ptc-entity-validation.md` — 113 linhas
- # PTC Template: Entity Validation Batch
-   ## Purpose
-   ## Restriction (ADR-3)
-   ## Template
-   ## Token Comparison
-   ## Notes

### `.aiox-core/development/templates/squad/data-template.yaml` — 105 linhas
- name:
- version:
- description:
- metadata:
-   created:
-   author:
-   squad:
-   tags:
- schema:
-   type:
-   required:
-   properties:
- defaults:
-   enabled:
-   priority:
-   metadata:
- validation:
- entries:
- usage:
-   load:

### `.aiox-core/development/templates/squad/tool-template.js` — 103 linhas
- fn _helperFunction1()
- fn _helperFunction2()
- fn getInfo()
- exports = {

### `.aiox-core/development/templates/ptc-qa-gate.md` — 100 linhas
- # PTC Template: QA Gate Batch
-   ## Purpose
-   ## Restriction (ADR-3)
-   ## Template
-   ## Token Comparison
-   ## Notes

### `.aiox-core/development/templates/squad/template-template.md` — 97 linhas
- # {{COMPONENTNAME}} Template
-   ## Template Variables
-   ## Usage
-   ## Template Content
- # {{VAR1}}
-   ## Section 1
-     ### Subsection 1.1
-     ### Subsection 1.2
-   ## Section 2
-   ## Section 3
-   ## Examples
-     ### Example 1: Basic Usage
-     ### Example 2: With Conditionals

### `.aiox-core/development/templates/ptc-research-aggregation.md` — 94 linhas
- # PTC Template: Research Aggregation Batch
-   ## Purpose
-   ## Restriction (ADR-3)
-   ## Template
-   ## Token Comparison
-   ## Notes

### `.aiox-core/development/templates/service-template/jest.config.js` — 89 linhas
- exports = {

### `.aiox-core/development/templates/service-template/package.json.hbs` — 87 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/templates/squad/checklist-template.md` — 82 linhas
- # {{COMPONENTNAME}} Checklist
-   ## Pre-Conditions
-   ## Checklist Items
-     ### Category 1: Setup
-     ### Category 2: Implementation
-     ### Category 3: Validation
-   ## Post-Conditions
-   ## Sign-off
-   ## Usage

### `.aiox-core/development/templates/squad/agent-template.md` — 80 linhas
- # {{COMPONENTNAME}}
-   ## Description
-   ## Configuration
-   ## Commands
-   ## Collaboration
-   ## Code Intelligence Context

### `.aiox-core/development/templates/squad-template/workflows/example-workflow.yaml` — 75 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:
-   type:
-   triggers:
-   elicitation:
-   phases:
-   sequence:
-   error_handling:
-   completion:

### `.aiox-core/development/templates/projeto-status-tmpl.md` — 56 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/templates/squad-template/tests/example-agent.test.js` — 53 linhas
- *(sem estrutura extraível)*

### `.aiox-core/development/templates/agent-handoff-tmpl.yaml` — 48 linhas
- handoff:
-   version:
-   timestamp:
-   from_agent:
-   to_agent:
-   story_context:
-   decisions:
-   files_modified:
-   blockers:
-   next_action:

### `.aiox-core/development/templates/squad-template/tasks/example-task.yaml` — 46 linhas
- name:
- version:
- description:
- inputs:
- outputs:
- steps:
- error_handling:
-   on_validation_error:
-   on_process_error:
-   retry_count:

### `.aiox-core/development/templates/service-template/tsconfig.json` — 45 linhas
- compilerOptions:
- include:
- exclude:

### `.aiox-core/development/templates/squad-template/README.md` — 37 linhas
- # {{Squad Name}}
-   ## Installation
-   ## Usage
-   ## Features
-   ## Documentation
-   ## Contributing
-   ## License

### `.aiox-core/development/templates/squad-template/agents/example-agent.yaml` — 36 linhas
- name:
- version:
- description:
- persona:
-   name:
-   role:
-   expertise:
- capabilities:
- commands:
- system_prompt:

### `.aiox-core/development/templates/squad-template/squad.yaml` — 25 linhas
- name:
- version:
- description:
- author:
- license:
- aiox:
-   minVersion:
-   type:
- components:
-   agents:
-   tasks:
-   workflows:
-   templates:
- dependencies:
- keywords:

### `.aiox-core/development/templates/squad-template/templates/example-template.md` — 24 linhas
- # {{title}}
-   ## Overview
-   ## Details
-   ## Next Steps

### `.aiox-core/development/templates/squad-template/package.json` — 19 linhas
- name:
- version:
- description:
- main:
- scripts:
- keywords:
- author:
- license:
- devDependencies:

## `.aiox-core/development/workflows/` — 15 arquivos · 5.623 linhas

### `.aiox-core/development/workflows/brownfield-discovery.yaml` — 932 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:

### `.aiox-core/development/workflows/spec-pipeline.yaml` — 576 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:

### `.aiox-core/development/workflows/development-cycle.yaml` — 515 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:
- metadata:
-   author:
-   story:
-   epic:
-   created_date:
-   version:
-   tags:

### `.aiox-core/development/workflows/qa-loop.yaml` — 443 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:

### `.aiox-core/development/workflows/auto-worktree.yaml` — 421 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:

### `.aiox-core/development/workflows/greenfield-fullstack.yaml` — 384 linhas
- workflow:
-   id:
-   name:
-   description:

### `.aiox-core/development/workflows/brownfield-fullstack.yaml` — 367 linhas
- workflow:
-   id:
-   name:
-   description:

### `.aiox-core/development/workflows/epic-orchestration.yaml` — 326 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:
- metadata:
-   author:
-   created:
-   version:
-   tags:

### `.aiox-core/development/workflows/story-development-cycle.yaml` — 284 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:
- metadata:
-   author:
-   created_date:
-   version:
-   tags:

### `.aiox-core/development/workflows/greenfield-ui.yaml` — 282 linhas
- workflow:
-   id:
-   name:
-   description:

### `.aiox-core/development/workflows/greenfield-service.yaml` — 276 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:

### `.aiox-core/development/workflows/brownfield-ui.yaml` — 258 linhas
- workflow:
-   id:
-   name:
-   description:

### `.aiox-core/development/workflows/brownfield-service.yaml` — 244 linhas
- workflow:
-   id:
-   name:
-   description:

### `.aiox-core/development/workflows/design-system-build-quality.yaml` — 227 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:
- metadata:
-   author:
-   created_date:
-   version:
-   tags:

### `.aiox-core/development/workflows/README.md` — 88 linhas
- # AIOX Workflows
-   ## Available Workflows
-     ### Development Workflows
-     ### Configuration Workflows
-   ## Setup Environment Workflow
-     ### Features
-     ### Usage
-     ### What It Does
-     ### IDE Rule Locations
-     ### Requirements
-   ## Creating New Workflows
-     ### Workflow Structure
-   ## Best Practices

## `.aiox-core/docs/standards/` — 11 arquivos · 7.224 linhas

### `.aiox-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md` — 1414 linhas
- # AIOX Task Format Specification V1.0
-   ## Purpose
-   ## Task Format Overview
-   ## Field Definitions
-     ### Required Fields
-       #### 1. `task`
-       #### 2. `responsável`
-       #### 3. `responsavel_type`
-       #### 4. `atomic_layer`
-       #### 5. `Entrada` (Inputs)
-       #### 6. `Saída` (Outputs)
-     ### Optional Fields
-       #### 7. `Checklist`
-       #### 8. `Template`
-       #### 9. `Tools`
-       #### 10. `Scripts`
-       #### 11. `Performance`
-       #### 12. `Error Handling`
-       #### 13. `Metadata`
-   ## Type System
-     ### Basic Types
-     ### Complex Types
-     ### Optional Types
-     ### Custom Types (Reference Schemas)
-   ## Validation Rules
-     ### Required Field Validation
-     ### Input/Output Validation
-   ## Examples by Executor Type
-     ### Agente (AI-Powered)
-     ### Worker (Script-Based)
- … (+15 itens)

### `.aiox-core/docs/standards/AIOX-LIVRO-DE-OURO-V2.2-SUMMARY.md` — 1339 linhas
- # 📘 AIOX v2.2 - Livro de Ouro (Future Vision)
-   ## 🎯 PURPOSE OF THIS DOCUMENT
-   ## 🚀 WHAT'S NEW IN v2.2 - EXECUTIVE SUMMARY
-     ### Memory Layer (The Game Changer)
-     ### Agent Lightning (RL Optimization)
-     ### Advanced Features Matrix
-   ## 🧠 DEEP DIVE: Memory Layer
-     ### The Problem (v4.0.4)
-     ### The Solution (v2.2)
-     ### Memory Architecture
-     ### Memory Types in Detail
-   ## ⚡ DEEP DIVE: Agent Lightning
-     ### The Problem (v4.0.4)
-     ### The Solution (v2.2)
-     ### Agent Lightning Architecture
-     ### Impact Metrics
-   ## 🤝 DEEP DIVE: Team Features
-     ### Shared Context
-     ### Collaborative Workflows
-     ### Team Analytics
-   ## 🏪 DEEP DIVE: Clones Marketplace
-     ### Available Clones (v2.2 Launch)
-     ### How Clones Work
-   ## 📊 COMPARATIVE METRICS: v4.0.4 vs. v2.2
-     ### Development Speed
-     ### Cost Efficiency
-     ### Quality & Learning
-     ### Team Collaboration
-   ## 🚀 ROADMAP BEYOND v2.2
-     ### v2.3 (Q3 2026) - Enterprise & Scale
- … (+17 itens)

### `.aiox-core/docs/standards/AIOX-LIVRO-DE-OURO-V2.1-COMPLETE.md` — 837 linhas
- # AIOX Framework - Livro de Ouro v4.2 (Complete)
-   ## O Sistema Operacional Definitivo para Orquestração de Agentes IA
-   ## 📣 IMPORTANTE: Sobre Este Documento
-   ## 📜 Open Source vs. Serviço - Business Model v4.2
-     ### O Que Mudou de v2.0 para v4.0.4
-     ### Repositório Multi-Repo Structure
-     ### Competitive Positioning
-   ## 📖 Como Usar Este Livro
- # 🚀 LAYER 0: DISCOVERY ROUTER
-   ## Bem-vindo ao AIOX v4.2 - Vamos Encontrar Seu Caminho
-     ### Learning Tracks Disponíveis
- # 🎯 LAYER 1: UNDERSTANDING
-   ## Essay 1: Por Que AIOX Existe
-     ### O Problema
-     ### A Solução
-   ## Essay 2: Estrutura é Sagrada
-   ## Essay 3: Business Model v4.2
-     ### Por Que Workers São Open-Source Agora?
-     ### O Que Permanece Proprietário?
-   ## Essay 4: Agent System
-     ### Os 11 Agents v4.2
-     ### Agent Activation
-   ## Essay 5: Task-First Architecture
-     ### A Filosofia
-     ### O Que Isso Significa
-     ### Migração Instantânea
- # 🎨 LAYER 2: COMPONENT LIBRARY
-   ## Arquitetura Modular v4.2
-     ### Os 4 Módulos
-     ### Module Dependencies
- … (+33 itens)

### `.aiox-core/docs/standards/EXECUTOR-DECISION-TREE.md` — 697 linhas
- # AIOX Executor Decision Tree
-   ## Purpose
-   ## The Four Executor Types
-     ### 1. Agente (AI-Powered Execution)
-     ### 2. Worker (Script-Based Execution)
-     ### 3. Humano (Manual Human Execution)
-     ### 4. Clone (Mind Emulation with Heuristics)
-   ## Decision Tree
-   ## Detailed Decision Criteria
-     ### Criterion 1: Creativity / Subjectivity Required
-     ### Criterion 2: Deterministic Algorithm Exists
-     ### Criterion 3: External API Call Required
-     ### Criterion 4: Human Judgment Required
-     ### Criterion 5: Specific Methodology Required
-   ## Cost-Benefit Analysis
-     ### Executor Cost Comparison
-     ### ROI Calculation
-   ## Capability Matrix
-     ### What Each Executor CAN Do
-   ## Executor Substitution Rules
-     ### When to Swap Executors
-       #### Rule 1: Agente → Worker (Cost Optimization)
-       #### Rule 2: Humano → Agente (Automation)
-       #### Rule 3: Agente → Clone (Methodology Enforcement)
-       #### Rule 4: Clone → Agente (Simplification)
-   ## Hybrid Executor Strategies
-     ### Strategy 1: Agente + Worker (AI with Fallback)
-     ### Strategy 2: Agente + Humano (AI with Review)
-     ### Strategy 3: Clone + Agente (Methodology + Creativity)
-   ## Real-World Examples from V2.0 Workflow
- … (+13 itens)

### `.aiox-core/docs/standards/AGENT-PERSONALIZATION-STANDARD-V1.md` — 572 linhas
- # Agent Personalization Standard v1.0
-   ## 🎯 Core Principle
-   ## 📐 Architecture Overview
-     ### Three-Layer System
-   ## 🔧 Layer 1: Agent Persona Configuration
-     ### Agent File Structure (Updated)
-     ### Example: Dex (Builder Agent)
-     ### Archetype Vocabulary Reference
-   ## 🎨 Layer 2: Output Formatter
-     ### Template Engine Architecture
-     ### Pattern Validation
-   ## 📝 Layer 3: Standardized Templates
-     ### Task Execution Report Template
-     ### Checklist Template
-     ### Workflow YAML Template
-   ## 🎯 Personality Injection Points
-     ### Where Personality Shows (Flexible)
-     ### What NEVER Changes (Fixed)
-   ## 📊 Implementation Phases
-     ### Phase 1: Agent File Updates (Day 1-2)
-     ### Phase 2: Output Formatter (Day 2-3)
-     ### Phase 3: Task Template Updates (Day 3-4)
-     ### Phase 4: Baseline Metrics (Day 4-5)
-   ## ✅ Success Criteria
-     ### Must Have (MVP)
-     ### Should Have
-     ### Nice to Have
-   ## 🚫 Anti-Patterns to Avoid
-     ### ❌ Breaking Familiaridade
-     ### ❌ Over-Personalizing Structure
- … (+5 itens)

### `.aiox-core/docs/standards/QUALITY-GATES-SPECIFICATION.md` — 556 linhas
- # Quality Gates Specification v4.2
-   ## 📋 Table of Contents
-   ## Overview
-     ### Purpose
-     ### Design Principles
-     ### Architecture Diagram
-   ## Layer 1: Pre-commit
-     ### Purpose
-     ### Checks
-     ### Configuration
-       #### .husky/pre-commit
-       #### .lintstagedrc.json
-       #### package.json scripts
-     ### Expected Results
-   ## Layer 2: PR Automation
-     ### Purpose
-     ### Checks
-     ### Configuration
-       #### .github/workflows/quality-gates-pr.yml
-       #### .github/coderabbit.yaml
-     ### Expected Results
-   ## Layer 3: Human Review
-     ### Purpose
-     ### Review Focus
-     ### CODEOWNERS Configuration
-     ### Review Checklist
-     ### Expected Results
-   ## Configuration Guide
-     ### Initial Setup
-     ### Customization
- … (+10 itens)

### `.aiox-core/docs/standards/STORY-TEMPLATE-V2-SPECIFICATION.md` — 550 linhas
- # Story Template v2.0 Specification
-   ## 📋 Table of Contents
-   ## Overview
-     ### Purpose
-     ### What's New in v2.0
-     ### Design Principles
-   ## Template Structure
-     ### Complete Template
-   ## Section Specifications
-     ### Header Section
-     ### Cross-Story Decisions (NEW in v2.0)
-     ### User Story
-     ### Tasks
-     ### Acceptance Criteria
-     ### CodeRabbit Integration (NEW in v2.0)
-     ### Dev Agent Record (NEW in v2.0)
-     ### QA Results (NEW in v2.0)
-   ## Story Types
-     ### 🔧 Infrastructure
-     ### 💻 Feature
-     ### 📖 Documentation
-     ### ✅ Validation
-     ### 🐛 Bug Fix
-   ## Validation Checklist
-     ### Story Draft Validation
-       #### Required Sections
-       #### Quality Checks
-       #### Terminology
-   ## Examples
-     ### Example: Infrastructure Story
- … (+2 itens)

### `.aiox-core/docs/standards/OPEN-SOURCE-VS-SERVICE-DIFFERENCES.md` — 511 linhas
- # Open-Source vs Service Implementation Differences
-   ## Overview
-   ## Multi-Repo Strategy (v4.2)
-     ### Repository Organization
-     ### npm Package Scoping
-     ### Open-Source vs Service by Repository
-   ## Task Format Differences
-     ### responsavel_type Field
-     ### atomic_layer Field
-     ### Template Field
-   ## Checklist Differences
-     ### Naming Convention
-   ## Tools vs Scripts
-     ### Open-Source Definition
-     ### Service Definition
-   ## Execution Modes
-     ### Open-Source
-     ### Service
-   ## Error Handling
-     ### Open-Source
-     ### Service
-   ## Performance Tracking
-     ### Open-Source
-     ### Service
-   ## Personality Configuration
-     ### Open-Source
-     ### Service
-   ## Metadata
-     ### Open-Source
-     ### Service
- … (+9 itens)

### `.aiox-core/docs/standards/AIOX-COLOR-PALETTE-V2.1.md` — 353 linhas
- # AIOX Color Palette v4.2
-   ## 🎨 Brand Identity
-     ### Logo Inspiration
-     ### Primary Brand Reference
-   ## 🌈 Core Color Palette
-     ### Brand Colors
-     ### Functional Colors
-     ### Neutral Colors
-     ### Gradient Palette
-   ## 📐 Color System Architecture
-     ### JavaScript/Node.js Implementation
-     ### CSS/Tailwind Implementation
-     ### Tailwind Config Extension
-   ## 🎯 Usage Guidelines
-     ### Visual Hierarchy
-     ### Context-Specific Usage
-   ## ♿ Accessibility
-     ### WCAG Compliance
-     ### Terminal Compatibility
-   ## 🎨 Design Tokens (Future)
-     ### DTCG Format (W3C Design Tokens Community Group)
-   ## 📝 Version History
-   ## 🔗 Related Documents

### `.aiox-core/docs/standards/STANDARDS-INDEX.md` — 210 linhas
- # AIOX Standards Documentation Index
-   ## 📋 Quick Start Guide
-     ### For New Contributors
-     ### For Existing Users
-   ## 📚 Standards by Category
-     ### Core Framework Standards (Current v4.2)
-     ### Agent Standards
-     ### Visual & Branding
-     ### Legacy Documents (Reference Only)
-   ## 🔄 What Changed in v4.2
-     ### New Documents Created
-     ### Key Terminology Changes
-     ### Concepts Added
-   ## 📂 Document Organization
-     ### Standards Directory Structure
-   ## 🔗 Related Documentation
-     ### Architecture Documentation
-     ### Project Documentation
-   ## 📝 Document Status Legend
-   ## 🚀 Maintaining Standards
-     ### When to Update Standards
-     ### Update Process
-     ### Validation Commands
-   ## 📜 Change Log

### `.aiox-core/docs/standards/AIOX-COLOR-PALETTE-QUICK-REFERENCE.md` — 185 linhas
- # AIOX Color Palette - Quick Reference
-   ## 🎨 Visual Palette
-     ### Brand Colors
-     ### Functional Colors
-     ### Neutral Colors
-   ## 🚀 Quick Start
-     ### JavaScript/Node.js
-     ### CSS/Tailwind
-   ## 📋 Common Patterns
-     ### Welcome Screen
-     ### Interactive Question
-     ### Status Feedback
-     ### Error Handling
-   ## 🎯 Usage Rules
-     ### ✅ DO
-     ### ❌ DON'T
-   ## 📊 Color Hierarchy
-   ## 🧪 Test Your Implementation
-   ## 📚 Full Documentation
-   ## 🔗 Brand References

## `.aiox-core/elicitation/agent-elicitation.js/` — 1 arquivos · 271 linhas

### `.aiox-core/elicitation/agent-elicitation.js` — 271 linhas
- exports = agentElicitationSteps;

## `.aiox-core/elicitation/task-elicitation.js/` — 1 arquivos · 280 linhas

### `.aiox-core/elicitation/task-elicitation.js` — 280 linhas
- exports = taskElicitationSteps;

## `.aiox-core/elicitation/workflow-elicitation.js/` — 1 arquivos · 314 linhas

### `.aiox-core/elicitation/workflow-elicitation.js` — 314 linhas
- exports = workflowElicitationSteps;

## `.aiox-core/framework-config.yaml/` — 1 arquivos · 181 linhas

### `.aiox-core/framework-config.yaml` — 181 linhas
- metadata:
-   name:
-   framework_version:
- markdownExploder:
- resource_locations:
-   agents_dir:
-   tasks_dir:
-   templates_dir:
-   checklists_dir:
-   tools_dir:
-   scripts:
-   data_dir:
-   elicitation_dir:
-   squads_template_dir:
-   minds_dir:
- performance_defaults:
-   lazy_loading:
-   git:
- dev:
-   execution_mode:
-   delegate_to:
-   auto_review:
-   fast_path:
- external_executors:
-   enabled:
-   default_sandbox:
-   run_dir:
- utility_scripts_registry:
-   helpers:
-   executors:
- … (+9 itens)

## `.aiox-core/hooks/gemini/` — 6 arquivos · 518 linhas

### `.aiox-core/hooks/gemini/before-tool.js` — 114 linhas
- fn beforeTool()
- fn logToolExecution()

### `.aiox-core/hooks/gemini/session-end.js` — 90 linhas
- fn sessionEnd()
- fn updateRecentSessions()

### `.aiox-core/hooks/gemini/session-start.js` — 90 linhas
- fn sessionStart()
- fn detectProjectType()

### `.aiox-core/hooks/gemini/before-agent.js` — 79 linhas
- fn beforeAgent()

### `.aiox-core/hooks/gemini/after-tool.js` — 77 linhas
- fn afterTool()
- fn logToolResult()
- fn trackFileModification()

### `.aiox-core/hooks/gemini/rewind-handler.js` — 68 linhas
- fn sanitizeSessionId()
- fn handleRewind()

## `.aiox-core/hooks/ids-post-commit.js/` — 1 arquivos · 116 linhas

### `.aiox-core/hooks/ids-post-commit.js` — 116 linhas
- fn isDocsOnlyPath()
- fn isDocsOnlyCommit()
- fn getChangedFilesFromLastCommit()
- fn main()

## `.aiox-core/hooks/ids-pre-push.js/` — 1 arquivos · 123 linhas

### `.aiox-core/hooks/ids-pre-push.js` — 123 linhas
- fn isDocsOnlyPath()
- fn isDocsOnlyPush()
- fn getChangedFilesSinceRemote()
- fn main()

## `.aiox-core/hooks/unified/` — 5 arquivos · 772 linhas

### `.aiox-core/hooks/unified/README.md` — 338 linhas
- # Unified Hooks System
-   ## Overview
-     ### Architecture
-   ## Components
-     ### 1. Hook Interface (`hook-interface.js`)
-     ### 2. Hook Runners (`runners/`)
-     ### 3. Hook Registry (`hook-registry.js`)
-   ## PreCompact Hook (Story MIS-3)
-     ### Purpose
-     ### Architecture
-     ### Performance
-     ### Graceful Degradation
-   ## Creating New Hooks
-     ### Step 1: Create Runner
-     ### Step 2: Register Hook
-     ### Step 3: Test Hook
-   ## Testing
-     ### Unit Tests
-     ### Integration Tests
-   ## Best Practices
-     ### 1. Fire-and-Forget Pattern
-     ### 2. Silent Failures
-     ### 3. Timeout Limits
-     ### 4. Pro Detection (Open Core)
-   ## Related Stories

### `.aiox-core/hooks/unified/hook-interface.js` — 159 linhas
- class UnifiedHook
- fn createContext()
- fn formatResult()
- exports = {

### `.aiox-core/hooks/unified/hook-registry.js` — 143 linhas
- class HookRegistry
- exports = { HookRegistry, registry };

### `.aiox-core/hooks/unified/runners/precompact-runner.js` — 96 linhas
- fn onPreCompact()
- fn getHookConfig()
- exports = {

### `.aiox-core/hooks/unified/index.js` — 36 linhas
- exports = {
- class CustomHook

## `.aiox-core/index.esm.js/` — 1 arquivos · 15 linhas

### `.aiox-core/index.esm.js` — 15 linhas
- *(sem estrutura extraível)*

## `.aiox-core/index.js/` — 1 arquivos · 15 linhas

### `.aiox-core/index.js` — 15 linhas
- exports = {

## `.aiox-core/infrastructure/contracts/` — 1 arquivos · 44 linhas

### `.aiox-core/infrastructure/contracts/compatibility/aiox-4.0.4.yaml` — 44 linhas
- release:
- updated_at:
- source_of_truth:
-   docs_matrix:
-   validator:
- global_required_checks:
- ide_matrix:

## `.aiox-core/infrastructure/index.js/` — 1 arquivos · 199 linhas

### `.aiox-core/infrastructure/index.js` — 199 linhas
- fn safeRequire()
- exports = moduleExports;

## `.aiox-core/infrastructure/integrations/` — 18 arquivos · 3.680 linhas

### `.aiox-core/infrastructure/integrations/ai-providers/ai-provider-factory.js` — 476 linhas
- fn loadConfig()
- fn getProvider()
- fn getPrimaryProvider()
- fn getFallbackProvider()
- fn getProviderForTask()
- fn executeWithFallback()
- fn getAvailableProviders()
- fn getProvidersStatus()
- fn clearProviderCache()
- fn getConfig()
- fn normalizeProviderName()
- fn createProviderCacheKey()
- fn sanitizeCacheConfig()
- fn sanitizeHeaders()
- fn hashSecret()
- fn getProviderConfig()
- fn getProviderConfigKeys()
- fn getConfiguredProviderNames()
- fn addProviderName()
- fn isProviderConfigKey()
- exports = {

### `.aiox-core/infrastructure/integrations/pm-adapters/jira-adapter.js` — 448 linhas
- class JiraAdapter
- exports = { JiraAdapter };

### `.aiox-core/infrastructure/integrations/pm-adapters/github-adapter.js` — 392 linhas
- class GitHubProjectsAdapter
- exports = { GitHubProjectsAdapter };

### `.aiox-core/infrastructure/integrations/ai-providers/gemini-provider.js` — 365 linhas
- class GeminiProvider
- exports = { GeminiProvider };

### `.aiox-core/infrastructure/integrations/ai-providers/openai-compatible-provider.js` — 351 linhas
- class OpenAICompatibleProvider
- fn buildProviderOptions()
- exports = { OpenAICompatibleProvider };

### `.aiox-core/infrastructure/integrations/pm-adapters/clickup-adapter.js` — 345 linhas
- class ClickUpAdapter
- exports = { ClickUpAdapter };

### `.aiox-core/infrastructure/integrations/pm-adapters/local-adapter.js` — 175 linhas
- class LocalAdapter
- exports = { LocalAdapter };

### `.aiox-core/infrastructure/integrations/ai-providers/claude-provider.js` — 170 linhas
- class ClaudeProvider
- exports = { ClaudeProvider };

### `.aiox-core/infrastructure/integrations/gemini-extensions/security-adapter.js` — 159 linhas
- class SecurityAdapter
- exports = { SecurityAdapter, Severity };

### `.aiox-core/infrastructure/integrations/ai-providers/ai-provider.js` — 147 linhas
- class AIProvider
- exports = { AIProvider };

### `.aiox-core/infrastructure/integrations/gemini-extensions/cloudrun-adapter.js` — 128 linhas
- class CloudRunAdapter
- exports = { CloudRunAdapter };

### `.aiox-core/infrastructure/integrations/ai-providers/README.md` — 119 linhas
- # AI Providers
-   ## Architecture
-   ## Usage
-     ### Basic Usage
-     ### Task-Based Routing
-     ### Direct Provider Access
-     ### Check Provider Status
-   ## Configuration
-   ## Provider Comparison
-   ## Epic Reference

### `.aiox-core/infrastructure/integrations/gemini-extensions/workspace-adapter.js` — 99 linhas
- class WorkspaceAdapter
- exports = { WorkspaceAdapter };

### `.aiox-core/infrastructure/integrations/gemini-extensions/supabase-adapter.js` — 88 linhas
- class SupabaseAdapter
- exports = { SupabaseAdapter };

### `.aiox-core/infrastructure/integrations/gemini-extensions/policy-sync.js` — 73 linhas
- class PolicySync
- exports = { PolicySync };

### `.aiox-core/infrastructure/integrations/pm-adapters/README.md` — 59 linhas
- # PM Adapters
-   ## Available Adapters
-   ## Usage
-   ## Configuration
-   ## Adapter Interface
-   ## Adding New Adapters

### `.aiox-core/infrastructure/integrations/ai-providers/index.js` — 45 linhas
- exports = {

### `.aiox-core/infrastructure/integrations/gemini-extensions/index.js` — 41 linhas
- fn getExtensionStatus()
- exports = {

## `.aiox-core/infrastructure/README.md/` — 1 arquivos · 126 linhas

### `.aiox-core/infrastructure/README.md` — 126 linhas
- # Infrastructure Module
-   ## Structure
-   ## Dependency Direction
-   ## Key Components
-     ### Git Integration
-     ### PM Integration
-     ### Template & Generation
-     ### Validation
-     ### Analysis
-     ### Testing
-     ### Performance
-     ### Quality
-   ## Usage
-   ## Tool Resolution
-   ## PM Adapters
-   ## Migration Reference

## `.aiox-core/infrastructure/schemas/` — 3 arquivos · 473 linhas

### `.aiox-core/infrastructure/schemas/agent-v3-schema.json` — 159 linhas
- $schema:
- $id:
- title:
- description:
- type:
- required:
- properties:

### `.aiox-core/infrastructure/schemas/build-state.schema.json` — 157 linhas
- $schema:
- $id:
- title:
- description:
- type:
- required:
- properties:
- additionalProperties:

### `.aiox-core/infrastructure/schemas/task-v3-schema.json` — 157 linhas
- $schema:
- $id:
- title:
- description:
- type:
- required:
- properties:

## `.aiox-core/infrastructure/scripts/` — 121 arquivos · 61.351 linhas

### `.aiox-core/infrastructure/scripts/performance-optimizer.js` — 1901 linhas
- class PerformanceOptimizer
- fn calculateCyclomaticComplexity()
- fn checkFunction()
- fn calculateTimeComplexity()
- fn isNestedLoopOverSameData()
- fn isInLoop()
- exports = PerformanceOptimizer;

### `.aiox-core/infrastructure/scripts/pattern-extractor.js` — 1561 linhas
- class PatternExtractor
- fn toggleTheme()
- fn fetcher()
- fn fetchData()
- fn operation()
- fn handleSubmit()
- fn Card()
- fn handleResize()
- fn readJsonFile()
- fn writeJsonFile()
- class TemplateEngine
- exports = TemplateEngine;
- fn formatBytes()
- fn debounce()
- fn deepClone()
- exports = { formatBytes, debounce, deepClone };
- fn main()
- exports = PatternExtractor;

### `.aiox-core/infrastructure/scripts/documentation-synchronizer.js` — 1431 linhas
- class DocumentationSynchronizer
- fn traverse()
- exports = DocumentationSynchronizer;

### `.aiox-core/infrastructure/scripts/code-quality-improver.js` — 1311 linhas
- class CodeQualityImprover
- fn comments()
- fn coverage()
- fn score()
- exports = CodeQualityImprover;

### `.aiox-core/infrastructure/scripts/gotchas-documenter.js` — 1295 linhas
- class GotchasDocumenter
- fn severityDiff()
- fn search()
- fn updateGotchas()
- fn getGotchasForSelfCritique()
- exports = {

### `.aiox-core/infrastructure/scripts/codebase-mapper.js` — 1286 linhas
- class CodebaseMapper
- fn checkRecursive()
- exports.named
- exports.named
- exports.default
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/cicd-discovery.js` — 1268 linhas
- class ConfigParser
- class ProviderDetector
- class PipelineAnalyzer
- class IntegrationSuggester
- class CICDDiscovery
- exports = CICDDiscovery;

### `.aiox-core/infrastructure/scripts/qa-loop-orchestrator.js` — 1262 linhas
- class QALoopOrchestrator
- fn getLoopStatus()
- fn startLoop()
- fn stopLoop()
- fn resumeLoop()
- fn listLoops()
- fn checkAbandonedLoops()
- fn printHelp()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/test-discovery.js` — 1259 linhas
- class FrameworkDetector
- class TestFileFinder
- fn walk()
- class TestAnalyzer
- class CoverageAnalyzer
- class TestRunner
- class TestDiscovery
- exports = TestDiscovery;

### `.aiox-core/infrastructure/scripts/stuck-detector.js` — 1249 linhas
- class StuckDetector
- fn loadConfig()
- fn quickCheck()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/qa-report-generator.js` — 1152 linhas
- class QAReportGenerator
- fn createQAReport()
- fn generateAndSaveReport()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/refactoring-suggester.js` — 1138 linhas
- class RefactoringSuggester
- fn checkNesting()
- exports = RefactoringSuggester;

### `.aiox-core/infrastructure/scripts/test-quality-assessment.js` — 1080 linhas
- class TestQualityAssessment
- fn testCount()
- fn normalizedScore()
- exports = TestQualityAssessment;

### `.aiox-core/infrastructure/scripts/pr-review-ai.js` — 1061 linhas
- class DiffAnalyzer
- class SecurityAnalyzer
- class PerformanceAnalyzer
- class CodeQualityAnalyzer
- class RedundancyAnalyzer
- class AIReviewer
- class PRReviewAI
- exports = PRReviewAI;

### `.aiox-core/infrastructure/scripts/visual-impact-generator.js` — 1055 linhas
- class VisualImpactGenerator
- fn filterComponents()
- exports = VisualImpactGenerator;

### `.aiox-core/infrastructure/scripts/approach-manager.js` — 1003 linhas
- class ApproachManager
- fn startApproach()
- fn clearApproach()
- fn getSuggestions()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/modification-risk-assessment.js` — 969 linhas
- class ModificationRiskAssessment
- fn functionCount()
- fn methodCount()
- fn avgWeight()
- exports = ModificationRiskAssessment;

### `.aiox-core/infrastructure/scripts/recovery-tracker.js` — 963 linhas
- fn validateAttemptsSchema()
- class RecoveryTracker
- fn trackAttempt()
- fn completeAttempt()
- fn getAttemptHistory()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/plan-tracker.js` — 920 linhas
- class PlanTracker
- fn getPlanProgress()
- fn updateAfterSubtask()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/coverage-analyzer.js` — 881 linhas
- class CoverageAnalyzer
- fn averagePercentage()
- exports = CoverageAnalyzer;

### `.aiox-core/infrastructure/scripts/commit-message-generator.js` — 849 linhas
- class CommitMessageGenerator
- fn originalElicits()
- fn modifiedElicits()
- fn originalSteps()
- fn modifiedSteps()
- exports = CommitMessageGenerator;

### `.aiox-core/infrastructure/scripts/project-status-loader.js` — 848 linhas
- class ProjectStatusLoader
- exports = {

### `.aiox-core/infrastructure/scripts/test-generator.js` — 843 linhas
- class TestGenerator
- fn openBrackets()
- fn closeBrackets()
- exports.push
- exports.push
- exports = TestGenerator;

### `.aiox-core/infrastructure/scripts/subtask-verifier.js` — 793 linhas
- class SubtaskVerifier
- fn timeout()
- fn main()
- exports = { SubtaskVerifier };

### `.aiox-core/infrastructure/scripts/framework-analyzer.js` — 761 linhas
- class FrameworkAnalyzer
- fn functions()
- fn conditions()
- fn comments()
- exports = FrameworkAnalyzer;

### `.aiox-core/infrastructure/scripts/improvement-engine.js` — 757 linhas
- class ImprovementEngine
- exports = ImprovementEngine;

### `.aiox-core/infrastructure/scripts/performance-analyzer.js` — 757 linhas
- class PerformanceAnalyzer
- exports = PerformanceAnalyzer;

### `.aiox-core/infrastructure/scripts/component-generator.js` — 737 linhas
- class ComponentGenerator
- exports = ComponentGenerator;

### `.aiox-core/infrastructure/scripts/rollback-manager.js` — 732 linhas
- class RollbackManager
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/codex-skills-sync/bootstrap.js` — 727 linhas
- fn parseArgs()
- fn printHelp()
- fn findProjectRoot()
- fn tryRequire()
- fn loadYaml()
- fn readText()
- fn listFiles()
- fn listDirs()
- fn extractYamlBlock()
- fn parseYamlText()
- fn getNested()
- fn findScalar()
- fn findBlockScalar()
- fn slug()
- fn yamlString()
- fn truncate()
- fn basenameNoExt()
- fn relative()
- fn parseAgentFile()
- fn collectCommands()
- fn collectCommandsFromText()
- fn parseCommandLine()
- fn uniqueCommands()
- fn starterCommands()
- fn parseConfig()
- fn resolveEntryAgent()
- fn resolveAgentFile()
- fn resolveSquadAlias()
- fn coreSkillId()
- fn squadSkillId()
- … (+10 itens)

### `.aiox-core/infrastructure/scripts/improvement-validator.js` — 709 linhas
- class ImprovementValidator
- fn ageInHours()
- exports = ImprovementValidator;

### `.aiox-core/infrastructure/scripts/worktree-manager.js` — 703 linhas
- class WorktreeManager
- fn daysSinceCreation()
- exports = WorktreeManager;

### `.aiox-core/infrastructure/scripts/dependency-impact-analyzer.js` — 702 linhas
- class DependencyImpactAnalyzer
- exports = DependencyImpactAnalyzer;

### `.aiox-core/infrastructure/scripts/conflict-resolver.js` — 674 linhas
- class ConflictResolver
- exports = ConflictResolver;

### `.aiox-core/infrastructure/scripts/approval-workflow.js` — 642 linhas
- class ApprovalWorkflow
- exports = ApprovalWorkflow;

### `.aiox-core/infrastructure/scripts/ide-sync/index.js` — 639 linhas
- fn loadConfig()
- fn getTransformer()
- fn transformPrimaryContent()
- fn isPathInside()
- fn syncIde()
- fn commandSync()
- fn skillCount()
- fn commandCount()
- fn commandValidate()
- fn parseArgs()
- fn showHelp()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/dependency-analyzer.js` — 637 linhas
- class DependencyAnalyzer
- fn hasCycle()
- exports = DependencyAnalyzer;

### `.aiox-core/infrastructure/scripts/usage-analytics.js` — 634 linhas
- class UsageAnalytics
- fn mentions()
- exports = UsageAnalytics;

### `.aiox-core/infrastructure/scripts/component-metadata.js` — 626 linhas
- class ComponentMetadata
- exports = ComponentMetadata;

### `.aiox-core/infrastructure/scripts/asset-inventory.js` — 620 linhas
- fn extractYamlFromMarkdown()
- fn extractAgentDependencies()
- fn extractTaskDependencies()
- fn detectVersion()
- fn scanDirectory()
- fn processAgents()
- fn processTasks()
- fn processTemplates()
- fn processChecklists()
- fn itemCount()
- fn processScripts()
- fn findOrphans()
- fn countDependencies()
- fn generateSummary()
- fn generateInventory()
- fn formatConsoleOutput()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/sandbox-tester.js` — 618 linhas
- class SandboxTester
- fn walk()
- exports = SandboxTester;

### `.aiox-core/infrastructure/scripts/batch-creator.js` — 607 linhas
- class BatchCreator
- exports = BatchCreator;

### `.aiox-core/infrastructure/scripts/backup-manager.js` — 606 linhas
- class BackupManager
- exports = BackupManager;

### `.aiox-core/infrastructure/scripts/codex-skills-sync/validate.js` — 604 linhas
- fn getDefaultOptions()
- fn parseArgs()
- fn isParsableAgent()
- fn validateSkillContent()
- fn parseSkillFrontmatter()
- fn createSkillToolSelfTestPayload()
- fn normalizeSkillToolTarget()
- fn extractCanonicalAgentPath()
- fn runSkillSelfTests()
- fn extractGeneratedSquadSource()
- fn isGeneratedSquadSkill()
- fn readTextIfExists()
- fn hasFullActivationPayload()
- fn escapeRegExp()
- fn hasLegacyAliasIntent()
- fn getThinLegacyRedirectIssues()
- fn isIntentionalLegacyAlias()
- fn classifyLegacySkillAlias()
- fn validateCodexSkills()
- fn formatHumanReport()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/transaction-manager.js` — 589 linhas
- class TransactionManager
- exports = TransactionManager;

### `.aiox-core/infrastructure/scripts/modification-validator.js` — 554 linhas
- class ModificationValidator
- exports = ModificationValidator;

### `.aiox-core/infrastructure/scripts/changelog-generator.js` — 553 linhas
- class ChangelogGenerator
- fn walkDir()
- exports = ChangelogGenerator;

### `.aiox-core/infrastructure/scripts/llm-routing/usage-tracker/index.js` — 549 linhas
- fn ensureDataDir()
- fn loadUsageData()
- fn saveUsageData()
- fn calculateCost()
- fn inputCost()
- fn outputCost()
- fn cachedCost()
- fn recordUsage()
- fn proxyRequest()
- fn proxyStreamingRequest()
- fn startServer()
- fn getUsageSummary()
- exports = {

### `.aiox-core/infrastructure/scripts/capability-analyzer.js` — 534 linhas
- class CapabilityAnalyzer
- exports = CapabilityAnalyzer;

### `.aiox-core/infrastructure/scripts/migrate-agent.js` — 526 linhas
- fn extractYamlFromMarkdown()
- fn isAlreadyV3()
- fn generateAutoClaudeSection()
- fn autoClaudeToYaml()
- fn insertAutoClaudeSection()
- fn generateDiff()
- fn migrateAgent()
- fn listAgents()
- fn formatListOutput()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/validate-agents.js` — 526 linhas
- fn extractYamlFromMarkdown()
- fn loadAllAgents()
- fn fileExists()
- fn validateCommandUniqueness()
- fn validateDependencies()
- fn validateAgentFormat()
- fn formatResults()
- fn validateAgents()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/documentation-integrity/brownfield-analyzer.js` — 501 linhas
- fn analyzeProject()
- fn analyzeTechStack()
- fn analyzeCodeStandards()
- fn analyzeWorkflows()
- fn analyzeDirectoryStructure()
- fn generateRecommendations()
- fn generateSummary()
- fn formatMigrationReport()
- exports = {

### `.aiox-core/infrastructure/scripts/generate-optimization-report.js` — 497 linhas
- fn loadThresholds()
- fn loadBaseline()
- fn loadUsageData()
- fn loadToolRegistry()
- fn getToolTier()
- fn aggregateUsage()
- fn compareBaseline()
- fn generateRecommendations()
- fn generateReport()
- fn saveRecommendations()
- fn saveReport()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/path-analyzer.js` — 474 linhas
- fn findFilesToAnalyze()
- fn extractReferences()
- fn resolveReference()
- fn fileExists()
- fn analyzeFile()
- fn suggestFixes()
- fn analyzePaths()
- fn formatConsoleOutput()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/performance-tracker.js` — 452 linhas
- fn trackConfigLoad()
- fn trackAgentActivation()
- fn startSession()
- fn endSession()
- fn getStatistics()
- fn cacheHitRate()
- fn targetSuccessRate()
- fn generateReport()
- fn savePerformanceData()
- fn loadPerformanceData()
- fn reset()
- exports = {

### `.aiox-core/infrastructure/scripts/git-wrapper.js` — 443 linhas
- class GitWrapper
- exports = GitWrapper;

### `.aiox-core/infrastructure/scripts/ide-sync/transformers/kimi.js` — 433 linhas
- fn transform()
- fn buildIdentitySection()
- fn buildProtocolSection()
- fn buildCommandsTable()
- fn normalizeCommands()
- fn normalizeCommand()
- fn formatCommandDescription()
- fn buildWorkflowSection()
- fn buildGuardrailsSection()
- fn buildHandoffsSection()
- fn buildOutputContractSection()
- fn buildDescription()
- fn buildRawContentSection()
- fn sanitizeGeneratedMarkdown()
- fn sanitizeBareStarCommands()
- fn addLanguageToUntypedFences()
- fn renderItem()
- fn getPreferredActivationId()
- fn getSkillId()
- fn getDirname()
- fn getFilename()
- fn sanitizeSkillToken()
- exports = {

### `.aiox-core/infrastructure/scripts/story-worktree-hooks.js` — 425 linhas
- fn loadConfig()
- fn getWorktreeSettings()
- fn extractStoryId()
- fn getStoryStatus()
- fn onStoryStart()
- fn onStoryDone()
- fn getWorktreeStatus()
- fn formatWorktreeStatus()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/yaml-validator.js` — 396 linhas
- class YAMLValidator
- exports = YAMLValidator;

### `.aiox-core/infrastructure/scripts/branch-manager.js` — 390 linhas
- class BranchManager
- exports = BranchManager;

### `.aiox-core/infrastructure/scripts/documentation-integrity/mode-detector.js` — 389 linhas
- fn detectInstallationMode()
- fn collectMarkers()
- fn isAioxCoreRepository()
- fn mapLegacyTypeToMode()
- fn validateModeSelection()
- fn getModeOptions()
- exports = {

### `.aiox-core/infrastructure/scripts/documentation-integrity/config-generator.js` — 368 linhas
- fn escapeYamlString()
- fn formatArrayAsYaml()
- fn buildConfigContext()
- fn renderConfigTemplate()
- fn processEachBlocks()
- fn loadConfigTemplate()
- fn generateConfig()
- fn buildDeploymentConfig()
- fn getDefaultDeploymentConfig()
- exports = {

### `.aiox-core/infrastructure/scripts/tool-resolver.js` — 360 linhas
- class ToolResolver
- fn resolveTool()
- exports = toolResolverInstance;

### `.aiox-core/infrastructure/scripts/security-checker.js` — 358 linhas
- class SecurityChecker
- exports = SecurityChecker;

### `.aiox-core/infrastructure/scripts/validate-parity.js` — 355 linhas
- fn parseArgs()
- fn runSyncValidate()
- fn getDefaultContractPath()
- fn loadCompatibilityContract()
- fn normalizeResult()
- fn escapeRegex()
- fn validateCompatibilityContract()
- fn sortUnique()
- fn diffCompatibilityContracts()
- fn runParityValidation()
- fn formatHumanReport()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/config-loader.js` — 349 linhas
- fn isCacheValid()
- fn loadFullConfig()
- fn loadConfigSections()
- fn loadAgentConfig()
- fn sizeKB()
- fn loadMinimalConfig()
- fn preloadConfig()
- fn clearCache()
- fn getPerformanceMetrics()
- fn validateAgentConfig()
- fn getConfigSection()
- exports = {

### `.aiox-core/infrastructure/scripts/git-config-detector.js` — 349 linhas
- class GitConfigDetector
- exports = GitConfigDetector;

### `.aiox-core/infrastructure/scripts/config-cache.js` — 335 linhas
- class ConfigCache
- exports = {

### `.aiox-core/infrastructure/scripts/documentation-integrity/doc-generator.js` — 331 linhas
- fn buildDocContext()
- fn renderTemplate()
- fn processIfBlocks()
- fn processEachBlocks()
- fn getNestedValue()
- fn loadTemplate()
- fn generateDocs()
- fn generateDoc()
- exports = {

### `.aiox-core/infrastructure/scripts/generate-settings-json.js` — 325 linhas
- fn validateBoundaryPath()
- fn readBoundaryConfig()
- fn isChildOf()
- fn expandOneLevel()
- fn expandSubdirWithExceptions()
- fn expandProtectedPaths()
- fn expandExceptionPaths()
- fn generatePermissions()
- fn writeSettingsJson()
- fn generate()
- exports = {

### `.aiox-core/infrastructure/scripts/documentation-integrity/gitignore-generator.js` — 312 linhas
- fn loadGitignoreTemplate()
- fn detectTechStacks()
- fn getTemplatesForStacks()
- fn generateGitignore()
- fn mergeGitignore()
- fn generateGitignoreFile()
- fn hasAioxIntegration()
- fn parseGitignore()
- exports = {

### `.aiox-core/infrastructure/scripts/collect-tool-usage.js` — 311 linhas
- fn createEvent()
- fn sanitizeEvent()
- fn validateEvent()
- fn pruneOldEntries()
- fn loadUsageData()
- fn saveUsageData()
- fn generateSessionId()
- fn collectFromStdin()
- fn generateSampleData()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/dashboard-status-writer.js` — 309 linhas
- fn ensureStatusDir()
- fn getProjectRoot()
- fn readStatus()
- fn createDefaultStatus()
- fn writeStatus()
- fn activateAgent()
- fn deactivateAgent()
- fn updateSession()
- fn incrementCommands()
- fn completeStory()
- fn updateRateLimit()
- fn clearStatus()
- fn getStatus()
- exports = {

### `.aiox-core/infrastructure/scripts/atomic-layer-classifier.js` — 308 linhas
- fn buildClassificationMap()
- fn classifyTask()
- fn processTaskFile()
- fn main()
- fn exitCode()
- exports = { classifyTask, processTaskFile };

### `.aiox-core/infrastructure/scripts/documentation-integrity/deployment-config-loader.js` — 308 linhas
- fn loadDeploymentConfig()
- fn loadProjectConfig()
- fn getTargetBranch()
- fn defaultTarget()
- fn matchesBranchPattern()
- fn getEnvironmentConfig()
- fn isQualityGateEnabled()
- fn getEnabledQualityGates()
- fn deepMerge()
- fn validateDeploymentConfig()
- exports = {

### `.aiox-core/infrastructure/scripts/ide-sync/agent-parser.js` — 299 linhas
- fn extractYamlBlock()
- fn parseYaml()
- fn extractSection()
- fn extractAgentInfoFallback()
- fn parseAgentFile()
- fn parseAllAgents()
- fn normalizeCommands()
- fn getVisibleCommands()
- fn formatCommandsList()
- exports = {

### `.aiox-core/infrastructure/scripts/output-formatter.js` — 297 linhas
- class PersonalizedOutputFormatter
- exports = PersonalizedOutputFormatter;

### `.aiox-core/infrastructure/scripts/ide-sync/validator.js` — 295 linhas
- fn hashContent()
- fn fileExists()
- fn walkSyncFiles()
- fn readFileIfExists()
- fn validateIdeSync()
- fn validateAllIdes()
- fn formatValidationReport()
- exports = {

### `.aiox-core/infrastructure/scripts/aiox-validator.js` — 294 linhas
- fn printHeader()
- fn printSuccess()
- fn printError()
- fn printWarning()
- fn printInfo()
- fn validateStoryFile()
- fn runESLint()
- fn runTypeScript()
- fn validateYAML()
- fn validate()
- exports = {

### `.aiox-core/infrastructure/scripts/llm-routing/install-llm-routing.js` — 280 linhas
- fn getInstallDir()
- fn installLLMRouting()
- fn updateClaudeConfig()
- fn isLLMRoutingInstalled()
- fn getInstallationSummary()
- exports = {

### `.aiox-core/infrastructure/scripts/template-validator.js` — 278 linhas
- class TemplateValidator
- exports = TemplateValidator;

### `.aiox-core/infrastructure/scripts/component-search.js` — 277 linhas
- class ComponentSearch
- exports = ComponentSearch;

### `.aiox-core/infrastructure/scripts/repair-agent-references.js` — 263 linhas
- fn getDefaultOptions()
- fn parseArgs()
- fn isParsableAgent()
- fn buildLegacyArtifacts()
- fn removeLegacyArtifacts()
- fn validateGeminiCommands()
- fn repairAgentReferences()
- fn formatHumanReport()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/performance-and-error-resolver.js` — 258 linhas
- fn determineErrorStrategy()
- fn extractAtomicLayer()
- fn processTaskFile()
- fn main()
- exports = { processTaskFile, determineErrorStrategy };

### `.aiox-core/infrastructure/scripts/validate-user-profile.js` — 249 linhas
- fn validateUserProfile()
- fn loadAndValidateUserProfile()
- fn getUserProfile()
- fn isBobMode()
- fn isAdvancedMode()
- exports = {

### `.aiox-core/infrastructure/scripts/template-engine.js` — 239 linhas
- class TemplateEngine
- exports = TemplateEngine;

### `.aiox-core/infrastructure/scripts/validate-claude-integration.js` — 232 linhas
- fn parseArgs()
- fn countMarkdownFiles()
- fn listMarkdownBasenames()
- fn listClaudeAgentSkillIds()
- fn listTopLevelNames()
- fn validateClaudeIntegration()
- fn formatHumanReport()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/ide-sync/redirect-generator.js` — 231 linhas
- fn getRedirectExtension()
- fn sanitizeRedirectId()
- fn resolveRedirectPath()
- fn generateRedirectContent()
- fn generateRedirect()
- fn generateAllRedirects()
- fn writeRedirects()
- fn getRedirectFilenames()
- exports = {

### `.aiox-core/infrastructure/scripts/clickup-helpers.js` — 226 linhas
- fn getClickUpTool()
- fn updateStoryStatus()
- fn updateEpicStatus()
- fn updateTaskDescription()
- fn addTaskComment()
- fn verifyEpicExists()
- exports = {

### `.aiox-core/infrastructure/scripts/ide-sync/README.md` — 226 linhas
- # IDE Sync
-   ## Overview
-   ## Pre-commit Integration (Story TD-4)
-     ### Bypass
-   ## Commands
-     ### Sync
-     ### Validate
-   ## Options
-   ## Configuration
-   ## IDE Formats
-   ## Redirect Agents
-   ## File Structure
-   ## Performance
-   ## Troubleshooting
-     ### YAML Parse Errors
-     ### IDE Files Out of Sync
-     ### Validation Fails in CI

### `.aiox-core/infrastructure/scripts/ide-sync/transformers/claude-code.js` — 226 linhas
- fn normalizePath()
- fn getSourcePath()
- fn transform()
- fn transformCommand()
- fn generateMinimalContent()
- fn normalizeInlineText()
- fn quoteYamlString()
- fn buildSkillDescription()
- fn getSkillRelativePath()
- fn transformSkill()
- fn getFilename()
- exports = {

### `.aiox-core/infrastructure/scripts/validate-output-pattern.js` — 213 linhas
- class OutputPatternValidator
- exports = OutputPatternValidator;

### `.aiox-core/infrastructure/scripts/ide-sync/gemini-commands.js` — 205 linhas
- fn commandSlugForAgent()
- fn menuCommandName()
- fn normalizeText()
- fn truncateText()
- fn summarizeWhenToUse()
- fn escapeTomlString()
- fn buildAgentDescription()
- fn buildAgentCommandPrompt()
- fn buildAgentCommandFile()
- fn buildMenuPrompt()
- fn buildMenuCommandFile()
- fn resolveAgentOrder()
- fn buildGeminiCommandFiles()
- fn syncGeminiCommands()
- exports = {

### `.aiox-core/infrastructure/scripts/test-utilities.js` — 200 linhas
- fn countIntegrationReferences()
- fn testUtility()
- fn runAudit()
- exports = { runAudit, testUtility, countIntegrationReferences };

### `.aiox-core/infrastructure/scripts/codex-skills-sync/index.js` — 194 linhas
- fn getCodexHome()
- fn getDefaultOptions()
- fn trimText()
- fn getSkillId()
- fn getLegacySkillId()
- fn buildSkillContent()
- fn buildSkillPlan()
- fn writeSkillPlan()
- fn syncSkills()
- fn parseArgs()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/ide-sync/transformers/github-copilot.js` — 184 linhas
- fn transform()
- fn buildMarkdownBody()
- fn escapeYamlString()
- fn truncateContent()
- fn getFilename()
- fn id()
- exports = {

### `.aiox-core/infrastructure/scripts/pm-adapter-factory.js` — 181 linhas
- fn getPMAdapter()
- fn clearAdapterCache()
- fn getPMToolType()
- fn isPMToolConfigured()
- exports = {

### `.aiox-core/infrastructure/scripts/validate-paths.js` — 155 linhas
- fn getDefaultOptions()
- fn parseArgs()
- fn listSkillFiles()
- fn collectAbsolutePathViolations()
- fn validateSkillPathConventions()
- fn extractGeneratedSquadSource()
- fn validatePaths()
- fn formatHumanReport()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/validate-gemini-integration.js` — 151 linhas
- fn getDefaultOptions()
- fn parseArgs()
- fn countMarkdownFiles()
- fn validateGeminiIntegration()
- fn formatHumanReport()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/spot-check-validator.js` — 149 linhas
- fn validateTask()
- fn main()
- exports = { validateTask };

### `.aiox-core/infrastructure/scripts/validate-codex-integration.js` — 141 linhas
- fn getDefaultOptions()
- fn parseArgs()
- fn countMarkdownFiles()
- fn countSkillFiles()
- fn validateCodexIntegration()
- fn formatHumanReport()
- fn main()
- exports = {

### `.aiox-core/infrastructure/scripts/pm-adapter.js` — 134 linhas
- class PMAdapter
- exports = { PMAdapter };

### `.aiox-core/infrastructure/scripts/diff-generator.js` — 129 linhas
- class DiffGenerator
- exports = DiffGenerator;

### `.aiox-core/infrastructure/scripts/llm-routing/templates/claude-free-tracked.cmd` — 127 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/scripts/test-utilities-fast.js` — 126 linhas
- fn quickTest()
- fn runFastAudit()
- exports = { runFastAudit, quickTest };

### `.aiox-core/infrastructure/scripts/status-mapper.js` — 115 linhas
- fn mapStatusToClickUp()
- fn mapStatusFromClickUp()
- fn isValidAIOXStatus()
- fn isValidClickUpStatus()
- fn getValidAIOXStatuses()
- fn getValidClickUpStatuses()
- exports = {

### `.aiox-core/infrastructure/scripts/ide-sync/transformers/cursor.js` — 114 linhas
- fn escapeFrontmatterString()
- fn toMdcFilename()
- fn transform()
- fn getFilename()
- exports = {

### `.aiox-core/infrastructure/scripts/llm-routing/templates/claude-free-tracked.sh` — 108 linhas
- # Claude Code - DeepSeek Native Mode with Usage Tracking
- # Routes through local proxy to track per-alias usage
- # Colors
- fn find_env()
- # Check if proxy is running
- fn check_proxy()
- # Start proxy if not running
- # Start proxy in background
- # Wait for proxy to start

### `.aiox-core/infrastructure/scripts/ide-sync/transformers/antigravity.js` — 105 linhas
- fn transform()
- fn getFilename()
- exports = {

### `.aiox-core/infrastructure/scripts/llm-routing/templates/claude-free.cmd` — 80 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/scripts/documentation-integrity/index.js` — 74 linhas
- exports = {

### `.aiox-core/infrastructure/scripts/git-hooks/post-commit.js` — 73 linhas
- fn findProjectRoot()
- fn clearProjectStatusCache()

### `.aiox-core/infrastructure/scripts/codex-skills-sync/README.md` — 71 linhas
- # Codex Skills Sync
-   ## When To Use Which
-   ## bootstrap.js
-   ## index.js (canonical incremental sync)
-   ## validate.js
-   ## Files generated
-   ## Story reference

### `.aiox-core/infrastructure/scripts/llm-routing/templates/deepseek-proxy.cmd` — 71 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/scripts/llm-routing/templates/deepseek-proxy.sh` — 65 linhas
- # DeepSeek Usage Tracker Proxy Manager
- # Try to find and kill by port

### `.aiox-core/infrastructure/scripts/repository-detector.js` — 64 linhas
- fn detectRepositoryContext()
- exports = { detectRepositoryContext };

### `.aiox-core/infrastructure/scripts/llm-routing/templates/claude-free.sh` — 62 linhas
- fn find_env()

### `.aiox-core/infrastructure/scripts/llm-routing/templates/deepseek-usage.cmd` — 51 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/scripts/llm-routing/templates/claude-max.cmd` — 26 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/scripts/llm-routing/templates/claude-max.sh` — 18 linhas
- # Claude Code - Claude Max Mode
- # Uses your Claude Max subscription with bypass permissions
- # This is the default Claude Code experience
- # Clear any alternative provider settings

### `.aiox-core/infrastructure/scripts/llm-routing/templates/deepseek-usage.sh` — 16 linhas
- # DeepSeek Usage Statistics CLI
- # View usage tracking data per alias
- # Pass arguments to tracker

## `.aiox-core/infrastructure/templates/` — 15 arquivos · 2.710 linhas

### `.aiox-core/infrastructure/templates/project-docs/coding-standards-tmpl.md` — 346 linhas
- # {{PROJECT_NAME}} Coding Standards
-   ## Overview
-   ## JavaScript/TypeScript Standards
-     ### Language Version
-     ### Formatting
-     ### ESLint Configuration
-     ### Prettier Configuration
-     ### Naming Conventions
-     ### Function Guidelines
-     ### Import Order
-   ## Python Standards
-     ### Language Version
-     ### Formatting
-     ### Black Configuration
-     ### Flake8 Configuration
-     ### Naming Conventions
-     ### Function Guidelines
-     ### Import Order
-   ## Go Standards
-     ### Language Version
-     ### Formatting
-     ### Naming Conventions
-     ### Function Guidelines
-     ### Import Order
-   ## Common Standards (All Languages)
-     ### Error Handling
-     ### Comments
-     ### Git Commit Messages
-     ### Code Review Guidelines
-   ## Tools & Automation
- … (+2 itens)

### `.aiox-core/infrastructure/templates/github-workflows/pr-automation.yml.template` — 330 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/templates/coderabbit.yaml.template` — 279 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/templates/project-docs/tech-stack-tmpl.md` — 267 linhas
- # {{PROJECT_NAME}} Tech Stack
-   ## Overview
-   ## Core Technologies
-     ### Runtime & Language
-     ### Package Management
-   ## Development Tools
-     ### Code Quality
-     ### Testing
-     ### Build Tools
-   ## Infrastructure
-     ### Version Control
-     ### Deployment
-     ### Database (if applicable)
-   ## Dependencies
-     ### Production Dependencies
-     ### Development Dependencies
-   ## Configuration Files
-   ## Environment Variables
-   ## Upgrade Guidelines
-     ### Language/Runtime Updates
-     ### Dependency Updates
-   ## Security Considerations

### `.aiox-core/infrastructure/templates/github-workflows/release.yml.template` — 196 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/templates/aiox-sync.yaml.template` — 182 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/templates/project-docs/source-tree-tmpl.md` — 177 linhas
- # {{PROJECT_NAME}} Source Tree Standard
-   ## Overview
-   ## Directory Structure
-   ## File Placement Rules
-     ### Documentation Files
-     ### Source Code
-     ### Configuration Files
-   ## Anti-Patterns (Files NOT Allowed at Root)
-   ## Naming Conventions
-     ### Directories
-     ### Files

### `.aiox-core/infrastructure/templates/core-config/core-config-brownfield.tmpl.yaml` — 176 linhas
- project:
-   type:
-   mode:
-   name:
-   analyzed:
-   version:
-   analysis:
- devLoadAlwaysFiles:
- deployment:
-   workflow:
-   branches:
-   environments:
-   quality_gates:
-   pr_defaults:
- existing_configs:
-   eslint:
-   prettier:
-   tsconfig:
-   flake8:
-   github_workflows:
-   gitlab_ci:
-   package_json:
-   requirements_txt:
-   go_mod:
- agents:
-   dev:
-   qa:
-   devops:
- features:
-   documentation_integrity:
- … (+9 itens)

### `.aiox-core/infrastructure/templates/github-workflows/ci.yml.template` — 169 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/templates/core-config/core-config-greenfield.tmpl.yaml` — 168 linhas
- project:
-   type:
-   mode:
-   name:
-   created:
-   version:
- devLoadAlwaysFiles:
- deployment:
-   workflow:
-   branches:
-   environments:
-   quality_gates:
-   pr_defaults:
- github:
-   enabled:
-   cli_required:
-   pr:
-   semantic_release:
- agents:
-   dev:
-   qa:
-   devops:
- features:
-   documentation_integrity:
-   source_tree_guardian:
-   quality_metrics:
-   documentation_integrity_options:
- custom:

### `.aiox-core/infrastructure/templates/gitignore/gitignore-python.tmpl` — 145 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/templates/github-workflows/README.md` — 109 linhas
- # GitHub Workflows Templates
-   ## Available Templates
-     ### ci.yml.template
-     ### pr-automation.yml.template
-     ### release.yml.template
-   ## Template Variables
-   ## Usage
-   ## Customization
-     ### Adding New Jobs
-     ### Different Languages
-   ## Related

### `.aiox-core/infrastructure/templates/gitignore/gitignore-node.tmpl` — 85 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/templates/gitignore/gitignore-aiox-base.tmpl` — 63 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/templates/gitignore/gitignore-brownfield-merge.tmpl` — 18 linhas
- *(sem estrutura extraível)*

## `.aiox-core/infrastructure/tests/` — 4 arquivos · 1.905 linhas

### `.aiox-core/infrastructure/tests/regression-suite-v2.md` — 621 linhas
- # Regression Test Suite V2.0
-   ## Overview
-   ## Test Environment Setup
-     ### Prerequisites
-     ### Test Data Setup
-       #### 1. Sample Story
-       #### 2. Sample Requirements
-       #### 3. Sample Migration
-       #### 4. PM Tool Test Story
-   ## Task Execution Tests
-     ### Priority 1 - Core Development Tasks
-       #### Test 1.1: dev-develop-story.md
-       #### Test 1.2: qa-gate.md
-       #### Test 1.3: create-next-story.md
-       #### Test 1.4: validate-next-story.md
-       #### Test 1.5: execute-checklist.md
-     ### Priority 2 - Agent-Specific Tasks
-       #### Test 2.1: po-pull-story.md
-       #### Test 2.2: db-apply-migration.md
-       #### Test 2.3: create-agent.md
-       #### Test 2.4: create-task.md
-       #### Test 2.5: qa-run-tests.md
-     ### Priority 3 - Utility Tasks
-       #### Test 3.1: correct-course.md
-       #### Test 3.2: create-doc.md
-       #### Test 3.3: security-scan.md
-       #### Test 3.4: sync-documentation.md
-       #### Test 3.5: improve-self.md
-   ## Workflow Execution Tests
-     ### Workflow 1: Story Development Flow
- … (+18 itens)

### `.aiox-core/infrastructure/tests/worktree-manager.test.js` — 619 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/tests/project-status-loader.test.js` — 568 linhas
- *(sem estrutura extraível)*

### `.aiox-core/infrastructure/tests/validate-module.js` — 97 linhas
- *(sem estrutura extraível)*

## `.aiox-core/infrastructure/tools/` — 15 arquivos · 4.707 linhas

### `.aiox-core/infrastructure/tools/mcp/google-workspace.yaml` — 930 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   executable_knowledge:

### `.aiox-core/infrastructure/tools/mcp/supabase.yaml` — 808 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   executable_knowledge:

### `.aiox-core/infrastructure/tools/mcp/n8n.yaml` — 551 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   executable_knowledge:

### `.aiox-core/infrastructure/tools/mcp/clickup.yaml` — 534 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   executable_knowledge:

### `.aiox-core/infrastructure/tools/local/ffmpeg.yaml` — 261 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   capabilities:
-   use_cases:
-   installation:
-   local_specific:
-   common_operations:
-   advanced_features:
-   common_flags:
-   best_practices:
-   performance_tips:
-   common_issues:
-   limitations:

### `.aiox-core/infrastructure/tools/cli/railway-cli.yaml` — 260 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   capabilities:
-   use_cases:
-   installation:
-   cli_specific:
-   command_groups:
-   workflow_patterns:
-   best_practices:
-   authentication:
-   private_networking:
-   deployment_features:
-   common_issues:
-   limitations:

### `.aiox-core/infrastructure/tools/cli/supabase-cli.yaml` — 224 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   capabilities:
-   use_cases:
-   installation:
-   cli_specific:
-   command_groups:
-   workflow_patterns:
-   best_practices:
-   authentication:
-   common_issues:
-   limitations:

### `.aiox-core/infrastructure/tools/README.md` — 222 linhas
- # AIOX Tools - Integrations Directory
-   ## Directory Structure
-   ## CLI Tools
-     ### Available CLI Tools
-   ## Local Tools
-     ### Available Local Tools
-   ## MCP Integrations
-     ### Available MCP Servers
-       #### UI & Development
-       #### Web & Research
-       #### Project Management
-       #### Backend Services
-       #### Automation
-   ## Using Tools in Agents
-     ### Discovery
-     ### Configuration
-     ### Best Practices
-   ## Adding New Tools
-     ### CLI Tool
-     ### MCP Server
-     ### Local Tool
-   ## Troubleshooting
-     ### Tool Not Found
-     ### Authentication Issues
-     ### MCP Connection Failures
-   ## Related Documentation

### `.aiox-core/infrastructure/tools/cli/github-cli.yaml` — 200 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   capabilities:
-   use_cases:
-   installation:
-   cli_specific:
-   command_groups:
-   best_practices:
-   authentication:
-   integration_patterns:
-   error_handling:
-   limitations:

### `.aiox-core/infrastructure/tools/mcp/desktop-commander.yaml` — 180 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   capabilities:
-   use_cases:
-   mcp_specific:
-   tools:
-   workflow:
-   best_practices:
-   security_considerations:
-   limitations:

### `.aiox-core/infrastructure/tools/mcp/21st-dev-magic.yaml` — 127 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   capabilities:
-   use_cases:
-   mcp_specific:
-   tools:
-   workflow:
-   best_practices:
-   limitations:

### `.aiox-core/infrastructure/tools/cli/llm-routing.yaml` — 126 linhas
- tool:
-   id:
-   name:
-   version:
-   category:
-   description:
- capabilities:
- installation:
-   method:
-   script:
-   templates_dir:
-   windows:
-   unix:
- usage:
-   claude-max:
-   claude-free:
- configuration:
-   env_file:
-   env_variables:
- cost_comparison:
-   claude_max:
-   deepseek:
- integration:
-   wizard_step:
-   wizard_order:
-   required:
-   recommended:
-   message:
- health_check:
-   windows:
- … (+9 itens)

### `.aiox-core/infrastructure/tools/mcp/browser.yaml` — 103 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   capabilities:
-   use_cases:
-   mcp_specific:
-   tools:
-   best_practices:
-   security_considerations:
-   limitations:

### `.aiox-core/infrastructure/tools/mcp/exa.yaml` — 103 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   capabilities:
-   use_cases:
-   mcp_specific:
-   tools:
-   best_practices:
-   limitations:

### `.aiox-core/infrastructure/tools/mcp/context7.yaml` — 78 linhas
- tool:
-   schema_version:
-   id:
-   type:
-   name:
-   version:
-   description:
-   knowledge_strategy:
-   capabilities:
-   use_cases:
-   mcp_specific:
-   tools:
-   workflow:
-   best_practices:
-   limitations:

## `.aiox-core/install-manifest.yaml/` — 1 arquivos · 4.530 linhas

### `.aiox-core/install-manifest.yaml` — 4530 linhas
- version:
- generated_at:
- generator:
- file_count:
- files:

## `.aiox-core/local-config.yaml.template/` — 1 arquivos · 71 linhas

### `.aiox-core/local-config.yaml.template` — 71 linhas
- *(sem estrutura extraível)*

## `.aiox-core/local/modo-navegador-logs/` — 2 arquivos · 25 linhas

### `.aiox-core/local/modo-navegador-logs/watchdog-events-2026-08-07-b.csv` — 22 linhas
- *(sem estrutura extraível)*

### `.aiox-core/local/modo-navegador-logs/watchdog-events-2026-08-07.csv` — 3 linhas
- *(sem estrutura extraível)*

## `.aiox-core/manifests/schema/` — 1 arquivos · 190 linhas

### `.aiox-core/manifests/schema/manifest-schema.json` — 190 linhas
- $schema:
- title:
- description:
- version:
- definitions:
- validation:

## `.aiox-core/monitor/hooks/` — 10 arquivos · 345 linhas

### `.aiox-core/monitor/hooks/lib/enrich.py` — 58 linhas
- def enrich_event()
- def detect_project()
- def detect_agent_from_prompt()

### `.aiox-core/monitor/hooks/lib/send_event.py` — 47 linhas
- def send_event()

### `.aiox-core/monitor/hooks/post_tool_use.py` — 45 linhas
- def main()

### `.aiox-core/monitor/hooks/pre_tool_use.py` — 40 linhas
- def main()

### `.aiox-core/monitor/hooks/user_prompt_submit.py` — 38 linhas
- def main()

### `.aiox-core/monitor/hooks/notification.py` — 29 linhas
- def main()

### `.aiox-core/monitor/hooks/pre_compact.py` — 29 linhas
- def main()

### `.aiox-core/monitor/hooks/stop.py` — 29 linhas
- def main()

### `.aiox-core/monitor/hooks/subagent_stop.py` — 29 linhas
- def main()

### `.aiox-core/monitor/hooks/lib/__init__.py` — 1 linhas
- *(sem estrutura extraível)*

## `.aiox-core/package-lock.json/` — 1 arquivos · 1.534 linhas

### `.aiox-core/package-lock.json` — 1534 linhas
- name:
- version:
- lockfileVersion:
- requires:
- packages:

## `.aiox-core/package.json/` — 1 arquivos · 49 linhas

### `.aiox-core/package.json` — 49 linhas
- name:
- version:
- description:
- private:
- main:
- scripts:
- dependencies:
- keywords:
- author:
- license:
- repository:
- bugs:
- homepage:
- engines:

## `.aiox-core/presets/README.md/` — 1 arquivos · 358 linhas

### `.aiox-core/presets/README.md` — 358 linhas
- # AIOX Presets
-   ## Overview
-     ### What is a Preset?
-   ## Available Presets
-     ### Core Presets
-     ### Domain-Specific Presets
-     ### Team Structure Presets
-   ## Creating Custom Presets
-     ### Preset Structure
-     ### Preset Configuration (preset.yaml)
-     ### Creating a New Preset
-   ## Usage
-     ### Installing with a Preset
-     ### Listing Available Presets
-     ### Viewing Preset Details
-     ### Exporting Current Configuration as Preset
-   ## Preset Layering
-     ### Layering Rules
-     ### Example: Layered Configuration
-   ## Best Practices
-     ### For Preset Creators
-     ### For Preset Users
-     ### Naming Conventions
-   ## Preset Directory Structure Reference
-   ## Related Documents

## `.aiox-core/product/checklists/` — 16 arquivos · 3.005 linhas

### `.aiox-core/product/checklists/architect-checklist.md` — 443 linhas
- # Architect Solution Validation Checklist
-   ## 1. REQUIREMENTS ALIGNMENT
-     ### 1.1 Functional Requirements Coverage
-     ### 1.2 Non-Functional Requirements Alignment
-     ### 1.3 Technical Constraints Adherence
-   ## 2. ARCHITECTURE FUNDAMENTALS
-     ### 2.1 Architecture Clarity
-     ### 2.2 Separation of Concerns
-     ### 2.3 Design Patterns & Best Practices
-     ### 2.4 Modularity & Maintainability
-   ## 3. TECHNICAL STACK & DECISIONS
-     ### 3.1 Technology Selection
-     ### 3.2 Frontend Architecture [[FRONTEND ONLY]]
-     ### 3.3 Backend Architecture
-     ### 3.4 Data Architecture
-   ## 4. FRONTEND DESIGN & IMPLEMENTATION [[FRONTEND ONLY]]
-     ### 4.1 Frontend Philosophy & Patterns
-     ### 4.2 Frontend Structure & Organization
-     ### 4.3 Component Design
-     ### 4.4 Frontend-Backend Integration
-     ### 4.5 Routing & Navigation
-     ### 4.6 Frontend Performance
-   ## 5. RESILIENCE & OPERATIONAL READINESS
-     ### 5.1 Error Handling & Resilience
-     ### 5.2 Monitoring & Observability
-     ### 5.3 Performance & Scaling
-     ### 5.4 Deployment & DevOps
-   ## 6. SECURITY & COMPLIANCE
-     ### 6.1 Authentication & Authorization
-     ### 6.2 Data Security
- … (+20 itens)

### `.aiox-core/product/checklists/po-master-checklist.md` — 441 linhas
- # Product Owner (PO) Master Validation Checklist
-   ## 1. PROJECT SETUP & INITIALIZATION
-     ### 1.1 Project Scaffolding [[GREENFIELD ONLY]]
-     ### 1.2 Existing System Integration [[BROWNFIELD ONLY]]
-     ### 1.3 Development Environment
-     ### 1.4 Core Dependencies
-   ## 2. INFRASTRUCTURE & DEPLOYMENT
-     ### 2.1 Database & Data Store Setup
-     ### 2.2 API & Service Configuration
-     ### 2.3 Deployment Pipeline
-     ### 2.4 Testing Infrastructure
-   ## 3. EXTERNAL DEPENDENCIES & INTEGRATIONS
-     ### 3.1 Third-Party Services
-     ### 3.2 External APIs
-     ### 3.3 Infrastructure Services
-   ## 4. UI/UX CONSIDERATIONS [[UI/UX ONLY]]
-     ### 4.1 Design System Setup
-     ### 4.2 Frontend Infrastructure
-     ### 4.3 User Experience Flow
-   ## 5. USER/AGENT RESPONSIBILITY
-     ### 5.1 User Actions
-     ### 5.2 Developer Agent Actions
-   ## 6. FEATURE SEQUENCING & DEPENDENCIES
-     ### 6.1 Functional Dependencies
-     ### 6.2 Technical Dependencies
-     ### 6.3 Cross-Epic Dependencies
-   ## 7. RISK MANAGEMENT [[BROWNFIELD ONLY]]
-     ### 7.1 Breaking Change Risks
-     ### 7.2 Rollback Strategy
-     ### 7.3 User Impact Mitigation
- … (+16 itens)

### `.aiox-core/product/checklists/self-critique-checklist.md` — 386 linhas
- # Self-Critique Checklist
-   ## Overview
-   ## Step 5.5: Post-Code Self-Critique
-     ### Checklist Items
-     ### Execution Process
-     ### Pass Criteria
-   ## Step 6.5: Post-Test Self-Critique
-     ### Checklist Items
-     ### Execution Process
-     ### Pass Criteria
-   ## Summary Report Format
-   ## Anti-Patterns to Avoid
-   ## Integration with Coder Agent
-   ## Skip Critique Flag (AC7 Story 4.4)
-     ### Usage
-     ### Configuration
-     ### When to Use
-     ### Audit Trail
-   ## Metadata

### `.aiox-core/product/checklists/pm-checklist.md` — 375 linhas
- # Product Manager (PM) Requirements Checklist
-   ## 1. PROBLEM DEFINITION & CONTEXT
-     ### 1.1 Problem Statement
-     ### 1.2 Business Goals & Success Metrics
-     ### 1.3 User Research & Insights
-   ## 2. MVP SCOPE DEFINITION
-     ### 2.1 Core Functionality
-     ### 2.2 Scope Boundaries
-     ### 2.3 MVP Validation Approach
-   ## 3. USER EXPERIENCE REQUIREMENTS
-     ### 3.1 User Journeys & Flows
-     ### 3.2 Usability Requirements
-     ### 3.3 UI Requirements
-   ## 4. FUNCTIONAL REQUIREMENTS
-     ### 4.1 Feature Completeness
-     ### 4.2 Requirements Quality
-     ### 4.3 User Stories & Acceptance Criteria
-   ## 5. NON-FUNCTIONAL REQUIREMENTS
-     ### 5.1 Performance Requirements
-     ### 5.2 Security & Compliance
-     ### 5.3 Reliability & Resilience
-     ### 5.4 Technical Constraints
-   ## 6. EPIC & STORY STRUCTURE
-     ### 6.1 Epic Definition
-     ### 6.2 Story Breakdown
-     ### 6.3 First Epic Completeness
-   ## 7. TECHNICAL GUIDANCE
-     ### 7.1 Architecture Guidance
-     ### 7.2 Technical Decision Framework
-     ### 7.3 Implementation Considerations
- … (+12 itens)

### `.aiox-core/product/checklists/story-draft-checklist.md` — 215 linhas
- # Story Draft Checklist
-   ## 1. GOAL & CONTEXT CLARITY
-   ## 2. TECHNICAL IMPLEMENTATION GUIDANCE
-   ## 3. REFERENCE EFFECTIVENESS
-   ## 4. SELF-CONTAINMENT ASSESSMENT
-   ## 5. TESTING GUIDANCE
-   ## 6. CODERABBIT INTEGRATION (CONDITIONAL)
-   ## VALIDATION RESULT

### `.aiox-core/product/checklists/change-checklist.md` — 182 linhas
- # Change Navigation Checklist
-   ## 1. Understand the Trigger & Context
-   ## 2. Epic Impact Assessment
-   ## 3. Artifact Conflict & Impact Analysis
-   ## 4. Path Forward Evaluation
-   ## 5. Sprint Change Proposal Components
-   ## 6. Final Review & Handoff

### `.aiox-core/product/checklists/release-checklist.md` — 122 linhas
- # Release Checklist
-   ## Instructions for DevOps Agent
-   ## Checklist Items
-   ## Final Confirmation

### `.aiox-core/product/checklists/database-design-checklist.md` — 119 linhas
- # Database Design Checklist
-   ## Instructions for Data Engineer Agent
-   ## Checklist Items
-   ## Final Confirmation

### `.aiox-core/product/checklists/pre-push-checklist.md` — 108 linhas
- # Pre-Push Quality Gate Checklist
-   ## Instructions for DevOps Agent
-   ## Checklist Items
-   ## Final Confirmation

### `.aiox-core/product/checklists/story-dod-checklist.md` — 101 linhas
- # Story Definition of Done (DoD) Checklist
-   ## Instructions for Developer Agent
-   ## Checklist Items
-   ## Final Confirmation

### `.aiox-core/product/checklists/dba-rollback-checklist.md` — 99 linhas
- # DBA Rollback Checklist
-   ## Instructions for Data Engineer Agent
-   ## Checklist Items
-   ## Final Confirmation

### `.aiox-core/product/checklists/dba-predeploy-checklist.md` — 97 linhas
- # DBA Pre-Deploy Checklist
-   ## Instructions for Data Engineer Agent
-   ## Checklist Items
-   ## Final Confirmation

### `.aiox-core/product/checklists/pattern-audit-checklist.md` — 88 linhas
- # Pattern Audit Checklist
-   ## SCAN COMPLETENESS
-   ## PATTERN DETECTION
-     ### Buttons
-     ### Colors
-     ### Spacing
-     ### Typography
-     ### Forms
-   ## OUTPUT VALIDATION
-   ## METRICS VALIDATION
-   ## NEXT STEPS DECISION

### `.aiox-core/product/checklists/accessibility-wcag-checklist.md` — 80 linhas
- # Accessibility WCAG AA Checklist
-   ## PERCEIVABLE
-     ### Color & Contrast
-     ### Alternative Text
-   ## OPERABLE
-     ### Keyboard
-     ### Navigation
-   ## UNDERSTANDABLE
-     ### Labels
-     ### States
-   ## ROBUST
-     ### ARIA
-     ### HTML

### `.aiox-core/product/checklists/migration-readiness-checklist.md` — 75 linhas
- # Migration Readiness Checklist
-   ## FOUNDATION (Phase 1 Ready)
-   ## COMPONENTS (Phase 2 Ready)
-   ## MIGRATION PLAN
-   ## TEAM READINESS
-   ## RISK MITIGATION
-   ## METRICS TRACKING

### `.aiox-core/product/checklists/component-quality-checklist.md` — 74 linhas
- # Component Quality Checklist
-   ## CODE QUALITY
-   ## STYLING
-   ## ACCESSIBILITY (WCAG AA MINIMUM)
-   ## TESTING
-   ## DOCUMENTATION
-   ## STORYBOOK (if enabled)

## `.aiox-core/product/data/` — 16 arquivos · 3.410 linhas

### `.aiox-core/product/data/mode-selection-best-practices.md` — 471 linhas
- # Mode Selection Best Practices
-   ## Quick Mode Selector
-     ### By Story Complexity
-     ### By Story Type
-     ### By Risk Level
-   ## Mode Characteristics
-     ### YOLO Mode 🚀
-     ### Interactive Mode 💬
-     ### Pre-Flight Planning Mode ✈️
-   ## Decision Matrix
-     ### Use YOLO When...
-     ### Use Interactive When...
-     ### Use Pre-Flight When...
-   ## Anti-Patterns
-     ### ❌ Don't Do This
-   ## Best Practices by Role
-     ### Junior Developers
-     ### Mid-Level Developers
-     ### Senior Developers
-     ### Architects
-   ## Time-Based Guidelines
-     ### When You Have...
-   ## Quality vs. Speed Trade-offs
-     ### Maximum Quality (Minimize Risk)
-     ### Balanced Quality/Speed
-     ### Maximum Speed (Accept Calculated Risk)
-   ## Team Collaboration
-     ### Solo Development
-     ### Pair Programming
-     ### Team Features
- … (+17 itens)

### `.aiox-core/product/data/rls-security-patterns.md` — 333 linhas
- # Row Level Security (RLS) Patterns Guide
-   ## RLS FUNDAMENTALS
-     ### Enabling RLS
-     ### Policy Structure
-   ## COMMON PATTERNS
-     ### Pattern 1: User Owns Row
-     ### Pattern 2: Organization/Team Based
-     ### Pattern 3: Role-Based Access
-     ### Pattern 4: Public Read, Authenticated Write
-     ### Pattern 5: Time-Based Access
-   ## SUPABASE-SPECIFIC PATTERNS
-     ### Using auth.uid()
-     ### Using auth.jwt()
-     ### Using auth.role()
-   ## PERFORMANCE OPTIMIZATION
-     ### Use Indexes for RLS
-     ### Avoid Expensive Subqueries
-     ### Materialized Permissions
-   ## SECURITY BEST PRACTICES
-     ### Always Enable RLS
-     ### Default Deny
-     ### Avoid USING (true)
-     ### Separate Policies by Operation
-   ## DEBUGGING RLS
-     ### Test Policies
-     ### Common Issues
-   ## TESTING CHECKLIST

### `.aiox-core/product/data/supabase-patterns.md` — 330 linhas
- # Supabase Architecture Patterns
-   ## PROJECT STRUCTURE
-     ### Recommended Organization
-   ## CLIENT INITIALIZATION
-     ### Browser Client (Public)
-     ### Server Client (Service Role)
-   ## AUTHENTICATION PATTERNS
-     ### Sign Up with Email
-     ### Sign In
-     ### OAuth Provider
-     ### Session Management
-   ## DATABASE PATTERNS
-     ### Type-Safe Queries
-     ### Relationships
-     ### Pagination
-   ## REALTIME PATTERNS
-     ### Subscribe to Changes
-     ### Presence (Online Status)
-   ## STORAGE PATTERNS
-     ### Upload File
-     ### Get Public URL
-     ### Signed URL (Private)
-   ## EDGE FUNCTIONS
-     ### Function Structure
-   ## TYPE GENERATION
-     ### Generate Types from Schema
-     ### Usage
-   ## ERROR HANDLING
-     ### Standard Pattern

### `.aiox-core/product/data/migration-safety-guide.md` — 329 linhas
- # Database Migration Safety Guide
-   ## MIGRATION PRINCIPLES
-     ### Core Rules
-   ## SAFE OPERATIONS
-     ### Adding Columns (Safe)
-     ### Adding Indexes (Safe with CONCURRENTLY)
-     ### Creating Tables (Safe)
-   ## DANGEROUS OPERATIONS
-     ### Dropping Columns (Dangerous)
-     ### Renaming Columns (Dangerous)
-     ### Changing Column Types (Dangerous)
-     ### Adding NOT NULL (Dangerous)
-   ## LARGE TABLE MIGRATIONS
-     ### Batch Updates
-     ### Online Schema Changes (pt-online-schema-change pattern)
-   ## ROLLBACK STRATEGIES
-     ### Schema Rollback Template
-     ### Data Rollback Template
-     ### Point-in-Time Recovery
-   ## MIGRATION WORKFLOW
-     ### Pre-Migration Checklist
-     ### During Migration
-     ### Post-Migration
-   ## SUPABASE-SPECIFIC
-     ### Using Supabase Migrations
-     ### Handling RLS in Migrations
-     ### Edge Function Dependencies
-   ## EMERGENCY PROCEDURES
-     ### Migration Failed Mid-Way
-     ### Production is Down
- … (+2 itens)

### `.aiox-core/product/data/postgres-tuning-guide.md` — 300 linhas
- # PostgreSQL Performance Tuning Guide
-   ## CONFIGURATION TUNING
-     ### Memory Settings
-       #### shared_buffers
-       #### effective_cache_size
-       #### work_mem
-       #### maintenance_work_mem
-   ## CONNECTION POOLING
-     ### Why Pool Connections
-     ### PgBouncer Configuration
-     ### Pool Modes
-     ### Supabase Connection Pooling
-   ## QUERY OPTIMIZATION
-     ### EXPLAIN ANALYZE
-     ### Key Metrics to Watch
-     ### Common Optimizations
-       #### Add Missing Indexes
-       #### Use Covering Indexes
-       #### Partial Indexes
-   ## VACUUM AND MAINTENANCE
-     ### Autovacuum Tuning
-     ### Manual Maintenance
-     ### Reindex
-   ## MONITORING QUERIES
-     ### Find Slow Queries
-     ### Check Index Usage
-     ### Table Bloat
-     ### Cache Hit Ratio
-   ## LOCKING AND CONCURRENCY
-     ### Check Active Locks
- … (+4 itens)

### `.aiox-core/product/data/wcag-compliance-guide.md` — 267 linhas
- # WCAG Compliance Guide
-   ## Quick Reference: WCAG AA Requirements
-     ### Color Contrast
-     ### Keyboard Navigation
-     ### ARIA Attributes
-   ## WCAG AAA (Target, not required)
-   ## Component-Specific Guidelines
-     ### Buttons
-     ### Forms
-     ### Modals
-   ## Testing Checklist
-     ### Automated Testing
-     ### Manual Testing
-   ## Common Violations & Fixes
-     ### Violation 1: Missing Alt Text
-     ### Violation 2: Low Contrast
-     ### Violation 3: Click-Only Elements
-   ## Resources
-   ## Design System Enforcement

### `.aiox-core/product/data/integration-patterns.md` — 207 linhas
- # Integration Patterns with Squads
-   ## Integration Architecture
-   ## MMOS Integration
-     ### Use Case: Cognitive Clone Interfaces
-     ### Components Generated
-   ## CreatorOS Integration
-     ### Use Case: Course Platform UIs
-     ### Components Generated
-   ## InnerLens Integration
-     ### Use Case: Psychometric Assessment Forms
-     ### Components Generated
-   ## Integration Workflow
-     ### Step 1: Define Pack-Specific Tokens
-     ### Step 2: Generate Pack Components
-     ### Step 3: Test Integration
-   ## Integration Checklist
-   ## Notes

### `.aiox-core/product/data/database-best-practices.md` — 182 linhas
- # Database Best Practices Guide
-   ## SCHEMA DESIGN
-     ### Naming Conventions
-     ### Data Types
-   ## INDEXING STRATEGY
-     ### When to Index
-     ### Index Types
-     ### Index Anti-patterns
-   ## QUERY OPTIMIZATION
-     ### General Rules
-     ### Join Optimization
-     ### Subquery vs JOIN
-   ## DATA INTEGRITY
-     ### Constraints
-     ### Referential Actions
-   ## MIGRATIONS
-     ### Best Practices
-     ### Safe Operations
-     ### Dangerous Operations
-   ## PERFORMANCE MONITORING
-     ### Key Metrics
-     ### Tools
-   ## BACKUP & RECOVERY
-     ### Backup Strategy
-     ### Supabase Specific
-   ## SECURITY
-     ### Access Control
-     ### Data Protection

### `.aiox-core/product/data/test-priorities-matrix.md` — 174 linhas
- # Test Priorities Matrix
-   ## Priority Levels
-     ### P0 - Critical (Must Test)
-     ### P1 - High (Should Test)
-     ### P2 - Medium (Nice to Test)
-     ### P3 - Low (Test if Time Permits)
-   ## Risk-Based Priority Adjustments
-     ### Increase Priority When:
-     ### Decrease Priority When:
-   ## Test Coverage by Priority
-   ## Priority Assignment Rules
-   ## Priority Decision Tree
-   ## Test Execution Order
-   ## Continuous Adjustment

### `.aiox-core/product/data/test-levels-framework.md` — 148 linhas
- # Test Levels Framework
-   ## Test Level Decision Matrix
-     ### Unit Tests
-     ### Integration Tests
-     ### End-to-End Tests
-   ## Test Level Selection Rules
-     ### Favor Unit Tests When:
-     ### Favor Integration Tests When:
-     ### Favor E2E Tests When:
-   ## Anti-patterns to Avoid
-   ## Duplicate Coverage Guard
-   ## Test Naming Conventions
-   ## Test ID Format

### `.aiox-core/product/data/consolidation-algorithms.md` — 142 linhas
- # Pattern Consolidation Algorithms
-   ## Color Clustering (HSL-based)
-   ## Button Semantic Analysis
-   ## Spacing Scale Generation
-   ## Consolidation Targets
-   ## References

### `.aiox-core/product/data/roi-calculation-guide.md` — 142 linhas
- # ROI Calculation Guide
-   ## Formula Base
-   ## Pattern Weights (Critical!)
-   ## Example Calculation
-     ### Before Consolidation
-     ### After Consolidation
-     ### Savings
-   ## Conservative vs Aggressive Estimates
-     ### Conservative (Recommended)
-     ### Aggressive
-   ## Beyond Direct Cost
-     ### Velocity Impact
-     ### Quality Improvements
-   ## Brad says:

### `.aiox-core/product/data/elicitation-methods.md` — 134 linhas
- # Elicitation Methods Data
-   ## Core Reflective Methods
-   ## Structural Analysis Methods
-   ## Risk and Challenge Methods
-   ## Creative Exploration Methods
-   ## Multi-Persona Collaboration Methods
-   ## Advanced 2025 Techniques
-   ## Game-Based Elicitation Methods
-   ## Process Control

### `.aiox-core/product/data/atomic-design-principles.md` — 108 linhas
- # Atomic Design Principles
-   ## The Five Levels
-     ### Atoms
-     ### Molecules
-     ### Organisms
-     ### Templates
-     ### Pages
-   ## Benefits
-   ## Atlas Implementation

### `.aiox-core/product/data/design-token-best-practices.md` — 107 linhas
- # Design Token Best Practices
-   ## Naming Conventions
-     ### Semantic > Descriptive
-     ### Use Kebab-Case
-     ### Variant Suffixes
-   ## Token Categories
-   ## Token Organization
-   ## Token Values
-   ## Multi-Format Exports
-   ## Token Usage
-   ## Brad says:

### `.aiox-core/product/data/brainstorming-techniques.md` — 36 linhas
- # Brainstorming Techniques Data
-   ## Creative Expansion
-   ## Structured Frameworks
-   ## Collaborative Techniques
-   ## Deep Exploration
-   ## Advanced Techniques

## `.aiox-core/product/README.md/` — 1 arquivos · 56 linhas

### `.aiox-core/product/README.md` — 56 linhas
- # Product Module
-   ## Contents
-     ### Templates (`templates/`)
-     ### Checklists (`checklists/`)
-     ### Data (`data/`)
-   ## Usage
-   ## Migration

## `.aiox-core/product/templates/` — 96 arquivos · 23.522 linhas

### `.aiox-core/product/templates/rls-policies-tmpl.yaml` — 1203 linhas
- template_name:
- template_version:
- output_format:
- destination:
- description:
- sections:

### `.aiox-core/product/templates/migration-plan-tmpl.yaml` — 1022 linhas
- template_name:
- template_version:
- output_format:
- destination:
- description:
- sections:

### `.aiox-core/product/templates/personalized-task-template-v2.md` — 905 linhas
- # {Task Name}
-   ## Purpose
-   ## Execution Modes
-     ### 1. YOLO Mode - Fast, Autonomous (0-1 prompts)
-     ### 2. Interactive Mode - Balanced, Educational (5-10 prompts) **[DEFAULT]**
-     ### 3. Pre-Flight Planning - Comprehensive Upfront Planning
-   ## Task Definition (AIOX Task Format V1.0)
-   ## Pre-Conditions
-   ## Workflow
-     ### Mode: YOLO (Autonomous)
-     ### Mode: Interactive (Balanced) **[DEFAULT]**
-     ### Mode: Pre-Flight Planning (Comprehensive)
-   ## Step-by-Step Execution
-     ### Step 1: {Step Name}
-     ### Step 2: {Step Name}
-   ## Post-Conditions
-   ## Acceptance Criteria
-   ## Template (Optional)
-   ## Tools (External/Shared)
-   ## Scripts (Agent-Specific)
-   ## Performance Metrics
-   ## Error Handling
-     ### Missing Input
-     ### Missing Template
-     ### Missing Tool
-     ### Missing Data
-     ### Checklist Failure
-   ## Metadata
-   ## Output Format (Standardized)
-   ## Testing
- … (+5 itens)

### `.aiox-core/product/templates/fullstack-architecture-tmpl.yaml` — 804 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
- sections:

### `.aiox-core/product/templates/architecture-tmpl.yaml` — 650 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
- sections:

### `.aiox-core/product/templates/design-story-tmpl.yaml` — 587 linhas
- template:
-   id:
-   name:
-   version:
-   description:
-   use_cases:
-   output:
- workflow:
-   mode:
-   elicitation:
-   story_type:
- agent_config:
-   primary_agents:
-   editable_sections:
- sections:
- metadata:
-   template_type:
-   compatible_agents:
-   incompatible_agents:
-   story_types:
-   version_history:

### `.aiox-core/product/templates/migration-strategy-tmpl.md` — 524 linhas
- # Migration Strategy: {{PROJECT_NAME}}
-   ## Executive Summary
-   ## Migration Philosophy
-   ## Phase 1: Foundation
-     ### Goal
-     ### Prerequisites
-     ### Tasks
-       #### 1.1 Token System Deployment
-       #### 1.2 Existing CSS Token Migration (Automated)
-       #### 1.3 Validation & Testing
-     ### Timeline
-     ### Risk Assessment
-     ### Success Criteria
-     ### Rollback Procedure
-   ## Phase 2: High-Impact Patterns
-     ### Goal
-     ### Prerequisites
-     ### High-Impact Targets
-       #### Pattern Priority List
-     ### Tasks
-       #### 2.1 Component Replacement - {{TOP_PATTERN_1}}
-       #### 2.2 Component Replacement - {{TOP_PATTERN_2}}
-       #### 2.3 Component Replacement - {{TOP_PATTERN_3}}
-       #### 2.4 Deprecation Warnings
-     ### Timeline
-     ### Risk Assessment
-     ### Success Criteria
-     ### Metrics to Track
-   ## Phase 3: Long-Tail Cleanup
-     ### Goal
- … (+36 itens)

### `.aiox-core/product/templates/shock-report-tmpl.html` — 502 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/task-execution-report.md` — 495 linhas
- # Task Execution Report Template
-   ## Structure Overview
-   ## Fixed Structure (Must Maintain)
-     ### Header Section (Lines 1-8)
-     ### Section Order (Must Maintain)
-   ## Personality Slots (Flexible)
-     ### Status Section
-     ### Output Section
-     ### Metrics Section
-     ### Signature Closing
-   ## Usage Examples
-     ### Example 1: Builder (Pragmatic Tone)
-     ### Example 2: Guardian (Analytical Tone)
-     ### Example 3: Balancer (Collaborative Tone)
-     ### Example 4: Flow Master (Empathetic Tone)
-     ### Example 5: Architect (Analytical Tone)
-     ### Example 6: Visionary (Pragmatic Tone)
-     ### Example 7: Explorer (Analytical Tone)
-     ### Example 8: Empathizer (Empathetic Tone)
-     ### Example 9: Engineer (Pragmatic Tone)
-     ### Example 10: Operator (Pragmatic Tone)
-     ### Example 11: Orchestrator (Collaborative Tone)
-   ## Validation Rules
-   ## Implementation Notes

### `.aiox-core/product/templates/brownfield-architecture-tmpl.yaml` — 475 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
- sections:

### `.aiox-core/product/templates/personalized-workflow-template.yaml` — 460 linhas
- workflow:
-   name:
-   id:
-   description:
-   version:
-   metadata:
-   personality:
-   agents:
-   steps:
- personality_by_phase:
-   initialization:
- failure_handling:
-   on_any_failure:
- branching:
-   enabled:
-   branches:
- parallel_execution:
-   enabled:
-   parallel_groups:
- testing:
-   unit_tests:
-   integration_tests:
- documentation:
-   examples:
- changelog:
- validation:
- workflow:
-   name:
-   id:
-   agents:
- … (+1 itens)

### `.aiox-core/product/templates/schema-design-tmpl.yaml` — 428 linhas
- template_name:
- template_version:
- output_format:
- destination:
- description:
- sections:

### `.aiox-core/product/templates/token-exports-tailwind-tmpl.js` — 395 linhas
- exports = {

### `.aiox-core/product/templates/story-tmpl.yaml` — 367 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
- agent_config:
-   editable_sections:
- sections:

### `.aiox-core/product/templates/ide-rules/claude-rules.md` — 356 linhas
- # Synkra AIOX Development Rules for Claude Code
-   ## Core Framework Understanding
-   ## Constitution
-   ## Sistema de Agentes
-     ### Ativação de Agentes
-     ### Comandos de Agentes
-   ## Agent System
-     ### Agent Activation
-     ### Agent Context
-   ## Development Methodology
-     ### Story-Driven Development
-     ### Code Standards
-     ### Testing Requirements
-   ## AIOX Framework Structure
-   ## Framework vs Project Boundary
-   ## Rules System
-   ## Code Intelligence
-   ## Graph Dashboard
-     ### Comandos
-   ## Workflow Execution
-     ### Task Execution Pattern
-     ### Interactive Workflows
-   ## Best Practices
-     ### When implementing features:
-     ### When working with agents:
-     ### When handling errors:
-   ## Git & GitHub Integration
-     ### Commit Conventions
-     ### GitHub CLI Usage
-   ## AIOX-Specific Patterns
- … (+20 itens)

### `.aiox-core/product/templates/front-end-spec-tmpl.yaml` — 348 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
- sections:

### `.aiox-core/product/templates/personalized-task-template.md` — 344 linhas
- # {Task Name}
-   ## Purpose
-   ## Parameters
-   ## Workflow
-     ### Step 1: {Step Name}
-     ### Step 2: {Step Name}
-   ## Elicitation (if applicable)
-   ## Success Criteria
-   ## Error Handling
-     ### Error: {Error Type}
-   ## Dependencies
-   ## Output Templates
-     ### Standard Task Report
-     ### Metric Tracking
-   ## Personality Configuration
-     ### Agent Behavior During Task
-     ### Status Message Generation
-   ## Testing
-     ### Unit Test Template
-   ## Examples
-     ### Example 1: {Example Scenario}
-   ## Notes

### `.aiox-core/product/templates/engine/renderer.js` — 343 linhas
- fn registerDefaultHelpers()
- class TemplateRenderer
- exports = {

### `.aiox-core/product/templates/personalized-checklist-template.md` — 340 linhas
- # {Agent ID} - {Checklist Title}
-   ## Overview
-   ## Pre-Execution Checks
-   ## Execution Validation
-     ### Phase 1: {Phase Name}
-     ### Phase 2: {Phase Name}
-   ## Quality Checks
-     ### Code Quality (if applicable)
-     ### Documentation Quality
-     ### Security & Performance
-   ## Post-Execution Review
-   ## Metrics Validation
-   ## Agent-Specific Guidance
-     ### Builder (Dex)
-     ### Guardian (Quinn)
-     ### Balancer (Pax)
-     ### Visionary (Morgan)
-     ### Flow Master (River)
-   ## Failure Protocols
-     ### If Pre-Execution Checks Fail
-     ### If Execution Validation Fails
-     ### If Quality Checks Fail
-   ## Reporting Template
-   ## Integration with Tasks
-   ## Automation Hooks
-     ### Pre-Commit Hook
-     ### CI/CD Integration
-   ## Continuous Improvement
-     ### Monthly Review
-     ### Quarterly Audit
- … (+2 itens)

### `.aiox-core/product/templates/personalized-template-file.yaml` — 322 linhas
- template:
-   name:
-   id:
-   description:
-   version:
-   usage:
-   personality:
- metadata:
-   agent:
-   generated_at:
-   duration:
-   tokens_used:
-   template_version:
- structure:
-   header:
- fields:
-   required:
-   optional:
- personality_configuration:
-   recommended_vocabulary:
-   recommended_tone:
-   emoji_usage:
- formatting:
-   markdown:
-   consistency:
-   fixed_positions:
- validation:
-   structure:
-   content:
-   personality:
- … (+7 itens)

### `.aiox-core/product/templates/engine/index.js` — 308 linhas
- class TemplateEngine
- exports = {

### `.aiox-core/product/templates/tokens-schema-tmpl.yaml` — 305 linhas
- template_name:
- template_version:
- output_format:
- destination:
- description:
- metadata:
-   version:
-   generated_by:
-   generated_at:
-   dtcg_spec:
-   color_space:
-   coverage:
-   reduction:
- layers:
-   core:
-   semantic:
-   component:
- exports:
-   yaml:
-   json:
-   css:
-   tailwind:
-   scss:
-   dtcg:

### `.aiox-core/product/templates/engine/schemas/prd-v2.schema.json` — 300 linhas
- $schema:
- title:
- description:
- type:
- required:
- properties:
- allOf:

### `.aiox-core/product/templates/engine/elicitation.js` — 297 linhas
- fn mapQuestionType()
- fn createQuestion()
- class VariableElicitation
- exports = {

### `.aiox-core/product/templates/engine/validator.js` — 294 linhas
- class TemplateValidator
- exports = {

### `.aiox-core/product/templates/competitor-analysis-tmpl.yaml` — 292 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
-   custom_elicitation:
- sections:

### `.aiox-core/product/templates/brownfield-prd-tmpl.yaml` — 279 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
- sections:

### `.aiox-core/product/templates/brownfield-risk-report-tmpl.yaml` — 277 linhas
- template:
-   id:
-   name:
-   version:
-   type:
-   description:
- sections:
-   executive_summary:
- usage:
-   command:
-   output:
-   triggers:

### `.aiox-core/product/templates/mcp-workflow.js` — 271 linhas
- fn extractMainContent()
- fn summarize()
- fn classifyContent()
- fn runWorkflow()
- fn extractTitle()
- exports = {

### `.aiox-core/product/templates/story.hbs` — 263 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/activation-instructions-template.md` — 258 linhas
- # Agent Activation Instructions Template
-   ## Overview
-   ## Canonical Format
-   ## What Changed (Story 6.1.2.5)
-     ### BEFORE (Manual/Mechanical)
-     ### AFTER (Intelligent/Adaptive)
-   ## GreetingBuilder Parameters
-     ### Input: `agentDefinition`
-     ### Input: `conversationHistory`
-     ### Output: Formatted Greeting String
-   ## Session Type Detection
-     ### 1. New Session (Minimal Context)
-     ### 2. Existing Context (Active Session)
-     ### 3. Workflow (Recurring Pattern)
-   ## Command Visibility Metadata
-   ## Git Configuration Warning
-   ## Performance Characteristics
-   ## Backwards Compatibility
-   ## Migration Checklist
-   ## Examples
-     ### New Agent Creation
-     ### Testing
-   ## Related Files
-   ## Troubleshooting
-     ### Greeting appears mechanical
-     ### Commands not filtered
-     ### Git warning not showing
-     ### Performance issues
-   ## Version History

### `.aiox-core/product/templates/personalized-agent-template.md` — 258 linhas
- # {agent-id}
-   ## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED
-   ## PERSONALITY CONFIGURATION GUIDE
-     ### Archetype Selection
-     ### Tone Guidelines
-     ### Vocabulary Selection
-     ### Greeting Templates
-     ### Signature Closings
-   ## OUTPUT STANDARDIZATION
-     ### Required Structure (FIXED POSITIONS)
-     ### Personality Injection Points
-   ## VALIDATION CHECKLIST

### `.aiox-core/product/templates/market-research-tmpl.yaml` — 251 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
-   custom_elicitation:
- sections:

### `.aiox-core/product/templates/dbdr.hbs` — 241 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/qa-gate-tmpl.yaml` — 240 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
- sections:

### `.aiox-core/product/templates/token-exports-css-tmpl.css` — 240 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/qa-report-tmpl.md` — 234 linhas
- # QA Report: {{storyId}}
-   ## Summary
-   ## Test Results
-     ### Unit Tests
-     ### Integration Tests
-     ### E2E Tests
-   ## Issues Found
-     ### Critical (Blocks Release)
-       #### {{id}}: {{title}}
-     ### Critical (Blocks Release)
-     ### Major (Important to Fix)
-       #### {{id}}: {{title}}
-     ### Major (Important to Fix)
-     ### Minor (Nice to Fix)
-       #### {{id}}: {{title}}
-     ### Minor (Nice to Fix)
-   ## Regression Analysis
-     ### Regression Detected
-   ## Security Analysis
-     ### Vulnerabilities Found
-   ## Recommendation
-     ### Verdict: {{verdict}}
-     ### Required Actions Before Approval
-     ### Suggestions for Improvement
-   ## Metadata

### `.aiox-core/product/templates/spec-tmpl.md` — 234 linhas
- # Spec: {{story-title}}
-   ## 1. Overview
-     ### 1.1 Summary
-     ### 1.2 Goals
-     ### 1.3 Non-Goals
-   ## 2. Requirements Summary
-     ### 2.1 Functional Requirements
-     ### 2.2 Non-Functional Requirements
-     ### 2.3 Constraints
-     ### 2.4 Assumptions
-   ## 3. Technical Approach
-     ### 3.1 Architecture Overview
-     ### 3.2 Key Decisions
-     ### 3.3 Patterns to Use
-     ### 3.4 Implementation Strategy
-   ## 4. Dependencies
-     ### 4.1 External Dependencies
-     ### 4.2 Internal Dependencies
-     ### 4.3 Unverified Claims
-   ## 5. Files to Modify/Create
-     ### 5.1 New Files
-     ### 5.2 Modified Files
-     ### 5.3 Deleted Files
-   ## 6. Testing Strategy
-     ### 6.1 Unit Tests
-     ### 6.2 Integration Tests
-     ### 6.3 E2E Tests
-     ### 6.4 Manual Verification
-   ## 7. Risks & Mitigations
-   ## 8. Open Questions
- … (+1 itens)

### `.aiox-core/product/templates/engine/loader.js` — 231 linhas
- fn parseTemplate()
- fn validateMetadata()
- class TemplateLoader
- exports = {

### `.aiox-core/product/templates/engine/schemas/story.schema.json` — 222 linhas
- $schema:
- title:
- description:
- type:
- required:
- properties:

### `.aiox-core/product/templates/project-brief-tmpl.yaml` — 220 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
-   custom_elicitation:
- sections:

### `.aiox-core/product/templates/state-persistence-tmpl.yaml` — 219 linhas
- version:
- project_name:
- created_at:
- updated_at:
- tailwind_version:
- system_state:
-   phase:
-   inventory:
-   consolidation:
-   tokens:
-   roi:
-   migration:
-   atlas_setup:
-   patterns_built:
-   documentation:
-   integrations:
-   tooling:
- agent_history:
- flags:
-   ready_for_atlas:
-   ready_for_migration:
-   system_complete:

### `.aiox-core/product/templates/prd-v2.0.hbs` — 216 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/epic.hbs` — 212 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/github-actions-cd.yml` — 212 linhas
- name:
- on:
-   push:
-   workflow_dispatch:
- env:
-   NODE_VERSION:
- jobs:
-   setup:

### `.aiox-core/product/templates/engine/schemas/dbdr.schema.json` — 205 linhas
- $schema:
- title:
- description:
- type:
- required:
- properties:

### `.aiox-core/product/templates/front-end-architecture-tmpl.yaml` — 205 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
- sections:

### `.aiox-core/product/templates/prd-tmpl.yaml` — 201 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
- sections:

### `.aiox-core/product/templates/prd.hbs` — 201 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/statusline/statusline-script.js` — 188 linhas
- fn buildStatusLine()
- fn formatModel()
- fn progressBar()
- fn fmtTokens()
- fn readSessionCache()
- fn simpleHash()
- fn getGitInfo()
- fn countMessages()

### `.aiox-core/product/templates/pmdr.hbs` — 186 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/tmpl-view.sql` — 177 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/engine/schemas/epic.schema.json` — 175 linhas
- $schema:
- title:
- description:
- type:
- required:
- properties:

### `.aiox-core/product/templates/engine/schemas/pmdr.schema.json` — 175 linhas
- $schema:
- title:
- description:
- type:
- required:
- properties:

### `.aiox-core/product/templates/github-actions-ci.yml` — 172 linhas
- name:
- on:
-   push:
-   pull_request:
- concurrency:
-   group:
-   cancel-in-progress:
- env:
-   NODE_VERSION:
- jobs:
-   lint:
-   test:
-   build:
-   security:

### `.aiox-core/product/templates/task.hbs` — 170 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/tmpl-comment-on-examples.sql` — 158 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/brainstorming-output-tmpl.yaml` — 155 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
- sections:

### `.aiox-core/product/templates/engine/schemas/task.schema.json` — 154 linhas
- $schema:
- title:
- description:
- type:
- required:
- properties:

### `.aiox-core/product/templates/command-rationalization-matrix.md` — 152 linhas
- # Command Rationalization Matrix Template
-   ## Usage Instructions
-   ## Decision Criteria
-     ### Usage Count Classification
-     ### Recommendation Categories
-     ### Decision Rules
-   ## Command Analysis Matrix
-   ## Usage Count Calculation Method
-   ## Command Consolidation Patterns
-     ### Pattern 1: Parameter-Based Merge
-     ### Pattern 2: Verb-Noun Consolidation
-   ## Analysis Checklist
-   ## Rationalization Output Format
-     ### Summary Statistics
-     ### Detailed Recommendations
-   ## Validation Criteria
-   ## Notes

### `.aiox-core/product/templates/engine/schemas/prd.schema.json` — 152 linhas
- $schema:
- title:
- description:
- type:
- required:
- properties:

### `.aiox-core/product/templates/tmpl-rls-tenant.sql` — 152 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/tmpl-trigger.sql` — 152 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/workflow-template.yaml` — 150 linhas
- workflow:
-   id:
-   name:
-   description:
-   version:
-   type:
- context:
-   target:
-   squad:
-   resolution_order:
-   note:
- metadata:
-   author:
-   created_date:
-   last_modified:
-   tags:
- triggers:
- inputs:
- steps:
- outputs:
- global_error_handling:
-   on_error:
-   notification:
- security:
-   authorization_required:
-   allowed_roles:
-   audit_logging:

### `.aiox-core/product/templates/gordon-mcp.yaml` — 140 linhas
- version:
- services:
-   fs:
-   github:
-   fetch:
- networks:
-   default:

### `.aiox-core/product/templates/tmpl-seed-data.sql` — 140 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/tmpl-stored-proc.sql` — 140 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/tmpl-staging-copy-merge.sql` — 139 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/tmpl-rls-roles.sql` — 135 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/changelog-template.md` — 134 linhas
- # Changelog
-   ## [Unreleased]
-     ### Added
-     ### Changed
-     ### Deprecated
-     ### Removed
-     ### Fixed
-     ### Security
-   ## [X.Y.Z] - YYYY-MM-DD
-     ### Added
-     ### Changed
-     ### Deprecated
-     ### Removed
-     ### Fixed
-     ### Security
-   ## Version Template
-   ## Semantic Versioning Guide
-     ### Examples
-   ## Commit Message Convention

### `.aiox-core/product/templates/tmpl-view-materialized.sql` — 133 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/aiox-ai-config.yaml` — 128 linhas
- ai_providers:
-   primary:
-   fallback:
-   routing:
- claude:
-   model:
-   timeout:
-   maxRetries:
-   dangerouslySkipPermissions:
- gemini:
-   model:
-   timeout:
-   maxRetries:
-   previewFeatures:
-   jsonOutput:
- kimi:
-   provider:
-   baseURL:
-   endpoint:
-   apiKeyEnv:
-   model:
-   timeout:
-   maxRetries:
- openai_compatible:
-   provider:
-   baseURL:
-   endpoint:
-   apiKeyEnv:
-   model:
-   timeout:
- … (+12 itens)

### `.aiox-core/product/templates/adr.hbs` — 125 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/task-template.md` — 122 linhas
- # {{TASK_TITLE}}
-   ## ⚠️ NAMING CONVENTION
-     ### Agent-Specific Tasks
-     ### Shared Tasks
-     ### How to Apply
-   ## Description
-   ## Context Required
-   ## Prerequisites
-   ## Workflow
-     ### Interactive Elicitation
-     ### Steps
-   ## Output
-     ### Output Format
-   ## Success Criteria
-   ## Error Handling
-   ## Security Considerations
-   ## Examples
-     ### Example {{EXAMPLE_NUMBER}}: {{EXAMPLE_TITLE}}
-   ## Notes

### `.aiox-core/product/templates/agent-template.yaml` — 120 linhas
- agent:
-   name:
-   id:
-   title:
-   icon:
-   whenToUse:
-   customization:
- persona:
-   role:
-   style:
-   identity:
-   focus:
-   core_principles:
- commands:
- dependencies:
-   workflows:
-   tasks:
-   templates:
-   checklists:
-   data:
-   scripts:
-   tools:
- activation-instructions:
- security:
-   authorization:
-   allowed_operations:
-   audit_logging:

### `.aiox-core/product/templates/ide-rules/cursor-rules.md` — 120 linhas
- # Synkra AIOX Development Rules for Cursor
-   ## Core Development Rules
-     ### Agent Integration
-     ### Story-Driven Development
-     ### Code Quality Standards
-     ### Testing Protocol
-   ## AIOX Framework Structure
-   ## Development Workflow
-   ## Best Practices
-     ### When implementing:
-     ### When testing:
-     ### When documenting:
-   ## Git & GitHub
-   ## Common Patterns
-     ### Error Handling
-     ### File Operations
-     ### Async/Await

### `.aiox-core/product/templates/ide-rules/antigravity-rules.md` — 115 linhas
- # Synkra AIOX Development Rules for AntiGravity
-   ## Core Development Rules
-     ### Agent Integration
-     ### Story-Driven Development
-     ### Code Quality Standards
-     ### Testing Protocol
-   ## AIOX Framework Structure
-   ## Development Workflow
-   ## Best Practices
-     ### When implementing:
-     ### When testing:
-     ### When documenting:
-   ## Git & GitHub
-   ## Common Patterns
-     ### Error Handling
-     ### File Operations
-     ### Async/Await

### `.aiox-core/product/templates/tmpl-rls-granular-policies.sql` — 104 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/engine/schemas/adr.schema.json` — 102 linhas
- $schema:
- title:
- description:
- type:
- required:
- properties:

### `.aiox-core/product/templates/component-react-tmpl.tsx` — 98 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/ide-rules/copilot-rules.md` — 92 linhas
- # Synkra AIOX Agent for GitHub Copilot
-   ## Core Framework Understanding
-   ## Agent System
-     ### Agent Activation (Chat Modes)
-     ### Agent Context
-   ## Development Methodology
-     ### Story-Driven Development
-     ### Code Standards
-     ### Testing Requirements
-   ## AIOX Framework Structure
-   ## GitHub Copilot-Specific Configuration
-     ### Requirements
-     ### Chat Modes Location
-     ### Usage
-     ### Available Agent Modes
-     ### Performance Tips

### `.aiox-core/product/templates/tmpl-migration-script.sql` — 91 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/ide-rules/gemini-rules.md` — 87 linhas
- # Gemini Rules - Synkra AIOX
-   ## Core Rules
-   ## Quality Gates
-   ## Project Map
-   ## Gemini Integration
-   ## Multi-IDE Parity
-   ## Agent Activation
-   ## Common Commands

### `.aiox-core/product/templates/gemini/settings.json` — 79 linhas
- $schema:
- previewFeatures:
- folderTrust:
- hooks:

### `.aiox-core/product/templates/tmpl-rls-simple.sql` — 77 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/tmpl-rollback-script.sql` — 77 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/ds-artifact-analysis.md` — 70 linhas
- # Artifact Analysis Report #{{ARTIFACT_ID}}
-   ## {{ARTIFACT_NAME}}
-   ## 📊 Overview
-   ## 🎨 Color System
-     ### Colors Extracted
-   ## 🔤 Typography System
-     ### Fonts and Scales
-   ## 🧩 Components Identified
-   ## 📐 Design Patterns
-   ## 📊 Metrics Summary
-   ## 💡 Recommendations

### `.aiox-core/product/templates/statusline/track-agent.sh` — 68 linhas
- # Called via Claude Code UserPromptSubmit hook
- fn simpleHash()

### `.aiox-core/product/templates/github-pr-template.md` — 67 linhas
- # Pull Request
-   ## Summary
-   ## Type of Change
-   ## Related Issues
-   ## Changes Made
-   ## Testing
-     ### Test Plan
-     ### Test Results
-   ## Quality Checks
-   ## Screenshots
-   ## Checklist
-   ## Reviewer Notes

### `.aiox-core/product/templates/ide-rules/codex-rules.md` — 65 linhas
- # AGENTS.md - Synkra AIOX (Codex CLI)
-   ## Core Rules
-   ## Quality Gates
-   ## Project Map
-   ## Common Commands
-   ## Agent Shortcuts

### `.aiox-core/product/templates/activation-instructions-inline-greeting.yaml` — 63 linhas
- activation-instructions:

### `.aiox-core/product/templates/current-approach-tmpl.md` — 56 linhas
- # Current Approach: Subtask {{subtaskId}}
-   ## Summary
-   ## Key Decisions
-   ## Files Being Modified
-   ## Expected Challenges
-   ## Started At
-   ## Attempt Number
-   ## Recovery Metadata
-   ## Notes

### `.aiox-core/product/templates/index-strategy-tmpl.yaml` — 53 linhas
- template_name:
- template_version:
- output_format:
- destination:
- description:
- sections:

### `.aiox-core/product/templates/eslintrc-security.json` — 32 linhas
- env:
- extends:
- plugins:
- parserOptions:
- rules:

### `.aiox-core/product/templates/tmpl-smoke-test.sql` — 16 linhas
- *(sem estrutura extraível)*

### `.aiox-core/product/templates/tmpl-rls-kiss-policy.sql` — 10 linhas
- *(sem estrutura extraível)*

## `.aiox-core/project-config.yaml/` — 1 arquivos · 166 linhas

### `.aiox-core/project-config.yaml` — 166 linhas
- project:
-   type:
-   installed_at:
-   version:
- documentation_paths:
-   qa_dir:
-   prd_file:
-   prd_version:
-   prd_sharded:
-   prd_sharded_location:
-   architecture_file:
-   architecture_version:
-   architecture_sharded:
-   architecture_sharded_location:
-   stories_dir:
-   dev_debug_log:
-   slash_prefix:
-   custom_technical_documents:
-   dev_load_always_files:
-   dev_load_always_files_fallback:
- github_integration:
-   enabled:
-   cli_required:
-   features:
-   pr:
-   semantic_release:
- coderabbit_integration:
-   enabled:
-   self_healing:
-   severity_handling:
- … (+25 itens)

## `.aiox-core/quality/metrics-collector.js/` — 1 arquivos · 599 linhas

### `.aiox-core/quality/metrics-collector.js` — 599 linhas
- fn createEmptyMetrics()
- class MetricsCollector
- fn retentionMs()
- exports = {

## `.aiox-core/quality/metrics-hook.js/` — 1 arquivos · 260 linhas

### `.aiox-core/quality/metrics-hook.js` — 260 linhas
- fn recordPreCommitMetrics()
- fn recordPRReviewMetrics()
- fn recordHumanReviewMetrics()
- fn withPreCommitMetrics()
- fn getQuickSummary()
- exports = {

## `.aiox-core/quality/schemas/` — 1 arquivos · 233 linhas

### `.aiox-core/quality/schemas/quality-metrics.schema.json` — 233 linhas
- $schema:
- $id:
- title:
- description:
- type:
- required:
- properties:
- definitions:
- additionalProperties:

## `.aiox-core/quality/seed-metrics.js/` — 1 arquivos · 336 linhas

### `.aiox-core/quality/seed-metrics.js` — 336 linhas
- fn randomInt()
- fn randomBool()
- fn generateLayer1Run()
- fn generateLayer2Run()
- fn generateLayer3Run()
- fn generateSeedData()
- fn seedMetrics()
- exports = {

## `.aiox-core/schemas/agent-v3-schema.json/` — 1 arquivos · 394 linhas

### `.aiox-core/schemas/agent-v3-schema.json` — 394 linhas
- $schema:
- $id:
- title:
- description:
- type:
- required:
- properties:

## `.aiox-core/schemas/README.md/` — 1 arquivos · 403 linhas

### `.aiox-core/schemas/README.md` — 403 linhas
- # AIOX V3 Schemas
-   ## Overview
-   ## Files
-   ## Schema Versions
-   ## Agent V3 Schema
-     ### Existing V2 Fields (Preserved)
-     ### New V3 Fields (autoClaude)
-     ### Agent Capability Matrix
-   ## Task V3 Schema
-     ### Existing V2 Fields (Preserved)
-     ### New V3 Fields (autoClaude)
-   ## Validation
-     ### Validate Single File
-     ### Validate All Files
-     ### Strict Mode (Require V3)
-     ### Show V2 vs V3 Diff
-     ### JSON Output
-   ## Migration Guide
-     ### Step 1: Check Current Status
-     ### Step 2: Add autoClaude Section
-     ### Step 3: Validate
-   ## Related Documents
-   ## Current Status
-     ### Validation Summary (2026-01-28)
-     ### Known Issues to Fix Before Migration
-     ### Story 2.3 Acceptance Criteria Status
-   ## Related Documents

## `.aiox-core/schemas/squad-design-schema.json/` — 1 arquivos · 299 linhas

### `.aiox-core/schemas/squad-design-schema.json` — 299 linhas
- $schema:
- $id:
- title:
- description:
- type:
- required:
- properties:
- definitions:
- examples:

## `.aiox-core/schemas/squad-schema.json/` — 1 arquivos · 185 linhas

### `.aiox-core/schemas/squad-schema.json` — 185 linhas
- $schema:
- $id:
- title:
- description:
- type:
- required:
- properties:
- additionalProperties:

## `.aiox-core/schemas/task-v3-schema.json/` — 1 arquivos · 353 linhas

### `.aiox-core/schemas/task-v3-schema.json` — 353 linhas
- $schema:
- $id:
- title:
- description:
- type:
- required:
- properties:

## `.aiox-core/schemas/validate-v3-schema.js/` — 1 arquivos · 430 linhas

### `.aiox-core/schemas/validate-v3-schema.js` — 430 linhas
- fn _loadSchema()
- fn cleanYamlContent()
- fn extractYamlFromMarkdown()
- fn detectFileType()
- fn hasV3Section()
- fn validateRequiredFields()
- fn getV2V3Diff()
- fn validateFile()
- fn validateAll()
- fn formatResults()
- fn main()
- exports = {

## `.aiox-core/scripts/aiox-doc-template.md/` — 1 arquivos · 325 linhas

### `.aiox-core/scripts/aiox-doc-template.md` — 325 linhas
- # AIOX Document Template Specification
-   ## Overview
-   ## Template Structure
-   ## Core Fields
-     ### Template Metadata
-     ### Workflow Configuration
-   ## Section Properties
-     ### Required Fields
-     ### Optional Fields
-       #### Content Control
-       #### Behavior Flags
-       #### Agent Permissions
-       #### Content Guidance
-       #### Structure
-   ## Supported Types
-     ### Content Types
-     ### Special Types
-   ## Advanced Features
-     ### Variable Substitution
-     ### Conditional Sections
-     ### Choice Integration
-     ### Mermaid Diagrams
-     ### Agent Permissions Example
-     ### Repeatable Sections
-     ### Examples with Code Blocks
-   ## Section Hierarchy
-   ## Processing Flow
-   ## Best Practices
-     ### Template Design
-     ### Content Instructions
- … (+4 itens)

## `.aiox-core/scripts/batch-migrate-phase1.ps1/` — 1 arquivos · 36 linhas

### `.aiox-core/scripts/batch-migrate-phase1.ps1` — 36 linhas
- # Phase 1 - Batch migrate critical tasks

## `.aiox-core/scripts/batch-migrate-phase2.ps1/` — 1 arquivos · 88 linhas

### `.aiox-core/scripts/batch-migrate-phase2.ps1` — 88 linhas
- *(sem estrutura extraível)*

## `.aiox-core/scripts/batch-migrate-phase3.ps1/` — 1 arquivos · 45 linhas

### `.aiox-core/scripts/batch-migrate-phase3.ps1` — 45 linhas
- # Get all remaining non-compliant tasks

## `.aiox-core/scripts/command-execution-hook.js/` — 1 arquivos · 201 linhas

### `.aiox-core/scripts/command-execution-hook.js` — 201 linhas
- fn updateSessionAfterCommand()
- fn loadSession()
- fn saveSession()
- fn determineSessionType()
- fn getCurrentSession()
- fn clearSession()
- exports = {

## `.aiox-core/scripts/diagnostics/` — 42 arquivos · 8.881 linhas

### `.aiox-core/scripts/diagnostics/health-dashboard/package-lock.json` — 5212 linhas
- name:
- version:
- lockfileVersion:
- requires:
- packages:

### `.aiox-core/scripts/diagnostics/health-dashboard/src/hooks/useHealthData.js` — 307 linhas
- fn useHealthData()
- fn getSampleData()

### `.aiox-core/scripts/diagnostics/diagnose-installation.js` — 274 linhas
- fn exec()
- fn compareVersions()
- fn checkMark()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/pages/DomainDetail.css` — 259 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/pages/Dashboard.css` — 238 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/IssuesList.css` — 184 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/pages/DomainDetail.jsx` — 163 linhas
- fn DomainDetail()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/pages/Dashboard.jsx` — 153 linhas
- fn Dashboard()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/IssuesList.jsx` — 145 linhas
- fn IssuesList()
- fn handleAction()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/shared/Chart.jsx` — 138 linhas
- fn getScoreColor()
- fn TrendChart()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/AutoFixLog.css` — 122 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/README.md` — 121 linhas
- # AIOX Health Dashboard
-   ## Features
-   ## Quick Start
-   ## Project Structure
-   ## Data Source
-   ## Styling
-   ## Integration
-   ## Related

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/DomainCard.css` — 121 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/quick-diagnose.ps1` — 117 linhas
- # AIOX-Core Quick Diagnostic - Run this in PowerShell
- # Check npm
- # Check npx
- # Check Git
- # Check PowerShell Execution Policy
- # Check npm prefix in PATH
- # Check npm registry
- # Test npx aiox-core

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/DomainCard.jsx` — 116 linhas
- fn DomainCard()
- fn handleClick()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/TechDebtList.css` — 114 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/diagnose-npx-issue.ps1` — 96 linhas
- # Execute este script no PC com problema
- # Extrair
- # Tentar executar
- # Tentar executar o wizard
- # Limpar

### `.aiox-core/scripts/diagnostics/health-dashboard/src/hooks/useAutoRefresh.js` — 89 linhas
- fn useAutoRefresh()

### `.aiox-core/scripts/diagnostics/quick-diagnose.cmd` — 85 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/HealthScore.jsx` — 81 linhas
- fn getScoreStatus()
- fn HealthScore()
- fn radius()
- fn progress()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/HealthScore.css` — 80 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/shared/StatusBadge.css` — 77 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/AutoFixLog.jsx` — 72 linhas
- fn AutoFixLog()
- fn formatTime()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/TechDebtList.jsx` — 72 linhas
- fn TechDebtList()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/styles/index.css` — 67 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/shared/Header.css` — 54 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/shared/StatusBadge.jsx` — 45 linhas
- fn StatusBadge()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/shared/Card.css` — 44 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/eslint.config.mjs` — 41 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/package.json` — 26 linhas
- name:
- version:
- description:
- type:
- scripts:
- dependencies:
- devDependencies:

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/shared/Card.jsx` — 25 linhas
- fn Card()

### `.aiox-core/scripts/diagnostics/health-dashboard/vite.config.js` — 24 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/App.jsx` — 22 linhas
- fn App()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/shared/Header.jsx` — 21 linhas
- fn Header()

### `.aiox-core/scripts/diagnostics/health-dashboard/src/styles/App.css` — 19 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/shared/Chart.css` — 14 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/index.html` — 13 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/main.jsx` — 13 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/index.js` — 9 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/components/shared/index.js` — 4 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/hooks/index.js` — 2 linhas
- *(sem estrutura extraível)*

### `.aiox-core/scripts/diagnostics/health-dashboard/src/pages/index.js` — 2 linhas
- *(sem estrutura extraível)*

## `.aiox-core/scripts/migrate-framework-docs.sh/` — 1 arquivos · 300 linhas

### `.aiox-core/scripts/migrate-framework-docs.sh` — 300 linhas
- # AIOX Framework Documentation Migration Script
- # Colors for output
- # Default values
- # Parse command line arguments
- # Header
- fn print_section()
- fn execute()
- # Count files to migrate
- # List files
- # Check if target repo is a git repository
- # Get relative path from source docs
- # Create parent directory if needed
- # Copy file
- # This is a simplified link update - may need manual review
- # Remove backup files
- # Framework Documentation Migration Notice
- # Restore from aiox-fullstack
- # Summary

## `.aiox-core/scripts/pm.sh/` — 1 arquivos · 453 linhas

### `.aiox-core/scripts/pm.sh` — 453 linhas
- # Spawns agents in separate terminals with clean context
- # Version
- # Configuration
- # Arguments
- # Generated paths
- # Logging Functions
- fn log_debug()
- fn log_info()
- fn log_error()
- # Help and Version
- fn show_help()
- fn show_version()
- # Argument Parsing
- fn parse_args()
- # Positional arguments
- # Remaining args are params
- # Validate required args
- # Validate context file if provided
- fn detect_os()
- # Check if running in WSL
- # File Path Setup
- fn setup_paths()
- fn spawn_macos()
- fn spawn_linux()
- # Try terminals in order of preference
- fn spawn_windows()
- fn spawn_wsl()
- fn spawn_inline()
- # Build the command
- # Write output directly to file
- … (+9 itens)

## `.aiox-core/scripts/README.md/` — 1 arquivos · 122 linhas

### `.aiox-core/scripts/README.md` — 122 linhas
- # AIOX Scripts - Legacy Directory
-   ## Current Structure
-   ## Scripts in This Directory
-     ### Active Scripts
-     ### Migration Scripts
-   ## Script Path Mapping
-   ## Configuration
-   ## Usage Examples
-     ### Loading Core Scripts
-     ### Loading Development Scripts
-     ### Loading Infrastructure Scripts
-     ### Loading Legacy Scripts (this directory)
-   ## Related Documentation
-   ## Migration History

## `.aiox-core/scripts/session-context-loader.js/` — 1 arquivos · 45 linhas

### `.aiox-core/scripts/session-context-loader.js` — 45 linhas
- exports = SessionContextLoader;

## `.aiox-core/scripts/test-template-system.js/` — 1 arquivos · 940 linhas

### `.aiox-core/scripts/test-template-system.js` — 940 linhas
- class TestTemplateSystem
- exports = TestTemplateSystem;

## `.aiox-core/scripts/update-aiox.sh/` — 1 arquivos · 174 linhas

### `.aiox-core/scripts/update-aiox.sh` — 174 linhas
- # Temp directory
- # Report files
- # Backup local-only files
- # Execute sync
- # Delete files removed from upstream
- # Restore local-only files
- # Clean empty directories
- # Generate report

## `.aiox-core/scripts/validate-phase1.ps1/` — 1 arquivos · 35 linhas

### `.aiox-core/scripts/validate-phase1.ps1` — 35 linhas
- *(sem estrutura extraível)*

## `.aiox-core/scripts/workflow-management.md/` — 1 arquivos · 69 linhas

### `.aiox-core/scripts/workflow-management.md` — 69 linhas
- # Workflow Management
-   ## Dynamic Workflow Loading
-   ## Workflow Commands
-     ### /workflows
-     ### /workflow-start {workflow-id}
-     ### /workflow-status
-     ### /workflow-resume
-     ### /workflow-next
-   ## Execution Flow
-   ## Context Passing
-   ## Multi-Path Workflows
-   ## Best Practices
-   ## Agent Integration

## `.aiox-core/user-guide.md/` — 1 arquivos · 1.409 linhas

### `.aiox-core/user-guide.md` — 1409 linhas
- # Guia do Usuário Synkra AIOX
-   ## Visão Geral
-     ### As Duas Inovações Chave
-   ## Pré-requisitos
-   ## Instalação e Configuração Inicial
-     ### Instalando AIOX-FullStack
-       #### Instalação em Projeto Novo ou Existente
-       #### Desenvolvimento do Framework Próprio
-     ### Estrutura Pós-Instalação
-     ### Upgrade de Instalação Existente
-     ### Comandos Úteis
-     ### 🚀 Futuro: Modo de Instalação Explícito (Story 3.14)
-       #### Framework Development Mode
-       #### Project Development Mode
-     ### Troubleshooting
-   ## Fluxo de Trabalho de Planejamento e Execução
-     ### Fase 1: Planejamento (Interface Web)
-     ### Fase 2: Desenvolvimento (IDE)
-   ## O Fluxo de Planejamento (Interface Web)
-     ### Trabalhando com Agentes de Planejamento
-       #### 1. analyst - Analista de Negócios
-       #### 2. pm - Product Manager
-       #### 3. architect - Arquiteto de Sistema
-       #### 4. ux-expert - Especialista em UX (Opcional)
-     ### Documentos Criados na Fase de Planejamento
-   ## O Ciclo Principal de Desenvolvimento (IDE)
-     ### Trabalhando com Agentes de Desenvolvimento
-       #### 1. sm - Scrum Master
-       #### 2. dev - Desenvolvedor
-       #### 3. qa - Quality Assurance
- … (+63 itens)

## `.aiox-core/utils/aiox-validator.js/` — 1 arquivos · 25 linhas

### `.aiox-core/utils/aiox-validator.js` — 25 linhas
- exports = require('../infrastructure/scripts/aiox-validator');

## `.aiox-core/utils/filters/` — 5 arquivos · 697 linhas

### `.aiox-core/utils/filters/content-filter.js` — 223 linhas
- fn stripHtml()
- fn truncateAtBoundary()
- fn extractFields()
- fn filterContent()
- fn parseArgs()
- fn main()
- exports = { filterContent, stripHtml, truncateAtBoundary, extractFields, CHARS_PER_TOKEN };

### `.aiox-core/utils/filters/index.js` — 181 linhas
- fn loadFilterConfig()
- fn applyFilter()
- fn parseArgs()
- fn main()
- exports = { applyFilter, loadFilterConfig };

### `.aiox-core/utils/filters/schema-filter.js` — 157 linhas
- fn projectFields()
- fn filterSchema()
- fn parseArgs()
- fn main()
- exports = { filterSchema, projectFields, CHARS_PER_TOKEN };

### `.aiox-core/utils/filters/field-filter.js` — 126 linhas
- fn filterFields()
- fn parseArgs()
- fn main()
- exports = { filterFields };

### `.aiox-core/utils/filters/constants.js` — 10 linhas
- exports = { CHARS_PER_TOKEN };

## `.aiox-core/utils/format-duration.js/` — 1 arquivos · 95 linhas

### `.aiox-core/utils/format-duration.js` — 95 linhas
- fn formatDuration()
- fn formatDurationShort()
- exports = {

## `.aiox-core/version.json/` — 1 arquivos · 64 linhas

### `.aiox-core/version.json` — 64 linhas
- version:
- installedAt:
- updatedAt:
- mode:
- fileHashes:
- customized:

## `.aiox-core/workflow-intelligence/__tests__/` — 5 arquivos · 1.868 linhas

### `.aiox-core/workflow-intelligence/__tests__/wave-analyzer.test.js` — 447 linhas
- *(sem estrutura extraível)*

### `.aiox-core/workflow-intelligence/__tests__/suggestion-engine.test.js` — 437 linhas
- *(sem estrutura extraível)*

### `.aiox-core/workflow-intelligence/__tests__/integration.test.js` — 341 linhas
- *(sem estrutura extraível)*

### `.aiox-core/workflow-intelligence/__tests__/confidence-scorer.test.js` — 334 linhas
- *(sem estrutura extraível)*

### `.aiox-core/workflow-intelligence/__tests__/workflow-registry.test.js` — 309 linhas
- *(sem estrutura extraível)*

## `.aiox-core/workflow-intelligence/engine/` — 4 arquivos · 2.085 linhas

### `.aiox-core/workflow-intelligence/engine/suggestion-engine.js` — 797 linhas
- class SuggestionEngine
- fn successBoost()
- fn similarityBoost()
- fn createSuggestionEngine()
- exports = {

### `.aiox-core/workflow-intelligence/engine/wave-analyzer.js` — 683 linhas
- class CircularDependencyError
- class WaveAnalyzer
- fn gain()
- fn createWaveAnalyzer()
- fn analyzeWaves()
- exports = {

### `.aiox-core/workflow-intelligence/engine/confidence-scorer.js` — 306 linhas
- class ConfidenceScorer
- fn progressScore()
- fn createConfidenceScorer()
- exports = {

### `.aiox-core/workflow-intelligence/engine/output-formatter.js` — 299 linhas
- fn supportsColors()
- fn colorize()
- fn formatConfidence()
- fn formatWorkflowName()
- fn displaySuggestions()
- fn displayFallback()
- fn displayHelp()
- fn displayContext()
- fn displayError()
- fn displayExecuting()
- exports = {

## `.aiox-core/workflow-intelligence/index.js/` — 1 arquivos · 329 linhas

### `.aiox-core/workflow-intelligence/index.js` — 329 linhas
- fn getDefaultRegistry()
- fn getDefaultScorer()
- fn getSuggestions()
- fn formatSuggestions()
- fn matchWorkflow()
- fn getNextSteps()
- fn getTransitions()
- fn getWorkflow()
- fn getWorkflowNames()
- fn getWorkflowsByAgent()
- fn findCurrentState()
- fn getStats()
- fn invalidateCache()
- fn reset()
- exports = {

## `.aiox-core/workflow-intelligence/learning/` — 8 arquivos · 3.346 linhas

### `.aiox-core/workflow-intelligence/learning/gotcha-registry.js` — 653 linhas
- class GotchaRegistry
- exports = {

### `.aiox-core/workflow-intelligence/learning/qa-feedback.js` — 585 linhas
- class QAFeedbackProcessor
- exports = {

### `.aiox-core/workflow-intelligence/learning/semantic-search.js` — 521 linhas
- class SemanticSearch
- fn createSemanticSearch()
- exports = {

### `.aiox-core/workflow-intelligence/learning/pattern-store.js` — 497 linhas
- class PatternStore
- fn createPatternStore()
- exports = {

### `.aiox-core/workflow-intelligence/learning/pattern-capture.js` — 329 linhas
- class PatternCapture
- fn createPatternCapture()
- exports = {

### `.aiox-core/workflow-intelligence/learning/pattern-validator.js` — 309 linhas
- class PatternValidator
- fn createPatternValidator()
- exports = {

### `.aiox-core/workflow-intelligence/learning/index.js` — 305 linhas
- fn getDefaultCapture()
- fn getDefaultValidator()
- fn getDefaultStore()
- fn getDefaultGotchaRegistry()
- fn getDefaultQAFeedbackProcessor()
- fn getDefaultSemanticSearch()
- fn captureAndStore()
- fn getLearnedPatterns()
- fn findMatchingPatterns()
- fn getStats()
- fn reset()
- exports = {

### `.aiox-core/workflow-intelligence/learning/capture-hook.js` — 147 linhas
- fn isEnabled()
- fn getInstances()
- fn onTaskComplete()
- fn markSessionFailed()
- fn clearSession()
- fn reset()
- exports = {

## `.aiox-core/workflow-intelligence/registry/` — 1 arquivos · 357 linhas

### `.aiox-core/workflow-intelligence/registry/workflow-registry.js` — 357 linhas
- class WorkflowRegistry
- fn createWorkflowRegistry()
- exports = {

## `.aiox-core/working-in-the-brownfield.md/` — 1 arquivos · 361 linhas

### `.aiox-core/working-in-the-brownfield.md` — 361 linhas
- # Working in the Brownfield: A Complete Guide
-   ## What is Brownfield Development?
-   ## When to Use AIOX for Brownfield
-   ## When NOT to use a Brownfield Flow
-   ## The Complete Brownfield Workflow
-     ### Choose Your Approach
-       #### Approach A: PRD-First (Recommended if adding very large and complex new features, single or multiple epics or…
-       #### Approach B: Document-First (Good for Smaller Projects)
-     ### Approach A: PRD-First Workflow (Recommended)
-       #### Phase 1: Define Requirements First
-       #### Phase 2: Focused Documentation
-     ### Approach B: Document-First Workflow
-       #### Phase 1: Document the Existing System
-       #### Phase 2: Plan Your Enhancement
-       #### Option A: Full Brownfield Workflow (Recommended for Major Changes)
-       #### Option B: Quick Enhancement (For Focused Changes)
-     ### Phase 3: Validate Planning Artifacts
-     ### Phase 4: Transition to Development
-   ## Brownfield Best Practices
-     ### 1. Always Document First
-     ### 2. Respect Existing Patterns
-     ### 3. Plan for Gradual Rollout
-     ### 4. Test Integration Thoroughly
-     ### 5. Communicate Changes
-   ## Common Brownfield Scenarios
-     ### Scenario 1: Adding a New Feature
-     ### Scenario 2: Modernizing Legacy Code
-     ### Scenario 3: Bug Fix in Complex System
-     ### Scenario 4: API Integration
-   ## Troubleshooting
- … (+8 itens)

## `squads/squad-creator-pro/agents/` — 3 arquivos · 3.253 linhas

### `squads/squad-creator-pro/agents/pedro-valerio.md` — 1301 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/agents/oalanicolas.md` — 976 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/agents/thiago_finch.md` — 976 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator-pro/assessments/` — 1 arquivos · 325 linhas

### `squads/squad-creator-pro/assessments/axioma-assessment-wf-create-squad.yaml` — 325 linhas
- axioma_assessment:
-   process_name:
-   assessment_date:
-   assessor:
-   model_used:
-   dimensions:

## `squads/squad-creator-pro/benchmarks/` — 6 arquivos · 794 linhas

### `squads/squad-creator-pro/benchmarks/golden/hormozi-golden.yaml` — 382 linhas
- metadata:
-   expert:
-   version:
-   created_by:
-   source_material:
-   total_sources_available:
-   last_validated:
- expected_frameworks:
- expected_inversions:
- expected_phrases:
- expected_voice_markers:
-   never_use_words:
-   always_use_patterns:
-   tone_scores:
- expected_limits:
- expected_rejections:
- false_positive_traps:
- scoring:
-   frameworks:
-   inversions:
-   phrases:
-   voice_markers:
-   limits:
-   rejections:
-   overall:

### `squads/squad-creator-pro/benchmarks/scripts/run-benchmark.sh` — 363 linhas
- # Colors
- # Args
- # Validate
- # Output
- # Create preprocessed lowercase temp file
- # Parse frameworks from golden
- # Check required keywords
- # Check alternatives
- # OVERALL SCORE
- # Weighted score calculation
- # Grade
- # Core check
- # Save run

### `squads/squad-creator-pro/benchmarks/runs/hormozi-2026-03-05_234354.txt` — 13 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/benchmarks/runs/hormozi-2026-03-05_234418.txt` — 12 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/benchmarks/runs/hormozi-2026-03-05_235359.txt` — 12 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/benchmarks/runs/hormozi-2026-03-05_235536.txt` — 12 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator-pro/checklists/` — 7 arquivos · 2.114 linhas

### `squads/squad-creator-pro/checklists/deep-research-quality.md` — 506 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/checklists/quality-gate-checklist.md` — 385 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/checklists/mind-validation.md` — 374 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/checklists/executor-matrix-checklist.md` — 260 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/checklists/sop-validation.md` — 250 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/checklists/agent-depth-checklist.md` — 244 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/checklists/mental-model-integration-checklist.md` — 95 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator-pro/config/` — 7 arquivos · 3.149 linhas

### `squads/squad-creator-pro/config/heuristics.yaml` — 753 linhas
- heuristics_engine:
-   version:
-   philosophy:

### `squads/squad-creator-pro/config/model-routing.yaml` — 693 linhas
- version:
- updated:
- tiers:
-   haiku:
-   sonnet:
-   opus:
- external_providers:
-   glm5:
- tasks:
-   qa-after-creation.md:
-   validate-squad.md:
-   validate-extraction.md:
-   pv-axioma-assessment.md:
-   pv-modernization-score.md:
-   an-fidelity-score.md:
-   an-clone-review.md:
-   an-diagnose-clone.md:
-   an-validate-clone.md:
-   an-assess-sources.md:
-   refresh-registry.md:
-   squad-analytics.md:
-   migrate-workflows-to-yaml.md:
-   install-commands.md:
-   sync-ide-command.md:
-   create-documentation.md:
-   create-template.md:
-   collect-sources.md:
-   auto-acquire-sources.md:
-   create-workflow.md:
-   create-task.md:
- … (+30 itens)

### `squads/squad-creator-pro/config/veto-conditions.yaml` — 455 linhas
- veto_engine:
-   version:
-   philosophy:

### `squads/squad-creator-pro/config/quality-gates.yaml` — 415 linhas
- quality_gates:
-   version:
-   philosophy:

### `squads/squad-creator-pro/config/axioma-validator.yaml` — 371 linhas
- axioma_validator:
-   version:
-   source_artifact:
-   philosophy:

### `squads/squad-creator-pro/config/task-anatomy.yaml` — 263 linhas
- task_anatomy:
-   version:
-   source_pattern:
-   philosophy:

### `squads/squad-creator-pro/config/scoring-rubric.yaml` — 199 linhas
- version:
- updated:
- thresholds:
-   haiku:
-   sonnet:
-   opus:
- dimensions:
-   completeness:
-   accuracy:
-   reasoning:
-   format:
-   actionability:
- compensations:
-   output_examples:
- costs:
-   haiku:
-   sonnet:
-   opus:
- cost_first_logic:
-   principle:
- patterns:
-   haiku_eligible:
-   haiku_needs_compensation:
-   haiku_not_eligible:

## `squads/squad-creator-pro/config.yaml/` — 1 arquivos · 145 linhas

### `squads/squad-creator-pro/config.yaml` — 145 linhas
- name:
- version:
- type:
- enhances:
- tested:
- updated_at:
- short-title:
- description:
- author:
- features:
-   mind-cloning:
-   research:
-   advanced-creation:
-   optimization:
-   model-routing:
-   quality:
-   maintenance:
-   strategy:
- workspace_integration:
-   level:
-   rationale:
- metadata:
-   version:
-   type:
-   enhances:
-   base_requirement:
-   pro_stats:

## `squads/squad-creator-pro/data/` — 22 arquivos · 8.151 linhas

### `squads/squad-creator-pro/data/hybridops-patterns.md` — 1351 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/data/tool-evaluation-framework.md` — 847 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/data/tool-registry.yaml` — 816 linhas
- version:
- last_updated:
- updated_by:
- last_discovery:
- categories:
-   mcp:
-   api:
-   cli:
-   library:
-   github_project:
-   skill_library:
- squad_creator_recommendations:
-   priority_1_quick_wins:
-   priority_2_enhancement:
-   priority_3_advanced:
-   cli_tools:
- native_tools:
-   read:
-   write:
-   edit:
-   bash:
-   glob:
-   grep:
-   web_search:
-   web_fetch:
-   task:
- mcp_servers:
-   desktop-commander:
-   exa:
-   context7:
- … (+64 itens)

### `squads/squad-creator-pro/data/mental-model-task-matrix.yaml` — 692 linhas
- VALUES:
-   clareza_radical:
-   autenticidade_integral:
-   impacto_transformador:
-   liberdade_criativa:
-   evolucao_constante:
- OBSESSIONS:
-   clareza_compreensao_profunda:
-   liberdade_autonomia_estrutural:
-   eficiencia_alavancagem_maxima:
- MODELS:
-   pareto_ao_cubo:
-   clarity_first:
-   limited_losses_unlimited_gains:
-   first_principles_thinking:
-   frameworks_as_liberation:
- PARADOXES:
-   freedom_through_structure:
-   clarity_from_chaos:
-   humble_expert:
-   elitist_egalitarian:
- coverage_matrix:
-   tasks:
-   models_coverage:
-   totals:
- veto_conditions:
-   V1_modelo_sem_checkpoint:
-   V2_checkpoint_sem_acao:
-   V3_task_sem_checkpoint:
-   V4_checkpoint_generico:

### `squads/squad-creator-pro/data/fusion-executor-analysis.md` — 677 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/data/core-heuristics.md` — 510 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/data/pm-best-practices.md` — 440 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/data/fusion-decision-points-analysis.md` — 397 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/data/pv-output-examples.yaml` — 342 linhas
- output_examples:

### `squads/squad-creator-pro/data/extraction-mentoria-processos-dec19.yaml` — 337 linhas
- metadata:
-   source_type:
-   duration:
-   participants:
-   classification:
-   gap_analysis:
- playbook:
-   name:
-   source:
-   steps:
- framework:
-   name:
-   rules:
-   veto:
- swipe_file:
-   cases:
-   analogies:
- paradigm_inversions:
- pv_3_types_of_documenters:
-   source:
-   context:
-   types:
-   insight:

### `squads/squad-creator-pro/data/pv-workflow-validation.yaml` — 318 linhas
- ids:
-   philosophy:
- verification_gates:
-   gate_types:
-   principle:
- self_healing:
-   categories:
-   principle:
- modernization_score:
-   description:
-   patterns:
-   scoring:
- validation_script_pattern:
-   description:
-   template:
- smoke_test_design:
-   description:
-   structure:
- preservation_audit:
-   description:
-   checklist:
-   principle:
- aiox_agent_execution:
-   principle:

### `squads/squad-creator-pro/data/pv-authenticity-markers.yaml` — 200 linhas
- behavioral_modes:
- mode_activation_protocol:
-   steps:
- authenticity_markers:
-   description:
-   validation_rule:
- response_algorithm:
-   description:
-   pseudocode:
- critical_filters:
-   description:
-   filters:

### `squads/squad-creator-pro/data/an-clone-validation.yaml` — 190 linhas
- fidelity_score:
-   description:
-   dimensions:
-   scoring:
- blind_test_protocol:
-   description:
-   steps:
-   success_criteria:
- authenticity_markers:
-   description:
-   checklist:
- stage_validation:
-   description:
-   stages:
- clone_maturity:
-   levels:

### `squads/squad-creator-pro/data/an-diagnostic-framework.yaml` — 164 linhas
- diagnostic_questions:
-   core:
-   depth:
- red_flags:
-   critical:
-   high:
-   medium:
- green_flags:
-   excellent:
-   good:
- blind_test_protocol:
-   setup:
-   questions_to_ask:
-   success_criteria:
-   what_to_improve:
- hackability_test:
-   purpose:
-   attacks_to_try:
-   scoring:

### `squads/squad-creator-pro/data/pv-meta-axiomas.yaml` — 162 linhas
- description:
- scoring:
-   overall_threshold:
-   minimum_per_dimension:
-   veto_on_failure:
- dimensions:
- assessment_template:
- quick_decision_heuristics:
- axiom_hierarchy:
-   level_minus_4_existential:

### `squads/squad-creator-pro/data/an-clone-anti-patterns.yaml` — 148 linhas
- anti_patterns:
-   never_do:
- common_mistakes:
- recognition_patterns:
-   instant_detection:
-   blind_spots:
-   attention_triggers:
- objection_handling:
-   common_objections:

### `squads/squad-creator-pro/data/an-source-tiers.yaml` — 119 linhas
- source_classification:
-   ouro:
-   bronze:
-   rule:
-   mantra:
- decision_pipeline:
- weights:
- risk_profile:
-   tolerance:
-   risk_seeking:
-   risk_averse:
- curadoria_scoring:
-   dimensions:
-   threshold:

### `squads/squad-creator-pro/data/an-output-examples.yaml` — 102 linhas
- output_examples:

### `squads/squad-creator-pro/data/internal-infrastructure-library.yaml` — 99 linhas
- version:
- last_updated:
- maintainer:
- policy:
- description:
- internal_assets:
-   design_system_native:
-   design_system_ops:
-   etl_ops:
-   aiox_core_infrastructure:
- decision_policy:
-   rules:
- output_contract:
-   required_sections:

### `squads/squad-creator-pro/data/an-source-signals.yaml` — 98 linhas
- high_value_signals:
-   description:
-   absolute_statements:
-   personal_rules:
-   expertise_markers:
-   decision_patterns:
- low_value_signals:
-   description:
-   hedging:
-   generic_advice:
-   filler:
- citation_formats:
-   standard:
-   video:
-   podcast:
-   interview:
- inference_format:
-   marker:
-   note:
-   action:
- usage_instructions:
-   when_extracting:
-   when_assessing:
-   quality_threshold:

### `squads/squad-creator-pro/data/an-anchor-words.yaml` — 78 linhas
- vocabulary:
-   power_words:
-   signature_phrases:
-   metaphors:
- rules:
-   always_use:
-   never_use:
-   transforms:

### `squads/squad-creator-pro/data/pv-anchor-words.yaml` — 64 linhas
- anchor_words:
-   confirmations:
-   interpellations:
-   rhythm_markers:
- fixed_vocabulary:
-   actions:
-   patterns:
-   never_uses:

## `squads/squad-creator-pro/minds/` — 17 arquivos · 3.614 linhas

### `squads/squad-creator-pro/minds/pedro_valerio/artifacts/Assinatura_Linguistica.md` — 355 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/pedro_valerio/artifacts/META_AXIOMAS.md` — 277 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/artifacts/HANDOFF_PROTOCOL.md` — 269 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md` — 258 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_010.md` — 240 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_003.md` — 239 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_009.md` — 234 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_002.md` — 206 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_008.md` — 191 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PM_001.md` — 191 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_007.md` — 190 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PA_001.md` — 174 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_001.md` — 166 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_006.md` — 166 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_005.md` — 161 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_004.md` — 153 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_BS_001.md` — 144 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator-pro/scripts/` — 42 arquivos · 12.568 linhas

### `squads/squad-creator-pro/scripts/coherence-validator.py` — 836 linhas
- def find_config_dir()
- def load_yaml()
- def extract_ids()
- def recurse()
- def validate_heuristic_veto_coverage()
- def validate_axioma_threshold_coverage()
- def validate_gate_reference_validity()
- def validate_veto_code_uniqueness()
- def validate_executor_consistency()
- def validate_cross_references()
- def run_coherence_validation()
- def print_report()
- def main()

### `squads/squad-creator-pro/scripts/fidelity-score.sh` — 519 linhas
- # FINAL CALCULATION
- # Using bc for floating point
- # Classification

### `squads/squad-creator-pro/scripts/squad-workflow-runner.cjs` — 471 linhas
- fn outputJson()
- fn outputError()
- fn runStateManager()
- fn resolveSlug()
- fn getPhaseIndex()
- fn getNextPhase()
- fn getCurrentPhaseInfo()
- fn cmdStart()
- fn cmdNext()
- fn cmdResume()
- fn cmdStatus()
- fn cmdApprove()
- fn cmdRevise()
- fn cmdAbort()
- fn parseArg()
- fn main()

### `squads/squad-creator-pro/scripts/cross-provider/cross-provider-runner.js` — 462 linhas
- fn loadTask()
- fn resolveInputPath()
- fn buildTestPrompt()
- fn truncateTaskContent()
- fn extractTaskSections()
- fn runOpenRouterModel()
- fn elapsed()
- fn calculateCost()
- fn inputCost()
- fn outputCost()
- fn runTest()
- fn formatAsYaml()
- fn main()
- fn getArg()

### `squads/squad-creator-pro/scripts/squad-state-manager.cjs` — 451 linhas
- fn outputJson()
- fn outputError()
- fn getStatePath()
- fn readActiveSquad()
- fn writeActiveSquad()
- fn resolveSlug()
- fn readState()
- fn writeState()
- fn checkConcurrency()
- fn cmdInit()
- fn state()
- fn cmdUpdate()
- fn cmdGet()
- fn cmdList()
- fn isActive()
- fn parseArg()
- fn main()

### `squads/squad-creator-pro/scripts/assess-sources.sh` — 443 linhas
- # Parse arguments
- # Find all source files
- # Counters
- # Check word count as fallback
- # SCORING
- # Tier classification
- # Accumulate per-source report
- # AGGREGATION
- # Overall quality
- # OUTPUT
- # YAML output

### `squads/squad-creator-pro/scripts/quality_gate.py` — 413 linhas
- def count_lines()
- def count_yaml_items()
- def check_agent_quality()
- def check_task_quality()
- def check_squad_quality()
- def scan_squad()
- def print_report()
- def main()

### `squads/squad-creator-pro/scripts/tests/test_yaml_validator.py` — 412 linhas
- class TestExtractYamlBlock
- def test_extract_yaml_block_found()
- def test_extract_yaml_block_not_found()
- def test_extract_yaml_block_multiple()
- class TestGetNestedKeys
- def test_get_nested_keys_simple()
- def test_get_nested_keys_nested()
- def test_get_nested_keys_empty()
- def test_get_nested_keys_non_dict()
- class TestGetNestedValue
- def test_get_nested_value_simple()
- def test_get_nested_value_deep()
- def test_get_nested_value_not_found()
- def test_get_nested_value_invalid_path()
- class TestCountItems
- def test_count_items_list()
- def test_count_items_dict()
- def test_count_items_nested()
- def test_count_items_missing()
- class TestValidateAgentYaml
- def test_validate_agent_yaml_complete()
- def test_validate_agent_yaml_missing_required()
- def test_validate_agent_yaml_counts()
- class TestValidateFile
- def test_validate_file_agent()
- def test_validate_file_no_yaml()
- def test_validate_file_invalid_yaml()
- def test_validate_file_nonexistent()
- class TestValidateSquad
- def test_validate_squad_complete()
- … (+4 itens)

### `squads/squad-creator-pro/scripts/tests/test_checklist_validator.py` — 396 linhas
- class TestExtractYamlBlocks
- def test_extract_single_block()
- def test_extract_multiple_blocks()
- def test_no_yaml_blocks()
- class TestParseYamlSafely
- def test_parse_valid_yaml()
- def test_parse_invalid_yaml()
- class TestExtractChecksFromYaml
- def test_extract_checks_array()
- def test_extract_checks_nested()
- def test_extract_checks_no_checks()
- class TestExtractChecklistMetadata
- def test_extract_metadata_from_checklist_key()
- def test_extract_metadata_from_top_level()
- def test_extract_metadata_empty()
- class TestValidateCheckItem
- def test_validate_valid_check()
- def test_validate_missing_id()
- def test_validate_missing_check_description()
- def test_validate_invalid_type()
- def test_validate_blocking_without_validation()
- class TestValidateChecklistFile
- def test_validate_nonexistent_file()
- def test_validate_valid_checklist()
- def test_validate_checklist_no_yaml()
- def test_validate_duplicate_ids()
- class TestValidateChecklistDirectory
- def test_validate_empty_directory()
- def test_validate_directory_with_checklists()
- def test_validate_directory_nonexistent()
- … (+4 itens)

### `squads/squad-creator-pro/scripts/scoring.py` — 395 linhas
- def run_script()
- def score_structure()
- def score_agents()
- def score_tasks()
- def score_documentation()
- def score_integration()
- def score_naming()
- def calculate_score()
- def print_report()
- def main()

### `squads/squad-creator-pro/scripts/clone-review.sh` — 394 linhas
- # PLAYBOOK ---
- # FRAMEWORK ---
- # SWIPE FILE ---
- # TRINITY TOTAL ---
- # Count stages
- # Check if needs stages
- # Estimate version
- # OVERALL VERDICT

### `squads/squad-creator-pro/scripts/tests/test_naming_validator.py` — 373 linhas
- class TestIsKebabCase
- def test_valid_kebab_case()
- def test_invalid_kebab_case()
- class TestIsSnakeCase
- def test_valid_snake_case()
- def test_invalid_snake_case()
- class TestIsCamelCase
- def test_valid_camel_case()
- def test_invalid_camel_case()
- class TestIsPascalCase
- def test_valid_pascal_case()
- def test_invalid_pascal_case()
- class TestValidateFileNames
- def test_valid_file_names()
- def test_invalid_file_names()
- def test_skip_special_files()
- class TestValidateDirectoryName
- def test_valid_directory_name()
- def test_invalid_directory_name()
- class TestValidateConfigNaming
- def test_valid_config_naming()
- def test_mismatched_name()
- def test_invalid_slash_prefix()
- def test_no_config()
- class TestValidateAgentIds
- def test_valid_agent_ids()
- def test_invalid_agent_ids()
- def test_no_agents_dir()
- class TestScanSquad
- def test_scan_squad_nonexistent()
- … (+4 itens)

### `squads/squad-creator-pro/scripts/model-tier-validator.cjs` — 369 linhas
- fn loadRubric()
- fn loadTestCase()
- fn loadRouting()
- fn calculateScore()
- fn evaluateDimension()
- fn recommendTier()
- fn generateReport()
- fn printComparisonTable()
- fn listTestCases()
- fn updateRoutingConfig()

### `squads/squad-creator-pro/scripts/tests/test_scoring.py` — 366 linhas
- class TestWeights
- def test_weights_sum_to_one()
- def test_all_dimensions_have_weights()
- class TestScoreStructure
- def test_score_structure_complete()
- def test_score_structure_missing_config()
- def test_score_structure_missing_readme()
- def test_score_structure_missing_agents_dir()
- class TestScoreAgents
- def test_score_agents_no_dir()
- def test_score_agents_empty_dir()
- def test_score_agents_with_agents()
- def test_score_agents_low_lines()
- class TestScoreTasks
- def test_score_tasks_no_dir()
- def test_score_tasks_with_tasks()
- def test_score_tasks_low_lines()
- class TestScoreDocumentation
- def test_score_documentation_complete()
- def test_score_documentation_short_readme()
- def test_score_documentation_no_readme()
- class TestScoreIntegration
- def test_score_integration_complete()
- def test_score_integration_no_workflows()
- class TestCalculateScore
- def test_calculate_score_nonexistent()
- def test_calculate_score_complete()
- def test_calculate_score_has_dimensions()
- def test_calculate_score_grades()
- class TestScoreNaming
- … (+1 itens)

### `squads/squad-creator-pro/scripts/tests/test_dependency_check.py` — 361 linhas
- class TestIsInCodeBlock
- def test_in_code_block()
- def test_outside_code_block()
- def test_no_code_blocks()
- class TestIsExampleReference
- def test_example_reference()
- def test_example_with_eg()
- def test_real_reference()
- class TestExtractReferences
- def test_extract_task_references()
- def test_extract_agent_references()
- def test_extract_template_references()
- def test_extract_workflow_references()
- def test_exclude_code_block_references()
- def test_relative_path_references()
- class TestCheckReferences
- def test_check_references_all_exist()
- def test_check_references_missing()
- class TestScanFile
- def test_scan_file_with_references()
- def test_scan_file_missing_reference()
- def test_scan_file_nonexistent()
- class TestScanSquad
- def test_scan_squad_nonexistent()
- def test_scan_squad_complete()
- def test_scan_squad_no_issues()
- def test_scan_squad_with_issues()
- def test_scan_squad_by_directory()
- class TestStrictMode
- def test_strict_mode_checks_external()

### `squads/squad-creator-pro/scripts/tests/test_security_scanner.py` — 354 linhas
- class TestAPIKeyDetection
- def test_detects_api_key()
- def test_ignores_placeholder()
- def test_ignores_example()
- class TestSecretDetection
- def test_detects_password()
- def test_ignores_env_var()
- class TestAWSKeyDetection
- def test_detects_aws_access_key()
- def test_ignores_documentation()
- class TestPrivateKeyDetection
- def test_detects_private_key_content()
- def test_ignores_grep_pattern()
- class TestDatabaseURLDetection
- def test_detects_postgres_url()
- def test_ignores_localhost()
- class TestFileBasedChecks
- def test_detects_env_file()
- def test_detects_pem_file()
- class TestSquadScan
- def test_clean_squad_passes()
- def test_squad_with_secret_fails()
- def test_nonexistent_path()
- class TestOutputFormats
- def test_json_output()
- def test_text_output()
- class TestStrictMode
- def test_strict_catches_more()

### `squads/squad-creator-pro/scripts/validate-clone.sh` — 345 linhas
- # Parse arguments
- # Parse percentage from fidelity output
- # Strip any trailing whitespace
- # Parse observable and deep scores
- # Convert fidelity to integer for comparison
- # OUTPUT
- # YAML output

### `squads/squad-creator-pro/scripts/tests/test_refresh_registry.py` — 328 linhas
- def _create_manifest()
- def _create_usage_evidence()
- class TestCountFiles
- def test_count_files_recursive()
- def test_count_files_missing_dir()
- class TestManifestAndAgents
- def test_read_config_yaml_reads_squad_yaml()
- def test_read_config_yaml_missing_manifest()
- def test_list_agents_recursive_and_filtered()
- def test_list_agents_excludes_template_and_handles_missing_dir()
- class TestScanSquad
- def test_scan_squad_counts_and_metadata()
- def test_scan_squad_manual_devalidation_blocks_auto_promotion()
- def test_scan_squad_auto_promotes_without_manual_block()
- class TestScanAllAndRegistry
- def test_scan_all_squads_empty()
- def test_scan_all_squads_only_accepts_squad_yaml()
- def test_scan_all_squads_multiple_and_skips_hidden()
- def test_format_for_registry_contains_validation_fields()
- def test_format_for_registry_structure()
- def test_merge_preserves_explicit_false_and_keeps_consistency()
- class TestCli
- def test_summary_registry_format_does_not_crash()

### `squads/squad-creator-pro/scripts/tests/conftest.py` — 309 linhas
- def sample_squad()
- def sample_agent_file()
- def sample_task_file()
- def scripts_dir()
- def squads_dir()

### `squads/squad-creator-pro/scripts/tests/test_squad_analytics.py` — 309 linhas
- def _create_manifest()
- def _create_usage_evidence()
- class TestRecursiveCounting
- def test_count_files_by_extension_recursive()
- def test_count_files_by_extension_missing_dir()
- def test_count_md_files_excludes_readme_template()
- def test_list_files_returns_relative_stems()
- def test_list_files_sorted_and_excludes_readme()
- class TestSimpleYamlParse
- def test_simple_yaml_parse_basic()
- def test_simple_yaml_parse_quoted_and_comments()
- def test_simple_yaml_parse_skips_list_items()
- class TestManifestAndQuality
- def test_read_config_reads_squad_yaml()
- def test_calculate_quality_score()
- def test_calculate_quality_score_tiers()
- class TestAnalyzeSquad
- def test_analyze_squad_recursive_counts_and_auto_promotion()
- def test_analyze_squad_manual_devalidation_blocks()
- class TestAnalyzeAllSquads
- def test_analyze_all_squads_requires_squad_yaml()
- def test_analyze_all_squads_respects_registry_manual_flags()
- class TestFormatTable
- def test_format_table_includes_maturity_distribution()

### `squads/squad-creator-pro/scripts/modernization-score.sh` — 308 linhas
- # INTERPRETATION
- # OUTPUT
- # Build recommendations for FAIL patterns
- # Join with commas

### `squads/squad-creator-pro/scripts/tests/test_inventory.py` — 307 linhas
- class TestComponentInventory
- def test_component_inventory_creation()
- class TestListFiles
- def test_list_files_empty_dir()
- def test_list_files_with_files()
- def test_list_files_multiple_patterns()
- def test_list_files_nonexistent_dir()
- def test_list_files_excludes_hidden()
- def test_list_files_sorted()
- class TestReadConfigYaml
- def test_read_config_yaml_exists()
- def test_read_config_yaml_not_exists()
- def test_read_config_yaml_invalid()
- class TestScanSquad
- def test_scan_squad_nonexistent()
- def test_scan_squad_empty()
- def test_scan_squad_complete()
- def test_scan_squad_tracks_issues()
- def test_scan_squad_total_components()
- class TestFormatOutput
- def test_format_output_json()
- def test_format_output_yaml()
- def test_format_output_summary()
- class TestSquadInventoryDataclass
- def test_squad_inventory_has_scan_date()
- def test_squad_inventory_config_metadata()

### `squads/squad-creator-pro/scripts/tests/test_fidelity_score.sh` — 298 linhas
- fn assert_eq()
- fn assert_contains()
- fn assert_exit()
- # Rich Clone Agent
- # Empty Clone

### `squads/squad-creator-pro/scripts/cross-provider/compare-results.js` — 281 linhas
- fn loadLatestResult()
- fn parseYaml()
- fn compare()
- fn generateReport()
- fn main()
- fn getArg()

### `squads/squad-creator-pro/scripts/tests/test_quality_gate.py` — 280 linhas
- class TestCountLines
- def test_count_lines_simple_file()
- def test_count_lines_empty_file()
- def test_count_lines_nonexistent_file()
- def test_count_lines_large_file()
- class TestCheckAgentQuality
- def test_check_agent_quality_minimal()
- def test_check_agent_quality_with_yaml()
- class TestCheckTaskQuality
- def test_check_task_quality_minimal()
- def test_check_task_quality_sufficient()
- class TestCheckSquadQuality
- def test_check_squad_quality_complete()
- def test_check_squad_quality_missing_files()
- def test_check_squad_quality_missing_dirs()
- class TestScanSquad
- def test_scan_squad_complete()
- def test_scan_squad_nonexistent()
- def test_scan_squad_strict_mode()
- class TestThresholds
- def test_agent_thresholds_exist()
- def test_task_thresholds_exist()
- def test_squad_thresholds_exist()

### `squads/squad-creator-pro/scripts/tests/test_validate_clone.sh` — 252 linhas
- fn assert_eq()
- fn assert_contains()
- fn assert_exit()
- # Quality Clone
- # Thin Clone
- # AM10 should be REQUIRES_LLM
- # Quality clone with hack fail should FAIL

### `squads/squad-creator-pro/scripts/model-usage-logger.cjs` — 245 linhas
- fn loadConfig()
- fn getExpectedTier()
- fn logUsage()
- fn calculateCost()
- fn generateReport()
- fn pct()
- fn savingsPct()
- fn correctPct()
- fn validateTask()

### `squads/squad-creator-pro/scripts/create-agent-preflight.py` — 243 linhas
- def count_lines()
- def validate_squad()
- def check_local_sources()
- def validate_agent_name()
- def main()

### `squads/squad-creator-pro/scripts/sync-chief-codex-skill.js` — 242 linhas
- fn fail()
- fn parseArgs()
- fn loadYaml()
- fn extractYamlBlock()
- fn parseCommandString()
- fn collectCommands()
- fn uniqueCommands()
- fn pickStarterCommands()
- fn oneLine()
- fn resolveChiefId()
- fn resolveChiefPath()
- fn buildSkillContent()
- fn main()

### `squads/squad-creator-pro/scripts/tests/test_clone_review.sh` — 239 linhas
- fn assert_eq()
- fn assert_contains()
- fn assert_exit()
- # Good Clone
- # Minimal Clone

### `squads/squad-creator-pro/scripts/tests/test_assess_sources.sh` — 216 linhas
- fn assert_eq()
- fn assert_contains()
- fn assert_exit()
- # Why Process Matters in 2025
- # Only Source

### `squads/squad-creator-pro/scripts/tests/test_coherence_validator.py` — 212 linhas
- class TestLoadYaml
- def test_load_valid_yaml()
- def test_load_invalid_yaml()
- def test_load_nonexistent_file()
- class TestExtractIds
- def test_extract_heuristic_ids()
- def test_extract_veto_ids()
- def test_extract_from_nested_structure()
- def test_empty_data()
- def test_no_matches()
- class TestCoherenceValidation
- def test_validation_with_config_dir()
- def test_validation_with_nonexistent_dir()
- class TestIntegration
- def test_real_config_validation()
- def run_basic_tests()

### `squads/squad-creator-pro/scripts/tests/test_modernization_score.sh` — 211 linhas
- fn assert_eq()
- fn assert_contains()
- fn assert_exit()
- # Setup temp fixtures
- # Teams
- # Delegation
- # Context
- # Communication
- # Agent refs
- # Dependencies
- # Permissions
- # Finalization
- # Anti-patterns
- # Artifacts
- # Legacy Workflow
- # Has some modern patterns
- # Extract score
- # Summary ---

### `squads/squad-creator-pro/scripts/squad-context-loader.cjs` — 205 linhas
- fn outputJson()
- fn outputError()
- fn getStatePath()
- fn resolveSlug()
- fn scanCompletedOutputs()
- fn getHandoffFrom()
- fn getHandoffTo()
- fn main()

### `squads/squad-creator-pro/scripts/validate-workspace-contract.py` — 197 linhas
- def parse_args()
- def resolve_squad_path()
- def read_yaml()
- def get_workspace_level()
- def get_template_namespace()
- def collect_text_files()
- def main()

### `squads/squad-creator-pro/scripts/save-session-metrics.py` — 136 linhas
- def load_state()
- def save_state()
- def update_memory_stats()
- def append_workflow_log()
- def main()

### `squads/squad-creator-pro/scripts/README.md` — 135 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/scripts/validate-agent-output.py` — 115 linhas
- def validate_agent_file()
- def main()

### `squads/squad-creator-pro/scripts/on-specialist-complete.py` — 98 linhas
- def load_state()
- def save_state()
- def append_to_memory()
- def main()

### `squads/squad-creator-pro/scripts/tests/run_bash_tests.sh` — 29 linhas
- # Run all bash script tests

### `squads/squad-creator-pro/scripts/validate-squad.sh` — 12 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/scripts/tests/__init__.py` — 1 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator-pro/skills/` — 1 arquivos · 290 linhas

### `squads/squad-creator-pro/skills/squad.md` — 290 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator-pro/tasks/` — 34 arquivos · 13.273 linhas

### `squads/squad-creator-pro/tasks/optimize.md` — 1798 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/optimize-workflow.md` — 859 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/squad-fusion.md` — 829 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/extract-voice-dna.md` — 695 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/extract-thinking-dna.md` — 667 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/extract-knowledge.md` — 593 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/deep-research-pre-agent.md` — 584 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/collect-sources.md` — 548 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/extract-implicit.md` — 518 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/an-assess-sources.md` — 453 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/update-mind.md` — 437 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/auto-acquire-sources.md` — 363 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/validate-extraction.md` — 359 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/an-compare-outputs.md` — 355 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/an-fidelity-score.md` — 354 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/extract-sop.md` — 340 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/an-extract-framework.md` — 338 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/an-clone-review.md` — 331 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/an-validate-clone.md` — 295 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/migrate-workflows-to-yaml.md` — 274 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/qualify-task.md` — 272 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/pv-audit.md` — 258 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/an-diagnose-clone.md` — 254 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/find-0.8.md` — 245 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/deconstruct.md` — 217 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/smoke-test-model-routing.md` — 169 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/an-extract-dna.md` — 154 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/an-design-clone.md` — 151 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/workspace-integration-hardening.md` — 143 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/pv-axioma-assessment.md` — 120 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/pv-modernization-score.md` — 108 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/lookup-model.md` — 80 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/parallel-discovery.md` — 60 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/tasks/sync-chief-codex-skill.md` — 52 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator-pro/test-cases/` — 59 arquivos · 13.549 linhas

### `squads/squad-creator-pro/test-cases/qa-after-creation/opus-baseline.yaml` — 603 linhas
- qa_report:
-   component:
-   component_type:
-   qa_date:
-   model:
-   task_version:
-   phase_0_type_detection:
- metadata:
-   tokens_used:
-   duration_ms:
-   model:
-   task_file:
-   task_version:
-   validation_frameworks:
-   component_statistics:
-   phase_durations:
- baseline_notes:
-   purpose:

### `squads/squad-creator-pro/test-cases/an-clone-review/opus-baseline.yaml` — 566 linhas
- clone_review:
-   clone:
-   clone_file:
-   persona_file:
-   date:
-   task_version:
-   source_quality:
- metadata:
-   task_version:
-   task_file:
-   target_file:
-   persona_file:
-   scoring_method:
-   model:
-   model_compatible:
-   execution_notes:
- completion_checklist:

### `squads/squad-creator-pro/test-cases/validate-squad/opus-baseline.yaml` — 529 linhas
- validation_report:
-   header:
-   phase_0_type_detection:
-   phase_1_structure:
-   phase_2_coverage:
-   phase_3_quality:
-   phase_4_contextual:
-   phase_5_veto:
-   phase_6_scoring:
-   executive_summary:
-   recommendations:
-   sign_off:

### `squads/squad-creator-pro/test-cases/an-assess-sources/opus-baseline.yaml` — 517 linhas
- source_assessment:
-   mind:
-   version:
-   assessment_date:
-   summary:
-   sources:

### `squads/squad-creator-pro/test-cases/pv-modernization-score/opus-baseline.yaml` — 488 linhas
- metadata:
-   model:
-   model_role:
-   timestamp:
-   task:
-   framework:
-   target_workflow:
-   workflow_version:
- modernization_score:
-   workflow:
-   file:
-   date:
-   score:
-   interpretation:
-   patterns:

### `squads/squad-creator-pro/test-cases/an-validate-clone/opus-baseline.yaml` — 470 linhas
- validation_report:
-   clone:
-   clone_file:
-   persona_file:
-   date:
-   fidelity_score:
-   hackability_test:
- metadata:
-   task_version:
-   scoring_method:
-   model_used:
-   model_compatible:
-   execution_date:
-   executor:
- completion_checklist:
-   fidelity_score_calculated:
-   hackability_test_executed:
-   authenticity_markers_verified:
-   final_verdict_by_decision_tree:
-   report_generated_with_evidence:

### `squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.1-output.yaml` — 452 linhas
- source_assessment:
-   mind:
-   version:
-   assessment_date:
-   task_version:
-   summary:
-   sources:

### `squads/squad-creator-pro/test-cases/an-assess-sources/EXECUTION-REPORT.md` — 413 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/test-cases/pv-modernization-score/haiku-round-1.yaml` — 393 linhas
- modernization_score:
-   metadata:
-   summary:
-   patterns:
- assessment_status:
- ready_for_implementation:
- recommendation:

### `squads/squad-creator-pro/test-cases/an-assess-sources/formal-qualification-report.yaml` — 389 linhas
- qualification_report:
-   task:
-   evaluation_date:
-   evaluator:
-   inputs:
-   dimension_scores:

### `squads/squad-creator-pro/test-cases/an-assess-sources/haiku-output.yaml` — 366 linhas
- source_assessment:
-   mind:
-   version:
-   assessment_date:
-   summary:
-   sources:
-   recommendations:
-   gaps_identified:
-   calibration_notes:
-   crown_jewel_justification:

### `squads/squad-creator-pro/test-cases/an-assess-sources/EXECUTION_NOTES.md` — 358 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/test-cases/an-assess-sources/TEST-REPORT-v2.1.md` — 351 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.2.2-output.yaml` — 332 linhas
- source_assessment:
-   mind:
-   version:
-   assessment_date:
-   model:
-   task_version:
-   summary:
-   sources:
-   scoring_notes:
- metadata:
-   assessed_by:
-   assessment_method:
-   calibration:
-   confidence_level:
-   next_review_date:

### `squads/squad-creator-pro/test-cases/an-assess-sources/README.md` — 320 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/test-cases/validate-squad/haiku-round-2.yaml` — 303 linhas
- validation_report:
-   header:
-   phase_0_type_detection:
-   phase_1_structure:
-   phase_2_coverage:
-   phase_3_quality:
-   phase_4_contextual:
-   phase_5_veto:
-   phase_6_scoring:
-   executive_summary:
- recommendations:
-   critical:
-   high:
-   medium:
-   low:
- validation_metadata:
-   validator_version:
-   task_file:
-   squad_path:
-   validation_date:
-   model:
-   duration_seconds:
-   files_analyzed:
-   phase_summary:

### `squads/squad-creator-pro/test-cases/an-assess-sources/README-v2.2.2.md` — 299 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/test-cases/qa-after-creation/haiku-round-1.yaml` — 292 linhas
- qa_report:
-   component:
-   component_type:
-   qa_date:
-   model:
-   phase_1_quick_checks:
-   phase_2_security_scan:
-   phase_3_structure_validation:
-   phase_4_quality_scoring:

### `squads/squad-creator-pro/test-cases/an-validate-clone/haiku-round-1.yaml` — 282 linhas
- validation_report:
-   clone:
-   clone_file:
-   date:
-   validation_round:
-   fidelity_score:
- metadata:
-   task_version:
-   scoring_method:
-   model_compatible:
-   executed_by:
-   execution_time:

### `squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.2.1-output.yaml` — 281 linhas
- source_assessment:
-   mind:
-   version:
-   assessment_date:
-   model_version:
-   summary:
-   sources:
-   recommendations:
-   gaps_identified:
-   tier_classification_method:
-   special_rules_applied:
-   verification_checklist:

### `squads/squad-creator-pro/test-cases/an-assess-sources/ASSESSMENT-SUMMARY.md` — 275 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/test-cases/BATCH-PROGRESS.md` — 268 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/test-cases/an-fidelity-score/opus-baseline.yaml` — 266 linhas
- fidelity_report:
-   clone:
-   clone_file:
-   persona_file:
-   date:
-   evaluator:
-   scores:
-   gaps:
- metadata:
-   task_version:
-   scoring_method:
-   model_used:
-   model_role:
-   purpose:
-   execution_date:
-   total_checkpoints:
-   passed_checkpoints:
-   pass_rate:

### `squads/squad-creator-pro/test-cases/an-fidelity-score/haiku-round-1.yaml` — 262 linhas
- fidelity_report:
-   clone:
-   clone_file:
-   wrapper_file:
-   date:
-   evaluator:
-   evaluation_type:
-   scores:
- metadata:
-   task_version:
-   scoring_method:
-   model_compatible:
-   weights:
-   file_size_bytes:
-   file_line_count:
-   completeness_assessment:

### `squads/squad-creator-pro/test-cases/an-assess-sources/VERIFICATION-CHECKLIST.txt` — 247 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/test-cases/pv-modernization-score/comparison-round-1.yaml` — 242 linhas
- comparison:
-   task:
-   target:
-   date:
-   models:
-   pattern_comparison:

### `squads/squad-creator-pro/test-cases/validate-squad/comparison-round-1.yaml` — 223 linhas
- comparison:
-   task:
-   target:
-   date:
-   models:
-   critical_divergences:

### `squads/squad-creator-pro/test-cases/an-assess-sources/qualification-report.yaml` — 213 linhas
- qualification_test:
-   task:
-   task_version:
-   test_date:
-   target:
- results:
-   opus_baseline:
-   haiku_test:
- comparison:
-   scope_interpretation:
-   tier_match:
-   score_comparison:
-   binary_checkpoints:
- veto_conditions:
-   MTQ_VC_001:
-   MTQ_VC_004:
- decision:
-   verdict:
-   confidence:
-   rationale:
- pattern_discovered:
-   name:
-   description:
- metrics:
-   test_coverage:
-   execution:
-   binary_checkpoint_effectiveness:
-   root_cause:
- next_steps:

### `squads/squad-creator-pro/test-cases/an-clone-review/haiku-round-1.yaml` — 213 linhas
- clone_review:
-   clone:
-   clone_file:
-   date:
-   source_quality:
-   trinity:
- metadata:
-   task_version:
-   scoring_method:
-   model_compatible:
-   execution_date:
-   reviewer_agent:
-   checkpoint_distribution:
-   validation_summary:
-   findings:
-   files_involved:

### `squads/squad-creator-pro/test-cases/pv-axioma-assessment/haiku-output.yaml` — 209 linhas
- axioma_assessment:
-   process_name:
-   assessment_date:
-   assessor:
-   model_used:
-   dimensions:
- metadata:
-   tokens_input:
-   tokens_output:
-   tool_uses:
-   latency_ms:
-   timestamp:
-   test_type:

### `squads/squad-creator-pro/test-cases/an-assess-sources/CHECKPOINT_MATRIX.md` — 202 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/test-cases/wf-clone-mind/haiku-output-v2-calibrated.yaml` — 200 linhas
- axioma_assessment:
-   process_name:
-   process_type:
-   version:
-   assessment_date:
-   assessor:
-   model_used:
-   dimensions:

### `squads/squad-creator-pro/test-cases/validate-squad/haiku-round-1.yaml` — 193 linhas
- validation_report:
-   squad_name:
-   squad_type:
-   validation_date:
-   model:
-   validator:
-   phase_0_type_detection:
-   phase_1_structure:
-   phase_2_coverage:
-   phase_3_quality:
-   phase_4_contextual:
-   phase_5_veto:
-   final_score:
-   result:
-   interpretation:
-   score_calculation:
-   executive_summary:
-   issues_by_priority:
-   recommendations:
-   quality_gates_status:
-   metadata:

### `squads/squad-creator-pro/test-cases/wf-clone-mind/haiku-output.yaml` — 183 linhas
- axioma_assessment:
-   process_name:
-   assessment_date:
-   assessor:
-   model_used:
-   dimensions:

### `squads/squad-creator-pro/test-cases/validate-squad/haiku-round-3-v4-task.yaml` — 149 linhas
- test_metadata:
-   round:
-   task_version:
-   model:
-   script_version:
-   execution_command:
- results:
-   squad:
-   result:
-   final_score:
-   type:
-   metrics:
-   deterministic_checks:
-   production:
-   claude_analysis:
-   improvements:
- comparison:
-   all_rounds:
-   haiku_r3_vs_opus_baseline:
-   haiku_r3_vs_opus_r3:
-   cost_comparison:
- gap_zero:
-   script_ran_first:
-   llm_collected_data_manually:
-   preflight_used_as_input:
-   caminho_errado_impossibilitado:
-   pv_verdict:
- qualification:
-   threshold:
-   haiku_quality_pct:
- … (+2 itens)

### `squads/squad-creator-pro/test-cases/_template.yaml` — 147 linhas
- test_case:
-   name:
-   version:
-   created:
-   task_file:
-   skill_file:
- input:
-   target:
-   params:
-   context_files:
- expected_output:
-   sections:
-   fields:
-   validations:
- baseline:
-   opus_output:
-   opus_score:
-   opus_tokens:
-   opus_latency_ms:
- evaluation:
-   completeness:
-   accuracy:
-   reasoning:
-   format:
-   actionability:
- compensation_history:
-   attempts:
- results:
-   haiku:
-   sonnet:
- … (+3 itens)

### `squads/squad-creator-pro/test-cases/an-assess-sources/ASSESSMENT_SUMMARY.md` — 140 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator-pro/test-cases/validate-squad/opus-round-3-v4-task.yaml` — 132 linhas
- test_metadata:
-   round:
-   task_version:
-   previous_rounds:
-   change_tested:
-   script_version:
- execution:
-   method:
-   followed_v4_instructions:
-   script_ran_first:
-   preflight_generated:
-   manual_ls_grep_wc:
- script_output:
-   squad:
-   result:
-   final_score:
-   type:
-   metrics:
-   deterministic_checks:
-   production:
-   claude_analysis:
-   improvements:
- comparison:
-   vs_opus_baseline:
-   vs_haiku_round_2:
-   progression:
- gap_zero_validation:
-   question:
-   answer:
-   anti_pattern_check:
- … (+6 itens)

### `squads/squad-creator-pro/test-cases/pv-axioma-assessment/test-case.yaml` — 129 linhas
- test_case:
-   name:
-   version:
-   created:
-   task_file:
-   skill_file:
- input:
-   target:
-   params:
-   context_files:
- expected_output:
-   sections:
-   fields:
-   validations:
- baseline:
-   opus_output:
-   opus_score:
-   opus_tokens:
-   opus_latency_ms:
- evaluation:
-   completeness:
-   accuracy:
-   reasoning:
-   format:
-   actionability:
- compensation_history:
-   attempts:
- results:
-   haiku:
-   sonnet:
- … (+4 itens)

### `squads/squad-creator-pro/test-cases/wf-clone-mind/opus-baseline.yaml` — 112 linhas
- axioma_assessment:
-   process_name:
-   assessment_date:
-   assessor:
-   model_used:
-   dimensions:
-   overall_score:
-   weighted_calculation:

### `squads/squad-creator-pro/test-cases/an-validate-clone/qualification-report.yaml` — 106 linhas
- qualification_report:
-   task_name:
-   task_version:
-   test_date:
-   workflow_version:
-   baseline:
-   candidate:
-   analysis:
- metadata:
-   test_target:
-   haiku_duration:

### `squads/squad-creator-pro/test-cases/pv-audit/test-case.yaml` — 106 linhas
- test_case:
-   name:
-   version:
-   created:
-   task_file:
-   wave:
-   priority:
-   similar_to:
-   confidence:
- input:
-   target:
-   params:
-   context_files:
- expected_output:
-   sections:
-   fields:
-   validations:
- baseline:
-   opus_output:
-   opus_score:
-   opus_tokens:
-   opus_latency_ms:
- evaluation:
-   completeness:
-   accuracy:
-   reasoning:
-   format:
-   actionability:
- compensation_history:
-   attempts:
- … (+9 itens)

### `squads/squad-creator-pro/test-cases/upgrade-squad/test-case.yaml` — 106 linhas
- test_case:
-   name:
-   version:
-   created:
-   task_file:
-   wave:
-   priority:
-   similar_to:
-   confidence:
- input:
-   target:
-   params:
-   context_files:
- expected_output:
-   sections:
-   fields:
-   validations:
- baseline:
-   opus_output:
-   opus_score:
-   opus_tokens:
-   opus_latency_ms:
- evaluation:
-   completeness:
-   accuracy:
-   reasoning:
-   format:
-   actionability:
- compensation_history:
-   attempts:
- … (+9 itens)

### `squads/squad-creator-pro/test-cases/an-extract-dna/test-case.yaml` — 105 linhas
- test_case:
-   name:
-   version:
-   created:
-   task_file:
-   wave:
-   priority:
-   similar_to:
-   confidence:
- input:
-   target:
-   params:
-   context_files:
- expected_output:
-   sections:
-   fields:
-   validations:
- baseline:
-   opus_output:
-   opus_score:
-   opus_tokens:
-   opus_latency_ms:
- evaluation:
-   completeness:
-   accuracy:
-   reasoning:
-   format:
-   actionability:
- compensation_history:
-   attempts:
- … (+9 itens)

### `squads/squad-creator-pro/test-cases/collect-sources/test-case.yaml` — 105 linhas
- test_case:
-   name:
-   version:
-   created:
-   task_file:
-   wave:
-   priority:
-   similar_to:
-   confidence:
- input:
-   target:
-   params:
-   context_files:
- expected_output:
-   sections:
-   fields:
-   validations:
- baseline:
-   opus_output:
-   opus_score:
-   opus_tokens:
-   opus_latency_ms:
- evaluation:
-   completeness:
-   accuracy:
-   reasoning:
-   format:
-   actionability:
- compensation_history:
-   attempts:
- … (+9 itens)

### `squads/squad-creator-pro/test-cases/create-task/test-case.yaml` — 104 linhas
- test_case:
-   name:
-   version:
-   created:
-   task_file:
-   wave:
-   priority:
-   similar_to:
-   confidence:
- input:
-   target:
-   params:
-   context_files:
- expected_output:
-   sections:
-   fields:
-   validations:
- baseline:
-   opus_output:
-   opus_score:
-   opus_tokens:
-   opus_latency_ms:
- evaluation:
-   completeness:
-   accuracy:
-   reasoning:
-   format:
-   actionability:
- compensation_history:
-   attempts:
- … (+9 itens)

### `squads/squad-creator-pro/test-cases/validate-squad/qualification-report.yaml` — 104 linhas
- qualification_report:
-   task_name:
-   test_date:
-   workflow_version:
-   baseline:
-   rounds:
-   decision:
-   cost_analysis:
-   root_cause_analysis:
- metadata:
-   validator:
-   comparison_method:
-   tokens_opus:
-   tokens_haiku:
-   total_cost:

### `squads/squad-creator-pro/test-cases/an-design-clone/test-case.yaml` — 102 linhas
- test_case:
-   name:
-   version:
-   created:
-   task_file:
-   wave:
-   priority:
-   similar_to:
-   confidence:
- input:
-   target:
-   params:
-   context_files:
- expected_output:
-   sections:
-   fields:
-   validations:
- baseline:
-   opus_output:
-   opus_score:
-   opus_tokens:
-   opus_latency_ms:
- evaluation:
-   completeness:
-   accuracy:
-   reasoning:
-   format:
-   actionability:
- compensation_history:
-   attempts:
- … (+9 itens)

### `squads/squad-creator-pro/test-cases/smoke-test-model-routing/test-case.yaml` — 100 linhas
- test_case:
-   name:
-   version:
-   created:
-   task_file:
-   wave:
-   priority:
-   similar_to:
-   confidence:
- input:
-   target:
-   params:
-   context_files:
- expected_output:
-   sections:
-   fields:
-   validations:
- baseline:
-   opus_output:
-   opus_score:
-   opus_tokens:
-   opus_latency_ms:
- evaluation:
-   completeness:
-   accuracy:
-   reasoning:
-   format:
-   actionability:
- compensation_history:
-   attempts:
- … (+9 itens)

### `squads/squad-creator-pro/test-cases/qa-after-creation/qualification-report.yaml` — 97 linhas
- qualification_report:
-   task_name:
-   test_date:
-   workflow_version:
-   baseline:
-   rounds:
-   decision:
- metadata:
-   validator:
-   note:
-   tokens_opus:
-   tokens_haiku:
-   total_cost:

### `squads/squad-creator-pro/test-cases/pv-axioma-assessment/opus-baseline.yaml` — 96 linhas
- axioma_assessment:
-   process_name:
-   assessment_date:
-   assessor:
-   model_used:
-   dimensions:
-   overall_score:
-   status:
-   veto_triggered:
-   recommendations:
- metadata:
-   tokens_input:
-   tokens_output:
-   latency_ms:
-   timestamp:

### `squads/squad-creator-pro/test-cases/an-fidelity-score/qualification-report.yaml` — 94 linhas
- qualification_report:
-   task_name:
-   task_version:
-   test_date:
-   workflow_version:
-   baseline:
-   rounds:
-   decision:
- metadata:
-   validator:
-   task_optimized:
-   optimization_type:
-   v1_to_v2_effort:
-   roi:

### `squads/squad-creator-pro/test-cases/an-clone-review/qualification-report.yaml` — 82 linhas
- qualification_report:
-   task_name:
-   task_version:
-   test_date:
-   workflow_version:
-   baseline:
-   candidate:
-   comparison:
-   analysis:
- metadata:
-   test_target:
-   test_duration:

### `squads/squad-creator-pro/test-cases/pv-modernization-score/qualification-report.yaml` — 74 linhas
- qualification_report:
-   task_name:
-   test_date:
-   workflow_version:
-   baseline:
-   rounds:
-   decision:
-   cost_analysis:
-   compensation_attempted:
-   compensation_reason:
-   learning:

### `squads/squad-creator-pro/test-cases/an-assess-sources/test-case.yaml` — 69 linhas
- test_case:
-   task:
-   task_version:
-   test_date:
-   workflow_version:
- target:
-   mind:
-   mind_path:
- sources_for_assessment:
- qualification:
-   veto_conditions:
-   expected_outcome:
- execution:
-   phase_1_opus_baseline:
-   phase_2_haiku_test:
-   phase_3_comparison:

### `squads/squad-creator-pro/test-cases/validate-squad/haiku-round-1-MINE.yaml` — 36 linhas
- validation_report:
-   squad_name:
-   squad_type:
-   validation_date:
-   model:
-   validator:
-   phase_0_type_detection:
-   final_score:
-   result:
-   note:

### `squads/squad-creator-pro/test-cases/pv-axioma-assessment/sonnet-output.yaml` — 30 linhas
- axioma_assessment:
-   process_name:
-   assessment_date:
-   assessor:
-   model_used:
-   dimensions:
-   overall_score:
-   status:
-   veto_triggered:
-   recommendations:
- metadata:
-   tokens_input:
-   tokens_output:
-   latency_ms:
-   timestamp:

### `squads/squad-creator-pro/test-cases/QUALIFICATION-DASHBOARD.yaml` — 13 linhas
- qualification_dashboard:
-   generated_at:
-   workflow:
-   status:
-   summary:
-   results:
-   next_actions:

### `squads/squad-creator-pro/test-cases/cross-provider/DASHBOARD.yaml` — 11 linhas
- cross_provider_dashboard:
-   generated_at:
-   workflow:
-   status:
-   summary:
-   results:
-   next_actions:

## `squads/squad-creator-pro/workflows/` — 18 arquivos · 11.513 linhas

### `squads/squad-creator-pro/workflows/wf-discover-tools.yaml` — 1827 linhas
- workflow:
-   id:
-   name:
-   version:
-   purpose:
- execution_strategy:
-   mode:
-   description:
- inputs:
-   required:
-   optional:
- preconditions:
- phases:
- outputs:
-   primary:
-   secondary:
- heuristics:
- search_depth_config:
-   quick:
-   standard:
-   exhaustive:
- error_handling:
-   ambiguous_or_unknown_scope:
-   canonical_scope_conflict:
-   agent_timeout:
-   agent_failure:
-   no_tools_found:
-   scoring_failure:
- metadata:
-   version:
- … (+6 itens)

### `squads/squad-creator-pro/workflows/wf-create-squad.yaml` — 1785 linhas
- workflow:
-   id:
-   name:
-   version:
-   purpose:
-   orchestrator:
-   mode:
-   governance_protocol:
-   ci_policy:
- routing:
-   preflight_task:
-   routes:
-   note:
- specialists:
-   mind_cloning:
-   process_design:
- yolo_mode:
-   philosophy:
- pre_flight:
-   trigger:
-   blocking:
-   purpose:
-   message:
- phase_materials:
-   id:
-   name:
-   condition:
-   trigger:
-   blocking:
-   purpose:
- … (+29 itens)

### `squads/squad-creator-pro/workflows/wf-squad-fusion.yaml` — 1684 linhas
- workflow:
-   id:
-   name:
-   version:
-   author:
-   icon:
-   executor_summary:
-   patterns_applied:
-   description:
- config:
-   modes:
-   paths:
-   quality_thresholds:
- anti_patterns:
-   critical:
- phases:
- heuristics:
- quick_reference:
-   phases_summary:
-   checkpoints:
-   rollback_points:
-   time_estimates:
- changelog:

### `squads/squad-creator-pro/workflows/wf-research-then-create-agent.yaml` — 921 linhas
- workflow-id:
- name:
- version:
- estimated-time:
- complexity:
- description:
- orchestrator:
- mode:
- quality_standards:
-   agent_minimum_lines:
-   task_minimum_lines:
-   research_minimum_lines:
-   primary_sources_minimum:
-   required_agent_sections:
- frameworks:
- inputs:
- outputs:
-   research:
-   agent:
-   tasks:
- preconditions:
- phases:
- final_output:
-   template:
- error_handling:
-   research_failures:
-   validation_failures:
-   agent_creation_failures:
- quality_guarantees:
- anti_pattern_prevented:
- … (+17 itens)

### `squads/squad-creator-pro/workflows/wf-model-tier-qualification.yaml` — 800 linhas
- workflow:
-   id:
-   name:
-   version:
-   purpose:
-   orchestrator:
-   mode:
- philosophy:
-   core:
- veto_conditions:
- test_input_registry:
-   pv-axioma-assessment:
-   pv-modernization-score:
-   validate-squad:
-   validate-extraction:
-   qa-after-creation:
-   an-fidelity-score:
-   an-clone-review:
-   an-diagnose-clone:
-   an-validate-clone:
-   an-assess-sources:
-   refresh-registry:
-   squad-analytics:
-   migrate-workflows-to-yaml:
-   install-commands:
-   sync-ide-command:
-   create-documentation:
-   create-template:
-   collect-sources:
-   auto-acquire-sources:
- … (+15 itens)

### `squads/squad-creator-pro/workflows/wf-cross-provider-qualification.yaml` — 711 linhas
- workflow:
-   id:
-   name:
-   version:
-   purpose:
-   orchestrator:
-   mode:
- philosophy:
-   core:
- external_models:
-   glm5:
-   kimi:
-   opus:
- veto_conditions:
- cross_provider_candidates:
-   extract-voice-dna:
-   extract-thinking-dna:
-   deep-research-pre-agent:
-   create-agent:
-   an-design-clone:
- inputs:
-   required:
-   optional:
- phases:
- batch_mode:
-   description:
-   execution_strategy:
-   consolidated_report:
- failure_paths:
- outputs:
- … (+8 itens)

### `squads/squad-creator-pro/workflows/wf-optimize-squad.yaml` — 684 linhas
- workflow:
-   id:
-   name:
-   version:
-   purpose:
-   orchestrator:
-   mode:
-   command:
-   model_requirements:
- philosophy:
-   core:
- inputs:
-   required:
-   optional:
- veto_conditions:
- artifact_optimization_map:
-   tasks:
-   checklists:
-   templates:
-   agents:
-   workflows:
-   data:
-   scripts:
- phases:
- commands:
-   scan:
- integrations:
-   optimize_task:
-   validate_squad:
-   model_tier_qualification:
- … (+6 itens)

### `squads/squad-creator-pro/workflows/wf-mind-research-loop.yaml` — 668 linhas
- workflow-id:
- name:
- version:
- estimated-time:
- complexity:
- description:
- orchestrator:
- mode:
- specialists:
-   mind_cloning:
-   process_validation:
- specialist_handoffs:
- frameworks:
- inputs:
- outputs:
-   primary:
-   artifacts:
- phases:
- final_output:
-   format:
-   template:
- execution_rules:
-   always:
-   never:
-   absolute_cut_criterion:
- quality_guarantees:
- integration:
-   executed_by:
-   feeds_into:
-   complete_flow:
- … (+9 itens)

### `squads/squad-creator-pro/workflows/validate-squad.yaml` — 608 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:

### `squads/squad-creator-pro/workflows/wf-clone-mind.yaml` — 568 linhas
- workflow-id:
- name:
- version:
- estimated-time:
- complexity:
- description:
- specialists:
-   primary:
-   process_validator:
- inputs:
-   required:
-   optional:
- phases:
- output_template:
- execution:
-   mode:
-   parallel_phases:
-   commands:
-   next_steps:
-   brownfield_commands:
- quality_gates:
- overall_pass:

### `squads/squad-creator-pro/workflows/wf-auto-acquire-sources.yaml` — 518 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:
- inputs:
-   required:
-   optional:
- outputs:
-   primary:
-   secondary:
- tools:
-   required:
-   recommended:
-   optional:
- phases:
- quality_gate:
-   id:
-   name:
-   minimum_requirements:
-   scoring:
-   recommendations:
- integration:
-   triggers:
-   outputs_used_by:
- metadata:
-   created:
-   author:
-   based_on:
-   changelog:

### `squads/squad-creator-pro/workflows/wf-extraction-pipeline.yaml` — 486 linhas
- workflow-id:
- name:
- version:
- estimated-time:
- complexity:
- description:
- anti_invention_philosophy:
- invention_red_flags:
- specialists:
-   primary:
-   process_validator:
- inputs:
-   required:
-   optional:
- phases:
- quality_gates:
- anti_invention_checklist:
-   framework:
-   sop:
-   checklist:
- triplet_output:
-   description:
-   files:
- execution:
-   mode:
-   parallel_phases:
-   commands:
-   next_steps:
- overall_pass:

### `squads/squad-creator-pro/workflows/wf-brownfield-upgrade-squad.yaml` — 64 linhas
- workflow:
-   id:
-   name:
-   version:
-   purpose:
-   orchestrator:
-   type:
-   sequence:
-   checkpoints:
-   outputs:

### `squads/squad-creator-pro/workflows/wf-workspace-integration-hardening.yaml` — 63 linhas
- workflow:
-   id:
-   name:
-   version:
-   purpose:
-   orchestrator:
-   type:
-   sequence:
-   checkpoints:
-   outputs:

### `squads/squad-creator-pro/workflows/wf-context-aware-create-squad.yaml` — 56 linhas
- workflow:
-   id:
-   name:
-   version:
-   purpose:
-   orchestrator:
-   type:
-   sequence:
-   checkpoints:
-   outputs:

### `squads/squad-creator-pro/workflows/modules/module-integration.yaml` — 34 linhas
- module:
-   id:
-   name:
-   purpose:
-   phases:

### `squads/squad-creator-pro/workflows/modules/module-quality-gates.yaml` — 20 linhas
- module:
-   id:
-   name:
-   purpose:
-   phases:

### `squads/squad-creator-pro/workflows/modules/module-discovery.yaml` — 16 linhas
- module:
-   id:
-   name:
-   purpose:
-   phases:

## `squads/squad-creator/.state.json/` — 1 arquivos · 32 linhas

### `squads/squad-creator/.state.json` — 32 linhas
- version:
- workflow:
- current_phase:
- started_at:
- last_updated:
- mode:
- inputs:
- phase_status:
- checkpoints_passed:
- subagent_results:
- minds_to_clone:
- minds_cloned:
- metrics:

## `squads/squad-creator/agents/` — 3 arquivos · 3.561 linhas

### `squads/squad-creator/agents/squad-chief.md` — 1483 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/agents/pedro-valerio.md` — 1184 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/agents/oalanicolas.md` — 894 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator/CHANGELOG.md/` — 1 arquivos · 349 linhas

### `squads/squad-creator/CHANGELOG.md` — 349 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator/checklists/` — 14 arquivos · 5.123 linhas

### `squads/squad-creator/checklists/squad-checklist.md` — 1014 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/task-anatomy-checklist.md` — 626 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/deep-research-quality.md` — 506 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/agent-quality-gate.md` — 434 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/quality-gate-checklist.md` — 385 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/mind-validation.md` — 374 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/smoke-test-agent.md` — 313 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/executor-matrix-checklist.md` — 260 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/sop-validation.md` — 250 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/agent-depth-checklist.md` — 244 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/create-workflow-checklist.md` — 224 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/create-squad-checklist.md` — 214 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/create-agent-checklist.md` — 184 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/checklists/mental-model-integration-checklist.md` — 95 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator/config/` — 6 arquivos · 2.422 linhas

### `squads/squad-creator/config/heuristics.yaml` — 753 linhas
- heuristics_engine:
-   version:
-   philosophy:

### `squads/squad-creator/config/veto-conditions.yaml` — 455 linhas
- veto_engine:
-   version:
-   philosophy:

### `squads/squad-creator/config/quality-gates.yaml` — 415 linhas
- quality_gates:
-   version:
-   philosophy:

### `squads/squad-creator/config/axioma-validator.yaml` — 371 linhas
- axioma_validator:
-   version:
-   source_artifact:
-   philosophy:

### `squads/squad-creator/config/task-anatomy.yaml` — 263 linhas
- task_anatomy:
-   version:
-   source_pattern:
-   philosophy:

### `squads/squad-creator/config/squad-config.yaml` — 165 linhas
- squad_config:
-   name:
-   version:
-   description:
-   data_sources:
-   processing:
-   validation:
-   services:
-   logging:

## `squads/squad-creator/config.yaml/` — 1 arquivos · 31 linhas

### `squads/squad-creator/config.yaml` — 31 linhas
- name:
- version:
- tested:
- updated_at:
- short-title:
- description:
- author:
- entry_agent:
- slashPrefix:
- settings:
-   activation:
-   ecosystem_report:

## `squads/squad-creator/data/` — 31 arquivos · 13.501 linhas

### `squads/squad-creator/data/hybridops-patterns.md` — 1351 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/squad-kb.md` — 987 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/best-practices.md` — 986 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/tool-evaluation-framework.md` — 847 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/executor-decision-tree.md` — 774 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/tool-registry.yaml` — 700 linhas
- version:
- last_updated:
- updated_by:
- last_discovery:
- categories:
-   mcp:
-   api:
-   cli:
-   library:
-   github_project:
-   skill_library:
- squad_creator_recommendations:
-   priority_1_quick_wins:
-   priority_2_enhancement:
-   priority_3_advanced:
-   cli_tools:
- native_tools:
-   read:
-   write:
-   edit:
-   bash:
-   glob:
-   grep:
-   web_search:
-   web_fetch:
-   task:
- mcp_servers:
-   desktop-commander:
-   exa:
-   context7:
- … (+51 itens)

### `squads/squad-creator/data/mental-model-task-matrix.yaml` — 692 linhas
- VALUES:
-   clareza_radical:
-   autenticidade_integral:
-   impacto_transformador:
-   liberdade_criativa:
-   evolucao_constante:
- OBSESSIONS:
-   clareza_compreensao_profunda:
-   liberdade_autonomia_estrutural:
-   eficiencia_alavancagem_maxima:
- MODELS:
-   pareto_ao_cubo:
-   clarity_first:
-   limited_losses_unlimited_gains:
-   first_principles_thinking:
-   frameworks_as_liberation:
- PARADOXES:
-   freedom_through_structure:
-   clarity_from_chaos:
-   humble_expert:
-   elitist_egalitarian:
- coverage_matrix:
-   tasks:
-   models_coverage:
-   totals:
- veto_conditions:
-   V1_modelo_sem_checkpoint:
-   V2_checkpoint_sem_acao:
-   V3_task_sem_checkpoint:
-   V4_checkpoint_generico:

### `squads/squad-creator/data/fusion-executor-analysis.md` — 677 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/decision-heuristics-framework.md` — 620 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/squad-type-definitions.yaml` — 578 linhas
- version:
- created:
- updated:
- type_examples:
-   expert:
-   pipeline:
-   hybrid:
- squad_types:
-   expert:
- detection_algorithm:
-   description:
- validation_requirements:
-   universal:
-   by_type:
- checklist_sections:
-   expert:
-   pipeline:
-   hybrid:
- migration_guidance:
-   from_v2_checklist:

### `squads/squad-creator/data/core-heuristics.md` — 510 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/tier-system-framework.md` — 475 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/executor-matrix-framework.md` — 441 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/pm-best-practices.md` — 440 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/quality-dimensions-framework.md` — 405 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/fusion-decision-points-analysis.md` — 397 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/pipeline-patterns.md` — 352 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/pv-output-examples.yaml` — 342 linhas
- output_examples:

### `squads/squad-creator/data/pv-workflow-validation.yaml` — 318 linhas
- ids:
-   philosophy:
- verification_gates:
-   gate_types:
-   principle:
- self_healing:
-   categories:
-   principle:
- modernization_score:
-   description:
-   patterns:
-   scoring:
- validation_script_pattern:
-   description:
-   template:
- smoke_test_design:
-   description:
-   structure:
- preservation_audit:
-   description:
-   checklist:
-   principle:
- aios_agent_execution:
-   principle:

### `squads/squad-creator/data/squad-analytics-guide.md` — 252 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/data/pv-authenticity-markers.yaml` — 200 linhas
- behavioral_modes:
- mode_activation_protocol:
-   steps:
- authenticity_markers:
-   description:
-   validation_rule:
- response_algorithm:
-   description:
-   pseudocode:
- critical_filters:
-   description:
-   filters:

### `squads/squad-creator/data/an-clone-validation.yaml` — 190 linhas
- fidelity_score:
-   description:
-   dimensions:
-   scoring:
- blind_test_protocol:
-   description:
-   steps:
-   success_criteria:
- authenticity_markers:
-   description:
-   checklist:
- stage_validation:
-   description:
-   stages:
- clone_maturity:
-   levels:

### `squads/squad-creator/data/an-diagnostic-framework.yaml` — 164 linhas
- diagnostic_questions:
-   core:
-   depth:
- red_flags:
-   critical:
-   high:
-   medium:
- green_flags:
-   excellent:
-   good:
- blind_test_protocol:
-   setup:
-   questions_to_ask:
-   success_criteria:
-   what_to_improve:
- hackability_test:
-   purpose:
-   attacks_to_try:
-   scoring:

### `squads/squad-creator/data/pv-meta-axiomas.yaml` — 162 linhas
- description:
- scoring:
-   overall_threshold:
-   minimum_per_dimension:
-   veto_on_failure:
- dimensions:
- assessment_template:
- quick_decision_heuristics:
- axiom_hierarchy:
-   level_minus_4_existential:

### `squads/squad-creator/data/an-clone-anti-patterns.yaml` — 148 linhas
- anti_patterns:
-   never_do:
- common_mistakes:
- recognition_patterns:
-   instant_detection:
-   blind_spots:
-   attention_triggers:
- objection_handling:
-   common_objections:

### `squads/squad-creator/data/an-source-tiers.yaml` — 119 linhas
- source_classification:
-   ouro:
-   bronze:
-   rule:
-   mantra:
- decision_pipeline:
- weights:
- risk_profile:
-   tolerance:
-   risk_seeking:
-   risk_averse:
- curadoria_scoring:
-   dimensions:
-   threshold:

### `squads/squad-creator/data/an-output-examples.yaml` — 102 linhas
- output_examples:

### `squads/squad-creator/data/an-source-signals.yaml` — 98 linhas
- high_value_signals:
-   description:
-   absolute_statements:
-   personal_rules:
-   expertise_markers:
-   decision_patterns:
- low_value_signals:
-   description:
-   hedging:
-   generic_advice:
-   filler:
- citation_formats:
-   standard:
-   video:
-   podcast:
-   interview:
- inference_format:
-   marker:
-   note:
-   action:
- usage_instructions:
-   when_extracting:
-   when_assessing:
-   quality_threshold:

### `squads/squad-creator/data/an-anchor-words.yaml` — 78 linhas
- vocabulary:
-   power_words:
-   signature_phrases:
-   metaphors:
- rules:
-   always_use:
-   never_use:
-   transforms:

### `squads/squad-creator/data/pv-anchor-words.yaml` — 64 linhas
- anchor_words:
-   confirmations:
-   interpellations:
-   rhythm_markers:
- fixed_vocabulary:
-   actions:
-   patterns:
-   never_uses:

### `squads/squad-creator/data/squad-registry.yaml` — 32 linhas
- metadata:
-   version:
-   last_updated:
-   maintainer:
-   total_squads:
-   total_agents:
-   total_tasks:
-   total_workflows:
-   total_templates:
-   total_checklists:
-   total_data_files:
- squads:
- domain_index:
- quality_references:
- conventions:
-   squad_folder:
-   agent_files:
-   task_files:
-   config_name:

## `squads/squad-creator/docs/` — 21 arquivos · 12.819 linhas

### `squads/squad-creator/docs/ARCHITECTURE-DIAGRAMS.md` — 1581 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/MIGRATION-ROADMAP-HYBRIDOPS.md` — 1161 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/squad-chief-agent-flow.md` — 983 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/squad-creation-pipeline-workflow.md` — 937 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/MIGRATION-PLAN-AGENT-CONFORMITY.md` — 861 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/FAQ.md` — 773 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/sop-extraction-process.md` — 674 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/CONCEPTS.md` — 656 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/AGENT-COLLABORATION.md` — 609 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/COMMANDS.md` — 544 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/RFC-001-deterministic-refactoring.md` — 463 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/TUTORIAL-COMPLETO.md` — 458 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/PEDRO-VALERIO-ARCHITECTURE.md` — 456 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/validation-report-2026-02-01.md` — 439 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/TROUBLESHOOTING.md` — 412 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/session-report-2026-02-01.md` — 411 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/TOOL-RECOMMENDATIONS.md` — 379 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/PATTERN-LIBRARY.md` — 333 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/HITL-FLOW.md` — 273 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/POR-ONDE-COMECAR.md` — 211 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/docs/QUICK-START.md` — 205 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator/minds/` — 17 arquivos · 3.614 linhas

### `squads/squad-creator/minds/pedro_valerio/artifacts/Assinatura_Linguistica.md` — 355 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/pedro_valerio/artifacts/META_AXIOMAS.md` — 277 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/artifacts/HANDOFF_PROTOCOL.md` — 269 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md` — 258 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_010.md` — 240 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_003.md` — 239 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_009.md` — 234 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_002.md` — 206 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_008.md` — 191 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/pedro_valerio/heuristics/PV_PM_001.md` — 191 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_007.md` — 190 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/pedro_valerio/heuristics/PV_PA_001.md` — 174 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_001.md` — 166 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_006.md` — 166 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_005.md` — 161 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_004.md` — 153 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/minds/pedro_valerio/heuristics/PV_BS_001.md` — 144 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator/package.json/` — 1 arquivos · 26 linhas

### `squads/squad-creator/package.json` — 26 linhas
- name:
- version:
- description:
- main:
- scripts:
- keywords:
- author:
- license:
- repository:
- engines:

## `squads/squad-creator/README.md/` — 1 arquivos · 1.058 linhas

### `squads/squad-creator/README.md` — 1058 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator/scripts/` — 30 arquivos · 11.111 linhas

### `squads/squad-creator/scripts/validate-squad.sh` — 944 linhas
- # CONFIGURATION
- # Model configuration
- # Colors
- # Counters
- # Results arrays
- # Phase results
- # ARGUMENT PARSING
- fn show_help()
- # LOGGING HELPERS
- fn log_pass()
- fn log_fail()
- fn log_warn()
- fn log_info()
- fn log_section()
- fn log_subsection()
- fn check_structure()
- fn check_security()
- # GCP Service Account
- fn check_cross_references()
- # Check if tasks referenced in agents exist
- fn detect_squad_type()
- # Check for Expert indicators
- # Check for Pipeline indicators
- # Calculate task ratio
- # Check for Hybrid indicators
- # Scoring
- # Determine type
- fn check_production()
- # Check for user feedback or validation reports
- # Check for example outputs in docs or templates
- … (+15 itens)

### `squads/squad-creator/scripts/coherence-validator.py` — 836 linhas
- def find_config_dir()
- def load_yaml()
- def extract_ids()
- def recurse()
- def validate_heuristic_veto_coverage()
- def validate_axioma_threshold_coverage()
- def validate_gate_reference_validity()
- def validate_veto_code_uniqueness()
- def validate_executor_consistency()
- def validate_cross_references()
- def run_coherence_validation()
- def print_report()
- def main()

### `squads/squad-creator/scripts/sync-ide-command.py` — 590 linhas
- def find_project_root()
- def load_sync_config()
- def ensure_dir()
- def find_squad_for_component()
- def list_squad_components()
- def get_source_file()
- def extract_description_from_md()
- def convert_md_to_mdc()
- def get_pack_alias()
- def get_destination_path()
- def sync_file()
- def sync_component()
- def sync_squad()
- def print_summary()
- def main()

### `squads/squad-creator/scripts/squad-analytics.py` — 585 linhas
- def get_squads_path()
- def count_lines()
- def count_files_by_extension()
- def count_md_files()
- def list_files()
- def list_files_with_lines()
- def simple_yaml_parse()
- def read_config()
- def detect_extra_folders()
- def analyze_squad()
- def calculate_quality_score()
- def quality_audit()
- def analyze_all_squads()
- def format_table()
- def format_single_squad()
- def main()

### `squads/squad-creator/scripts/validate-squad-structure.py` — 535 linhas
- def find_squads_root()
- def count_files()
- def read_yaml()
- def grep_in_file()
- def detect_squad_type()
- def validate_structure()
- def analyze_coverage()
- def validate_squad()
- def print_report()
- def main()

### `squads/squad-creator/scripts/yaml_validator.py` — 528 linhas
- class ValidationIssue
- class YamlValidationResult
- def extract_yaml_block()
- def get_nested_keys()
- def get_nested_value()
- def count_items()
- def validate_agent_yaml()
- def validate_file()
- def validate_squad()
- def format_output()
- def main()

### `squads/squad-creator/scripts/checklist_validator.py` — 451 linhas
- class CheckItem
- class ChecklistValidation
- def extract_yaml_blocks()
- def parse_yaml_safely()
- def extract_checks_from_yaml()
- def extract_checklist_metadata()
- def validate_check_item()
- def validate_checklist_file()
- def validate_checklist_directory()
- def print_file_report()
- def print_directory_report()
- def main()

### `squads/squad-creator/scripts/tests/test_squad_analytics.py` — 450 linhas
- class TestCountFilesByExtension
- def test_count_files_empty_dir()
- def test_count_files_with_matches()
- def test_count_files_multiple_extensions()
- def test_count_files_nonexistent_dir()
- class TestCountMdFiles
- def test_count_md_files_basic()
- def test_count_md_files_excludes_readme()
- class TestListFiles
- def test_list_files_basic()
- def test_list_files_sorted()
- def test_list_files_excludes_special()
- class TestSimpleYamlParse
- def test_simple_yaml_parse_basic()
- def test_simple_yaml_parse_quoted_values()
- def test_simple_yaml_parse_skips_comments()
- def test_simple_yaml_parse_skips_list_items()
- class TestReadConfig
- def test_read_config_exists()
- def test_read_config_not_exists()
- class TestCalculateQualityScore
- def test_quality_score_complete()
- def test_quality_score_minimal()
- def test_quality_score_medium()
- class TestAnalyzeSquad
- def test_analyze_squad_complete()
- def test_analyze_squad_includes_components()
- class TestAnalyzeAllSquads
- def test_analyze_all_squads_empty()
- def test_analyze_all_squads_multiple()
- … (+5 itens)

### `squads/squad-creator/scripts/generate-squad-greeting.js` — 426 linhas
- fn loadSquadAgent()
- fn normalizeAgentDefinition()
- fn loadSquadConfig()
- fn loadSquadRegistry()
- fn getEcosystemCounts()
- fn getTopSquads()
- fn generateEcosystemReport()
- fn loadSessionContext()
- fn generateSquadGreeting()
- fn generateFallbackGreeting()

### `squads/squad-creator/scripts/quality_gate.py` — 413 linhas
- def count_lines()
- def count_yaml_items()
- def check_agent_quality()
- def check_task_quality()
- def check_squad_quality()
- def scan_squad()
- def print_report()
- def main()

### `squads/squad-creator/scripts/tests/test_yaml_validator.py` — 412 linhas
- class TestExtractYamlBlock
- def test_extract_yaml_block_found()
- def test_extract_yaml_block_not_found()
- def test_extract_yaml_block_multiple()
- class TestGetNestedKeys
- def test_get_nested_keys_simple()
- def test_get_nested_keys_nested()
- def test_get_nested_keys_empty()
- def test_get_nested_keys_non_dict()
- class TestGetNestedValue
- def test_get_nested_value_simple()
- def test_get_nested_value_deep()
- def test_get_nested_value_not_found()
- def test_get_nested_value_invalid_path()
- class TestCountItems
- def test_count_items_list()
- def test_count_items_dict()
- def test_count_items_nested()
- def test_count_items_missing()
- class TestValidateAgentYaml
- def test_validate_agent_yaml_complete()
- def test_validate_agent_yaml_missing_required()
- def test_validate_agent_yaml_counts()
- class TestValidateFile
- def test_validate_file_agent()
- def test_validate_file_no_yaml()
- def test_validate_file_invalid_yaml()
- def test_validate_file_nonexistent()
- class TestValidateSquad
- def test_validate_squad_complete()
- … (+4 itens)

### `squads/squad-creator/scripts/tests/test_checklist_validator.py` — 396 linhas
- class TestExtractYamlBlocks
- def test_extract_single_block()
- def test_extract_multiple_blocks()
- def test_no_yaml_blocks()
- class TestParseYamlSafely
- def test_parse_valid_yaml()
- def test_parse_invalid_yaml()
- class TestExtractChecksFromYaml
- def test_extract_checks_array()
- def test_extract_checks_nested()
- def test_extract_checks_no_checks()
- class TestExtractChecklistMetadata
- def test_extract_metadata_from_checklist_key()
- def test_extract_metadata_from_top_level()
- def test_extract_metadata_empty()
- class TestValidateCheckItem
- def test_validate_valid_check()
- def test_validate_missing_id()
- def test_validate_missing_check_description()
- def test_validate_invalid_type()
- def test_validate_blocking_without_validation()
- class TestValidateChecklistFile
- def test_validate_nonexistent_file()
- def test_validate_valid_checklist()
- def test_validate_checklist_no_yaml()
- def test_validate_duplicate_ids()
- class TestValidateChecklistDirectory
- def test_validate_empty_directory()
- def test_validate_directory_with_checklists()
- def test_validate_directory_nonexistent()
- … (+4 itens)

### `squads/squad-creator/scripts/scoring.py` — 395 linhas
- def run_script()
- def score_structure()
- def score_agents()
- def score_tasks()
- def score_documentation()
- def score_integration()
- def score_naming()
- def calculate_score()
- def print_report()
- def main()

### `squads/squad-creator/scripts/tests/test_naming_validator.py` — 373 linhas
- class TestIsKebabCase
- def test_valid_kebab_case()
- def test_invalid_kebab_case()
- class TestIsSnakeCase
- def test_valid_snake_case()
- def test_invalid_snake_case()
- class TestIsCamelCase
- def test_valid_camel_case()
- def test_invalid_camel_case()
- class TestIsPascalCase
- def test_valid_pascal_case()
- def test_invalid_pascal_case()
- class TestValidateFileNames
- def test_valid_file_names()
- def test_invalid_file_names()
- def test_skip_special_files()
- class TestValidateDirectoryName
- def test_valid_directory_name()
- def test_invalid_directory_name()
- class TestValidateConfigNaming
- def test_valid_config_naming()
- def test_mismatched_name()
- def test_invalid_slash_prefix()
- def test_no_config()
- class TestValidateAgentIds
- def test_valid_agent_ids()
- def test_invalid_agent_ids()
- def test_no_agents_dir()
- class TestScanSquad
- def test_scan_squad_nonexistent()
- … (+4 itens)

### `squads/squad-creator/scripts/tests/test_scoring.py` — 366 linhas
- class TestWeights
- def test_weights_sum_to_one()
- def test_all_dimensions_have_weights()
- class TestScoreStructure
- def test_score_structure_complete()
- def test_score_structure_missing_config()
- def test_score_structure_missing_readme()
- def test_score_structure_missing_agents_dir()
- class TestScoreAgents
- def test_score_agents_no_dir()
- def test_score_agents_empty_dir()
- def test_score_agents_with_agents()
- def test_score_agents_low_lines()
- class TestScoreTasks
- def test_score_tasks_no_dir()
- def test_score_tasks_with_tasks()
- def test_score_tasks_low_lines()
- class TestScoreDocumentation
- def test_score_documentation_complete()
- def test_score_documentation_short_readme()
- def test_score_documentation_no_readme()
- class TestScoreIntegration
- def test_score_integration_complete()
- def test_score_integration_no_workflows()
- class TestCalculateScore
- def test_calculate_score_nonexistent()
- def test_calculate_score_complete()
- def test_calculate_score_has_dimensions()
- def test_calculate_score_grades()
- class TestScoreNaming
- … (+1 itens)

### `squads/squad-creator/scripts/tests/test_dependency_check.py` — 361 linhas
- class TestIsInCodeBlock
- def test_in_code_block()
- def test_outside_code_block()
- def test_no_code_blocks()
- class TestIsExampleReference
- def test_example_reference()
- def test_example_with_eg()
- def test_real_reference()
- class TestExtractReferences
- def test_extract_task_references()
- def test_extract_agent_references()
- def test_extract_template_references()
- def test_extract_workflow_references()
- def test_exclude_code_block_references()
- def test_relative_path_references()
- class TestCheckReferences
- def test_check_references_all_exist()
- def test_check_references_missing()
- class TestScanFile
- def test_scan_file_with_references()
- def test_scan_file_missing_reference()
- def test_scan_file_nonexistent()
- class TestScanSquad
- def test_scan_squad_nonexistent()
- def test_scan_squad_complete()
- def test_scan_squad_no_issues()
- def test_scan_squad_with_issues()
- def test_scan_squad_by_directory()
- class TestStrictMode
- def test_strict_mode_checks_external()

### `squads/squad-creator/scripts/tests/test_refresh_registry.py` — 338 linhas
- class TestCountFiles
- def test_count_files_empty_dir()
- def test_count_files_with_matches()
- def test_count_files_multiple_patterns()
- def test_count_files_nonexistent()
- class TestReadConfigYaml
- def test_read_config_yaml_exists()
- def test_read_config_yaml_not_exists()
- class TestListAgents
- def test_list_agents_with_agents()
- def test_list_agents_excludes_readme()
- def test_list_agents_no_dir()
- class TestScanSquad
- def test_scan_squad_complete()
- def test_scan_squad_minimal()
- class TestScanAllSquads
- def test_scan_all_squads_empty()
- def test_scan_all_squads_multiple()
- def test_scan_all_squads_skips_invalid()
- class TestFormatForRegistry
- def test_format_for_registry_structure()
- def test_format_for_registry_squad_fields()

### `squads/squad-creator/scripts/dependency_check.py` — 333 linhas
- def load_known_squads()
- def is_in_code_block()
- def is_example_reference()
- def is_external_squad_reference()
- def extract_references()
- def check_references()
- def scan_file()
- def scan_squad()
- def print_report()
- def main()

### `squads/squad-creator/scripts/tests/conftest.py` — 309 linhas
- def sample_squad()
- def sample_agent_file()
- def sample_task_file()
- def scripts_dir()
- def squads_dir()

### `squads/squad-creator/scripts/tests/test_inventory.py` — 307 linhas
- class TestComponentInventory
- def test_component_inventory_creation()
- class TestListFiles
- def test_list_files_empty_dir()
- def test_list_files_with_files()
- def test_list_files_multiple_patterns()
- def test_list_files_nonexistent_dir()
- def test_list_files_excludes_hidden()
- def test_list_files_sorted()
- class TestReadConfigYaml
- def test_read_config_yaml_exists()
- def test_read_config_yaml_not_exists()
- def test_read_config_yaml_invalid()
- class TestScanSquad
- def test_scan_squad_nonexistent()
- def test_scan_squad_empty()
- def test_scan_squad_complete()
- def test_scan_squad_tracks_issues()
- def test_scan_squad_total_components()
- class TestFormatOutput
- def test_format_output_json()
- def test_format_output_yaml()
- def test_format_output_summary()
- class TestSquadInventoryDataclass
- def test_squad_inventory_has_scan_date()
- def test_squad_inventory_config_metadata()

### `squads/squad-creator/scripts/naming_validator.py` — 299 linhas
- def is_kebab_case()
- def is_snake_case()
- def is_camel_case()
- def is_pascal_case()
- def validate_file_names()
- def validate_directory_name()
- def validate_config_naming()
- def validate_agent_ids()
- def scan_squad()
- def print_report()
- def main()

### `squads/squad-creator/scripts/tests/test_quality_gate.py` — 280 linhas
- class TestCountLines
- def test_count_lines_simple_file()
- def test_count_lines_empty_file()
- def test_count_lines_nonexistent_file()
- def test_count_lines_large_file()
- class TestCheckAgentQuality
- def test_check_agent_quality_minimal()
- def test_check_agent_quality_with_yaml()
- class TestCheckTaskQuality
- def test_check_task_quality_minimal()
- def test_check_task_quality_sufficient()
- class TestCheckSquadQuality
- def test_check_squad_quality_complete()
- def test_check_squad_quality_missing_files()
- def test_check_squad_quality_missing_dirs()
- class TestScanSquad
- def test_scan_squad_complete()
- def test_scan_squad_nonexistent()
- def test_scan_squad_strict_mode()
- class TestThresholds
- def test_agent_thresholds_exist()
- def test_task_thresholds_exist()
- def test_squad_thresholds_exist()

### `squads/squad-creator/scripts/refresh-registry.py` — 270 linhas
- def get_squads_path()
- def count_files()
- def read_config_yaml()
- def list_agents()
- def scan_squad()
- def scan_all_squads()
- def format_for_registry()
- def main()

### `squads/squad-creator/scripts/inventory.py` — 269 linhas
- class ComponentInventory
- class SquadInventory
- def list_files()
- def read_config_yaml()
- def scan_squad()
- def format_output()
- def main()

### `squads/squad-creator/scripts/README.md` — 246 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/scripts/save-session-metrics.py` — 136 linhas
- def load_state()
- def save_state()
- def update_memory_stats()
- def append_workflow_log()
- def main()

### `squads/squad-creator/scripts/validate-agent-output.py` — 115 linhas
- def validate_agent_file()
- def main()

### `squads/squad-creator/scripts/on-specialist-complete.py` — 98 linhas
- def load_state()
- def save_state()
- def append_to_memory()
- def main()

### `squads/squad-creator/scripts/validate-all.sh` — 49 linhas
- # Validate all squads

### `squads/squad-creator/scripts/tests/__init__.py` — 1 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator/skills/` — 1 arquivos · 288 linhas

### `squads/squad-creator/skills/squad.md` — 288 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator/tasks/` — 42 arquivos · 18.577 linhas

### `squads/squad-creator/tasks/validate-squad.md` — 1385 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/create-task.md` — 1149 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/optimize.md` — 1082 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/discover-tools.md` — 945 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/upgrade-squad.md` — 920 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/create-squad.md` — 855 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/create-agent.md` — 820 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/squad-fusion.md` — 818 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/create-workflow.md` — 721 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/extract-thinking-dna.md` — 654 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/extract-voice-dna.md` — 620 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/extract-knowledge.md` — 578 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/deep-research-pre-agent.md` — 568 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/collect-sources.md` — 534 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/qa-after-creation.md` — 476 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/create-template.md` — 475 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/update-mind.md` — 429 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/extract-implicit.md` — 406 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/refresh-registry.md` — 403 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/sync-ide-command.md` — 392 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/install-commands.md` — 373 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/auto-acquire-sources.md` — 350 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/extract-sop.md` — 321 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/create-pipeline.md` — 297 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/squad-analytics.md` — 265 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/migrate-workflows-to-yaml.md` — 261 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/create-documentation.md` — 259 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/pv-audit.md` — 246 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/validate-extraction.md` — 236 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/find-0.8.md` — 235 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/deconstruct.md` — 215 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/an-extract-framework.md` — 152 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/an-extract-dna.md` — 142 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/an-design-clone.md` — 137 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/an-assess-sources.md` — 136 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/an-validate-clone.md` — 130 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/an-diagnose-clone.md` — 128 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/an-fidelity-score.md` — 109 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/an-clone-review.md` — 105 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/pv-axioma-assessment.md` — 85 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/pv-modernization-score.md` — 85 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/tasks/CHANGELOG.md` — 80 linhas
- *(sem estrutura extraível)*

## `squads/squad-creator/templates/` — 20 arquivos · 8.522 linhas

### `squads/squad-creator/templates/workflow-doc-tmpl.md` — 860 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/agent-tmpl.md` — 697 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/research-output-tmpl.md` — 625 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/quality-gate-tmpl.yaml` — 589 linhas
- _template:
-   name:
-   version:
-   description:
-   author:
-   pattern:
-   created_at:
-   instructions:
-   enums:
- quality_gate:
-   id:
-   name:
-   description:
-   phase:
-   placement:
-   type:
-   severity:
-   criteria:
-   thresholds:
-   executor:
-   pass_action:
-   pass_actions_detailed:
-   fail_action:
-   fail_actions_detailed:
-   sla:
-   dependencies:
-   metadata:
- _examples:
-   manual_gate_example:
-   automated_gate_example:
- … (+8 itens)

### `squads/squad-creator/templates/pop-extractor-prompt.md` — 549 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/agent-flow-doc-tmpl.md` — 512 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/research-prompt-tmpl.md` — 479 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/squad-prd-tmpl.md` — 464 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/task-tmpl.md` — 461 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/pipeline-runner-tmpl.py` — 444 linhas
- class PhaseDefinition
- class PhaseResult
- class PipelineResult
- class PhaseRunner
- def __init__()
- def _log()
- def run()
- def _example_phase_extract()
- def _example_phase_transform()
- def _example_phase_load()
- def get_example_phases()
- def test()

### `squads/squad-creator/templates/pipeline-state-tmpl.py` — 413 linhas
- class PhaseState
- def to_dict()
- def from_dict()
- class PipelineState
- def to_dict()
- def from_dict()
- class PipelineStateManager
- def __init__()
- def _timestamp()
- def load_state()
- def save_state()
- def create_state()
- def start_phase()
- def complete_phase()
- def fail_phase()
- def skip_phase()
- def reset_phase()
- def get_next_pending_phase()
- def get_resume_phase()
- def can_resume()
- def complete_pipeline()
- def get_summary()
- def load_or_create_state()

### `squads/squad-creator/templates/workflow-tmpl.yaml` — 394 linhas
- template:
-   id:
-   name:
-   quality_standard:
-   min_lines:
-   output:
-   architecture:
- workflow_anatomy:
-   required_sections:
-   phase_requirements:
- sections:
- inline_structure_examples:
-   sos_structure_high_ticket:
- quality_gate:
-   blocking_requirements:
-   recommended_requirements:
-   domain_specific:
- usage:
-   when_to_create_workflow:
- quality_indicators:
-   workflow_completeness:
-   structural_integrity:

### `squads/squad-creator/templates/pipeline-progress-tmpl.py` — 373 linhas
- def is_rich_supported()
- class ProgressState
- def elapsed_seconds()
- def total_operations()
- def completed_operations()
- def progress_percent()
- def eta_seconds()
- def eta_formatted()
- class ProgressTracker
- def __init__()
- def _build_display()
- def start()
- def stop()
- def _refresh()
- def start_item()
- def start_phase()
- def complete_phase()
- def complete_item()
- def add_cost()
- def add_tokens()
- class SimpleProgress
- def __init__()
- def start()
- def stop()
- def start_item()
- def start_phase()
- def complete_phase()
- def complete_item()
- def add_cost()
- def add_tokens()
- … (+1 itens)

### `squads/squad-creator/templates/config-tmpl.yaml` — 352 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
- sections:

### `squads/squad-creator/templates/quality-dashboard-tmpl.md` — 286 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/story-create-agent-tmpl.md` — 284 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/readme-tmpl.md` — 231 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/template-tmpl.yaml` — 227 linhas
- template:
-   id:
-   name:
-   version:
-   output:
- workflow:
-   mode:
-   elicitation:
-   custom_elicitation:
- sections:

### `squads/squad-creator/templates/squad-readme-tmpl.md` — 170 linhas
- *(sem estrutura extraível)*

### `squads/squad-creator/templates/handoff-insumos-tmpl.yaml` — 112 linhas
- type:
- date:
- source_material:
- expert_name:
- insumos:
-   voice_dna:
-   thinking_dna:
-   sop_extracted:
-   frameworks_extracted:
- validation:
-   citations_count:
-   signature_phrases_count:
-   inferred_concepts_count:
-   heuristics_with_when:
-   checklist:
- ready_for:
- recommended_artifact:
- notes_for_builder:

## `squads/squad-creator/workflows/` — 9 arquivos · 8.470 linhas

### `squads/squad-creator/workflows/wf-squad-fusion.yaml` — 1684 linhas
- workflow:
-   id:
-   name:
-   version:
-   author:
-   icon:
-   executor_summary:
-   patterns_applied:
-   description:
- config:
-   modes:
-   paths:
-   quality_thresholds:
- anti_patterns:
-   critical:
- phases:
- heuristics:
- quick_reference:
-   phases_summary:
-   checkpoints:
-   rollback_points:
-   time_estimates:
- changelog:

### `squads/squad-creator/workflows/wf-create-squad.yaml` — 1604 linhas
- workflow:
-   id:
-   name:
-   version:
-   purpose:
-   orchestrator:
-   mode:
- specialists:
-   mind_cloning:
-   process_design:
- yolo_mode:
-   philosophy:
- pre_flight:
-   trigger:
-   blocking:
-   purpose:
-   message:
- phase_materials:
-   id:
-   name:
-   condition:
-   trigger:
-   blocking:
-   purpose:
- inputs:
-   required:
-   optional:
- preconditions:
-   system:
-   user:
- … (+23 itens)

### `squads/squad-creator/workflows/wf-discover-tools.yaml` — 1439 linhas
- workflow:
-   id:
-   name:
-   version:
-   purpose:
- execution_strategy:
-   mode:
-   description:
- inputs:
-   required:
-   optional:
- preconditions:
- phases:
- outputs:
-   primary:
-   secondary:
- heuristics:
- search_depth_config:
-   quick:
-   standard:
-   exhaustive:
- error_handling:
-   agent_timeout:
-   agent_failure:
-   no_tools_found:
-   scoring_failure:
- metadata:
-   version:
-   created:
-   updated:
- … (+5 itens)

### `squads/squad-creator/workflows/wf-research-then-create-agent.yaml` — 921 linhas
- workflow-id:
- name:
- version:
- estimated-time:
- complexity:
- description:
- orchestrator:
- mode:
- quality_standards:
-   agent_minimum_lines:
-   task_minimum_lines:
-   research_minimum_lines:
-   primary_sources_minimum:
-   required_agent_sections:
- frameworks:
- inputs:
- outputs:
-   research:
-   agent:
-   tasks:
- preconditions:
- phases:
- final_output:
-   template:
- error_handling:
-   research_failures:
-   validation_failures:
-   agent_creation_failures:
- quality_guarantees:
- anti_pattern_prevented:
- … (+17 itens)

### `squads/squad-creator/workflows/wf-mind-research-loop.yaml` — 668 linhas
- workflow-id:
- name:
- version:
- estimated-time:
- complexity:
- description:
- orchestrator:
- mode:
- specialists:
-   mind_cloning:
-   process_validation:
- specialist_handoffs:
- frameworks:
- inputs:
- outputs:
-   primary:
-   artifacts:
- phases:
- final_output:
-   format:
-   template:
- execution_rules:
-   always:
-   never:
-   absolute_cut_criterion:
- quality_guarantees:
- integration:
-   executed_by:
-   feeds_into:
-   complete_flow:
- … (+9 itens)

### `squads/squad-creator/workflows/validate-squad.yaml` — 582 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:

### `squads/squad-creator/workflows/wf-clone-mind.yaml` — 568 linhas
- workflow-id:
- name:
- version:
- estimated-time:
- complexity:
- description:
- specialists:
-   primary:
-   process_validator:
- inputs:
-   required:
-   optional:
- phases:
- output_template:
- execution:
-   mode:
-   parallel_phases:
-   commands:
-   next_steps:
-   brownfield_commands:
- quality_gates:
- overall_pass:

### `squads/squad-creator/workflows/wf-auto-acquire-sources.yaml` — 518 linhas
- workflow:
-   id:
-   name:
-   version:
-   description:
- inputs:
-   required:
-   optional:
- outputs:
-   primary:
-   secondary:
- tools:
-   required:
-   recommended:
-   optional:
- phases:
- quality_gate:
-   id:
-   name:
-   minimum_requirements:
-   scoring:
-   recommendations:
- integration:
-   triggers:
-   outputs_used_by:
- metadata:
-   created:
-   author:
-   based_on:
-   changelog:

### `squads/squad-creator/workflows/wf-extraction-pipeline.yaml` — 486 linhas
- workflow-id:
- name:
- version:
- estimated-time:
- complexity:
- description:
- anti_invention_philosophy:
- invention_red_flags:
- specialists:
-   primary:
-   process_validator:
- inputs:
-   required:
-   optional:
- phases:
- quality_gates:
- anti_invention_checklist:
-   framework:
-   sop:
-   checklist:
- triplet_output:
-   description:
-   files:
- execution:
-   mode:
-   parallel_phases:
-   commands:
-   next_steps:
- overall_pass:
