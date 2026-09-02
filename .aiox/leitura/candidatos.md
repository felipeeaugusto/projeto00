# Candidatos — varredura determinística (sem IA), FASE 1 / passo 1.3

> Gerado em 2026-09-02T12:54:09.175Z por `.aiox/leitura/buscar-padroes.js` — 100% das linhas do índice foram escaneadas, custo de token: zero.

## Cobertura (prova de que nada foi pulado)

| Métrica | Valor |
|---|---|
| Arquivos no índice | 1605 |
| Arquivos com erro de leitura | 0 |
| **Linhas escaneadas** | **588.273** |
| Trechos sinalizados (matches) | 2.373 |
| % das linhas que geraram sinal | 0.349% |

## Contagem por categoria

| Categoria | Ocorrências |
|---|---|
| 🧟 Órfão / não usado | 567 |
| 🚧 Inacabado / placeholder | 345 |
| ⚠️ Descontinuado / quebrado | 65 |
| 👯 Possível duplicata | 166 |
| 🔀 Contradição / conflito | 121 |
| 🚦 Veto / gate / circuit breaker | 910 |
| 🗂️ Estado de workflow / artefato | 199 |

⚠️ **42 combinações (arquivo, categoria) passaram do teto de 40 e foram truncadas** — a contagem acima é exata, mas o contexto detalhado abaixo mostra só os primeiros 40 de cada.

---

## 🧟 Órfão / não usado (567 trechos com contexto, 567 ocorrências totais)

### .aiox-core/data/entity-registry.yaml:44
```
   42:         - aiox-master
   43:         - analyst
>> 44:       dependencies: []
   45:       externalDeps: []
   46:       plannedDeps:
```
*(bloco/entidade: `advanced-elicitation`)*

### .aiox-core/data/entity-registry.yaml:70
```
   68:         - task
   69:         - facilitates
>> 70:       usedBy: []
>> 71:       dependencies: []
   72:       externalDeps: []
   73:       plannedDeps:
```
*(bloco/entidade: `analyst-facilitate-brainstorming`)*

### .aiox-core/data/entity-registry.yaml:95
```
   93:         - brownfield
   94:         - project
>> 95:       usedBy: []
   96:       dependencies:
   97:         - brownfield-analyzer
```
*(bloco/entidade: `analyze-brownfield`)*

### .aiox-core/data/entity-registry.yaml:126
```
   124:         - analysis
   125:         - task
>> 126:       usedBy: []
   127:       dependencies:
   128:         - qa
```
*(bloco/entidade: `analyze-cross-artifact`)*

### .aiox-core/data/entity-registry.yaml:178
```
   176:       usedBy:
   177:         - data-engineer
>> 178:       dependencies: []
   179:       externalDeps: []
   180:       plannedDeps:
```
*(bloco/entidade: `analyze-performance`)*

### .aiox-core/data/entity-registry.yaml:290
```
   288:       usedBy:
   289:         - ux-design-expert
>> 290:       dependencies: []
   291:       externalDeps: []
   292:       plannedDeps:
```
*(bloco/entidade: `audit-codebase`)*

### .aiox-core/data/entity-registry.yaml:317
```
   315:       usedBy:
   316:         - ux-design-expert
>> 317:       dependencies: []
   318:       externalDeps: []
   319:       plannedDeps:
```
*(bloco/entidade: `audit-tailwind-config`)*

### .aiox-core/data/entity-registry.yaml:339
```
   337:         - utilities
   338:         - audit-utilities
>> 339:       usedBy: []
>> 340:       dependencies: []
   341:       externalDeps: []
   342:       plannedDeps:
```
*(bloco/entidade: `audit-utilities`)*

### .aiox-core/data/entity-registry.yaml:366
```
   364:       usedBy:
   365:         - ux-design-expert
>> 366:       dependencies: []
   367:       externalDeps: []
   368:       plannedDeps:
```
*(bloco/entidade: `bootstrap-shadcn-library`)*

### .aiox-core/data/entity-registry.yaml:553
```
   551:         - 'task:'
   552:         - (autonomous)
>> 553:       usedBy: []
   554:       dependencies:
   555:         - build-orchestrator.js
```
*(bloco/entidade: `build`)*

### .aiox-core/data/entity-registry.yaml:579
```
   577:         - run-design-system-pipeline
   578:         - ux-design-expert
>> 579:       dependencies: []
   580:       externalDeps: []
   581:       plannedDeps:
```
*(bloco/entidade: `calculate-roi`)*

### .aiox-core/data/entity-registry.yaml:604
```
   602:       usedBy:
   603:         - devops
>> 604:       dependencies: []
   605:       externalDeps: []
   606:       plannedDeps: []
```
*(bloco/entidade: `check-docs-links`)*

### .aiox-core/data/entity-registry.yaml:630
```
   628:       usedBy:
   629:         - devops
>> 630:       dependencies: []
   631:       externalDeps: []
   632:       plannedDeps:
```
*(bloco/entidade: `ci-cd-configuration`)*

### .aiox-core/data/entity-registry.yaml:653
```
   651:         - utilities
   652:         - task
>> 653:       usedBy: []
   654:       dependencies:
   655:         - dev
```
*(bloco/entidade: `cleanup-utilities`)*

### .aiox-core/data/entity-registry.yaml:683
```
   681:         - remove-worktree
   682:         - devops
>> 683:       dependencies: []
   684:       externalDeps: []
   685:       plannedDeps: []
```
*(bloco/entidade: `cleanup-worktrees`)*

### .aiox-core/data/entity-registry.yaml:706
```
   704:       usedBy:
   705:         - architect
>> 706:       dependencies: []
   707:       externalDeps: []
   708:       plannedDeps:
```
*(bloco/entidade: `collaborative-edit`)*

### .aiox-core/data/entity-registry.yaml:761
```
   759:       usedBy:
   760:         - ux-design-expert
>> 761:       dependencies: []
   762:       externalDeps: []
   763:       plannedDeps:
```
*(bloco/entidade: `consolidate-patterns`)*

### .aiox-core/data/entity-registry.yaml:816
```
   814:       usedBy:
   815:         - aiox-master
>> 816:       dependencies: []
   817:       externalDeps: []
   818:       plannedDeps: []
```
*(bloco/entidade: `create-agent`)*

### .aiox-core/data/entity-registry.yaml:1125
```
   1123:         - query
   1124:         - paths
>> 1125:       usedBy: []
>> 1126:       dependencies: []
   1127:       externalDeps: []
   1128:       plannedDeps:
```
*(bloco/entidade: `db-analyze-hotpaths`)*

### .aiox-core/data/entity-registry.yaml:1152
```
   1150:       usedBy:
   1151:         - data-engineer
>> 1152:       dependencies: []
   1153:       externalDeps: []
   1154:       plannedDeps:
```
*(bloco/entidade: `db-apply-migration`)*

### .aiox-core/data/entity-registry.yaml:1177
```
   1175:       usedBy:
   1176:         - data-engineer
>> 1177:       dependencies: []
   1178:       externalDeps: []
   1179:       plannedDeps:
```
*(bloco/entidade: `db-bootstrap`)*

### .aiox-core/data/entity-registry.yaml:1204
```
   1202:       usedBy:
   1203:         - data-engineer
>> 1204:       dependencies: []
   1205:       externalDeps: []
   1206:       plannedDeps:
```
*(bloco/entidade: `db-domain-modeling`)*

### .aiox-core/data/entity-registry.yaml:1230
```
   1228:       usedBy:
   1229:         - data-engineer
>> 1230:       dependencies: []
   1231:       externalDeps: []
   1232:       plannedDeps:
```
*(bloco/entidade: `db-dry-run`)*

### .aiox-core/data/entity-registry.yaml:1254
```
   1252:       usedBy:
   1253:         - data-engineer
>> 1254:       dependencies: []
   1255:       externalDeps: []
   1256:       plannedDeps:
```
*(bloco/entidade: `db-env-check`)*

### .aiox-core/data/entity-registry.yaml:1277
```
   1275:         - (analyze,
   1276:         - buffers)
>> 1277:       usedBy: []
>> 1278:       dependencies: []
   1279:       externalDeps: []
   1280:       plannedDeps:
```
*(bloco/entidade: `db-explain`)*

### .aiox-core/data/entity-registry.yaml:1302
```
   1300:         - (rls
   1301:         - testing)
>> 1302:       usedBy: []
>> 1303:       dependencies: []
   1304:       externalDeps: []
   1305:       plannedDeps:
```
*(bloco/entidade: `db-impersonate`)*

### .aiox-core/data/entity-registry.yaml:1329
```
   1327:       usedBy:
   1328:         - data-engineer
>> 1329:       dependencies: []
   1330:       externalDeps: []
   1331:       plannedDeps:
```
*(bloco/entidade: `db-load-csv`)*

### .aiox-core/data/entity-registry.yaml:1355
```
   1353:       usedBy:
   1354:         - data-engineer
>> 1355:       dependencies: []
   1356:       externalDeps: []
   1357:       plannedDeps:
```
*(bloco/entidade: `db-policy-apply`)*

### .aiox-core/data/entity-registry.yaml:1377
```
   1375:         - audit
   1376:         - 'task:'
>> 1377:       usedBy: []
>> 1378:       dependencies: []
   1379:       externalDeps: []
   1380:       plannedDeps:
```
*(bloco/entidade: `db-rls-audit`)*

### .aiox-core/data/entity-registry.yaml:1402
```
   1400:       usedBy:
   1401:         - data-engineer
>> 1402:       dependencies: []
   1403:       externalDeps: []
   1404:       plannedDeps:
```
*(bloco/entidade: `db-rollback`)*

### .aiox-core/data/entity-registry.yaml:1426
```
   1424:       usedBy:
   1425:         - data-engineer
>> 1426:       dependencies: []
   1427:       externalDeps: []
   1428:       plannedDeps:
```
*(bloco/entidade: `db-run-sql`)*

### .aiox-core/data/entity-registry.yaml:1448
```
   1446:         - audit
   1447:         - 'task:'
>> 1448:       usedBy: []
>> 1449:       dependencies: []
   1450:       externalDeps: []
   1451:       plannedDeps:
```
*(bloco/entidade: `db-schema-audit`)*

### .aiox-core/data/entity-registry.yaml:1474
```
   1472:       usedBy:
   1473:         - data-engineer
>> 1474:       dependencies: []
   1475:       externalDeps: []
   1476:       plannedDeps:
```
*(bloco/entidade: `db-seed`)*

### .aiox-core/data/entity-registry.yaml:1498
```
   1496:       usedBy:
   1497:         - data-engineer
>> 1498:       dependencies: []
   1499:       externalDeps: []
   1500:       plannedDeps:
```
*(bloco/entidade: `db-smoke-test`)*

### .aiox-core/data/entity-registry.yaml:1523
```
   1521:       usedBy:
   1522:         - data-engineer
>> 1523:       dependencies: []
   1524:       externalDeps: []
   1525:       plannedDeps:
```
*(bloco/entidade: `db-snapshot`)*

### .aiox-core/data/entity-registry.yaml:1546
```
   1544:         - database
   1545:         - analysis
>> 1546:       usedBy: []
>> 1547:       dependencies: []
   1548:       externalDeps: []
   1549:       plannedDeps:
```
*(bloco/entidade: `db-squad-integration`)*

### .aiox-core/data/entity-registry.yaml:1572
```
   1570:         - 'task:'
   1571:         - guide
>> 1572:       usedBy: []
   1573:       dependencies:
   1574:         - README
```
*(bloco/entidade: `db-supabase-setup`)*

### .aiox-core/data/entity-registry.yaml:1600
```
   1598:       usedBy:
   1599:         - data-engineer
>> 1600:       dependencies: []
   1601:       externalDeps: []
   1602:       plannedDeps:
```
*(bloco/entidade: `db-verify-order`)*

### .aiox-core/data/entity-registry.yaml:1623
```
   1621:         - executor
   1622:         - delegate-to-external-executor.md
>> 1623:       usedBy: []
   1624:       dependencies:
   1625:         - dev
```
*(bloco/entidade: `delegate-to-external-executor`)*

### .aiox-core/data/entity-registry.yaml:1678
```
   1676:       usedBy:
   1677:         - qa-loop
>> 1678:       dependencies: []
   1679:       externalDeps: []
   1680:       plannedDeps:
```
*(bloco/entidade: `dev-apply-qa-fixes`)*

### .aiox-core/data/entity-registry.yaml:1703
```
   1701:         - register
   1702:         - technical
>> 1703:       usedBy: []
   1704:       dependencies:
   1705:         - backlog-manager
```
*(bloco/entidade: `dev-backlog-debt`)*

### .aiox-core/data/entity-registry.yaml:1858
```
   1856:         - story
   1857:         - task
>> 1858:       usedBy: []
   1859:       dependencies:
   1860:         - po-master-checklist
```
*(bloco/entidade: `dev-validate-next-story`)*

### .aiox-core/data/entity-registry.yaml:2077
```
   2075:         - gotchas
   2076:         - task
>> 2077:       usedBy: []
   2078:       dependencies:
   2079:         - gotchas-documenter
```
*(bloco/entidade: `document-gotchas`)*

### .aiox-core/data/entity-registry.yaml:2111
```
   2109:         - analyst
   2110:         - architect
>> 2111:       dependencies: []
   2112:       externalDeps: []
   2113:       plannedDeps:
```
*(bloco/entidade: `document-project`)*

### .aiox-core/data/entity-registry.yaml:2242
```
   2240:       usedBy:
   2241:         - ux-design-expert
>> 2242:       dependencies: []
   2243:       externalDeps: []
   2244:       plannedDeps:
```
*(bloco/entidade: `export-design-tokens-dtcg`)*

### .aiox-core/data/entity-registry.yaml:2266
```
   2264:       usedBy:
   2265:         - ux-design-expert
>> 2266:       dependencies: []
   2267:       externalDeps: []
   2268:       plannedDeps:
```
*(bloco/entidade: `extend-pattern`)*

### .aiox-core/data/entity-registry.yaml:2289
```
   2287:         - extract
   2288:         - patterns
>> 2289:       usedBy: []
   2290:       dependencies:
   2291:         - pattern-extractor
```
*(bloco/entidade: `extract-patterns`)*

### .aiox-core/data/entity-registry.yaml:2316
```
   2314:       usedBy:
   2315:         - ux-design-expert
>> 2316:       dependencies: []
   2317:       externalDeps: []
   2318:       plannedDeps:
```
*(bloco/entidade: `extract-tokens`)*

### .aiox-core/data/entity-registry.yaml:2342
```
   2340:       usedBy:
   2341:         - analyst
>> 2342:       dependencies: []
   2343:       externalDeps: []
   2344:       plannedDeps:
```
*(bloco/entidade: `facilitate-brainstorming-session`)*

### .aiox-core/data/entity-registry.yaml:2365
```
   2363:         - path
   2364:         - gate
>> 2365:       usedBy: []
>> 2366:       dependencies: []
   2367:       externalDeps: []
   2368:       plannedDeps: []
>> 2369:       lifecycle: orphan
   2370:       adaptability:
   2371:         score: 0.8
```
*(bloco/entidade: `fast-path-gate`)*

### .aiox-core/data/entity-registry.yaml:2561
```
   2559:       usedBy:
   2560:         - devops
>> 2561:       dependencies: []
   2562:       externalDeps: []
   2563:       plannedDeps:
```
*(bloco/entidade: `github-devops-repository-cleanup`)*

### .aiox-core/data/entity-registry.yaml:2610
```
   2608:         - issue
   2609:         - triage
>> 2610:       usedBy: []
   2611:       dependencies:
   2612:         - devops
```
*(bloco/entidade: `github-issue-triage`)*

### .aiox-core/data/entity-registry.yaml:2710
```
   2708:         - check
   2709:         - task
>> 2710:       usedBy: []
   2711:       dependencies:
   2712:         - registry-healer
```
*(bloco/entidade: `ids-health`)*

### .aiox-core/data/entity-registry.yaml:2733
```
   2731:         - query
   2732:         - basic
>> 2733:       usedBy: []
>> 2734:       dependencies: []
   2735:       externalDeps: []
   2736:       plannedDeps:
```
*(bloco/entidade: `ids-query`)*

### .aiox-core/data/entity-registry.yaml:2797
```
   2795:       usedBy:
   2796:         - aiox-master
>> 2797:       dependencies: []
   2798:       externalDeps: []
   2799:       plannedDeps:
```
*(bloco/entidade: `index-docs`)*

### .aiox-core/data/entity-registry.yaml:2821
```
   2819:         - status
   2820:         - init-project-status
>> 2821:       usedBy: []
   2822:       dependencies:
   2823:         - project-status-loader
```
*(bloco/entidade: `init-project-status`)*

### .aiox-core/data/entity-registry.yaml:2847
```
   2845:         - integrate
   2846:         - squad
>> 2847:       usedBy: []
>> 2848:       dependencies: []
   2849:       externalDeps: []
   2850:       plannedDeps:
```
*(bloco/entidade: `integrate-squad`)*

### .aiox-core/data/entity-registry.yaml:2878
```
   2876:       usedBy:
   2877:         - aiox-master
>> 2878:       dependencies: []
   2879:       externalDeps: []
   2880:       plannedDeps:
```
*(bloco/entidade: `kb-mode-interaction`)*

### .aiox-core/data/entity-registry.yaml:2900
```
   2898:         - patterns
   2899:         - learn-patterns
>> 2900:       usedBy: []
   2901:       dependencies:
   2902:         - pattern-learner
```
*(bloco/entidade: `learn-patterns`)*

### .aiox-core/data/entity-registry.yaml:2928
```
   2926:       usedBy:
   2927:         - devops
>> 2928:       dependencies: []
   2929:       externalDeps: []
   2930:       plannedDeps: []
```
*(bloco/entidade: `list-mcps`)*

### .aiox-core/data/entity-registry.yaml:2977
```
   2975:         - creation
   2976:         - task
>> 2977:       usedBy: []
>> 2978:       dependencies: []
   2979:       externalDeps: []
   2980:       plannedDeps:
```
*(bloco/entidade: `mcp-workflow`)*

### .aiox-core/data/entity-registry.yaml:3001
```
   2999:         - create-worktree
   3000:         - devops
>> 3001:       dependencies: []
   3002:       externalDeps: []
   3003:       plannedDeps: []
```
*(bloco/entidade: `merge-worktree`)*

### .aiox-core/data/entity-registry.yaml:3103
```
   3101:         - command
   3102:         - suggestions
>> 3103:       usedBy: []
   3104:       dependencies:
   3105:         - workflow-state-manager
```
*(bloco/entidade: `next`)*

### .aiox-core/data/entity-registry.yaml:3128
```
   3126:         - \*orchestrate-resume
   3127:         - command
>> 3128:       usedBy: []
>> 3129:       dependencies: []
   3130:       externalDeps: []
   3131:       plannedDeps: []
>> 3132:       lifecycle: orphan
   3133:       adaptability:
   3134:         score: 0.8
```
*(bloco/entidade: `orchestrate-resume`)*

### .aiox-core/data/entity-registry.yaml:3149
```
   3147:         - \*orchestrate-status
   3148:         - command
>> 3149:       usedBy: []
>> 3150:       dependencies: []
   3151:       externalDeps: []
   3152:       plannedDeps: []
>> 3153:       lifecycle: orphan
   3154:       adaptability:
   3155:         score: 0.8
```
*(bloco/entidade: `orchestrate-status`)*

### .aiox-core/data/entity-registry.yaml:3170
```
   3168:         - \*orchestrate-stop
   3169:         - command
>> 3170:       usedBy: []
>> 3171:       dependencies: []
   3172:       externalDeps: []
   3173:       plannedDeps: []
>> 3174:       lifecycle: orphan
   3175:       adaptability:
   3176:         score: 0.8
```
*(bloco/entidade: `orchestrate-stop`)*

### .aiox-core/data/entity-registry.yaml:3190
```
   3188:         - \*orchestrate
   3189:         - command
>> 3190:       usedBy: []
>> 3191:       dependencies: []
   3192:       externalDeps: []
   3193:       plannedDeps: []
>> 3194:       lifecycle: orphan
   3195:       adaptability:
   3196:         score: 0.8
```
*(bloco/entidade: `orchestrate`)*

### .aiox-core/data/entity-registry.yaml:3212
```
   3210:         - learned
   3211:         - management
>> 3212:       usedBy: []
   3213:       dependencies:
   3214:         - dev
```
*(bloco/entidade: `patterns`)*

### .aiox-core/data/entity-registry.yaml:3327
```
   3325:         - 'task:'
   3326:         - item
>> 3327:       usedBy: []
   3328:       dependencies:
   3329:         - backlog-manager
```
*(bloco/entidade: `po-backlog-add`)*

### .aiox-core/data/entity-registry.yaml:3385
```
   3383:         - dev
   3384:         - po
>> 3385:       dependencies: []
   3386:       externalDeps: []
   3387:       plannedDeps:
```
*(bloco/entidade: `po-manage-story-backlog`)*

### .aiox-core/data/entity-registry.yaml:3467
```
   3465:         - regenerate
   3466:         - story
>> 3467:       usedBy: []
   3468:       dependencies:
   3469:         - story-index-generator
```
*(bloco/entidade: `po-stories-index`)*

### .aiox-core/data/entity-registry.yaml:3554
```
   3552:         - creation
   3553:         - open-source
>> 3554:       usedBy: []
>> 3555:       dependencies: []
   3556:       externalDeps: []
   3557:       plannedDeps:
```
*(bloco/entidade: `pr-automation`)*

### .aiox-core/data/entity-registry.yaml:3582
```
   3580:         - full
   3581:         - panorama
>> 3582:       usedBy: []
   3583:       dependencies:
   3584:         - aiox-master
```
*(bloco/entidade: `project-status`)*

### .aiox-core/data/entity-registry.yaml:3636
```
   3634:         - publishing
   3635:         - pipeline
>> 3636:       usedBy: []
   3637:       dependencies:
   3638:         - release-checklist
```
*(bloco/entidade: `publish-npm`)*

### .aiox-core/data/entity-registry.yaml:3660
```
   3658:         - creation
   3659:         - 'task:'
>> 3660:       usedBy: []
>> 3661:       dependencies: []
   3662:       externalDeps: []
   3663:       plannedDeps: []
>> 3664:       lifecycle: orphan
   3665:       adaptability:
   3666:         score: 0.8
```
*(bloco/entidade: `qa-after-creation`)*

### .aiox-core/data/entity-registry.yaml:3683
```
   3681:         - 'task:'
   3682:         - follow-up
>> 3683:       usedBy: []
   3684:       dependencies:
   3685:         - backlog-manager
```
*(bloco/entidade: `qa-backlog-add-followup`)*

### .aiox-core/data/entity-registry.yaml:3714
```
   3712:       usedBy:
   3713:         - qa
>> 3714:       dependencies: []
   3715:       externalDeps: []
   3716:       plannedDeps: []
```
*(bloco/entidade: `qa-browser-console-check`)*

### .aiox-core/data/entity-registry.yaml:3930
```
   3928:       usedBy:
   3929:         - qa
>> 3930:       dependencies: []
   3931:       externalDeps: []
   3932:       plannedDeps: []
```
*(bloco/entidade: `qa-migration-validation`)*

### .aiox-core/data/entity-registry.yaml:3952
```
   3950:       usedBy:
   3951:         - qa
>> 3952:       dependencies: []
   3953:       externalDeps: []
   3954:       plannedDeps:
```
*(bloco/entidade: `qa-nfr-assess`)*

### .aiox-core/data/entity-registry.yaml:4070
```
   4068:       usedBy:
   4069:         - qa
>> 4070:       dependencies: []
   4071:       externalDeps: []
   4072:       plannedDeps:
```
*(bloco/entidade: `qa-risk-profile`)*

### .aiox-core/data/entity-registry.yaml:4123
```
   4121:       usedBy:
   4122:         - qa
>> 4123:       dependencies: []
   4124:       externalDeps: []
   4125:       plannedDeps: []
```
*(bloco/entidade: `qa-security-checklist`)*

### .aiox-core/data/entity-registry.yaml:4147
```
   4145:       usedBy:
   4146:         - qa
>> 4147:       dependencies: []
   4148:       externalDeps: []
   4149:       plannedDeps:
```
*(bloco/entidade: `qa-test-design`)*

### .aiox-core/data/entity-registry.yaml:4224
```
   4222:       usedBy:
   4223:         - devops
>> 4224:       dependencies: []
   4225:       externalDeps: []
   4226:       plannedDeps: []
```
*(bloco/entidade: `remove-mcp`)*

### .aiox-core/data/entity-registry.yaml:4301
```
   4299:         - 'task:'
   4300:         - external
>> 4301:       usedBy: []
>> 4302:       dependencies: []
   4303:       externalDeps: []
   4304:       plannedDeps: []
>> 4305:       lifecycle: orphan
   4306:       adaptability:
   4307:         score: 0.8
```
*(bloco/entidade: `review-contributor-pr`)*

### .aiox-core/data/entity-registry.yaml:4407
```
   4405:       usedBy:
   4406:         - devops
>> 4407:       dependencies: []
   4408:       externalDeps: []
   4409:       plannedDeps: []
```
*(bloco/entidade: `search-mcp`)*

### .aiox-core/data/entity-registry.yaml:4428
```
   4426:       usedBy:
   4427:         - data-engineer
>> 4428:       dependencies: []
   4429:       externalDeps: []
   4430:       plannedDeps:
```
*(bloco/entidade: `security-audit`)*

### .aiox-core/data/entity-registry.yaml:4450
```
   4448:         - scan
   4449:         - security-scan
>> 4450:       usedBy: []
   4451:       dependencies:
   4452:         - qa
```
*(bloco/entidade: `security-scan`)*

### .aiox-core/data/entity-registry.yaml:4496
```
   4494:       usedBy:
   4495:         - data-engineer
>> 4496:       dependencies: []
   4497:       externalDeps: []
   4498:       plannedDeps:
```
*(bloco/entidade: `setup-database`)*

### .aiox-core/data/entity-registry.yaml:4521
```
   4519:       usedBy:
   4520:         - ux-design-expert
>> 4521:       dependencies: []
   4522:       externalDeps: []
   4523:       plannedDeps:
```
*(bloco/entidade: `setup-design-system`)*

### .aiox-core/data/entity-registry.yaml:4573
```
   4571:         - routing
   4572:         - setup-llm-routing
>> 4573:       usedBy: []
   4574:       dependencies:
   4575:         - install-llm-routing.js
```
*(bloco/entidade: `setup-llm-routing`)*

### .aiox-core/data/entity-registry.yaml:4625
```
   4623:         - docs
   4624:         - documentation
>> 4625:       usedBy: []
   4626:       dependencies:
   4627:         - index.js
```
*(bloco/entidade: `setup-project-docs`)*

### .aiox-core/data/entity-registry.yaml:4662
```
   4660:         - pm
   4661:         - po
>> 4662:       dependencies: []
   4663:       externalDeps: []
   4664:       plannedDeps:
```
*(bloco/entidade: `shard-doc`)*

### .aiox-core/data/entity-registry.yaml:4691
```
   4689:         - story
   4690:         - task
>> 4691:       usedBy: []
   4692:       dependencies:
   4693:         - po-master-checklist
```
*(bloco/entidade: `sm-create-next-story`)*

### .aiox-core/data/entity-registry.yaml:4949
```
   4947:       usedBy:
   4948:         - squad-creator
>> 4949:       dependencies: []
   4950:       externalDeps: []
   4951:       plannedDeps: []
```
*(bloco/entidade: `squad-creator-download`)*

### .aiox-core/data/entity-registry.yaml:5050
```
   5048:       usedBy:
   5049:         - squad-creator
>> 5050:       dependencies: []
   5051:       externalDeps: []
   5052:       plannedDeps: []
```
*(bloco/entidade: `squad-creator-publish`)*

### .aiox-core/data/entity-registry.yaml:5072
```
   5070:         - command
   5071:         - \*command
>> 5072:       usedBy: []
>> 5073:       dependencies: []
   5074:       externalDeps: []
   5075:       plannedDeps: []
>> 5076:       lifecycle: orphan
   5077:       adaptability:
   5078:         score: 0.8
```
*(bloco/entidade: `squad-creator-sync-ide-command`)*

### .aiox-core/data/entity-registry.yaml:5096
```
   5094:       usedBy:
   5095:         - squad-creator
>> 5096:       dependencies: []
   5097:       externalDeps: []
   5098:       plannedDeps: []
```
*(bloco/entidade: `squad-creator-sync-synkra`)*

### .aiox-core/data/entity-registry.yaml:5143
```
   5141:         - checkpoint
   5142:         - 'task:'
>> 5143:       usedBy: []
   5144:       dependencies:
   5145:         - development-cycle.yaml
```
*(bloco/entidade: `story-checkpoint`)*

### .aiox-core/data/entity-registry.yaml:5218
```
   5216:       usedBy:
   5217:         - ux-design-expert
>> 5218:       dependencies: []
   5219:       externalDeps: []
   5220:       plannedDeps:
```
*(bloco/entidade: `tailwind-upgrade`)*

### .aiox-core/data/entity-registry.yaml:5245
```
   5243:       usedBy:
   5244:         - data-engineer
>> 5245:       dependencies: []
   5246:       externalDeps: []
   5247:       plannedDeps:
```
*(bloco/entidade: `test-as-user`)*

### .aiox-core/data/entity-registry.yaml:5269
```
   5267:         - validation
   5268:         - task
>> 5269:       usedBy: []
>> 5270:       dependencies: []
   5271:       externalDeps: []
   5272:       plannedDeps: []
>> 5273:       lifecycle: orphan
   5274:       adaptability:
   5275:         score: 0.8
```
*(bloco/entidade: `test-validation-task`)*

### .aiox-core/data/entity-registry.yaml:5344
```
   5342:         - 'task:'
   5343:         - framework
>> 5344:       usedBy: []
   5345:       dependencies:
   5346:         - devops
```
*(bloco/entidade: `update-aiox`)*

### .aiox-core/data/entity-registry.yaml:5396
```
   5394:       usedBy:
   5395:         - aiox-master
>> 5396:       dependencies: []
   5397:       externalDeps: []
   5398:       plannedDeps: []
```
*(bloco/entidade: `update-source-tree`)*

### .aiox-core/data/entity-registry.yaml:5420
```
   5418:       usedBy:
   5419:         - ux-design-expert
>> 5420:       dependencies: []
   5421:       externalDeps: []
   5422:       plannedDeps:
```
*(bloco/entidade: `ux-create-wireframe`)*

### .aiox-core/data/entity-registry.yaml:5446
```
   5444:       usedBy:
   5445:         - ux-design-expert
>> 5446:       dependencies: []
   5447:       externalDeps: []
   5448:       plannedDeps:
```
*(bloco/entidade: `ux-ds-scan-artifact`)*

### .aiox-core/data/entity-registry.yaml:5472
```
   5470:       usedBy:
   5471:         - ux-design-expert
>> 5472:       dependencies: []
   5473:       externalDeps: []
   5474:       plannedDeps:
```
*(bloco/entidade: `ux-user-research`)*

### .aiox-core/data/entity-registry.yaml:5494
```
   5492:         - agents
   5493:         - task
>> 5494:       usedBy: []
>> 5495:       dependencies: []
   5496:       externalDeps: []
   5497:       plannedDeps: []
>> 5498:       lifecycle: orphan
   5499:       adaptability:
   5500:         score: 0.8
```
*(bloco/entidade: `validate-agents`)*

### .aiox-core/data/entity-registry.yaml:5652
```
   5650:         - toggle
   5651:         - yolo-toggle
>> 5652:       usedBy: []
>> 5653:       dependencies: []
   5654:       externalDeps: []
   5655:       plannedDeps:
```
*(bloco/entidade: `yolo-toggle`)*

### .aiox-core/data/entity-registry.yaml:5679
```
   5677:         - blocks
   5678:         - system
>> 5679:       usedBy: []
>> 5680:       dependencies: []
   5681:       externalDeps: []
   5682:       plannedDeps:
```
*(bloco/entidade: `README`)*

### .aiox-core/data/entity-registry.yaml:5703
```
   5701:         - template
   5702:         - 'block:'
>> 5703:       usedBy: []
>> 5704:       dependencies: []
   5705:       externalDeps: []
   5706:       plannedDeps:
```
*(bloco/entidade: `agent-prompt-template`)*

### .aiox-core/data/entity-registry.yaml:5726
```
   5724:         - loading
   5725:         - 'block:'
>> 5726:       usedBy: []
   5727:       dependencies:
   5728:         - context-loader
```
*(bloco/entidade: `context-loading`)*

### .aiox-core/data/entity-registry.yaml:5749
```
   5747:         - pattern
   5748:         - 'block:'
>> 5749:       usedBy: []
>> 5750:       dependencies: []
   5751:       externalDeps: []
   5752:       plannedDeps: []
>> 5753:       lifecycle: orphan
   5754:       adaptability:
   5755:         score: 0.8
```
*(bloco/entidade: `execution-pattern`)*

### .aiox-core/data/entity-registry.yaml:5770
```
   5768:         - finalization
   5769:         - 'block:'
>> 5770:       usedBy: []
>> 5771:       dependencies: []
   5772:       externalDeps: []
   5773:       plannedDeps: []
>> 5774:       lifecycle: orphan
   5775:       adaptability:
   5776:         score: 0.8
```
*(bloco/entidade: `finalization`)*

### .aiox-core/data/entity-registry.yaml:5793
```
   5791:         - greeting
   5792:         - template
>> 5793:       usedBy: []
>> 5794:       dependencies: []
   5795:       externalDeps: []
   5796:       plannedDeps: []
>> 5797:       lifecycle: orphan
   5798:       adaptability:
   5799:         score: 0.5
```
*(bloco/entidade: `activation-instructions-inline-greeting`)*

### .aiox-core/data/entity-registry.yaml:5816
```
   5814:         - template
   5815:         - agent
>> 5816:       usedBy: []
>> 5817:       dependencies: []
   5818:       externalDeps: []
   5819:       plannedDeps: []
>> 5820:       lifecycle: orphan
   5821:       adaptability:
   5822:         score: 0.5
```
*(bloco/entidade: `activation-instructions-template`)*

### .aiox-core/data/entity-registry.yaml:5840
```
   5838:         - squad-creator-extend
   5839:         - aiox-master
>> 5840:       dependencies: []
   5841:       externalDeps: []
   5842:       plannedDeps: []
```
*(bloco/entidade: `agent-template`)*

### .aiox-core/data/entity-registry.yaml:5861
```
   5859:         - provider
   5860:         - configuration
>> 5861:       usedBy: []
>> 5862:       dependencies: []
   5863:       externalDeps: []
   5864:       plannedDeps: []
>> 5865:       lifecycle: orphan
   5866:       adaptability:
   5867:         score: 0.5
```
*(bloco/entidade: `aiox-ai-config`)*

### .aiox-core/data/entity-registry.yaml:5883
```
   5881:         - aiox-master
   5882:         - architect
>> 5883:       dependencies: []
   5884:       externalDeps: []
   5885:       plannedDeps: []
```
*(bloco/entidade: `architecture-tmpl`)*

### .aiox-core/data/entity-registry.yaml:5904
```
   5902:       usedBy:
   5903:         - analyst
>> 5904:       dependencies: []
   5905:       externalDeps: []
   5906:       plannedDeps: []
```
*(bloco/entidade: `brainstorming-output-tmpl`)*

### .aiox-core/data/entity-registry.yaml:5926
```
   5924:         - aiox-master
   5925:         - architect
>> 5926:       dependencies: []
   5927:       externalDeps: []
   5928:       plannedDeps: []
```
*(bloco/entidade: `brownfield-architecture-tmpl`)*

### .aiox-core/data/entity-registry.yaml:5948
```
   5946:         - aiox-master
   5947:         - pm
>> 5948:       dependencies: []
   5949:       externalDeps: []
   5950:       plannedDeps: []
```
*(bloco/entidade: `brownfield-prd-tmpl`)*

### .aiox-core/data/entity-registry.yaml:5969
```
   5967:         - tmpl
   5968:         - template
>> 5969:       usedBy: []
   5970:       dependencies:
   5971:         - analyst
```
*(bloco/entidade: `brownfield-risk-report-tmpl`)*

### .aiox-core/data/entity-registry.yaml:5991
```
   5989:       usedBy:
   5990:         - devops
>> 5991:       dependencies: []
   5992:       externalDeps: []
   5993:       plannedDeps: []
```
*(bloco/entidade: `changelog-template`)*

### .aiox-core/data/entity-registry.yaml:6011
```
   6009:         - matrix
   6010:         - template
>> 6011:       usedBy: []
   6012:       dependencies:
   6013:         - pm
```
*(bloco/entidade: `command-rationalization-matrix`)*

### .aiox-core/data/entity-registry.yaml:6035
```
   6033:         - aiox-master
   6034:         - analyst
>> 6035:       dependencies: []
   6036:       externalDeps: []
   6037:       plannedDeps: []
```
*(bloco/entidade: `competitor-analysis-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6057
```
   6055:         - subtask
   6056:         - '{{subtaskid}}'
>> 6057:       usedBy: []
>> 6058:       dependencies: []
   6059:       externalDeps: []
   6060:       plannedDeps: []
>> 6061:       lifecycle: orphan
   6062:       adaptability:
   6063:         score: 0.5
```
*(bloco/entidade: `current-approach-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6077
```
   6075:         - story
   6076:         - tmpl
>> 6077:       usedBy: []
   6078:       dependencies:
   6079:         - ux-design-expert
```
*(bloco/entidade: `design-story-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6108
```
   6106:       usedBy:
   6107:         - ux-design-expert
>> 6108:       dependencies: []
   6109:       externalDeps: []
   6110:       plannedDeps: []
```
*(bloco/entidade: `ds-artifact-analysis`)*

### .aiox-core/data/entity-registry.yaml:6131
```
   6129:         - aiox-master
   6130:         - architect
>> 6131:       dependencies: []
   6132:       externalDeps: []
   6133:       plannedDeps: []
```
*(bloco/entidade: `front-end-architecture-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6154
```
   6152:         - aiox-master
   6153:         - ux-design-expert
>> 6154:       dependencies: []
   6155:       externalDeps: []
   6156:       plannedDeps: []
```
*(bloco/entidade: `front-end-spec-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6176
```
   6174:         - aiox-master
   6175:         - architect
>> 6176:       dependencies: []
   6177:       externalDeps: []
   6178:       plannedDeps: []
```
*(bloco/entidade: `fullstack-architecture-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6198
```
   6196:       usedBy:
   6197:         - devops
>> 6198:       dependencies: []
   6199:       externalDeps: []
   6200:       plannedDeps: []
```
*(bloco/entidade: `github-actions-cd`)*

### .aiox-core/data/entity-registry.yaml:6220
```
   6218:       usedBy:
   6219:         - devops
>> 6220:       dependencies: []
   6221:       externalDeps: []
   6222:       plannedDeps: []
```
*(bloco/entidade: `github-actions-ci`)*

### .aiox-core/data/entity-registry.yaml:6243
```
   6241:       usedBy:
   6242:         - devops
>> 6243:       dependencies: []
   6244:       externalDeps: []
   6245:       plannedDeps: []
```
*(bloco/entidade: `github-pr-template`)*

### .aiox-core/data/entity-registry.yaml:6264
```
   6262:         - configuration
   6263:         - template
>> 6264:       usedBy: []
>> 6265:       dependencies: []
   6266:       externalDeps: []
   6267:       plannedDeps: []
>> 6268:       lifecycle: orphan
   6269:       adaptability:
   6270:         score: 0.5
```
*(bloco/entidade: `gordon-mcp`)*

### .aiox-core/data/entity-registry.yaml:6286
```
   6284:       usedBy:
   6285:         - data-engineer
>> 6286:       dependencies: []
   6287:       externalDeps: []
   6288:       plannedDeps: []
```
*(bloco/entidade: `index-strategy-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6308
```
   6306:         - aiox-master
   6307:         - analyst
>> 6308:       dependencies: []
   6309:       externalDeps: []
   6310:       plannedDeps: []
```
*(bloco/entidade: `market-research-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6329
```
   6327:       usedBy:
   6328:         - data-engineer
>> 6329:       dependencies: []
   6330:       externalDeps: []
   6331:       plannedDeps: []
```
*(bloco/entidade: `migration-plan-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6352
```
   6350:       usedBy:
   6351:         - ux-design-expert
>> 6352:       dependencies: []
   6353:       externalDeps: []
   6354:       plannedDeps: []
```
*(bloco/entidade: `migration-strategy-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6372
```
   6370:         - template
   6371:         - '{agent-id}'
>> 6372:       usedBy: []
>> 6373:       dependencies: []
   6374:       externalDeps: []
   6375:       plannedDeps: []
>> 6376:       lifecycle: orphan
   6377:       adaptability:
   6378:         score: 0.5
```
*(bloco/entidade: `personalized-agent-template`)*

### .aiox-core/data/entity-registry.yaml:6396
```
   6394:         - '{checklist'
   6395:         - title}
>> 6396:       usedBy: []
>> 6397:       dependencies: []
   6398:       externalDeps: []
   6399:       plannedDeps:
```
*(bloco/entidade: `personalized-checklist-template`)*

### .aiox-core/data/entity-registry.yaml:6420
```
   6418:         - '{task'
   6419:         - name}
>> 6420:       usedBy: []
>> 6421:       dependencies: []
   6422:       externalDeps: []
   6423:       plannedDeps: []
>> 6424:       lifecycle: orphan
   6425:       adaptability:
   6426:         score: 0.5
```
*(bloco/entidade: `personalized-task-template-v2`)*

### .aiox-core/data/entity-registry.yaml:6442
```
   6440:         - '{task'
   6441:         - name}
>> 6442:       usedBy: []
>> 6443:       dependencies: []
   6444:       externalDeps: []
   6445:       plannedDeps: []
>> 6446:       lifecycle: orphan
   6447:       adaptability:
   6448:         score: 0.5
```
*(bloco/entidade: `personalized-task-template`)*

### .aiox-core/data/entity-registry.yaml:6465
```
   6463:         - synkra
   6464:         - aiox
>> 6465:       usedBy: []
>> 6466:       dependencies: []
   6467:       externalDeps: []
   6468:       plannedDeps: []
>> 6469:       lifecycle: orphan
   6470:       adaptability:
   6471:         score: 0.5
```
*(bloco/entidade: `personalized-template-file`)*

### .aiox-core/data/entity-registry.yaml:6488
```
   6486:         - aiox
   6487:         - agent
>> 6488:       usedBy: []
>> 6489:       dependencies: []
   6490:       externalDeps: []
   6491:       plannedDeps: []
>> 6492:       lifecycle: orphan
   6493:       adaptability:
   6494:         score: 0.5
```
*(bloco/entidade: `personalized-workflow-template`)*

### .aiox-core/data/entity-registry.yaml:6510
```
   6508:         - aiox-master
   6509:         - pm
>> 6510:       dependencies: []
   6511:       externalDeps: []
   6512:       plannedDeps: []
```
*(bloco/entidade: `prd-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6532
```
   6530:         - aiox-master
   6531:         - analyst
>> 6532:       dependencies: []
   6533:       externalDeps: []
   6534:       plannedDeps: []
```
*(bloco/entidade: `project-brief-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6553
```
   6551:       usedBy:
   6552:         - qa
>> 6553:       dependencies: []
   6554:       externalDeps: []
   6555:       plannedDeps: []
```
*(bloco/entidade: `qa-gate-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6574
```
   6572:         - 'report:'
   6573:         - '{{storyid}}'
>> 6574:       usedBy: []
>> 6575:       dependencies: []
   6576:       externalDeps: []
   6577:       plannedDeps: []
>> 6578:       lifecycle: orphan
   6579:       adaptability:
   6580:         score: 0.5
```
*(bloco/entidade: `qa-report-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6596
```
   6594:       usedBy:
   6595:         - data-engineer
>> 6596:       dependencies: []
   6597:       externalDeps: []
   6598:       plannedDeps: []
```
*(bloco/entidade: `rls-policies-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6617
```
   6615:       usedBy:
   6616:         - data-engineer
>> 6617:       dependencies: []
   6618:       externalDeps: []
   6619:       plannedDeps: []
```
*(bloco/entidade: `schema-design-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6637
```
   6635:         - 'spec:'
   6636:         - '{{story-title}}'
>> 6637:       usedBy: []
>> 6638:       dependencies: []
   6639:       externalDeps: []
   6640:       plannedDeps: []
>> 6641:       lifecycle: orphan
   6642:       adaptability:
   6643:         score: 0.5
```
*(bloco/entidade: `spec-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6660
```
   6658:       usedBy:
   6659:         - ux-design-expert
>> 6660:       dependencies: []
   6661:       externalDeps: []
   6662:       plannedDeps:
```
*(bloco/entidade: `state-persistence-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6713
```
   6711:         - report
   6712:         - template
>> 6713:       usedBy: []
>> 6714:       dependencies: []
   6715:       externalDeps: []
   6716:       plannedDeps: []
>> 6717:       lifecycle: orphan
   6718:       adaptability:
   6719:         score: 0.5
```
*(bloco/entidade: `task-execution-report`)*

### .aiox-core/data/entity-registry.yaml:6735
```
   6733:       usedBy:
   6734:         - aiox-master
>> 6735:       dependencies: []
   6736:       externalDeps: []
   6737:       plannedDeps: []
```
*(bloco/entidade: `task-template`)*

### .aiox-core/data/entity-registry.yaml:6757
```
   6755:       usedBy:
   6756:         - ux-design-expert
>> 6757:       dependencies: []
   6758:       externalDeps: []
   6759:       plannedDeps: []
```
*(bloco/entidade: `tokens-schema-tmpl`)*

### .aiox-core/data/entity-registry.yaml:6779
```
   6777:       usedBy:
   6778:         - aiox-master
>> 6779:       dependencies: []
   6780:       externalDeps: []
   6781:       plannedDeps: []
```
*(bloco/entidade: `workflow-template`)*

### .aiox-core/data/entity-registry.yaml:6800
```
   6798:         - aiox
   6799:         - development
>> 6800:       usedBy: []
   6801:       dependencies:
   6802:         - dev
```
*(bloco/entidade: `antigravity-rules`)*

### .aiox-core/data/entity-registry.yaml:6829
```
   6827:         - aiox
   6828:         - development
>> 6829:       usedBy: []
   6830:       dependencies:
   6831:         - dev
```
*(bloco/entidade: `claude-rules`)*

### .aiox-core/data/entity-registry.yaml:6864
```
   6862:         - (codex
   6863:         - cli)
>> 6864:       usedBy: []
   6865:       dependencies:
   6866:         - architect
```
*(bloco/entidade: `codex-rules`)*

### .aiox-core/data/entity-registry.yaml:6898
```
   6896:         - agent
   6897:         - github
>> 6898:       usedBy: []
>> 6899:       dependencies: []
   6900:       externalDeps: []
   6901:       plannedDeps: []
>> 6902:       lifecycle: orphan
   6903:       adaptability:
   6904:         score: 0.5
```
*(bloco/entidade: `copilot-rules`)*

### .aiox-core/data/entity-registry.yaml:6920
```
   6918:         - aiox
   6919:         - development
>> 6920:       usedBy: []
   6921:       dependencies:
   6922:         - dev
```
*(bloco/entidade: `cursor-rules`)*

### .aiox-core/data/entity-registry.yaml:6948
```
   6946:         - synkra
   6947:         - aiox
>> 6948:       usedBy: []
>> 6949:       dependencies: []
   6950:       externalDeps: []
   6951:       plannedDeps: []
>> 6952:       lifecycle: orphan
   6953:       adaptability:
   6954:         score: 0.5
```
*(bloco/entidade: `gemini-rules`)*

### .aiox-core/data/entity-registry.yaml:6990
```
   6988:         - assignment
   6989:         - resolver
>> 6990:       usedBy: []
>> 6991:       dependencies: []
   6992:       externalDeps: []
   6993:       plannedDeps: []
>> 6994:       lifecycle: orphan
   6995:       adaptability:
   6996:         score: 0.7
```
*(bloco/entidade: `agent-assignment-resolver`)*

### .aiox-core/data/entity-registry.yaml:7035
```
   7033:         - exit
   7034:         - hooks
>> 7035:       usedBy: []
   7036:       dependencies:
   7037:         - context-detector
```
*(bloco/entidade: `agent-exit-hooks`)*

### .aiox-core/data/entity-registry.yaml:7058
```
   7056:         - all
   7057:         - agents
>> 7058:       usedBy: []
>> 7059:       dependencies: []
   7060:       externalDeps: []
   7061:       plannedDeps: []
>> 7062:       lifecycle: orphan
   7063:       adaptability:
   7064:         score: 0.7
```
*(bloco/entidade: `apply-inline-greeting-all-agents`)*

### .aiox-core/data/entity-registry.yaml:7077
```
   7075:         - approval
   7076:         - workflow
>> 7077:       usedBy: []
>> 7078:       dependencies: []
   7079:       externalDeps: []
   7080:       plannedDeps: []
>> 7081:       lifecycle: orphan
   7082:       adaptability:
   7083:         score: 0.7
```
*(bloco/entidade: `approval-workflow`)*

### .aiox-core/data/entity-registry.yaml:7097
```
   7095:         - agent
   7096:         - config
>> 7097:       usedBy: []
>> 7098:       dependencies: []
   7099:       externalDeps: []
   7100:       plannedDeps: []
>> 7101:       lifecycle: orphan
   7102:       adaptability:
   7103:         score: 0.7
```
*(bloco/entidade: `audit-agent-config`)*

### .aiox-core/data/entity-registry.yaml:7120
```
   7118:         - po-backlog-add
   7119:         - qa-backlog-add-followup
>> 7120:       dependencies: []
   7121:       externalDeps: []
   7122:       plannedDeps: []
```
*(bloco/entidade: `backlog-manager`)*

### .aiox-core/data/entity-registry.yaml:7141
```
   7139:         - improve-self
   7140:         - undo-last
>> 7141:       dependencies: []
   7142:       externalDeps: []
   7143:       plannedDeps: []
```
*(bloco/entidade: `backup-manager`)*

### .aiox-core/data/entity-registry.yaml:7162
```
   7160:         - session
   7161:         - context
>> 7162:       usedBy: []
>> 7163:       dependencies: []
   7164:       externalDeps: []
   7165:       plannedDeps: []
>> 7166:       lifecycle: orphan
   7167:       adaptability:
   7168:         score: 0.7
```
*(bloco/entidade: `batch-update-agents-session-context`)*

### .aiox-core/data/entity-registry.yaml:7181
```
   7179:         - branch
   7180:         - manager
>> 7181:       usedBy: []
   7182:       dependencies:
   7183:         - git-wrapper
```
*(bloco/entidade: `branch-manager`)*

### .aiox-core/data/entity-registry.yaml:7202
```
   7200:         - quality
   7201:         - improver
>> 7202:       usedBy: []
>> 7203:       dependencies: []
   7204:       externalDeps: []
   7205:       plannedDeps: []
>> 7206:       lifecycle: orphan
   7207:       adaptability:
   7208:         score: 0.7
```
*(bloco/entidade: `code-quality-improver`)*

### .aiox-core/data/entity-registry.yaml:7222
```
   7220:         - message
   7221:         - generator
>> 7222:       usedBy: []
   7223:       dependencies:
   7224:         - diff-generator
```
*(bloco/entidade: `commit-message-generator`)*

### .aiox-core/data/entity-registry.yaml:7243
```
   7241:         - conflict
   7242:         - resolver
>> 7243:       usedBy: []
   7244:       dependencies:
   7245:         - git-wrapper
```
*(bloco/entidade: `conflict-resolver`)*

### .aiox-core/data/entity-registry.yaml:7265
```
   7263:       usedBy:
   7264:         - decision-recorder
>> 7265:       dependencies: []
   7266:       externalDeps: []
   7267:       plannedDeps: []
```
*(bloco/entidade: `decision-context`)*

### .aiox-core/data/entity-registry.yaml:7292
```
   7290:         - decision-recorder
   7291:         - dev
>> 7292:       dependencies: []
   7293:       externalDeps: []
   7294:       plannedDeps: []
```
*(bloco/entidade: `decision-log-generator`)*

### .aiox-core/data/entity-registry.yaml:7313
```
   7311:       usedBy:
   7312:         - decision-recorder
>> 7313:       dependencies: []
   7314:       externalDeps: []
   7315:       plannedDeps: []
```
*(bloco/entidade: `decision-log-indexer`)*

### .aiox-core/data/entity-registry.yaml:7354
```
   7352:         - dependency
   7353:         - analyzer
>> 7354:       usedBy: []
>> 7355:       dependencies: []
   7356:       externalDeps: []
   7357:       plannedDeps: []
>> 7358:       lifecycle: orphan
   7359:       adaptability:
   7360:         score: 0.7
```
*(bloco/entidade: `dependency-analyzer`)*

### .aiox-core/data/entity-registry.yaml:7374
```
   7372:         - context
   7373:         - loader
>> 7374:       usedBy: []
>> 7375:       dependencies: []
   7376:       externalDeps: []
   7377:       plannedDeps: []
>> 7378:       lifecycle: orphan
   7379:       adaptability:
   7380:         score: 0.7
```
*(bloco/entidade: `dev-context-loader`)*

### .aiox-core/data/entity-registry.yaml:7393
```
   7391:         - diff
   7392:         - generator
>> 7393:       usedBy: []
>> 7394:       dependencies: []
   7395:       externalDeps: []
   7396:       plannedDeps: []
>> 7397:       lifecycle: orphan
   7398:       adaptability:
   7399:         score: 0.7
```
*(bloco/entidade: `diff-generator`)*

### .aiox-core/data/entity-registry.yaml:7412
```
   7410:         - elicitation
   7411:         - engine
>> 7412:       usedBy: []
   7413:       dependencies:
   7414:         - security-checker
```
*(bloco/entidade: `elicitation-engine`)*

### .aiox-core/data/entity-registry.yaml:7436
```
   7434:       usedBy:
   7435:         - elicitation-engine
>> 7436:       dependencies: []
   7437:       externalDeps: []
   7438:       plannedDeps: []
```
*(bloco/entidade: `elicitation-session-manager`)*

### .aiox-core/data/entity-registry.yaml:7454
```
   7452:         - generate
   7453:         - greeting
>> 7454:       usedBy: []
   7455:       dependencies:
   7456:         - activation-runtime
```
*(bloco/entidade: `generate-greeting`)*

### .aiox-core/data/entity-registry.yaml:7476
```
   7474:       usedBy:
   7475:         - improve-self
>> 7476:       dependencies: []
   7477:       externalDeps: []
   7478:       plannedDeps: []
```
*(bloco/entidade: `git-wrapper`)*

### .aiox-core/data/entity-registry.yaml:7527
```
   7525:         - config
   7526:         - cli
>> 7527:       usedBy: []
   7528:       dependencies:
   7529:         - greeting-preference-manager
```
*(bloco/entidade: `greeting-config-cli`)*

### .aiox-core/data/entity-registry.yaml:7552
```
   7550:         - greeting-config-cli
   7551:         - unified-activation-pipeline
>> 7552:       dependencies: []
   7553:       externalDeps: []
   7554:       plannedDeps: []
```
*(bloco/entidade: `greeting-preference-manager`)*

### .aiox-core/data/entity-registry.yaml:7570
```
   7568:         - issue
   7569:         - triage
>> 7570:       usedBy: []
>> 7571:       dependencies: []
   7572:       externalDeps: []
   7573:       plannedDeps: []
>> 7574:       lifecycle: orphan
   7575:       adaptability:
   7576:         score: 0.7
```
*(bloco/entidade: `issue-triage`)*

### .aiox-core/data/entity-registry.yaml:7591
```
   7589:       usedBy:
   7590:         - component-generator
>> 7591:       dependencies: []
   7592:       externalDeps: []
   7593:       plannedDeps:
```
*(bloco/entidade: `manifest-preview`)*

### .aiox-core/data/entity-registry.yaml:7612
```
   7610:       usedBy:
   7611:         - improve-self
>> 7612:       dependencies: []
   7613:       externalDeps: []
   7614:       plannedDeps: []
```
*(bloco/entidade: `metrics-tracker`)*

### .aiox-core/data/entity-registry.yaml:7632
```
   7630:         - to
   7631:         - v2
>> 7632:       usedBy: []
>> 7633:       dependencies: []
   7634:       externalDeps: []
   7635:       plannedDeps: []
>> 7636:       lifecycle: orphan
   7637:       adaptability:
   7638:         score: 0.7
```
*(bloco/entidade: `migrate-task-to-v2`)*

### .aiox-core/data/entity-registry.yaml:7651
```
   7649:         - modification
   7650:         - validator
>> 7651:       usedBy: []
   7652:       dependencies:
   7653:         - yaml-validator
```
*(bloco/entidade: `modification-validator`)*

### .aiox-core/data/entity-registry.yaml:7675
```
   7673:       usedBy:
   7674:         - learn-patterns
>> 7675:       dependencies: []
   7676:       externalDeps: []
   7677:       plannedDeps: []
```
*(bloco/entidade: `pattern-learner`)*

### .aiox-core/data/entity-registry.yaml:7693
```
   7691:         - performance
   7692:         - analyzer
>> 7693:       usedBy: []
>> 7694:       dependencies: []
   7695:       externalDeps: []
   7696:       plannedDeps: []
>> 7697:       lifecycle: orphan
   7698:       adaptability:
   7699:         score: 0.7
```
*(bloco/entidade: `performance-analyzer`)*

### .aiox-core/data/entity-registry.yaml:7713
```
   7711:         - entity
   7712:         - registry
>> 7713:       usedBy: []
   7714:       dependencies:
   7715:         - layer-classifier
```
*(bloco/entidade: `populate-entity-registry`)*

### .aiox-core/data/entity-registry.yaml:7733
```
   7731:         - refactoring
   7732:         - suggester
>> 7733:       usedBy: []
>> 7734:       dependencies: []
   7735:       externalDeps: []
   7736:       plannedDeps: []
>> 7737:       lifecycle: orphan
   7738:       adaptability:
   7739:         score: 0.7
```
*(bloco/entidade: `refactoring-suggester`)*

### .aiox-core/data/entity-registry.yaml:7752
```
   7750:         - rollback
   7751:         - handler
>> 7752:       usedBy: []
   7753:       dependencies:
   7754:         - transaction-manager
```
*(bloco/entidade: `rollback-handler`)*

### .aiox-core/data/entity-registry.yaml:7773
```
   7771:         - security
   7772:         - checker
>> 7773:       usedBy: []
>> 7774:       dependencies: []
   7775:       externalDeps: []
   7776:       plannedDeps: []
>> 7777:       lifecycle: orphan
   7778:       adaptability:
   7779:         score: 0.7
```
*(bloco/entidade: `security-checker`)*

### .aiox-core/data/entity-registry.yaml:7792
```
   7790:         - skill
   7791:         - validator
>> 7792:       usedBy: []
>> 7793:       dependencies: []
   7794:       externalDeps: []
   7795:       plannedDeps: []
>> 7796:       lifecycle: orphan
   7797:       adaptability:
   7798:         score: 0.7
```
*(bloco/entidade: `skill-validator`)*

### .aiox-core/data/entity-registry.yaml:7814
```
   7812:       usedBy:
   7813:         - po-stories-index
>> 7814:       dependencies: []
   7815:       externalDeps: []
   7816:       plannedDeps: []
```
*(bloco/entidade: `story-index-generator`)*

### .aiox-core/data/entity-registry.yaml:7881
```
   7879:         - identifier
   7880:         - resolver
>> 7881:       usedBy: []
>> 7882:       dependencies: []
   7883:       externalDeps: []
   7884:       plannedDeps: []
>> 7885:       lifecycle: orphan
   7886:       adaptability:
   7887:         score: 0.7
```
*(bloco/entidade: `task-identifier-resolver`)*

### .aiox-core/data/entity-registry.yaml:7900
```
   7898:         - template
   7899:         - engine
>> 7900:       usedBy: []
>> 7901:       dependencies: []
   7902:       externalDeps: []
   7903:       plannedDeps: []
>> 7904:       lifecycle: orphan
   7905:       adaptability:
   7906:         score: 0.7
```
*(bloco/entidade: `template-engine`)*

### .aiox-core/data/entity-registry.yaml:7919
```
   7917:         - template
   7918:         - validator
>> 7919:       usedBy: []
   7920:       dependencies:
   7921:         - template-engine
```
*(bloco/entidade: `template-validator`)*

### .aiox-core/data/entity-registry.yaml:7939
```
   7937:         - test
   7938:         - generator
>> 7939:       usedBy: []
>> 7940:       dependencies: []
   7941:       externalDeps: []
   7942:       plannedDeps: []
>> 7943:       lifecycle: orphan
   7944:       adaptability:
   7945:         score: 0.7
```
*(bloco/entidade: `test-generator`)*

### .aiox-core/data/entity-registry.yaml:7959
```
   7957:         - greeting
   7958:         - system
>> 7959:       usedBy: []
   7960:       dependencies:
   7961:         - greeting-builder
```
*(bloco/entidade: `test-greeting-system`)*

### .aiox-core/data/entity-registry.yaml:7979
```
   7977:         - transaction
   7978:         - manager
>> 7979:       usedBy: []
   7980:       dependencies:
   7981:         - component-metadata
```
*(bloco/entidade: `transaction-manager`)*

### .aiox-core/data/entity-registry.yaml:8033
```
   8031:       usedBy:
   8032:         - deprecate-component
>> 8033:       dependencies: []
   8034:       externalDeps: []
   8035:       plannedDeps: []
```
*(bloco/entidade: `usage-tracker`)*

### .aiox-core/data/entity-registry.yaml:8051
```
   8049:         - validate
   8050:         - filenames
>> 8051:       usedBy: []
>> 8052:       dependencies: []
   8053:       externalDeps: []
   8054:       plannedDeps: []
>> 8055:       lifecycle: orphan
   8056:       adaptability:
   8057:         score: 0.7
```
*(bloco/entidade: `validate-filenames`)*

### .aiox-core/data/entity-registry.yaml:8071
```
   8069:         - task
   8070:         - v2
>> 8071:       usedBy: []
>> 8072:       dependencies: []
   8073:       externalDeps: []
   8074:       plannedDeps: []
>> 8075:       lifecycle: orphan
   8076:       adaptability:
   8077:         score: 0.7
```
*(bloco/entidade: `validate-task-v2`)*

### .aiox-core/data/entity-registry.yaml:8091
```
   8089:         - workflow
   8090:         - gaps
>> 8091:       usedBy: []
   8092:       dependencies:
   8093:         - workflow-elicitation
```
*(bloco/entidade: `verify-workflow-gaps`)*

### .aiox-core/data/entity-registry.yaml:8116
```
   8114:         - version
   8115:         - tracker
>> 8116:       usedBy: []
>> 8117:       dependencies: []
   8118:       externalDeps: []
   8119:       plannedDeps: []
>> 8120:       lifecycle: orphan
   8121:       adaptability:
   8122:         score: 0.7
```
*(bloco/entidade: `version-tracker`)*

### .aiox-core/data/entity-registry.yaml:8139
```
   8137:         - unified-activation-pipeline
   8138:         - verify-workflow-gaps
>> 8139:       dependencies: []
   8140:       externalDeps: []
   8141:       plannedDeps: []
```
*(bloco/entidade: `workflow-navigator`)*

### .aiox-core/data/entity-registry.yaml:8162
```
   8160:         - run-workflow-engine
   8161:         - verify-workflow-gaps
>> 8162:       dependencies: []
   8163:       externalDeps: []
   8164:       plannedDeps: []
```
*(bloco/entidade: `workflow-state-manager`)*

### .aiox-core/data/entity-registry.yaml:8186
```
   8184:         - squad-validator
   8185:         - framework-analyzer
>> 8186:       dependencies: []
   8187:       externalDeps: []
   8188:       plannedDeps: []
```
*(bloco/entidade: `workflow-validator`)*

### .aiox-core/data/entity-registry.yaml:8204
```
   8202:         - yaml
   8203:         - validator
>> 8204:       usedBy: []
>> 8205:       dependencies: []
   8206:       externalDeps: []
   8207:       plannedDeps: []
>> 8208:       lifecycle: orphan
   8209:       adaptability:
   8210:         score: 0.7
```
*(bloco/entidade: `yaml-validator`)*

### .aiox-core/data/entity-registry.yaml:8251
```
   8249:       usedBy:
   8250:         - squad-creator-analyze
>> 8251:       dependencies: []
   8252:       externalDeps: []
   8253:       plannedDeps: []
```
*(bloco/entidade: `squad-analyzer`)*

### .aiox-core/data/entity-registry.yaml:8274
```
   8272:         - squad-creator-design
   8273:         - index
>> 8274:       dependencies: []
   8275:       externalDeps: []
   8276:       plannedDeps: []
```
*(bloco/entidade: `squad-designer`)*

### .aiox-core/data/entity-registry.yaml:8317
```
   8315:       usedBy:
   8316:         - squad-creator-extend
>> 8317:       dependencies: []
   8318:       externalDeps: []
   8319:       plannedDeps: []
```
*(bloco/entidade: `squad-extender`)*

### .aiox-core/data/entity-registry.yaml:8341
```
   8339:         - squad-creator-list
   8340:         - index
>> 8341:       dependencies: []
   8342:       externalDeps: []
   8343:       plannedDeps: []
```
*(bloco/entidade: `squad-generator`)*

### .aiox-core/data/entity-registry.yaml:8367
```
   8365:         - squad-downloader
   8366:         - squad-publisher
>> 8367:       dependencies: []
   8368:       externalDeps: []
   8369:       plannedDeps: []
```
*(bloco/entidade: `squad-loader`)*

### .aiox-core/data/entity-registry.yaml:8388
```
   8386:         - squad-creator-migrate
   8387:         - index
>> 8388:       dependencies: []
   8389:       externalDeps: []
   8390:       plannedDeps: []
```
*(bloco/entidade: `squad-migrator`)*

### .aiox-core/data/entity-registry.yaml:8458
```
   8456:         - index
   8457:         - esm
>> 8458:       usedBy: []
   8459:       dependencies:
   8460:         - config-cache
```
*(bloco/entidade: `index.esm`)*

### .aiox-core/data/entity-registry.yaml:8487
```
   8485:       keywords:
   8486:         - index
>> 8487:       usedBy: []
   8488:       dependencies:
   8489:         - config-cache
```
*(bloco/entidade: `index`)*

### .aiox-core/data/entity-registry.yaml:8547
```
   8545:       usedBy:
   8546:         - code-intel-index
>> 8547:       dependencies: []
   8548:       externalDeps: []
   8549:       plannedDeps: []
```
*(bloco/entidade: `code-intel-enricher`)*

### .aiox-core/data/entity-registry.yaml:8565
```
   8563:         - hook
   8564:         - runtime
>> 8565:       usedBy: []
   8566:       dependencies:
   8567:         - registry-provider
```
*(bloco/entidade: `hook-runtime`)*

### .aiox-core/data/entity-registry.yaml:8633
```
   8631:         - config
   8632:         - cache
>> 8633:       usedBy: []
>> 8634:       dependencies: []
   8635:       externalDeps: []
   8636:       plannedDeps: []
>> 8637:       lifecycle: orphan
   8638:       adaptability:
   8639:         score: 0.4
```
*(bloco/entidade: `config-cache`)*

### .aiox-core/data/entity-registry.yaml:8652
```
   8650:         - config
   8651:         - loader
>> 8652:       usedBy: []
   8653:       dependencies:
   8654:         - config-resolver
```
*(bloco/entidade: `config-loader`)*

### .aiox-core/data/entity-registry.yaml:8725
```
   8723:         - env-interpolator
   8724:         - context-manager
>> 8725:       dependencies: []
   8726:       externalDeps: []
   8727:       plannedDeps: []
```
*(bloco/entidade: `merge-utils`)*

### .aiox-core/data/entity-registry.yaml:8743
```
   8741:         - migrate
   8742:         - config
>> 8743:       usedBy: []
>> 8744:       dependencies: []
   8745:       externalDeps: []
   8746:       plannedDeps: []
>> 8747:       lifecycle: orphan
   8748:       adaptability:
   8749:         score: 0.4
```
*(bloco/entidade: `migrate-config`)*

### .aiox-core/data/entity-registry.yaml:8762
```
   8760:         - template
   8761:         - overrides
>> 8762:       usedBy: []
>> 8763:       dependencies: []
   8764:       externalDeps: []
   8765:       plannedDeps: []
>> 8766:       lifecycle: orphan
   8767:       adaptability:
   8768:         score: 0.4
```
*(bloco/entidade: `template-overrides`)*

### .aiox-core/data/entity-registry.yaml:8802
```
   8800:       keywords:
   8801:         - index
>> 8802:       usedBy: []
   8803:       dependencies:
   8804:         - doctor-checks-index
```
*(bloco/entidade: `doctor-index`)*

### .aiox-core/data/entity-registry.yaml:8828
```
   8826:         - index.esm
   8827:         - index
>> 8828:       dependencies: []
   8829:       externalDeps: []
   8830:       plannedDeps: []
```
*(bloco/entidade: `agent-elicitation`)*

### .aiox-core/data/entity-registry.yaml:8875
```
   8873:         - index
   8874:         - elicitation-engine
>> 8875:       dependencies: []
   8876:       externalDeps: []
   8877:       plannedDeps: []
```
*(bloco/entidade: `session-manager`)*

### .aiox-core/data/entity-registry.yaml:8896
```
   8894:         - index.esm
   8895:         - index
>> 8896:       dependencies: []
   8897:       externalDeps: []
   8898:       plannedDeps: []
```
*(bloco/entidade: `task-elicitation`)*

### .aiox-core/data/entity-registry.yaml:8918
```
   8916:         - index.esm
   8917:         - index
>> 8918:       dependencies: []
   8919:       externalDeps: []
   8920:       plannedDeps: []
```
*(bloco/entidade: `workflow-elicitation`)*

### .aiox-core/data/entity-registry.yaml:8965
```
   8963:         - pro-error-registry
   8964:         - serializer
>> 8965:       dependencies: []
   8966:       externalDeps: []
   8967:       plannedDeps: []
```
*(bloco/entidade: `constants`)*

### .aiox-core/data/entity-registry.yaml:9033
```
   9031:         - error
   9032:         - registry
>> 9033:       usedBy: []
   9034:       dependencies:
   9035:         - error-registry
```
*(bloco/entidade: `pro-error-registry`)*

### .aiox-core/data/entity-registry.yaml:9080
```
   9078:         - errors-index
   9079:         - serializer
>> 9080:       dependencies: []
   9081:       externalDeps: []
   9082:       plannedDeps: []
```
*(bloco/entidade: `utils`)*

### .aiox-core/data/entity-registry.yaml:9143
```
   9141:         - dashboard-emitter
   9142:         - events-index
>> 9143:       dependencies: []
   9144:       externalDeps: []
   9145:       plannedDeps: []
```
*(bloco/entidade: `types`)*

### .aiox-core/data/entity-registry.yaml:9238
```
   9236:         - context
   9237:         - injector
>> 9238:       usedBy: []
>> 9239:       dependencies: []
   9240:       externalDeps: []
   9241:       plannedDeps:
```
*(bloco/entidade: `context-injector`)*

### .aiox-core/data/entity-registry.yaml:9262
```
   9260:         - orchestration-index
   9261:         - workflow-orchestrator
>> 9262:       dependencies: []
   9263:       externalDeps: []
   9264:       plannedDeps: []
```
*(bloco/entidade: `parallel-executor`)*

### .aiox-core/data/entity-registry.yaml:9280
```
   9278:         - parallel
   9279:         - monitor
>> 9280:       usedBy: []
>> 9281:       dependencies: []
   9282:       externalDeps: []
   9283:       plannedDeps: []
>> 9284:       lifecycle: orphan
   9285:       adaptability:
   9286:         score: 0.4
```
*(bloco/entidade: `parallel-monitor`)*

### .aiox-core/data/entity-registry.yaml:9302
```
   9300:       usedBy:
   9301:         - wave-executor
>> 9302:       dependencies: []
   9303:       externalDeps: []
   9304:       plannedDeps: []
```
*(bloco/entidade: `rate-limit-manager`)*

### .aiox-core/data/entity-registry.yaml:9320
```
   9318:         - result
   9319:         - aggregator
>> 9320:       usedBy: []
>> 9321:       dependencies: []
   9322:       externalDeps: []
   9323:       plannedDeps: []
>> 9324:       lifecycle: orphan
   9325:       adaptability:
   9326:         score: 0.4
```
*(bloco/entidade: `result-aggregator`)*

### .aiox-core/data/entity-registry.yaml:9342
```
   9340:       usedBy:
   9341:         - active-modules.verify
>> 9342:       dependencies: []
   9343:       externalDeps: []
   9344:       plannedDeps: []
```
*(bloco/entidade: `semantic-merge-engine`)*

### .aiox-core/data/entity-registry.yaml:9360
```
   9358:         - subagent
   9359:         - dispatcher
>> 9360:       usedBy: []
>> 9361:       dependencies: []
   9362:       externalDeps: []
   9363:       plannedDeps:
```
*(bloco/entidade: `subagent-dispatcher`)*

### .aiox-core/data/entity-registry.yaml:9381
```
   9379:         - wave
   9380:         - executor
>> 9381:       usedBy: []
   9382:       dependencies:
   9383:         - rate-limit-manager
```
*(bloco/entidade: `wave-executor`)*

### .aiox-core/data/entity-registry.yaml:9404
```
   9402:       usedBy:
   9403:         - external-executors-index
>> 9404:       dependencies: []
   9405:       externalDeps: []
   9406:       plannedDeps: []
```
*(bloco/entidade: `delegate-cli`)*

### .aiox-core/data/entity-registry.yaml:9470
```
   9468:       keywords:
   9469:         - index
>> 9470:       usedBy: []
   9471:       dependencies:
   9472:         - code-intel-source
```
*(bloco/entidade: `graph-dashboard-index`)*

### .aiox-core/data/entity-registry.yaml:9534
```
   9532:         - github-cli
   9533:         - mcp-integration
>> 9534:       dependencies: []
   9535:       externalDeps: []
   9536:       plannedDeps: []
```

### .aiox-core/data/entity-registry.yaml:9622
```
   9620:         - ideation
   9621:         - engine
>> 9622:       usedBy: []
>> 9623:       dependencies: []
   9624:       externalDeps: []
   9625:       plannedDeps: []
>> 9626:       lifecycle: orphan
   9627:       adaptability:
   9628:         score: 0.4
```
*(bloco/entidade: `ideation-engine`)*

### .aiox-core/data/entity-registry.yaml:9644
```
   9642:         - ids-index
   9643:         - verification-gate
>> 9644:       dependencies: []
   9645:       externalDeps: []
   9646:       plannedDeps: []
```
*(bloco/entidade: `circuit-breaker`)*

### .aiox-core/data/entity-registry.yaml:9689
```
   9687:         - framework-governor
   9688:         - ids-index
>> 9689:       dependencies: []
   9690:       externalDeps: []
   9691:       plannedDeps: []
```
*(bloco/entidade: `incremental-decision-engine`)*

### .aiox-core/data/entity-registry.yaml:9706
```
   9704:       keywords:
   9705:         - index
>> 9706:       usedBy: []
   9707:       dependencies:
   9708:         - registry-loader
```
*(bloco/entidade: `ids-index`)*

### .aiox-core/data/entity-registry.yaml:9739
```
   9737:       usedBy:
   9738:         - populate-entity-registry
>> 9739:       dependencies: []
   9740:       externalDeps: []
   9741:       plannedDeps: []
```
*(bloco/entidade: `layer-classifier`)*

### .aiox-core/data/entity-registry.yaml:9760
```
   9758:         - ids-health
   9759:         - ids-index
>> 9760:       dependencies: []
   9761:       externalDeps: []
   9762:       plannedDeps: []
```
*(bloco/entidade: `registry-healer`)*

### .aiox-core/data/entity-registry.yaml:9785
```
   9783:         - code-intel-source
   9784:         - registry-source
>> 9785:       dependencies: []
   9786:       externalDeps: []
   9787:       plannedDeps: []
```
*(bloco/entidade: `registry-loader`)*

### .aiox-core/data/entity-registry.yaml:9806
```
   9804:         - framework-governor
   9805:         - ids-index
>> 9806:       dependencies: []
   9807:       externalDeps: []
   9808:       plannedDeps: []
```
*(bloco/entidade: `registry-updater`)*

### .aiox-core/data/entity-registry.yaml:9845
```
   9843:         - manifest
   9844:         - generator
>> 9845:       usedBy: []
>> 9846:       dependencies: []
   9847:       externalDeps: []
   9848:       plannedDeps: []
>> 9849:       lifecycle: orphan
   9850:       adaptability:
   9851:         score: 0.4
```
*(bloco/entidade: `manifest-generator`)*

### .aiox-core/data/entity-registry.yaml:9864
```
   9862:         - manifest
   9863:         - validator
>> 9864:       usedBy: []
>> 9865:       dependencies: []
   9866:       externalDeps: []
   9867:       plannedDeps: []
>> 9868:       lifecycle: orphan
   9869:       adaptability:
   9870:         score: 0.4
```
*(bloco/entidade: `manifest-validator`)*

### .aiox-core/data/entity-registry.yaml:9927
```
   9925:       keywords:
   9926:         - index
>> 9927:       usedBy: []
   9928:       dependencies:
   9929:         - os-detector
```
*(bloco/entidade: `mcp-index`)*

### .aiox-core/data/entity-registry.yaml:9954
```
   9952:         - mcp-index
   9953:         - symlink-manager
>> 9954:       dependencies: []
   9955:       externalDeps: []
   9956:       plannedDeps: []
```
*(bloco/entidade: `os-detector`)*

### .aiox-core/data/entity-registry.yaml:10000
```
   9998:         - active-modules.verify
   9999:         - dev
>> 10000:       dependencies: []
   10001:       externalDeps: []
   10002:       plannedDeps: []
```
*(bloco/entidade: `gotchas-memory`)*

### .aiox-core/data/entity-registry.yaml:10021
```
   10019:         - orchestration-index
   10020:         - master-orchestrator
>> 10021:       dependencies: []
   10022:       externalDeps: []
   10023:       plannedDeps: []
```
*(bloco/entidade: `agent-invoker`)*

### .aiox-core/data/entity-registry.yaml:10077
```
   10075:         - bob-orchestrator
   10076:         - orchestration-index
>> 10077:       dependencies: []
   10078:       externalDeps: []
   10079:       plannedDeps: []
```
*(bloco/entidade: `bob-status-writer`)*

### .aiox-core/data/entity-registry.yaml:10122
```
   10120:         - orchestration-index
   10121:         - workflow-orchestrator
>> 10122:       dependencies: []
   10123:       externalDeps: []
   10124:       plannedDeps: []
```
*(bloco/entidade: `checklist-runner`)*

### .aiox-core/data/entity-registry.yaml:10164
```
   10162:         - orchestration-index
   10163:         - workflow-orchestrator
>> 10164:       dependencies: []
   10165:       externalDeps: []
   10166:       plannedDeps: []
```
*(bloco/entidade: `condition-evaluator`)*

### .aiox-core/data/entity-registry.yaml:10253
```
   10251:       usedBy:
   10252:         - orchestration-index
>> 10253:       dependencies: []
   10254:       externalDeps: []
   10255:       plannedDeps: []
```
*(bloco/entidade: `epic-context-accumulator`)*

### .aiox-core/data/entity-registry.yaml:10275
```
   10273:         - orchestration-index
   10274:         - workflow-orchestrator
>> 10275:       dependencies: []
   10276:       externalDeps: []
   10277:       plannedDeps: []
```
*(bloco/entidade: `execution-profile-resolver`)*

### .aiox-core/data/entity-registry.yaml:10298
```
   10296:         - orchestration-index
   10297:         - workflow-executor
>> 10298:       dependencies: []
   10299:       externalDeps: []
   10300:       plannedDeps: []
```
*(bloco/entidade: `executor-assignment`)*

### .aiox-core/data/entity-registry.yaml:10319
```
   10317:       usedBy:
   10318:         - orchestration-index
>> 10319:       dependencies: []
   10320:       externalDeps: []
   10321:       plannedDeps: []
```
*(bloco/entidade: `fast-path-gate`)*

### .aiox-core/data/entity-registry.yaml:10340
```
   10338:         - orchestration-index
   10339:         - master-orchestrator
>> 10340:       dependencies: []
   10341:       externalDeps: []
   10342:       plannedDeps: []
```
*(bloco/entidade: `gate-evaluator`)*

### .aiox-core/data/entity-registry.yaml:10359
```
   10357:         - model
   10358:         - selector
>> 10359:       usedBy: []
   10360:       dependencies:
   10361:         - task-complexity-classifier
```
*(bloco/entidade: `gemini-model-selector`)*

### .aiox-core/data/entity-registry.yaml:10403
```
   10401:       keywords:
   10402:         - index
>> 10403:       usedBy: []
   10404:       dependencies:
   10405:         - workflow-orchestrator
```
*(bloco/entidade: `orchestration-index`)*

### .aiox-core/data/entity-registry.yaml:10456
```
   10454:         - data-lifecycle-manager
   10455:         - orchestration-index
>> 10456:       dependencies: []
   10457:       externalDeps: []
   10458:       plannedDeps: []
```
*(bloco/entidade: `lock-manager`)*

### .aiox-core/data/entity-registry.yaml:10504
```
   10502:         - bob-orchestrator
   10503:         - orchestration-index
>> 10504:       dependencies: []
   10505:       externalDeps: []
   10506:       plannedDeps: []
```
*(bloco/entidade: `message-formatter`)*

### .aiox-core/data/entity-registry.yaml:10522
```
   10520:         - parallel
   10521:         - executor
>> 10522:       usedBy: []
>> 10523:       dependencies: []
   10524:       externalDeps: []
   10525:       plannedDeps: []
>> 10526:       lifecycle: orphan
   10527:       adaptability:
   10528:         score: 0.4
```
*(bloco/entidade: `orchestration-parallel-executor`)*

### .aiox-core/data/entity-registry.yaml:10575
```
   10573:         - orchestration-index
   10574:         - workflow-executor
>> 10575:       dependencies: []
   10576:       externalDeps: []
   10577:       plannedDeps: []
```
*(bloco/entidade: `session-state`)*

### .aiox-core/data/entity-registry.yaml:10596
```
   10594:         - orchestration-index
   10595:         - workflow-orchestrator
>> 10596:       dependencies: []
   10597:       externalDeps: []
   10598:       plannedDeps: []
```
*(bloco/entidade: `skill-dispatcher`)*

### .aiox-core/data/entity-registry.yaml:10618
```
   10616:         - orchestration-index
   10617:         - workflow-orchestrator
>> 10618:       dependencies: []
   10619:       externalDeps: []
   10620:       plannedDeps: []
```
*(bloco/entidade: `subagent-prompt-builder`)*

### .aiox-core/data/entity-registry.yaml:10642
```
   10640:         - greenfield-handler
   10641:         - orchestration-index
>> 10642:       dependencies: []
   10643:       externalDeps: []
   10644:       plannedDeps: []
```
*(bloco/entidade: `surface-checker`)*

### .aiox-core/data/entity-registry.yaml:10663
```
   10661:       usedBy:
   10662:         - gemini-model-selector
>> 10663:       dependencies: []
   10664:       externalDeps: []
   10665:       plannedDeps: []
```
*(bloco/entidade: `task-complexity-classifier`)*

### .aiox-core/data/entity-registry.yaml:10686
```
   10684:         - master-orchestrator
   10685:         - workflow-orchestrator
>> 10686:       dependencies: []
   10687:       externalDeps: []
   10688:       plannedDeps: []
```
*(bloco/entidade: `tech-stack-detector`)*

### .aiox-core/data/entity-registry.yaml:10708
```
   10706:         - orchestration-index
   10707:         - workflow-executor
>> 10708:       dependencies: []
   10709:       externalDeps: []
   10710:       plannedDeps: []
```
*(bloco/entidade: `terminal-spawner`)*

### .aiox-core/data/entity-registry.yaml:10830
```
   10828:         - operation-guard
   10829:         - permission-mode.test
>> 10830:       dependencies: []
   10831:       externalDeps: []
   10832:       plannedDeps: []
```
*(bloco/entidade: `permission-mode`)*

### .aiox-core/data/entity-registry.yaml:10848
```
   10846:         - pro
   10847:         - updater
>> 10848:       usedBy: []
>> 10849:       dependencies: []
   10850:       externalDeps: []
   10851:       plannedDeps: []
>> 10852:       lifecycle: orphan
   10853:       adaptability:
   10854:         score: 0.4
```
*(bloco/entidade: `pro-updater`)*

### .aiox-core/data/entity-registry.yaml:10871
```
   10869:         - layer2-pr-automation
   10870:         - layer3-human-review
>> 10871:       dependencies: []
   10872:       externalDeps: []
   10873:       plannedDeps: []
```
*(bloco/entidade: `base-layer`)*

### .aiox-core/data/entity-registry.yaml:10891
```
   10889:       usedBy:
   10890:         - layer3-human-review
>> 10891:       dependencies: []
   10892:       externalDeps: []
   10893:       plannedDeps: []
```
*(bloco/entidade: `checklist-generator`)*

### .aiox-core/data/entity-registry.yaml:10912
```
   10910:       usedBy:
   10911:         - human-review-orchestrator
>> 10912:       dependencies: []
   10913:       externalDeps: []
   10914:       plannedDeps: []
```
*(bloco/entidade: `focus-area-recommender`)*

### .aiox-core/data/entity-registry.yaml:11022
```
   11020:         - human-review-orchestrator
   11021:         - quality-gate-manager
>> 11022:       dependencies: []
   11023:       externalDeps: []
   11024:       plannedDeps: []
```
*(bloco/entidade: `notification-manager`)*

### .aiox-core/data/entity-registry.yaml:11041
```
   11039:         - gate
   11040:         - manager
>> 11041:       usedBy: []
   11042:       dependencies:
   11043:         - layer1-precommit
```
*(bloco/entidade: `quality-gate-manager`)*

### .aiox-core/data/entity-registry.yaml:11065
```
   11063:         - build
   11064:         - registry
>> 11065:       usedBy: []
>> 11066:       dependencies: []
   11067:       externalDeps: []
   11068:       plannedDeps: []
>> 11069:       lifecycle: orphan
   11070:       adaptability:
   11071:         score: 0.4
```
*(bloco/entidade: `build-registry`)*

### .aiox-core/data/entity-registry.yaml:11084
```
   11082:         - registry
   11083:         - loader
>> 11084:       usedBy: []
>> 11085:       dependencies: []
   11086:       externalDeps: []
   11087:       plannedDeps: []
>> 11088:       lifecycle: orphan
   11089:       adaptability:
   11090:         score: 0.4
```
*(bloco/entidade: `registry-registry-loader`)*

### .aiox-core/data/entity-registry.yaml:11103
```
   11101:         - validate
   11102:         - registry
>> 11103:       usedBy: []
>> 11104:       dependencies: []
   11105:       externalDeps: []
   11106:       plannedDeps: []
>> 11107:       lifecycle: orphan
   11108:       adaptability:
   11109:         score: 0.4
```
*(bloco/entidade: `validate-registry`)*

### .aiox-core/data/entity-registry.yaml:11124
```
   11122:       usedBy:
   11123:         - resilience-index
>> 11124:       dependencies: []
   11125:       externalDeps: []
   11126:       plannedDeps: []
```
*(bloco/entidade: `agent-immortality`)*

### .aiox-core/data/entity-registry.yaml:11211
```
   11209:       keywords:
   11210:         - engine
>> 11211:       usedBy: []
   11212:       dependencies:
   11213:         - errors-index
```
*(bloco/entidade: `synapse-engine`)*

### .aiox-core/data/entity-registry.yaml:11281
```
   11279:         - ui-index
   11280:         - observability-panel
>> 11281:       dependencies: []
   11282:       externalDeps: []
   11283:       plannedDeps: []
```
*(bloco/entidade: `panel-renderer`)*

### .aiox-core/data/entity-registry.yaml:11299
```
   11297:         - output
   11298:         - formatter
>> 11299:       usedBy: []
>> 11300:       dependencies: []
   11301:       externalDeps: []
   11302:       plannedDeps: []
>> 11303:       lifecycle: orphan
   11304:       adaptability:
   11305:         score: 0.4
```
*(bloco/entidade: `output-formatter`)*

### .aiox-core/data/entity-registry.yaml:11318
```
   11316:         - security
   11317:         - utils
>> 11318:       usedBy: []
>> 11319:       dependencies: []
   11320:       externalDeps: []
   11321:       plannedDeps: []
>> 11322:       lifecycle: orphan
   11323:       adaptability:
   11324:         score: 0.4
```
*(bloco/entidade: `security-utils`)*

### .aiox-core/data/entity-registry.yaml:11337
```
   11335:         - yaml
   11336:         - validator
>> 11337:       usedBy: []
>> 11338:       dependencies: []
   11339:       externalDeps: []
   11340:       plannedDeps: []
>> 11341:       lifecycle: orphan
   11342:       adaptability:
   11343:         score: 0.4
```
*(bloco/entidade: `yaml-validator`)*

### .aiox-core/data/entity-registry.yaml:11356
```
   11354:         - creation
   11355:         - helper
>> 11356:       usedBy: []
   11357:       dependencies:
   11358:         - index
```
*(bloco/entidade: `creation-helper`)*

### .aiox-core/data/entity-registry.yaml:11444
```
   11442:         - qa
   11443:         - helper
>> 11444:       usedBy: []
   11445:       dependencies:
   11446:         - index
```
*(bloco/entidade: `qa-helper`)*

### .aiox-core/data/entity-registry.yaml:11464
```
   11462:         - story
   11463:         - helper
>> 11464:       usedBy: []
   11465:       dependencies:
   11466:         - index
```
*(bloco/entidade: `story-helper`)*

### .aiox-core/data/entity-registry.yaml:11511
```
   11509:         - code-graph-provider
   11510:         - registry-provider
>> 11511:       dependencies: []
   11512:       externalDeps: []
   11513:       plannedDeps: []
```
*(bloco/entidade: `provider-interface`)*

### .aiox-core/data/entity-registry.yaml:11555
```
   11553:         - fix-handler
   11554:         - doctor-checks-index
>> 11555:       dependencies: []
   11556:       externalDeps: []
   11557:       plannedDeps: []
```
*(bloco/entidade: `agent-memory`)*

### .aiox-core/data/entity-registry.yaml:11575
```
   11573:       usedBy:
   11574:         - doctor-checks-index
>> 11575:       dependencies: []
   11576:       externalDeps: []
   11577:       plannedDeps: []
```
*(bloco/entidade: `claude-md`)*

### .aiox-core/data/entity-registry.yaml:11603
```
   11601:         - plan-create-implementation
   11602:         - doctor-checks-index
>> 11603:       dependencies: []
   11604:       externalDeps: []
   11605:       plannedDeps: []
```
*(bloco/entidade: `code-intel`)*

### .aiox-core/data/entity-registry.yaml:11623
```
   11621:       usedBy:
   11622:         - doctor-checks-index
>> 11623:       dependencies: []
   11624:       externalDeps: []
   11625:       plannedDeps: []
```
*(bloco/entidade: `commands-count`)*

### .aiox-core/data/entity-registry.yaml:11643
```
   11641:       usedBy:
   11642:         - doctor-checks-index
>> 11643:       dependencies: []
   11644:       externalDeps: []
   11645:       plannedDeps: []
```
*(bloco/entidade: `core-config`)*

### .aiox-core/data/entity-registry.yaml:11661
```
   11659:         - entity
   11660:         - registry
>> 11661:       usedBy: []
>> 11662:       dependencies: []
   11663:       externalDeps: []
   11664:       plannedDeps: []
>> 11665:       lifecycle: orphan
   11666:       adaptability:
   11667:         score: 0.4
```
*(bloco/entidade: `entity-registry`)*

### .aiox-core/data/entity-registry.yaml:11682
```
   11680:       usedBy:
   11681:         - doctor-checks-index
>> 11682:       dependencies: []
   11683:       externalDeps: []
   11684:       plannedDeps: []
```
*(bloco/entidade: `git-hooks`)*

### .aiox-core/data/entity-registry.yaml:11702
```
   11700:       usedBy:
   11701:         - doctor-checks-index
>> 11702:       dependencies: []
   11703:       externalDeps: []
   11704:       plannedDeps: []
```
*(bloco/entidade: `graph-dashboard`)*

### .aiox-core/data/entity-registry.yaml:11723
```
   11721:       usedBy:
   11722:         - doctor-checks-index
>> 11723:       dependencies: []
   11724:       externalDeps: []
   11725:       plannedDeps: []
```
*(bloco/entidade: `hooks-claude-count`)*

### .aiox-core/data/entity-registry.yaml:11743
```
   11741:       usedBy:
   11742:         - doctor-checks-index
>> 11743:       dependencies: []
   11744:       externalDeps: []
   11745:       plannedDeps: []
```
*(bloco/entidade: `ide-sync`)*

### .aiox-core/data/entity-registry.yaml:11798
```
   11796:         - doctor-checks-index
   11797:         - health-check-checks-project-index
>> 11798:       dependencies: []
   11799:       externalDeps: []
   11800:       plannedDeps: []
```
*(bloco/entidade: `node-version`)*

### .aiox-core/data/entity-registry.yaml:11818
```
   11816:       usedBy:
   11817:         - doctor-checks-index
>> 11818:       dependencies: []
   11819:       externalDeps: []
   11820:       plannedDeps: []
```
*(bloco/entidade: `npm-packages`)*

### .aiox-core/data/entity-registry.yaml:11839
```
   11837:         - fix-handler
   11838:         - doctor-checks-index
>> 11839:       dependencies: []
   11840:       externalDeps: []
   11841:       plannedDeps: []
```
*(bloco/entidade: `rules-files`)*

### .aiox-core/data/entity-registry.yaml:11859
```
   11857:       usedBy:
   11858:         - doctor-checks-index
>> 11859:       dependencies: []
   11860:       externalDeps: []
   11861:       plannedDeps: []
```
*(bloco/entidade: `settings-json`)*

### .aiox-core/data/entity-registry.yaml:11879
```
   11877:       usedBy:
   11878:         - doctor-checks-index
>> 11879:       dependencies: []
   11880:       externalDeps: []
   11881:       plannedDeps: []
```
*(bloco/entidade: `skills-count`)*

### .aiox-core/data/entity-registry.yaml:11899
```
   11897:         - doctor-index
   11898:         - health-check-reporters-index
>> 11899:       dependencies: []
   11900:       externalDeps: []
   11901:       plannedDeps: []
```
*(bloco/entidade: `json`)*

### .aiox-core/data/entity-registry.yaml:11918
```
   11916:       usedBy:
   11917:         - doctor-index
>> 11918:       dependencies: []
   11919:       externalDeps: []
   11920:       plannedDeps: []
```
*(bloco/entidade: `text`)*

### .aiox-core/data/entity-registry.yaml:12004
```
   12002:       usedBy:
   12003:         - cli
>> 12004:       dependencies: []
   12005:       externalDeps: []
   12006:       plannedDeps: []
```
*(bloco/entidade: `dot-formatter`)*

### .aiox-core/data/entity-registry.yaml:12024
```
   12022:       usedBy:
   12023:         - cli
>> 12024:       dependencies: []
   12025:       externalDeps: []
   12026:       plannedDeps: []
```
*(bloco/entidade: `html-formatter`)*

### .aiox-core/data/entity-registry.yaml:12044
```
   12042:       usedBy:
   12043:         - cli
>> 12044:       dependencies: []
   12045:       externalDeps: []
   12046:       plannedDeps: []
```
*(bloco/entidade: `json-formatter`)*

### .aiox-core/data/entity-registry.yaml:12064
```
   12062:       usedBy:
   12063:         - cli
>> 12064:       dependencies: []
   12065:       externalDeps: []
   12066:       plannedDeps: []
```
*(bloco/entidade: `mermaid-formatter`)*

### .aiox-core/data/entity-registry.yaml:12084
```
   12082:       usedBy:
   12083:         - cli
>> 12084:       dependencies: []
   12085:       externalDeps: []
   12086:       plannedDeps: []
```
*(bloco/entidade: `stats-renderer`)*

### .aiox-core/data/entity-registry.yaml:12104
```
   12102:       usedBy:
   12103:         - cli
>> 12104:       dependencies: []
   12105:       externalDeps: []
   12106:       plannedDeps: []
```
*(bloco/entidade: `status-renderer`)*

### .aiox-core/data/entity-registry.yaml:12125
```
   12123:         - cli
   12124:         - graph-dashboard-index
>> 12125:       dependencies: []
   12126:       externalDeps: []
   12127:       plannedDeps: []
```
*(bloco/entidade: `tree-renderer`)*

### .aiox-core/data/entity-registry.yaml:12142
```
   12140:       keywords:
   12141:         - index
>> 12142:       usedBy: []
   12143:       dependencies:
   12144:         - health-check-checks-project-index
```
*(bloco/entidade: `health-check-checks-index`)*

### .aiox-core/data/entity-registry.yaml:12166
```
   12164:         - backup
   12165:         - manager
>> 12166:       usedBy: []
>> 12167:       dependencies: []
   12168:       externalDeps: []
   12169:       plannedDeps: []
```
*(bloco/entidade: `backup-manager`)*

### .aiox-core/data/entity-registry.yaml:12247
```
   12245:       keywords:
   12246:         - json
>> 12247:       usedBy: []
   12248:       dependencies:
   12249:         - base-check
```
*(bloco/entidade: `health-check-reporters-json`)*

### .aiox-core/data/entity-registry.yaml:12290
```
   12288:       usedBy:
   12289:         - ids-index
>> 12290:       dependencies: []
   12291:       externalDeps: []
   12292:       plannedDeps: []
```
*(bloco/entidade: `g1-epic-creation`)*

### .aiox-core/data/entity-registry.yaml:12311
```
   12309:       usedBy:
   12310:         - ids-index
>> 12311:       dependencies: []
   12312:       externalDeps: []
   12313:       plannedDeps: []
```
*(bloco/entidade: `g2-story-creation`)*

### .aiox-core/data/entity-registry.yaml:12332
```
   12330:       usedBy:
   12331:         - ids-index
>> 12332:       dependencies: []
   12333:       externalDeps: []
   12334:       plannedDeps: []
```
*(bloco/entidade: `g3-story-validation`)*

### .aiox-core/data/entity-registry.yaml:12353
```
   12351:       usedBy:
   12352:         - ids-index
>> 12353:       dependencies: []
   12354:       externalDeps: []
   12355:       plannedDeps: []
```
*(bloco/entidade: `g4-dev-context`)*

### .aiox-core/data/entity-registry.yaml:12374
```
   12372:       usedBy:
   12373:         - ids-index
>> 12374:       dependencies: []
   12375:       externalDeps: []
   12376:       plannedDeps: []
```
*(bloco/entidade: `g5-semantic-handshake`)*

### .aiox-core/data/entity-registry.yaml:12393
```
   12391:         - modules
   12392:         - verify
>> 12393:       usedBy: []
   12394:       dependencies:
   12395:         - gotchas-memory
```
*(bloco/entidade: `active-modules.verify`)*

### .aiox-core/data/entity-registry.yaml:12512
```
   12510:         - epic-6-executor
   12511:         - orchestration-executors-index
>> 12512:       dependencies: []
   12513:       externalDeps: []
   12514:       plannedDeps: []
```
*(bloco/entidade: `epic-executor`)*

### .aiox-core/data/entity-registry.yaml:12555
```
   12553:         - mode
   12554:         - test
>> 12555:       usedBy: []
   12556:       dependencies:
   12557:         - permission-mode
```
*(bloco/entidade: `permission-mode.test`)*

### .aiox-core/data/entity-registry.yaml:12578
```
   12576:       usedBy:
   12577:         - synapse-engine
>> 12578:       dependencies: []
   12579:       externalDeps: []
   12580:       plannedDeps: []
```
*(bloco/entidade: `context-builder`)*

### .aiox-core/data/entity-registry.yaml:12599
```
   12597:         - synapse-engine
   12598:         - pipeline-collector
>> 12599:       dependencies: []
   12600:       externalDeps: []
   12601:       plannedDeps: []
```
*(bloco/entidade: `context-tracker`)*

### .aiox-core/data/entity-registry.yaml:12618
```
   12616:         - context
   12617:         - manager
>> 12618:       usedBy: []
   12619:       dependencies:
   12620:         - tokens
```
*(bloco/entidade: `hierarchical-context-manager`)*

### .aiox-core/data/entity-registry.yaml:12637
```
   12635:       keywords:
   12636:         - index
>> 12637:       usedBy: []
>> 12638:       dependencies: []
   12639:       externalDeps: []
   12640:       plannedDeps: []
>> 12641:       lifecycle: orphan
   12642:       adaptability:
   12643:         score: 0.4
```
*(bloco/entidade: `synapse-context-index`)*

### .aiox-core/data/entity-registry.yaml:12657
```
   12655:         - handshake
   12656:         - engine
>> 12657:       usedBy: []
>> 12658:       dependencies: []
   12659:       externalDeps: []
   12660:       plannedDeps: []
>> 12661:       lifecycle: orphan
   12662:       adaptability:
   12663:         score: 0.4
```
*(bloco/entidade: `semantic-handshake-engine`)*

### .aiox-core/data/entity-registry.yaml:12678
```
   12676:       usedBy:
   12677:         - synapse-diagnostics
>> 12678:       dependencies: []
   12679:       externalDeps: []
   12680:       plannedDeps: []
```
*(bloco/entidade: `report-formatter`)*

### .aiox-core/data/entity-registry.yaml:12696
```
   12694:         - synapse
   12695:         - diagnostics
>> 12696:       usedBy: []
   12697:       dependencies:
   12698:         - hook-collector
```
*(bloco/entidade: `synapse-diagnostics`)*

### .aiox-core/data/entity-registry.yaml:12732
```
   12730:         - l7-star-command
   12731:         - manifest-collector
>> 12732:       dependencies: []
   12733:       externalDeps: []
   12734:       plannedDeps: []
```
*(bloco/entidade: `domain-loader`)*

### .aiox-core/data/entity-registry.yaml:12750
```
   12748:         - l0
   12749:         - constitution
>> 12750:       usedBy: []
   12751:       dependencies:
   12752:         - domain-loader
```
*(bloco/entidade: `l0-constitution`)*

### .aiox-core/data/entity-registry.yaml:12771
```
   12769:         - l1
   12770:         - global
>> 12771:       usedBy: []
   12772:       dependencies:
   12773:         - domain-loader
```
*(bloco/entidade: `l1-global`)*

### .aiox-core/data/entity-registry.yaml:12792
```
   12790:         - l2
   12791:         - agent
>> 12792:       usedBy: []
   12793:       dependencies:
   12794:         - domain-loader
```
*(bloco/entidade: `l2-agent`)*

### .aiox-core/data/entity-registry.yaml:12813
```
   12811:         - l3
   12812:         - workflow
>> 12813:       usedBy: []
   12814:       dependencies:
   12815:         - domain-loader
```
*(bloco/entidade: `l3-workflow`)*

### .aiox-core/data/entity-registry.yaml:12834
```
   12832:         - l4
   12833:         - task
>> 12834:       usedBy: []
   12835:       dependencies:
   12836:         - layer-processor
```
*(bloco/entidade: `l4-task`)*

### .aiox-core/data/entity-registry.yaml:12854
```
   12852:         - l5
   12853:         - squad
>> 12854:       usedBy: []
   12855:       dependencies:
   12856:         - domain-loader
```
*(bloco/entidade: `l5-squad`)*

### .aiox-core/data/entity-registry.yaml:12875
```
   12873:         - l6
   12874:         - keyword
>> 12875:       usedBy: []
   12876:       dependencies:
   12877:         - domain-loader
```
*(bloco/entidade: `l6-keyword`)*

### .aiox-core/data/entity-registry.yaml:12897
```
   12895:         - star
   12896:         - command
>> 12897:       usedBy: []
   12898:       dependencies:
   12899:         - domain-loader
```
*(bloco/entidade: `l7-star-command`)*

### .aiox-core/data/entity-registry.yaml:12927
```
   12925:         - l6-keyword
   12926:         - l7-star-command
>> 12927:       dependencies: []
   12928:       externalDeps: []
   12929:       plannedDeps: []
```
*(bloco/entidade: `layer-processor`)*

### .aiox-core/data/entity-registry.yaml:13010
```
   13008:         - hook
   13009:         - runtime
>> 13010:       usedBy: []
>> 13011:       dependencies: []
   13012:       externalDeps: []
   13013:       plannedDeps: []
>> 13014:       lifecycle: orphan
   13015:       adaptability:
   13016:         score: 0.4
```
*(bloco/entidade: `synapse-runtime-hook-runtime`)*

### .aiox-core/data/entity-registry.yaml:13029
```
   13027:         - generate
   13028:         - constitution
>> 13029:       usedBy: []
>> 13030:       dependencies: []
   13031:       externalDeps: []
   13032:       plannedDeps: []
>> 13033:       lifecycle: orphan
   13034:       adaptability:
   13035:         score: 0.4
```
*(bloco/entidade: `generate-constitution`)*

### .aiox-core/data/entity-registry.yaml:13048
```
   13046:         - session
   13047:         - manager
>> 13048:       usedBy: []
   13049:       dependencies:
   13050:         - atomic-write
```
*(bloco/entidade: `synapse-session-session-manager`)*

### .aiox-core/data/entity-registry.yaml:13072
```
   13070:         - context-detector
   13071:         - synapse-session-session-manager
>> 13072:       dependencies: []
   13073:       externalDeps: []
   13074:       plannedDeps: []
```
*(bloco/entidade: `atomic-write`)*

### .aiox-core/data/entity-registry.yaml:13089
```
   13087:       keywords:
   13088:         - paths
>> 13089:       usedBy: []
>> 13090:       dependencies: []
   13091:       externalDeps: []
   13092:       plannedDeps: []
>> 13093:       lifecycle: orphan
   13094:       adaptability:
   13095:         score: 0.4
```
*(bloco/entidade: `paths`)*

### .aiox-core/data/entity-registry.yaml:13112
```
   13110:         - synapse-memory-provider
   13111:         - formatter
>> 13112:       dependencies: []
   13113:       externalDeps: []
   13114:       plannedDeps: []
```
*(bloco/entidade: `tokens`)*

### .aiox-core/data/entity-registry.yaml:13566
```
   13564:         - node
   13565:         - version
>> 13566:       usedBy: []
   13567:       dependencies:
   13568:         - base-check
```
*(bloco/entidade: `health-check-checks-project-node-version`)*

### .aiox-core/data/entity-registry.yaml:13864
```
   13862:         - claude
   13863:         - code
>> 13864:       usedBy: []
   13865:       dependencies:
   13866:         - base-check
```
*(bloco/entidade: `claude-code`)*

### .aiox-core/data/entity-registry.yaml:13905
```
   13903:         - github
   13904:         - cli
>> 13905:       usedBy: []
   13906:       dependencies:
   13907:         - base-check
```
*(bloco/entidade: `github-cli`)*

### .aiox-core/data/entity-registry.yaml:13971
```
   13969:         - consistency
   13970:         - collector
>> 13971:       usedBy: []
   13972:       dependencies:
   13973:         - safe-read-json
```
*(bloco/entidade: `consistency-collector`)*

### .aiox-core/data/entity-registry.yaml:13993
```
   13991:       usedBy:
   13992:         - synapse-diagnostics
>> 13993:       dependencies: []
   13994:       externalDeps: []
   13995:       plannedDeps: []
```
*(bloco/entidade: `hook-collector`)*

### .aiox-core/data/entity-registry.yaml:14032
```
   14030:         - output
   14031:         - analyzer
>> 14032:       usedBy: []
   14033:       dependencies:
   14034:         - safe-read-json
```
*(bloco/entidade: `output-analyzer`)*

### .aiox-core/data/entity-registry.yaml:14073
```
   14071:         - quality
   14072:         - collector
>> 14073:       usedBy: []
   14074:       dependencies:
   14075:         - safe-read-json
```
*(bloco/entidade: `quality-collector`)*

### .aiox-core/data/entity-registry.yaml:14093
```
   14091:         - relevance
   14092:         - matrix
>> 14093:       usedBy: []
   14094:       dependencies:
   14095:         - safe-read-json
```
*(bloco/entidade: `relevance-matrix`)*

### .aiox-core/data/entity-registry.yaml:14120
```
   14118:         - relevance-matrix
   14119:         - timing-collector
>> 14120:       dependencies: []
   14121:       externalDeps: []
   14122:       plannedDeps: []
```
*(bloco/entidade: `safe-read-json`)*

### .aiox-core/data/entity-registry.yaml:14140
```
   14138:       usedBy:
   14139:         - synapse-diagnostics
>> 14140:       dependencies: []
   14141:       externalDeps: []
   14142:       plannedDeps: []
```
*(bloco/entidade: `session-collector`)*

### .aiox-core/data/entity-registry.yaml:14158
```
   14156:         - timing
   14157:         - collector
>> 14158:       usedBy: []
   14159:       dependencies:
   14160:         - safe-read-json
```
*(bloco/entidade: `timing-collector`)*

### .aiox-core/data/entity-registry.yaml:14180
```
   14178:       usedBy:
   14179:         - synapse-diagnostics
>> 14180:       dependencies: []
   14181:       externalDeps: []
   14182:       plannedDeps: []
```
*(bloco/entidade: `uap-collector`)*

### .aiox-core/data/entity-registry.yaml:14931
```
   14929:         - creator
   14930:         - squad-creator
>> 14931:       usedBy: []
   14932:       dependencies:
   14933:         - squad-creator-design
```
*(bloco/entidade: `squad-creator`)*

### .aiox-core/data/entity-registry.yaml:15042
```
   15040:         - agent
   15041:         - (atlas)
>> 15042:       usedBy: []
>> 15043:       dependencies: []
   15044:       externalDeps: []
   15045:       plannedDeps: []
>> 15046:       lifecycle: orphan
   15047:       adaptability:
   15048:         score: 0.3
```
*(bloco/entidade: `MEMORY`)*

### .aiox-core/data/entity-registry.yaml:15063
```
   15061:         - agent
   15062:         - (aria)
>> 15063:       usedBy: []
>> 15064:       dependencies: []
   15065:       externalDeps: []
   15066:       plannedDeps: []
>> 15067:       lifecycle: orphan
   15068:       adaptability:
   15069:         score: 0.3
```
*(bloco/entidade: `architect-MEMORY`)*

### .aiox-core/data/entity-registry.yaml:15085
```
   15083:         - agent
   15084:         - (dara)
>> 15085:       usedBy: []
>> 15086:       dependencies: []
   15087:       externalDeps: []
   15088:       plannedDeps: []
>> 15089:       lifecycle: orphan
   15090:       adaptability:
   15091:         score: 0.3
```
*(bloco/entidade: `data-engineer-MEMORY`)*

### .aiox-core/data/entity-registry.yaml:15106
```
   15104:         - agent
   15105:         - (dex)
>> 15106:       usedBy: []
>> 15107:       dependencies: []
   15108:       externalDeps: []
   15109:       plannedDeps: []
>> 15110:       lifecycle: orphan
   15111:       adaptability:
   15112:         score: 0.3
```
*(bloco/entidade: `dev-MEMORY`)*

### .aiox-core/data/entity-registry.yaml:15127
```
   15125:         - agent
   15126:         - (gage)
>> 15127:       usedBy: []
>> 15128:       dependencies: []
   15129:       externalDeps: []
   15130:       plannedDeps: []
>> 15131:       lifecycle: orphan
   15132:       adaptability:
   15133:         score: 0.3
```
*(bloco/entidade: `devops-MEMORY`)*

### .aiox-core/data/entity-registry.yaml:15147
```
   15145:         - agent
   15146:         - (morgan)
>> 15147:       usedBy: []
>> 15148:       dependencies: []
   15149:       externalDeps: []
   15150:       plannedDeps: []
>> 15151:       lifecycle: orphan
   15152:       adaptability:
   15153:         score: 0.3
```
*(bloco/entidade: `pm-MEMORY`)*

### .aiox-core/data/entity-registry.yaml:15167
```
   15165:         - agent
   15166:         - (pax)
>> 15167:       usedBy: []
>> 15168:       dependencies: []
   15169:       externalDeps: []
   15170:       plannedDeps: []
>> 15171:       lifecycle: orphan
   15172:       adaptability:
   15173:         score: 0.3
```
*(bloco/entidade: `po-MEMORY`)*

### .aiox-core/data/entity-registry.yaml:15187
```
   15185:         - agent
   15186:         - (quinn)
>> 15187:       usedBy: []
>> 15188:       dependencies: []
   15189:       externalDeps: []
   15190:       plannedDeps: []
>> 15191:       lifecycle: orphan
   15192:       adaptability:
   15193:         score: 0.3
```
*(bloco/entidade: `qa-MEMORY`)*

### .aiox-core/data/entity-registry.yaml:15209
```
   15207:         - agent
   15208:         - (river)
>> 15209:       usedBy: []
>> 15210:       dependencies: []
   15211:       externalDeps: []
   15212:       plannedDeps: []
>> 15213:       lifecycle: orphan
   15214:       adaptability:
   15215:         score: 0.3
```
*(bloco/entidade: `sm-MEMORY`)*

### .aiox-core/data/entity-registry.yaml:15231
```
   15229:         - agent
   15230:         - (uma)
>> 15231:       usedBy: []
>> 15232:       dependencies: []
   15233:       externalDeps: []
   15234:       plannedDeps: []
>> 15235:       lifecycle: orphan
   15236:       adaptability:
   15237:         score: 0.3
```
*(bloco/entidade: `ux-MEMORY`)*

### .aiox-core/data/entity-registry.yaml:15253
```
   15251:         - gate
   15252:         - checklist
>> 15253:       usedBy: []
>> 15254:       dependencies: []
   15255:       externalDeps: []
   15256:       plannedDeps: []
>> 15257:       lifecycle: orphan
   15258:       adaptability:
   15259:         score: 0.6
```
*(bloco/entidade: `agent-quality-gate`)*

### .aiox-core/data/entity-registry.yaml:15273
```
   15271:         - compatibility
   15272:         - checklist
>> 15273:       usedBy: []
   15274:       dependencies:
   15275:         - dev
```
*(bloco/entidade: `brownfield-compatibility-checklist`)*

### .aiox-core/data/entity-registry.yaml:15295
```
   15293:         - triage
   15294:         - checklist
>> 15295:       usedBy: []
>> 15296:       dependencies: []
   15297:       externalDeps: []
   15298:       plannedDeps: []
>> 15299:       lifecycle: orphan
   15300:       adaptability:
   15301:         score: 0.6
```
*(bloco/entidade: `issue-triage-checklist`)*

### .aiox-core/data/entity-registry.yaml:15315
```
   15313:         - audit
   15314:         - checklist
>> 15315:       usedBy: []
   15316:       dependencies:
   15317:         - po
```
*(bloco/entidade: `memory-audit-checklist`)*

### .aiox-core/data/entity-registry.yaml:15340
```
   15338:         - checklist
   15339:         - self-critique
>> 15340:       usedBy: []
>> 15341:       dependencies: []
   15342:       externalDeps: []
   15343:       plannedDeps: []
>> 15344:       lifecycle: orphan
   15345:       adaptability:
   15346:         score: 0.6
```
*(bloco/entidade: `self-critique-checklist`)*

### .aiox-core/data/entity-registry.yaml:15361
```
   15359:         - config
   15360:         - requirements
>> 15361:       usedBy: []
>> 15362:       dependencies: []
   15363:       externalDeps: []
   15364:       plannedDeps: []
>> 15365:       lifecycle: orphan
   15366:       adaptability:
   15367:         score: 0.5
```
*(bloco/entidade: `agent-config-requirements`)*

### .aiox-core/data/entity-registry.yaml:15384
```
   15382:         - knowledge
   15383:         - base
>> 15384:       usedBy: []
>> 15385:       dependencies: []
   15386:       externalDeps: []
   15387:       plannedDeps: []
>> 15388:       lifecycle: orphan
   15389:       adaptability:
   15390:         score: 0.5
```
*(bloco/entidade: `aiox-kb`)*

### .aiox-core/data/entity-registry.yaml:15424
```
   15422:         - learned
   15423:         - patterns
>> 15424:       usedBy: []
>> 15425:       dependencies: []
   15426:       externalDeps: []
   15427:       plannedDeps: []
>> 15428:       lifecycle: orphan
   15429:       adaptability:
   15430:         score: 0.5
```
*(bloco/entidade: `learned-patterns`)*

### .aiox-core/data/entity-registry.yaml:15445
```
   15443:         - examples
   15444:         - '============================================================================='
>> 15445:       usedBy: []
>> 15446:       dependencies: []
   15447:       externalDeps: []
   15448:       plannedDeps: []
>> 15449:       lifecycle: orphan
   15450:       adaptability:
   15451:         score: 0.5
```
*(bloco/entidade: `mcp-tool-examples`)*

### .aiox-core/data/entity-registry.yaml:15467
```
   15465:         - preferred
   15466:         - patterns
>> 15467:       usedBy: []
>> 15468:       dependencies: []
   15469:       externalDeps: []
   15470:       plannedDeps: []
>> 15471:       lifecycle: orphan
   15472:       adaptability:
   15473:         score: 0.5
```
*(bloco/entidade: `technical-preferences`)*

### .aiox-core/data/entity-registry.yaml:15487
```
   15485:         - registry
   15486:         - '============================================================================='
>> 15487:       usedBy: []
>> 15488:       dependencies: []
   15489:       externalDeps: []
   15490:       plannedDeps: []
>> 15491:       lifecycle: orphan
   15492:       adaptability:
   15493:         score: 0.5
```
*(bloco/entidade: `tool-registry`)*

### .aiox-core/data/entity-registry.yaml:15509
```
   15507:         - suggestion
   15508:         - data
>> 15509:       usedBy: []
>> 15510:       dependencies: []
   15511:       externalDeps: []
   15512:       plannedDeps: []
>> 15513:       lifecycle: orphan
   15514:       adaptability:
   15515:         score: 0.5
```
*(bloco/entidade: `workflow-chains`)*

### .aiox-core/data/entity-registry.yaml:15529
```
   15527:         - patterns
   15528:         - definition
>> 15529:       usedBy: []
>> 15530:       dependencies: []
   15531:       externalDeps: []
   15532:       plannedDeps: []
>> 15533:       lifecycle: orphan
   15534:       adaptability:
   15535:         score: 0.5
```
*(bloco/entidade: `workflow-patterns`)*

### .aiox-core/data/entity-registry.yaml:15549
```
   15547:         - state
   15548:         - schema
>> 15549:       usedBy: []
>> 15550:       dependencies: []
   15551:       externalDeps: []
   15552:       plannedDeps: []
>> 15553:       lifecycle: orphan
   15554:       adaptability:
   15555:         score: 0.5
```
*(bloco/entidade: `workflow-state-schema`)*

### .aiox-core/data/entity-registry.yaml:15569
```
   15567:         - tech
   15568:         - preset
>> 15569:       usedBy: []
>> 15570:       dependencies: []
   15571:       externalDeps: []
   15572:       plannedDeps: []
>> 15573:       lifecycle: orphan
   15574:       adaptability:
   15575:         score: 0.5
```
*(bloco/entidade: `_template`)*

### .aiox-core/data/entity-registry.yaml:15590
```
   15588:         - tech
   15589:         - preset
>> 15590:       usedBy: []
>> 15591:       dependencies: []
   15592:       externalDeps: []
   15593:       plannedDeps:
```
*(bloco/entidade: `angular-nestjs`)*

### .aiox-core/data/entity-registry.yaml:15613
```
   15611:         - tech
   15612:         - preset
>> 15613:       usedBy: []
>> 15614:       dependencies: []
   15615:       externalDeps: []
   15616:       plannedDeps: []
>> 15617:       lifecycle: orphan
   15618:       adaptability:
   15619:         score: 0.5
```
*(bloco/entidade: `csharp`)*

### .aiox-core/data/entity-registry.yaml:15633
```
   15631:         - tech
   15632:         - preset
>> 15633:       usedBy: []
>> 15634:       dependencies: []
   15635:       externalDeps: []
   15636:       plannedDeps: []
>> 15637:       lifecycle: orphan
   15638:       adaptability:
   15639:         score: 0.5
```
*(bloco/entidade: `go`)*

### .aiox-core/data/entity-registry.yaml:15653
```
   15651:         - tech
   15652:         - preset
>> 15653:       usedBy: []
>> 15654:       dependencies: []
   15655:       externalDeps: []
   15656:       plannedDeps: []
>> 15657:       lifecycle: orphan
   15658:       adaptability:
   15659:         score: 0.5
```
*(bloco/entidade: `java`)*

### .aiox-core/data/entity-registry.yaml:15675
```
   15673:         - tech
   15674:         - preset
>> 15675:       usedBy: []
>> 15676:       dependencies: []
   15677:       externalDeps: []
   15678:       plannedDeps:
```
*(bloco/entidade: `nextjs-react`)*

### .aiox-core/data/entity-registry.yaml:15698
```
   15696:         - tech
   15697:         - preset
>> 15698:       usedBy: []
>> 15699:       dependencies: []
   15700:       externalDeps: []
   15701:       plannedDeps: []
>> 15702:       lifecycle: orphan
   15703:       adaptability:
   15704:         score: 0.5
```
*(bloco/entidade: `php`)*

### .aiox-core/data/entity-registry.yaml:15718
```
   15716:         - tech
   15717:         - preset
>> 15718:       usedBy: []
>> 15719:       dependencies: []
   15720:       externalDeps: []
   15721:       plannedDeps: []
>> 15722:       lifecycle: orphan
   15723:       adaptability:
   15724:         score: 0.5
```
*(bloco/entidade: `rust`)*

### .aiox-core/data/entity-registry.yaml:15738
```
   15736:         - auto
   15737:         - worktree
>> 15738:       usedBy: []
   15739:       dependencies:
   15740:         - worktree-manager
```
*(bloco/entidade: `auto-worktree`)*

### .aiox-core/data/entity-registry.yaml:15760
```
   15758:         - brownfield
   15759:         - discovery
>> 15760:       usedBy: []
   15761:       dependencies:
   15762:         - architect
```
*(bloco/entidade: `brownfield-discovery`)*

### .aiox-core/data/entity-registry.yaml:15785
```
   15783:         - brownfield
   15784:         - fullstack
>> 15785:       usedBy: []
   15786:       dependencies:
   15787:         - analyst
```
*(bloco/entidade: `brownfield-fullstack`)*

### .aiox-core/data/entity-registry.yaml:15811
```
   15809:         - brownfield
   15810:         - service
>> 15811:       usedBy: []
   15812:       dependencies:
   15813:         - architect
```
*(bloco/entidade: `brownfield-service`)*

### .aiox-core/data/entity-registry.yaml:15836
```
   15834:         - brownfield
   15835:         - ui
>> 15836:       usedBy: []
   15837:       dependencies:
   15838:         - architect
```
*(bloco/entidade: `brownfield-ui`)*

### .aiox-core/data/entity-registry.yaml:15864
```
   15862:         - build
   15863:         - quality
>> 15864:       usedBy: []
   15865:       dependencies:
   15866:         - ux-design-expert
```
*(bloco/entidade: `design-system-build-quality`)*

### .aiox-core/data/entity-registry.yaml:15887
```
   15885:       usedBy:
   15886:         - story-checkpoint
>> 15887:       dependencies: []
   15888:       externalDeps: []
   15889:       plannedDeps:
```
*(bloco/entidade: `development-cycle`)*

### .aiox-core/data/entity-registry.yaml:15911
```
   15909:         - orchestration
   15910:         - '============================================'
>> 15911:       usedBy: []
>> 15912:       dependencies: []
   15913:       externalDeps: []
   15914:       plannedDeps: []
>> 15915:       lifecycle: orphan
   15916:       adaptability:
   15917:         score: 0.4
```
*(bloco/entidade: `epic-orchestration`)*

### .aiox-core/data/entity-registry.yaml:15959
```
   15957:         - greenfield
   15958:         - service
>> 15959:       usedBy: []
   15960:       dependencies:
   15961:         - analyst
```
*(bloco/entidade: `greenfield-service`)*

### .aiox-core/data/entity-registry.yaml:15985
```
   15983:         - greenfield
   15984:         - ui
>> 15985:       usedBy: []
   15986:       dependencies:
   15987:         - analyst
```
*(bloco/entidade: `greenfield-ui`)*

### .aiox-core/data/entity-registry.yaml:16012
```
   16010:         - qa
   16011:         - loop
>> 16012:       usedBy: []
   16013:       dependencies:
   16014:         - qa-review-story
```
*(bloco/entidade: `qa-loop`)*

### .aiox-core/data/entity-registry.yaml:16037
```
   16035:         - spec
   16036:         - pipeline
>> 16037:       usedBy: []
   16038:       dependencies:
   16039:         - spec-gather-requirements
```
*(bloco/entidade: `spec-pipeline`)*

### .aiox-core/data/entity-registry.yaml:16066
```
   16064:         - development
   16065:         - cycle
>> 16066:       usedBy: []
   16067:       dependencies:
   16068:         - sm
```
*(bloco/entidade: `story-development-cycle`)*

### .aiox-core/data/entity-registry.yaml:16090
```
   16088:         - output
   16089:         - formatter
>> 16090:       usedBy: []
>> 16091:       dependencies: []
   16092:       externalDeps: []
   16093:       plannedDeps: []
>> 16094:       lifecycle: orphan
   16095:       adaptability:
   16096:         score: 0.6
```
*(bloco/entidade: `output-formatter`)*

### .aiox-core/data/entity-registry.yaml:16109
```
   16107:         - security
   16108:         - utils
>> 16109:       usedBy: []
>> 16110:       dependencies: []
   16111:       externalDeps: []
   16112:       plannedDeps: []
>> 16113:       lifecycle: orphan
   16114:       adaptability:
   16115:         score: 0.6
```
*(bloco/entidade: `security-utils`)*

### .aiox-core/data/entity-registry.yaml:16128
```
   16126:         - yaml
   16127:         - validator
>> 16128:       usedBy: []
>> 16129:       dependencies: []
   16130:       externalDeps: []
   16131:       plannedDeps: []
>> 16132:       lifecycle: orphan
   16133:       adaptability:
   16134:         score: 0.6
```
*(bloco/entidade: `yaml-validator`)*

### .aiox-core/data/entity-registry.yaml:16149
```
   16147:         - aiox
   16148:         - validator
>> 16149:       usedBy: []
>> 16150:       dependencies: []
   16151:       externalDeps: []
   16152:       plannedDeps: []
>> 16153:       lifecycle: orphan
   16154:       adaptability:
   16155:         score: 0.7
```
*(bloco/entidade: `aiox-validator`)*

### .aiox-core/data/entity-registry.yaml:16170
```
   16168:       usedBy:
   16169:         - dev
>> 16170:       dependencies: []
   16171:       externalDeps: []
   16172:       plannedDeps: []
```
*(bloco/entidade: `approach-manager`)*

### .aiox-core/data/entity-registry.yaml:16190
```
   16188:       usedBy:
   16189:         - architect-analyze-impact
>> 16190:       dependencies: []
   16191:       externalDeps: []
   16192:       plannedDeps: []
```
*(bloco/entidade: `approval-workflow`)*

### .aiox-core/data/entity-registry.yaml:16210
```
   16208:       usedBy:
   16209:         - devops
>> 16210:       dependencies: []
   16211:       externalDeps: []
   16212:       plannedDeps: []
```
*(bloco/entidade: `asset-inventory`)*

### .aiox-core/data/entity-registry.yaml:16229
```
   16227:         - layer
   16228:         - classifier
>> 16229:       usedBy: []
>> 16230:       dependencies: []
   16231:       externalDeps: []
   16232:       plannedDeps: []
>> 16233:       lifecycle: orphan
   16234:       adaptability:
   16235:         score: 0.7
```
*(bloco/entidade: `atomic-layer-classifier`)*

### .aiox-core/data/entity-registry.yaml:16251
```
   16249:         - improve-self
   16250:         - health-check-healers-index
>> 16251:       dependencies: []
   16252:       externalDeps: []
   16253:       plannedDeps: []
```
*(bloco/entidade: `backup-manager`)*

### .aiox-core/data/entity-registry.yaml:16269
```
   16267:         - batch
   16268:         - creator
>> 16269:       usedBy: []
   16270:       dependencies:
   16271:         - component-generator
```
*(bloco/entidade: `batch-creator`)*

### .aiox-core/data/entity-registry.yaml:16292
```
   16290:         - branch
   16291:         - manager
>> 16292:       usedBy: []
   16293:       dependencies:
   16294:         - git-wrapper
```
*(bloco/entidade: `branch-manager`)*

### .aiox-core/data/entity-registry.yaml:16333
```
   16331:         - changelog
   16332:         - generator
>> 16333:       usedBy: []
>> 16334:       dependencies: []
   16335:       externalDeps: []
   16336:       plannedDeps: []
>> 16337:       lifecycle: orphan
   16338:       adaptability:
   16339:         score: 0.7
```
*(bloco/entidade: `changelog-generator`)*

### .aiox-core/data/entity-registry.yaml:16352
```
   16350:         - cicd
   16351:         - discovery
>> 16352:       usedBy: []
>> 16353:       dependencies: []
   16354:       externalDeps: []
   16355:       plannedDeps: []
>> 16356:       lifecycle: orphan
   16357:       adaptability:
   16358:         score: 0.7
```
*(bloco/entidade: `cicd-discovery`)*

### .aiox-core/data/entity-registry.yaml:16396
```
   16394:       usedBy:
   16395:         - dev-improve-code-quality
>> 16396:       dependencies: []
   16397:       externalDeps: []
   16398:       plannedDeps: []
```
*(bloco/entidade: `code-quality-improver`)*

### .aiox-core/data/entity-registry.yaml:16416
```
   16414:       usedBy:
   16415:         - architect
>> 16416:       dependencies: []
   16417:       externalDeps: []
   16418:       plannedDeps: []
```
*(bloco/entidade: `codebase-mapper`)*

### .aiox-core/data/entity-registry.yaml:16435
```
   16433:         - tool
   16434:         - usage
>> 16435:       usedBy: []
>> 16436:       dependencies: []
   16437:       externalDeps: []
   16438:       plannedDeps: []
>> 16439:       lifecycle: orphan
   16440:       adaptability:
   16441:         score: 0.7
```
*(bloco/entidade: `collect-tool-usage`)*

### .aiox-core/data/entity-registry.yaml:16455
```
   16453:         - message
   16454:         - generator
>> 16455:       usedBy: []
   16456:       dependencies:
   16457:         - diff-generator
```
*(bloco/entidade: `commit-message-generator`)*

### .aiox-core/data/entity-registry.yaml:16543
```
   16541:         - deprecate-component
   16542:         - qa-generate-tests
>> 16543:       dependencies: []
   16544:       externalDeps: []
   16545:       plannedDeps: []
```
*(bloco/entidade: `component-search`)*

### .aiox-core/data/entity-registry.yaml:16566
```
   16564:         - index
   16565:         - config-resolver
>> 16566:       dependencies: []
   16567:       externalDeps: []
   16568:       plannedDeps: []
```
*(bloco/entidade: `config-cache`)*

### .aiox-core/data/entity-registry.yaml:16606
```
   16604:         - conflict
   16605:         - resolver
>> 16606:       usedBy: []
   16607:       dependencies:
   16608:         - git-wrapper
```
*(bloco/entidade: `conflict-resolver`)*

### .aiox-core/data/entity-registry.yaml:16628
```
   16626:       usedBy:
   16627:         - qa-generate-tests
>> 16628:       dependencies: []
   16629:       externalDeps: []
   16630:       plannedDeps: []
```
*(bloco/entidade: `coverage-analyzer`)*

### .aiox-core/data/entity-registry.yaml:16647
```
   16645:         - status
   16646:         - writer
>> 16647:       usedBy: []
>> 16648:       dependencies: []
   16649:       externalDeps: []
   16650:       plannedDeps: []
>> 16651:       lifecycle: orphan
   16652:       adaptability:
   16653:         score: 0.7
```
*(bloco/entidade: `dashboard-status-writer`)*

### .aiox-core/data/entity-registry.yaml:16669
```
   16667:         - modification-validator
   16668:         - batch-creator
>> 16669:       dependencies: []
   16670:       externalDeps: []
   16671:       plannedDeps: []
```
*(bloco/entidade: `dependency-analyzer`)*

### .aiox-core/data/entity-registry.yaml:16692
```
   16690:         - propose-modification
   16691:         - qa-review-proposal
>> 16692:       dependencies: []
   16693:       externalDeps: []
   16694:       plannedDeps: []
```
*(bloco/entidade: `dependency-impact-analyzer`)*

### .aiox-core/data/entity-registry.yaml:16713
```
   16711:         - qa-review-proposal
   16712:         - commit-message-generator
>> 16713:       dependencies: []
   16714:       externalDeps: []
   16715:       plannedDeps: []
```
*(bloco/entidade: `diff-generator`)*

### .aiox-core/data/entity-registry.yaml:16733
```
   16731:       usedBy:
   16732:         - sync-documentation
>> 16733:       dependencies: []
   16734:       externalDeps: []
   16735:       plannedDeps: []
```
*(bloco/entidade: `documentation-synchronizer`)*

### .aiox-core/data/entity-registry.yaml:16774
```
   16772:         - optimization
   16773:         - report
>> 16774:       usedBy: []
>> 16775:       dependencies: []
   16776:       externalDeps: []
   16777:       plannedDeps: []
>> 16778:       lifecycle: orphan
   16779:       adaptability:
   16780:         score: 0.7
```
*(bloco/entidade: `generate-optimization-report`)*

### .aiox-core/data/entity-registry.yaml:16794
```
   16792:         - settings
   16793:         - json
>> 16794:       usedBy: []
>> 16795:       dependencies: []
   16796:       externalDeps: []
   16797:       plannedDeps: []
>> 16798:       lifecycle: orphan
   16799:       adaptability:
   16800:         score: 0.7
```
*(bloco/entidade: `generate-settings-json`)*

### .aiox-core/data/entity-registry.yaml:16817
```
   16815:         - greeting-builder
   16816:         - unified-activation-pipeline
>> 16817:       dependencies: []
   16818:       externalDeps: []
   16819:       plannedDeps: []
```
*(bloco/entidade: `git-config-detector`)*

### .aiox-core/data/entity-registry.yaml:16838
```
   16836:         - branch-manager
   16837:         - conflict-resolver
>> 16838:       dependencies: []
   16839:       externalDeps: []
   16840:       plannedDeps: []
```
*(bloco/entidade: `git-wrapper`)*

### .aiox-core/data/entity-registry.yaml:16858
```
   16856:       usedBy:
   16857:         - document-gotchas
>> 16858:       dependencies: []
   16859:       externalDeps: []
   16860:       plannedDeps: []
```
*(bloco/entidade: `gotchas-documenter`)*

### .aiox-core/data/entity-registry.yaml:16878
```
   16876:       usedBy:
   16877:         - analyze-framework
>> 16878:       dependencies: []
   16879:       externalDeps: []
   16880:       plannedDeps: []
```
*(bloco/entidade: `improvement-engine`)*

### .aiox-core/data/entity-registry.yaml:16920
```
   16918:       usedBy:
   16919:         - devops
>> 16920:       dependencies: []
   16921:       externalDeps: []
   16922:       plannedDeps: []
```
*(bloco/entidade: `migrate-agent`)*

### .aiox-core/data/entity-registry.yaml:16941
```
   16939:       usedBy:
   16940:         - architect-analyze-impact
>> 16941:       dependencies: []
   16942:       externalDeps: []
   16943:       plannedDeps: []
```
*(bloco/entidade: `modification-risk-assessment`)*

### .aiox-core/data/entity-registry.yaml:16987
```
   16985:         - index.esm
   16986:         - index
>> 16987:       dependencies: []
   16988:       externalDeps: []
   16989:       plannedDeps: []
```
*(bloco/entidade: `output-formatter`)*

### .aiox-core/data/entity-registry.yaml:17007
```
   17005:       usedBy:
   17006:         - devops
>> 17007:       dependencies: []
   17008:       externalDeps: []
   17009:       plannedDeps: []
```
*(bloco/entidade: `path-analyzer`)*

### .aiox-core/data/entity-registry.yaml:17028
```
   17026:         - extract-patterns
   17027:         - analyst
>> 17028:       dependencies: []
   17029:       externalDeps: []
   17030:       plannedDeps: []
```
*(bloco/entidade: `pattern-extractor`)*

### .aiox-core/data/entity-registry.yaml:17048
```
   17046:       usedBy:
   17047:         - analyze-framework
>> 17048:       dependencies: []
   17049:       externalDeps: []
   17050:       plannedDeps: []
```
*(bloco/entidade: `performance-analyzer`)*

### .aiox-core/data/entity-registry.yaml:17068
```
   17066:         - error
   17067:         - resolver
>> 17068:       usedBy: []
>> 17069:       dependencies: []
   17070:       externalDeps: []
   17071:       plannedDeps: []
>> 17072:       lifecycle: orphan
   17073:       adaptability:
   17074:         score: 0.7
```
*(bloco/entidade: `performance-and-error-resolver`)*

### .aiox-core/data/entity-registry.yaml:17089
```
   17087:       usedBy:
   17088:         - dev-optimize-performance
>> 17089:       dependencies: []
   17090:       externalDeps: []
   17091:       plannedDeps: []
```
*(bloco/entidade: `performance-optimizer`)*

### .aiox-core/data/entity-registry.yaml:17109
```
   17107:       usedBy:
   17108:         - agent-config-loader
>> 17109:       dependencies: []
   17110:       externalDeps: []
   17111:       plannedDeps: []
```
*(bloco/entidade: `performance-tracker`)*

### .aiox-core/data/entity-registry.yaml:17131
```
   17129:         - qa-fix-issues
   17130:         - epic-4-executor
>> 17131:       dependencies: []
   17132:       externalDeps: []
   17133:       plannedDeps: []
```
*(bloco/entidade: `plan-tracker`)*

### .aiox-core/data/entity-registry.yaml:17154
```
   17152:         - po-sync-story
   17153:         - story-manager
>> 17154:       dependencies: []
   17155:       externalDeps: []
   17156:       plannedDeps:
```
*(bloco/entidade: `pm-adapter-factory`)*

### .aiox-core/data/entity-registry.yaml:17176
```
   17174:         - pm
   17175:         - adapter
>> 17176:       usedBy: []
>> 17177:       dependencies: []
   17178:       externalDeps: []
   17179:       plannedDeps: []
>> 17180:       lifecycle: orphan
   17181:       adaptability:
   17182:         score: 0.7
```
*(bloco/entidade: `pm-adapter`)*

### .aiox-core/data/entity-registry.yaml:17196
```
   17194:         - review
   17195:         - ai
>> 17196:       usedBy: []
>> 17197:       dependencies: []
   17198:       externalDeps: []
   17199:       plannedDeps: []
>> 17200:       lifecycle: orphan
   17201:       adaptability:
   17202:         score: 0.7
```
*(bloco/entidade: `pr-review-ai`)*

### .aiox-core/data/entity-registry.yaml:17242
```
   17240:       usedBy:
   17241:         - epic-6-executor
>> 17242:       dependencies: []
   17243:       externalDeps: []
   17244:       plannedDeps: []
```
*(bloco/entidade: `qa-loop-orchestrator`)*

### .aiox-core/data/entity-registry.yaml:17261
```
   17259:         - report
   17260:         - generator
>> 17261:       usedBy: []
>> 17262:       dependencies: []
   17263:       externalDeps: []
   17264:       plannedDeps: []
>> 17265:       lifecycle: orphan
   17266:       adaptability:
   17267:         score: 0.7
```
*(bloco/entidade: `qa-report-generator`)*

### .aiox-core/data/entity-registry.yaml:17285
```
   17283:         - recovery-handler
   17284:         - dev
>> 17285:       dependencies: []
   17286:       externalDeps: []
   17287:       plannedDeps: []
```
*(bloco/entidade: `recovery-tracker`)*

### .aiox-core/data/entity-registry.yaml:17305
```
   17303:       usedBy:
   17304:         - dev-suggest-refactoring
>> 17305:       dependencies: []
   17306:       externalDeps: []
   17307:       plannedDeps: []
```
*(bloco/entidade: `refactoring-suggester`)*

### .aiox-core/data/entity-registry.yaml:17324
```
   17322:         - agent
   17323:         - references
>> 17324:       usedBy: []
   17325:       dependencies:
   17326:         - agent-parser
```
*(bloco/entidade: `repair-agent-references`)*

### .aiox-core/data/entity-registry.yaml:17350
```
   17348:         - github-devops-pre-push-quality-gate
   17349:         - github-devops-version-management
>> 17350:       dependencies: []
   17351:       externalDeps: []
   17352:       plannedDeps: []
```
*(bloco/entidade: `repository-detector`)*

### .aiox-core/data/entity-registry.yaml:17372
```
   17370:         - epic-5-executor
   17371:         - dev
>> 17372:       dependencies: []
   17373:       externalDeps: []
   17374:       plannedDeps: []
```
*(bloco/entidade: `rollback-manager`)*

### .aiox-core/data/entity-registry.yaml:17392
```
   17390:       usedBy:
   17391:         - improve-self
>> 17392:       dependencies: []
   17393:       externalDeps: []
   17394:       plannedDeps: []
```
*(bloco/entidade: `sandbox-tester`)*

### .aiox-core/data/entity-registry.yaml:17416
```
   17414:         - component-generator
   17415:         - improvement-validator
>> 17416:       dependencies: []
   17417:       externalDeps: []
   17418:       plannedDeps: []
```
*(bloco/entidade: `security-checker`)*

### .aiox-core/data/entity-registry.yaml:17435
```
   17433:         - check
   17434:         - validator
>> 17435:       usedBy: []
>> 17436:       dependencies: []
   17437:       externalDeps: []
   17438:       plannedDeps: []
>> 17439:       lifecycle: orphan
   17440:       adaptability:
   17441:         score: 0.7
```
*(bloco/entidade: `spot-check-validator`)*

### .aiox-core/data/entity-registry.yaml:17456
```
   17454:       usedBy:
   17455:         - clickup-helpers
>> 17456:       dependencies: []
   17457:       externalDeps: []
   17458:       plannedDeps: []
```
*(bloco/entidade: `status-mapper`)*

### .aiox-core/data/entity-registry.yaml:17475
```
   17473:         - worktree
   17474:         - hooks
>> 17475:       usedBy: []
   17476:       dependencies:
   17477:         - worktree-manager
```
*(bloco/entidade: `story-worktree-hooks`)*

### .aiox-core/data/entity-registry.yaml:17500
```
   17498:         - epic-5-executor
   17499:         - dev
>> 17500:       dependencies: []
   17501:       externalDeps: []
   17502:       plannedDeps: []
```
*(bloco/entidade: `stuck-detector`)*

### .aiox-core/data/entity-registry.yaml:17520
```
   17518:       usedBy:
   17519:         - epic-4-executor
>> 17520:       dependencies: []
   17521:       externalDeps: []
   17522:       plannedDeps: []
```
*(bloco/entidade: `subtask-verifier`)*

### .aiox-core/data/entity-registry.yaml:17541
```
   17539:         - template-validator
   17540:         - component-generator
>> 17541:       dependencies: []
   17542:       externalDeps: []
   17543:       plannedDeps: []
```
*(bloco/entidade: `template-engine`)*

### .aiox-core/data/entity-registry.yaml:17580
```
   17578:         - test
   17579:         - discovery
>> 17580:       usedBy: []
>> 17581:       dependencies: []
   17582:       externalDeps: []
   17583:       plannedDeps: []
>> 17584:       lifecycle: orphan
   17585:       adaptability:
   17586:         score: 0.7
```
*(bloco/entidade: `test-discovery`)*

### .aiox-core/data/entity-registry.yaml:17601
```
   17599:       usedBy:
   17600:         - qa-generate-tests
>> 17601:       dependencies: []
   17602:       externalDeps: []
   17603:       plannedDeps: []
```
*(bloco/entidade: `test-generator`)*

### .aiox-core/data/entity-registry.yaml:17622
```
   17620:       usedBy:
   17621:         - qa-generate-tests
>> 17622:       dependencies: []
   17623:       externalDeps: []
   17624:       plannedDeps: []
```
*(bloco/entidade: `test-quality-assessment`)*

### .aiox-core/data/entity-registry.yaml:17641
```
   17639:         - utilities
   17640:         - fast
>> 17641:       usedBy: []
>> 17642:       dependencies: []
   17643:       externalDeps: []
   17644:       plannedDeps: []
>> 17645:       lifecycle: orphan
   17646:       adaptability:
   17647:         score: 0.7
```
*(bloco/entidade: `test-utilities-fast`)*

### .aiox-core/data/entity-registry.yaml:17660
```
   17658:         - test
   17659:         - utilities
>> 17660:       usedBy: []
>> 17661:       dependencies: []
   17662:       externalDeps: []
   17663:       plannedDeps: []
>> 17664:       lifecycle: orphan
   17665:       adaptability:
   17666:         score: 0.7
```
*(bloco/entidade: `test-utilities`)*

### .aiox-core/data/entity-registry.yaml:17683
```
   17681:         - clickup-helpers
   17682:         - README
>> 17683:       dependencies: []
   17684:       externalDeps: []
   17685:       plannedDeps: []
```
*(bloco/entidade: `tool-resolver`)*

### .aiox-core/data/entity-registry.yaml:17726
```
   17724:       usedBy:
   17725:         - analyze-framework
>> 17726:       dependencies: []
   17727:       externalDeps: []
   17728:       plannedDeps: []
```
*(bloco/entidade: `usage-analytics`)*

### .aiox-core/data/entity-registry.yaml:17746
```
   17744:       usedBy:
   17745:         - aiox-master
>> 17746:       dependencies: []
   17747:       externalDeps: []
   17748:       plannedDeps: []
```
*(bloco/entidade: `validate-agents`)*

### .aiox-core/data/entity-registry.yaml:17767
```
   17765:       usedBy:
   17766:         - validate-parity
>> 17767:       dependencies: []
   17768:       externalDeps: []
   17769:       plannedDeps: []
```
*(bloco/entidade: `validate-claude-integration`)*

### .aiox-core/data/entity-registry.yaml:17788
```
   17786:       usedBy:
   17787:         - validate-parity
>> 17788:       dependencies: []
   17789:       externalDeps: []
   17790:       plannedDeps: []
```
*(bloco/entidade: `validate-codex-integration`)*

### .aiox-core/data/entity-registry.yaml:17809
```
   17807:       usedBy:
   17808:         - validate-parity
>> 17809:       dependencies: []
   17810:       externalDeps: []
   17811:       plannedDeps: []
```
*(bloco/entidade: `validate-gemini-integration`)*

### .aiox-core/data/entity-registry.yaml:17828
```
   17826:         - output
   17827:         - pattern
>> 17828:       usedBy: []
>> 17829:       dependencies: []
   17830:       externalDeps: []
   17831:       plannedDeps: []
>> 17832:       lifecycle: orphan
   17833:       adaptability:
   17834:         score: 0.7
```
*(bloco/entidade: `validate-output-pattern`)*

### .aiox-core/data/entity-registry.yaml:17847
```
   17845:         - validate
   17846:         - parity
>> 17847:       usedBy: []
   17848:       dependencies:
   17849:         - validate-claude-integration
```
*(bloco/entidade: `validate-parity`)*

### .aiox-core/data/entity-registry.yaml:17873
```
   17871:       usedBy:
   17872:         - validate-parity
>> 17873:       dependencies: []
   17874:       externalDeps: []
   17875:       plannedDeps: []
```
*(bloco/entidade: `validate-paths`)*

### .aiox-core/data/entity-registry.yaml:17894
```
   17892:       usedBy:
   17893:         - greeting-builder
>> 17894:       dependencies: []
   17895:       externalDeps: []
   17896:       plannedDeps: []
```
*(bloco/entidade: `validate-user-profile`)*

### .aiox-core/data/entity-registry.yaml:17915
```
   17913:       usedBy:
   17914:         - architect-analyze-impact
>> 17915:       dependencies: []
   17916:       externalDeps: []
   17917:       plannedDeps: []
```
*(bloco/entidade: `visual-impact-generator`)*

### .aiox-core/data/entity-registry.yaml:17943
```
   17941:         - project-status-loader
   17942:         - story-worktree-hooks
>> 17943:       dependencies: []
   17944:       externalDeps: []
   17945:       plannedDeps: []
```
*(bloco/entidade: `worktree-manager`)*

### .aiox-core/data/entity-registry.yaml:17966
```
   17964:         - index
   17965:         - component-generator
>> 17966:       dependencies: []
   17967:       externalDeps: []
   17968:       plannedDeps: []
```
*(bloco/entidade: `yaml-validator`)*

### .aiox-core/data/entity-registry.yaml:17985
```
   17983:         - ${title}
   17984:         - activator
>> 17985:       usedBy: []
>> 17986:       dependencies: []
   17987:       externalDeps: []
   17988:       plannedDeps: []
>> 17989:       lifecycle: orphan
   17990:       adaptability:
   17991:         score: 0.7
```
*(bloco/entidade: `bootstrap`)*

### .aiox-core/data/entity-registry.yaml:18059
```
   18057:         - analyze-brownfield
   18058:         - documentation-integrity-index
>> 18059:       dependencies: []
   18060:       externalDeps: []
   18061:       plannedDeps: []
```
*(bloco/entidade: `brownfield-analyzer`)*

### .aiox-core/data/entity-registry.yaml:18080
```
   18078:         - setup-project-docs
   18079:         - documentation-integrity-index
>> 18080:       dependencies: []
   18081:       externalDeps: []
   18082:       plannedDeps: []
```
*(bloco/entidade: `config-generator`)*

### .aiox-core/data/entity-registry.yaml:18102
```
   18100:         - setup-project-docs
   18101:         - documentation-integrity-index
>> 18102:       dependencies: []
   18103:       externalDeps: []
   18104:       plannedDeps: []
```
*(bloco/entidade: `deployment-config-loader`)*

### .aiox-core/data/entity-registry.yaml:18123
```
   18121:         - setup-project-docs
   18122:         - documentation-integrity-index
>> 18123:       dependencies: []
   18124:       externalDeps: []
   18125:       plannedDeps: []
```
*(bloco/entidade: `doc-generator`)*

### .aiox-core/data/entity-registry.yaml:18145
```
   18143:         - setup-project-docs
   18144:         - documentation-integrity-index
>> 18145:       dependencies: []
   18146:       externalDeps: []
   18147:       plannedDeps: []
```
*(bloco/entidade: `gitignore-generator`)*

### .aiox-core/data/entity-registry.yaml:18162
```
   18160:       keywords:
   18161:         - index
>> 18162:       usedBy: []
   18163:       dependencies:
   18164:         - mode-detector
```
*(bloco/entidade: `documentation-integrity-index`)*

### .aiox-core/data/entity-registry.yaml:18191
```
   18189:         - setup-project-docs
   18190:         - documentation-integrity-index
>> 18191:       dependencies: []
   18192:       externalDeps: []
   18193:       plannedDeps: []
```
*(bloco/entidade: `mode-detector`)*

### .aiox-core/data/entity-registry.yaml:18209
```
   18207:         - post
   18208:         - commit
>> 18209:       usedBy: []
>> 18210:       dependencies: []
   18211:       externalDeps: []
   18212:       plannedDeps: []
>> 18213:       lifecycle: orphan
   18214:       adaptability:
   18215:         score: 0.7
```
*(bloco/entidade: `post-commit`)*

### .aiox-core/data/entity-registry.yaml:18236
```
   18234:         - cursor
   18235:         - github-copilot
>> 18236:       dependencies: []
   18237:       externalDeps: []
   18238:       plannedDeps: []
```
*(bloco/entidade: `agent-parser`)*

### .aiox-core/data/entity-registry.yaml:18256
```
   18254:       usedBy:
   18255:         - ide-sync-index
>> 18256:       dependencies: []
   18257:       externalDeps: []
   18258:       plannedDeps: []
```
*(bloco/entidade: `gemini-commands`)*

### .aiox-core/data/entity-registry.yaml:18273
```
   18271:       keywords:
   18272:         - index
>> 18273:       usedBy: []
   18274:       dependencies:
   18275:         - agent-parser
```
*(bloco/entidade: `ide-sync-index`)*

### .aiox-core/data/entity-registry.yaml:18345
```
   18343:       usedBy:
   18344:         - setup-llm-routing
>> 18345:       dependencies: []
   18346:       externalDeps: []
   18347:       plannedDeps: []
```
*(bloco/entidade: `install-llm-routing`)*

### .aiox-core/data/entity-registry.yaml:18386
```
   18384:         - health-check-checks-services-index
   18385:         - ide-sync-index
>> 18386:       dependencies: []
   18387:       externalDeps: []
   18388:       plannedDeps: []
```
*(bloco/entidade: `claude-code`)*

### .aiox-core/data/entity-registry.yaml:18452
```
   18450:         - '!=='
   18451:         - '''specialist'''
>> 18452:       usedBy: []
>> 18453:       dependencies: []
   18454:       externalDeps: []
   18455:       plannedDeps: []
>> 18456:       lifecycle: orphan
   18457:       adaptability:
   18458:         score: 0.7
```
*(bloco/entidade: `kimi`)*

### .aiox-core/data/entity-registry.yaml:18470
```
   18468:       keywords:
   18469:         - index
>> 18470:       usedBy: []
>> 18471:       dependencies: []
   18472:       externalDeps: []
   18473:       plannedDeps: []
>> 18474:       lifecycle: orphan
   18475:       adaptability:
   18476:         score: 0.7
```
*(bloco/entidade: `llm-routing-usage-tracker-index`)*

### .aiox-core/data/entity-registry.yaml:18521
```
   18519:         - devops
   18520:         - po
>> 18521:       dependencies: []
   18522:       externalDeps: []
   18523:       plannedDeps: []
```
*(bloco/entidade: `github-cli`)*

### .aiox-core/data/entity-registry.yaml:18543
```
   18541:       usedBy:
   18542:         - setup-llm-routing
>> 18543:       dependencies: []
   18544:       externalDeps: []
   18545:       plannedDeps: []
```
*(bloco/entidade: `llm-routing`)*

### .aiox-core/data/entity-registry.yaml:18564
```
   18562:         - environment-bootstrap
   18563:         - architect
>> 18564:       dependencies: []
   18565:       externalDeps: []
   18566:       plannedDeps: []
```
*(bloco/entidade: `railway-cli`)*

### .aiox-core/data/entity-registry.yaml:18586
```
   18584:         - architect
   18585:         - data-engineer
>> 18586:       dependencies: []
   18587:       externalDeps: []
   18588:       plannedDeps: []
```
*(bloco/entidade: `supabase-cli`)*

### .aiox-core/data/entity-registry.yaml:18605
```
   18603:       usedBy:
   18604:         - dev
>> 18605:       dependencies: []
   18606:       externalDeps: []
   18607:       plannedDeps: []
```
*(bloco/entidade: `ffmpeg`)*

### .aiox-core/data/entity-registry.yaml:18626
```
   18624:       usedBy:
   18625:         - ux-design-expert
>> 18626:       dependencies: []
   18627:       externalDeps: []
   18628:       plannedDeps: []
```
*(bloco/entidade: `21st-dev-magic`)*

### .aiox-core/data/entity-registry.yaml:18647
```
   18645:         - qa
   18646:         - ux-design-expert
>> 18647:       dependencies: []
   18648:       externalDeps: []
   18649:       plannedDeps: []
```
*(bloco/entidade: `browser`)*

### .aiox-core/data/entity-registry.yaml:18666
```
   18664:       usedBy:
   18665:         - sm
>> 18666:       dependencies: []
   18667:       externalDeps: []
   18668:       plannedDeps: []
```
*(bloco/entidade: `clickup`)*

### .aiox-core/data/entity-registry.yaml:18692
```
   18690:         - sm
   18691:         - squad-creator
>> 18692:       dependencies: []
   18693:       externalDeps: []
   18694:       plannedDeps: []
```
*(bloco/entidade: `context7`)*

### .aiox-core/data/entity-registry.yaml:18710
```
   18708:         - desktop
   18709:         - commander
>> 18710:       usedBy: []
>> 18711:       dependencies: []
   18712:       externalDeps: []
   18713:       plannedDeps: []
>> 18714:       lifecycle: orphan
   18715:       adaptability:
   18716:         score: 0.7
```
*(bloco/entidade: `desktop-commander`)*

### .aiox-core/data/entity-registry.yaml:18731
```
   18729:         - analyst
   18730:         - architect
>> 18731:       dependencies: []
   18732:       externalDeps: []
   18733:       plannedDeps: []
```
*(bloco/entidade: `exa`)*

### .aiox-core/data/entity-registry.yaml:18751
```
   18749:       usedBy:
   18750:         - analyst
>> 18751:       dependencies: []
   18752:       externalDeps: []
   18753:       plannedDeps: []
```
*(bloco/entidade: `google-workspace`)*

### .aiox-core/data/entity-registry.yaml:18770
```
   18768:       usedBy:
   18769:         - dev
>> 18770:       dependencies: []
   18771:       externalDeps: []
   18772:       plannedDeps: []
```
*(bloco/entidade: `n8n`)*

### .aiox-core/data/entity-registry.yaml:18790
```
   18788:         - dev
   18789:         - qa
>> 18790:       dependencies: []
   18791:       externalDeps: []
   18792:       plannedDeps: []
```
*(bloco/entidade: `supabase`)*

### .aiox-core/data/entity-registry.yaml:18812
```
   18810:       usedBy:
   18811:         - ux-design-expert
>> 18812:       dependencies: []
   18813:       externalDeps: []
   18814:       plannedDeps: []
```
*(bloco/entidade: `accessibility-wcag-checklist`)*

### .aiox-core/data/entity-registry.yaml:18835
```
   18833:         - aiox-master
   18834:         - architect
>> 18835:       dependencies: []
   18836:       externalDeps: []
   18837:       plannedDeps: []
```
*(bloco/entidade: `architect-checklist`)*

### .aiox-core/data/entity-registry.yaml:18866
```
   18864:         - pm
   18865:         - po
>> 18866:       dependencies: []
   18867:       externalDeps: []
   18868:       plannedDeps: []
```

### .aiox-core/data/entity-registry.yaml:18887
```
   18885:       usedBy:
   18886:         - ux-design-expert
>> 18887:       dependencies: []
   18888:       externalDeps: []
   18889:       plannedDeps: []
```
*(bloco/entidade: `component-quality-checklist`)*

### .aiox-core/data/entity-registry.yaml:18908
```
   18906:       usedBy:
   18907:         - data-engineer
>> 18908:       dependencies: []
   18909:       externalDeps: []
   18910:       plannedDeps: []
```
*(bloco/entidade: `database-design-checklist`)*

### .aiox-core/data/entity-registry.yaml:18930
```
   18928:       usedBy:
   18929:         - data-engineer
>> 18930:       dependencies: []
   18931:       externalDeps: []
   18932:       plannedDeps: []
```
*(bloco/entidade: `dba-predeploy-checklist`)*

### .aiox-core/data/entity-registry.yaml:18951
```
   18949:       usedBy:
   18950:         - data-engineer
>> 18951:       dependencies: []
   18952:       externalDeps: []
   18953:       plannedDeps: []
```
*(bloco/entidade: `dba-rollback-checklist`)*

### .aiox-core/data/entity-registry.yaml:18972
```
   18970:       usedBy:
   18971:         - ux-design-expert
>> 18972:       dependencies: []
   18973:       externalDeps: []
   18974:       plannedDeps: []
```
*(bloco/entidade: `migration-readiness-checklist`)*

### .aiox-core/data/entity-registry.yaml:18993
```
   18991:       usedBy:
   18992:         - ux-design-expert
>> 18993:       dependencies: []
   18994:       externalDeps: []
   18995:       plannedDeps: []
```
*(bloco/entidade: `pattern-audit-checklist`)*

### .aiox-core/data/entity-registry.yaml:19018
```
   19016:         - aiox-master
   19017:         - pm
>> 19018:       dependencies: []
   19019:       externalDeps: []
   19020:       plannedDeps: []
```
*(bloco/entidade: `pm-checklist`)*

### .aiox-core/data/entity-registry.yaml:19054
```
   19052:         - aiox-master
   19053:         - po
>> 19054:       dependencies: []
   19055:       externalDeps: []
   19056:       plannedDeps: []
```

### .aiox-core/data/entity-registry.yaml:19078
```
   19076:       usedBy:
   19077:         - devops
>> 19078:       dependencies: []
   19079:       externalDeps: []
   19080:       plannedDeps: []
```
*(bloco/entidade: `pre-push-checklist`)*

### .aiox-core/data/entity-registry.yaml:19099
```
   19097:         - publish-npm
   19098:         - devops
>> 19099:       dependencies: []
   19100:       externalDeps: []
   19101:       plannedDeps: []
```
*(bloco/entidade: `release-checklist`)*

### .aiox-core/data/entity-registry.yaml:19148
```
   19146:         - aiox-master
   19147:         - dev
>> 19148:       dependencies: []
   19149:       externalDeps: []
   19150:       plannedDeps: []
```
*(bloco/entidade: `story-dod-checklist`)*

### .aiox-core/data/entity-registry.yaml:19193
```
   19191:         - design
   19192:         - principles
>> 19193:       usedBy: []
>> 19194:       dependencies: []
   19195:       externalDeps: []
   19196:       plannedDeps: []
>> 19197:       lifecycle: orphan
   19198:       adaptability:
   19199:         score: 0.5
```
*(bloco/entidade: `atomic-design-principles`)*

### .aiox-core/data/entity-registry.yaml:19213
```
   19211:         - techniques
   19212:         - data
>> 19213:       usedBy: []
>> 19214:       dependencies: []
   19215:       externalDeps: []
   19216:       plannedDeps: []
>> 19217:       lifecycle: orphan
   19218:       adaptability:
   19219:         score: 0.5
```
*(bloco/entidade: `brainstorming-techniques`)*

### .aiox-core/data/entity-registry.yaml:19233
```
   19231:         - algorithms
   19232:         - pattern
>> 19233:       usedBy: []
>> 19234:       dependencies: []
   19235:       externalDeps: []
   19236:       plannedDeps: []
>> 19237:       lifecycle: orphan
   19238:       adaptability:
   19239:         score: 0.5
```
*(bloco/entidade: `consolidation-algorithms`)*

### .aiox-core/data/entity-registry.yaml:19254
```
   19252:         - practices
   19253:         - guide
>> 19254:       usedBy: []
>> 19255:       dependencies: []
   19256:       externalDeps: []
   19257:       plannedDeps: []
>> 19258:       lifecycle: orphan
   19259:       adaptability:
   19260:         score: 0.5
```
*(bloco/entidade: `database-best-practices`)*

### .aiox-core/data/entity-registry.yaml:19275
```
   19273:         - best
   19274:         - practices
>> 19275:       usedBy: []
>> 19276:       dependencies: []
   19277:       externalDeps: []
   19278:       plannedDeps: []
>> 19279:       lifecycle: orphan
   19280:       adaptability:
   19281:         score: 0.5
```
*(bloco/entidade: `design-token-best-practices`)*

### .aiox-core/data/entity-registry.yaml:19295
```
   19293:         - methods
   19294:         - data
>> 19295:       usedBy: []
>> 19296:       dependencies: []
   19297:       externalDeps: []
   19298:       plannedDeps: []
>> 19299:       lifecycle: orphan
   19300:       adaptability:
   19301:         score: 0.5
```
*(bloco/entidade: `elicitation-methods`)*

### .aiox-core/data/entity-registry.yaml:19315
```
   19313:         - patterns
   19314:         - squads
>> 19315:       usedBy: []
>> 19316:       dependencies: []
   19317:       externalDeps: []
   19318:       plannedDeps: []
>> 19319:       lifecycle: orphan
   19320:       adaptability:
   19321:         score: 0.5
```
*(bloco/entidade: `integration-patterns`)*

### .aiox-core/data/entity-registry.yaml:19336
```
   19334:         - guide
   19335:         - database
>> 19336:       usedBy: []
>> 19337:       dependencies: []
   19338:       externalDeps: []
   19339:       plannedDeps: []
>> 19340:       lifecycle: orphan
   19341:       adaptability:
   19342:         score: 0.5
```
*(bloco/entidade: `migration-safety-guide`)*

### .aiox-core/data/entity-registry.yaml:19357
```
   19355:         - best
   19356:         - practices
>> 19357:       usedBy: []
>> 19358:       dependencies: []
   19359:       externalDeps: []
   19360:       plannedDeps: []
>> 19361:       lifecycle: orphan
   19362:       adaptability:
   19363:         score: 0.5
```
*(bloco/entidade: `mode-selection-best-practices`)*

### .aiox-core/data/entity-registry.yaml:19379
```
   19377:         - postgresql
   19378:         - performance
>> 19379:       usedBy: []
>> 19380:       dependencies: []
   19381:       externalDeps: []
   19382:       plannedDeps: []
>> 19383:       lifecycle: orphan
   19384:       adaptability:
   19385:         score: 0.5
```
*(bloco/entidade: `postgres-tuning-guide`)*

### .aiox-core/data/entity-registry.yaml:19402
```
   19400:         - level
   19401:         - (rls)
>> 19402:       usedBy: []
>> 19403:       dependencies: []
   19404:       externalDeps: []
   19405:       plannedDeps: []
>> 19406:       lifecycle: orphan
   19407:       adaptability:
   19408:         score: 0.5
```
*(bloco/entidade: `rls-security-patterns`)*

### .aiox-core/data/entity-registry.yaml:19422
```
   19420:         - calculation
   19421:         - guide
>> 19422:       usedBy: []
>> 19423:       dependencies: []
   19424:       externalDeps: []
   19425:       plannedDeps: []
>> 19426:       lifecycle: orphan
   19427:       adaptability:
   19428:         score: 0.5
```
*(bloco/entidade: `roi-calculation-guide`)*

### .aiox-core/data/entity-registry.yaml:19442
```
   19440:         - patterns
   19441:         - architecture
>> 19442:       usedBy: []
>> 19443:       dependencies: []
   19444:       externalDeps: []
   19445:       plannedDeps: []
>> 19446:       lifecycle: orphan
   19447:       adaptability:
   19448:         score: 0.5
```
*(bloco/entidade: `supabase-patterns`)*

### .aiox-core/data/entity-registry.yaml:19462
```
   19460:         - levels
   19461:         - framework
>> 19462:       usedBy: []
>> 19463:       dependencies: []
   19464:       externalDeps: []
   19465:       plannedDeps: []
>> 19466:       lifecycle: orphan
   19467:       adaptability:
   19468:         score: 0.5
```
*(bloco/entidade: `test-levels-framework`)*

### .aiox-core/data/entity-registry.yaml:19482
```
   19480:         - priorities
   19481:         - matrix
>> 19482:       usedBy: []
>> 19483:       dependencies: []
   19484:       externalDeps: []
   19485:       plannedDeps: []
>> 19486:       lifecycle: orphan
   19487:       adaptability:
   19488:         score: 0.5
```
*(bloco/entidade: `test-priorities-matrix`)*

### .aiox-core/data/entity-registry.yaml:19502
```
   19500:         - compliance
   19501:         - guide
>> 19502:       usedBy: []
>> 19503:       dependencies: []
   19504:       externalDeps: []
   19505:       plannedDeps: []
>> 19506:       lifecycle: orphan
   19507:       adaptability:
   19508:         score: 0.5
```
*(bloco/entidade: `wcag-compliance-guide`)*

### .aiox-core/data/entity-registry.yaml:19528
```
   19526:         - sharding
   19527:         - portuguese-to-english
>> 19528:       usedBy: []
>> 19529:       dependencies: []
   19530:       externalDeps: []
   19531:       plannedDeps: []
>> 19532:       lifecycle: orphan
   19533:       adaptability:
   19534:         score: 0.5
```
*(bloco/entidade: `SHARD-TRANSLATION-GUIDE`)*

### .aiox-core/data/entity-registry.yaml:19550
```
   19548:         - creation
   19549:         - guide
>> 19550:       usedBy: []
>> 19551:       dependencies: []
   19552:       externalDeps: []
   19553:       plannedDeps: []
>> 19554:       lifecycle: orphan
   19555:       adaptability:
   19556:         score: 0.5
```
*(bloco/entidade: `component-creation-guide`)*

### .aiox-core/data/entity-registry.yaml:19572
```
   19570:         - update
   19571:         - pattern
>> 19572:       usedBy: []
   19573:       dependencies:
   19574:         - greeting-builder
```
*(bloco/entidade: `session-update-pattern`)*

### .aiox-core/data/entity-registry.yaml:19597
```
   19595:         - variable
   19596:         - guide
>> 19597:       usedBy: []
>> 19598:       dependencies: []
   19599:       externalDeps: []
   19600:       plannedDeps: []
>> 19601:       lifecycle: orphan
   19602:       adaptability:
   19603:         score: 0.5
```
*(bloco/entidade: `template-syntax`)*

### .aiox-core/data/entity-registry.yaml:19621
```
   19619:         - aiox
   19620:         - meta-agent
>> 19621:       usedBy: []
>> 19622:       dependencies: []
   19623:       externalDeps: []
   19624:       plannedDeps: []
>> 19625:       lifecycle: orphan
   19626:       adaptability:
   19627:         score: 0.5
```
*(bloco/entidade: `troubleshooting-guide`)*

### .aiox-core/development/templates/squad-template/squad.yaml:21
```
   19:     - templates/*.md
   20: 
>> 21: dependencies: []
   22: 
   23: keywords:
```

### squads/squad-creator-pro/workflows/wf-discover-tools.yaml:786
```
   784:               language: ""
   785:               license: ""
>> 786:               dependencies: []
   787:             reusability:
   788:               standalone_scripts: true/false
```
*(bloco/entidade: `technical`)*

### squads/squad-creator-pro/workflows/wf-discover-tools.yaml:876
```
   874:               format: "markdown | yaml | python | json"
   875:               framework: "claude_code | langchain | crewai | autogen | standalone"
>> 876:               dependencies: []
   877:               self_contained: true/false
   878:             quality:
```
*(bloco/entidade: `technical`)*

### squads/squad-creator/workflows/wf-discover-tools.yaml:581
```
   579:               language: ""
   580:               license: ""
>> 581:               dependencies: []
   582:             reusability:
   583:               standalone_scripts: true/false
```
*(bloco/entidade: `technical`)*

## 🚧 Inacabado / placeholder (345 trechos com contexto, 345 ocorrências totais)

### .aiox-core/base-rules/project-log.md:5
```
   3: ## O que é isso
   4: 
>> 5: Todo projeto tem um arquivo `PROJETO-STATUS.md` na sua pasta raiz. Ele é o **caderno vivo do projeto** — registra tudo que foi feito, pendências, próximos passos e o perfil do usuário.
   6: 
   7: **Esta regra se aplica a TODOS os agentes AIOX:** @dev, @qa, @architect, @pm, @po, @sm, @analyst, @devops e qualquer outro.
```

### .aiox-core/cli/commands/pro/buyer.js:303
```
   301: 
   302: // ---------------------------------------------------------------------------
>> 303: // aiox pro buyer register — Wave 2 stub (hidden until endpoint exists)
   304: // ---------------------------------------------------------------------------
   305: 
```

### .aiox-core/cli/commands/pro/buyer.js:356
```
   354:     .action(validateBatchAction);
   355: 
>> 356:   // Wave 2 stub — kept so the CLI surface is stable once endpoint lands.
   357:   cmd
   358:     .command('register')
```
*(bloco/entidade: `createBuyerCommand`)*

### .aiox-core/constitution.md:58
```
   56: ### III. Story-Driven Development (MUST)
   57: 
>> 58: Todo desenvolvimento começa e termina com uma story.
   59: 
   60: **Regras:**
```

### .aiox-core/constitution.md:76
```
   74: 
   75: **Regras:**
>> 76: - MUST: Todo statement em spec.md DEVE rastrear para:
   77:   - Um requisito funcional (FR-*)
   78:   - Um requisito não-funcional (NFR-*)
```

### .aiox-core/constitution.md:91
```
   89: ### V. Quality First (MUST)
   90: 
>> 91: Qualidade não é negociável. Todo código passa por múltiplos gates antes de merge.
   92: 
   93: **Regras:**
```

### .aiox-core/core/execution/semantic-merge-engine.js:1075
```
   1073:       const regexPattern = pattern
   1074:         .replace(/[.+^${}()|[\]\\]/g, '\\$&') // Escape regex special chars
>> 1075:         .replace(/\*\*/g, '<<<GLOBSTAR>>>') // Temp placeholder for **
   1076:         .replace(/\*/g, '[^/]*') // Single * = anything except /
   1077:         .replace(/<<<GLOBSTAR>>>/g, '.*') // ** = anything including /
```
*(bloco/entidade: `regexPattern`)*

### .aiox-core/core/execution/wave-executor.js:283
```
   281: 
   282:   /**
>> 283:    * Default task executor (placeholder)
   284:    * @param {Object} task - Task to execute
   285:    * @param {Object} context - Execution context
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/graph-dashboard/data-sources/metrics-source.js:24
```
   22:    * Get metrics from code-intel client.
   23:    * Primary: live metrics from active provider.
>> 24:    * Fallback: offline placeholder with providerAvailable=false.
   25:    * @returns {Promise<Object>} Metrics object
   26:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/graph-dashboard/data-sources/metrics-source.js:77
```
   75: 
   76:   /**
>> 77:    * Return offline placeholder metrics.
   78:    * @returns {Object}
   79:    * @private
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/graph-dashboard/formatters/html-formatter.js:183
```
   181:     <div id="sidebar-content">
   182:       <div class="filter-section">
>> 183:         <input type="text" id="search-input" placeholder="Search entities..." autocomplete="off">
   184:       </div>
   185:       <div class="filter-section">
```
*(bloco/entidade: `<div class="filter-section">`)*

### .aiox-core/core/health-check/healers/index.js:299
```
   297:   registerBuiltInHealers() {
   298:     // Healers will be registered by individual checks
>> 299:     // This is a placeholder for future built-in healers
   300:   }
   301: 
```
*(bloco/entidade: `registerBuiltInHealers() {`)*

### .aiox-core/core/health-check/reporters/json.js:82
```
   80:       techDebt: this.extractTechDebt(checkResults),
   81: 
>> 82:       // Historical data (placeholder for future)
   83:       history: {
   84:         trend: [],
```

### .aiox-core/core/memory/gotchas-memory.js:102
```
   100:     'assert',
   101:     'mock',
>> 102:     'stub',
   103:     'spy',
   104:     'coverage',
```
*(bloco/entidade: `[GotchaCategory.TEST]: [`)*

### .aiox-core/core/orchestration/executors/epic-3-executor.js:116
```
   114:       // Check if spec file exists
   115:       if (!(await fs.pathExists(specPath))) {
>> 116:         // Create stub spec for pipeline to continue
   117:         await this._createStubSpec(specPath, storyId, context);
>> 118:         this._log('Created stub spec (real spec generation requires agent invocation)');
   119:       }
   120: 
```
*(bloco/entidade: `if (!(await fs.pathExists(specPath))) {`)*

### .aiox-core/core/orchestration/executors/epic-3-executor.js:178
```
   176:       phase,
   177:       timestamp: new Date().toISOString(),
>> 178:       // Stub values - real implementation invokes agents
   179:       complexity: phase === 'assess-complexity' ? 'STANDARD' : undefined,
   180:       requirements: phase === 'gather-requirements' ? [] : undefined,
```
*(bloco/entidade: `return {`)*

### .aiox-core/core/orchestration/executors/epic-3-executor.js:185
```
   183: 
   184:   /**
>> 185:    * Create stub spec file
   186:    * @private
   187:    */
   188:   async _createStubSpec(specPath, storyId, context) {
   189:     const stubContent = `# Specification: ${storyId}
   190: 
>> 191: > **Status:** Draft (Auto-generated stub)
   192: > **Generated:** ${new Date().toISOString()}
   193: > **Tech Stack:** ${context.techStack ? JSON.stringify(context.techStack, null, 2) : 'Not detected'}
   194: 
   195: ## Overview
   196: 
>> 197: This is an auto-generated specification stub. The full specification will be generated
   198: when the Spec Pipeline agents are invoked.
   199: 
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/executors/epic-4-executor.js:157
```
   155:     }
   156: 
>> 157:     // Create stub plan
   158:     const planPath = this._getPath('docs', 'stories', storyId, 'plan', 'implementation.yaml');
   159:     await this._createStubPlan(planPath, storyId, specPath);
```
*(bloco/entidade: `async _findOrCreatePlan(storyId, specPath) {`)*

### .aiox-core/core/orchestration/executors/epic-4-executor.js:165
```
   163: 
   164:   /**
>> 165:    * Create stub implementation plan
   166:    * @private
   167:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/executors/epic-4-executor.js:210
```
   208:     await fs.ensureDir(path.dirname(planPath));
   209:     await fs.writeFile(planPath, stubPlan);
>> 210:     this._log('Created stub implementation plan');
   211:   }
   212: 
```
*(bloco/entidade: ``;`)*

### .aiox-core/core/orchestration/executors/epic-4-executor.js:221
```
   219: 
   220:     // In full implementation, this would iterate through subtasks
>> 221:     // and invoke agents for each one. For now, return stub results.
   222:     results.push({
   223:       subtaskId: '1.1',
```
*(bloco/entidade: `async _executeSubtasks(_storyId, _tracker, _context) {`)*

### .aiox-core/core/orchestration/executors/epic-6-executor.js:189
```
   187: 
   188:     // Check for lint errors (would run actual linter in full implementation)
>> 189:     // For now, return stub
   190:     this._log('Basic quality checks completed');
   191: 
```
*(bloco/entidade: `async _performBasicChecks(_context) {`)*

### .aiox-core/core/orchestration/master-orchestrator.js:596
```
   594: 
   595:       // Evaluate quality gate (Story 0.6) - only in full pipeline mode
>> 596:       // Skip gate evaluation if result is from stub executor
   597:       let gateResult = null;
>> 598:       const isStubResult = result && result.status === 'stub';
   599:       if (this._inFullPipeline && result && result.success !== false && !isStubResult) {
   600:         gateResult = await this._evaluateGate(epicNum, result);
```

### .aiox-core/core/orchestration/master-orchestrator.js:671
```
   669:         this.executors[epicNum] = createExecutor(epicNum, this);
   670:       } else {
>> 671:         // Fallback to stub for unknown epics
   672:         this.executors[epicNum] = new StubEpicExecutor(this, epicNum);
   673:       }
```
*(bloco/entidade: `} else {`)*

### .aiox-core/core/orchestration/master-orchestrator.js:1582
```
   1580: 
   1581: // ═══════════════════════════════════════════════════════════════════════════════════
>> 1582: //                              STUB EXECUTOR (placeholder)
   1583: // ═══════════════════════════════════════════════════════════════════════════════════
   1584: 
   1585: /**
>> 1586:  * Stub Epic Executor - placeholder for Story 0.3
   1587:  *
   1588:  * Provides a no-op executor for epics that do not yet have a real
```

### .aiox-core/core/orchestration/master-orchestrator.js:1597
```
   1595:    *
   1596:    * @param {MasterOrchestrator} orchestrator - Parent orchestrator instance.
>> 1597:    * @param {number} epicNum - Epic number handled by this stub.
   1598:    */
   1599:   constructor(orchestrator, epicNum) {
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/master-orchestrator.js:1606
```
   1604: 
   1605:   /**
>> 1606:    * Executes the stub epic.
   1607:    *
>> 1608:    * @param {Object} _context - Execution context ignored by the stub.
>> 1609:    * @returns {Promise<Object>} Minimal result with status 'stub'.
   1610:    */
   1611:   async execute(_context) {
>> 1612:     console.log(chalk.yellow(`   ⚠️  Using stub executor for Epic ${this.epicNum}`));
   1613:     console.log(chalk.gray(`      Real executor (${this.config.executor}) not yet implemented`));
   1614:     console.log(chalk.gray('      See Story 0.3: Epic Executors'));
   1615: 
   1616:     // Return minimal success result for pipeline to continue
   1617:     return {
>> 1618:       status: 'stub',
   1619:       epicNum: this.epicNum,
>> 1620:       message: `Stub executor for ${this.config.name}`,
   1621:       timestamp: new Date().toISOString(),
   1622:     };
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/quality-gates/layer2-pr-automation.js:304
```
   302: 
   303:   /**
>> 304:    * Generate Quinn suggestions (placeholder for full integration)
   305:    * @param {Object} context - Execution context
   306:    * @returns {Promise<Array>} Suggestions
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/registry/service-registry.json:409
```
   407:       "id": "atomic-layer-classifier",
   408:       "name": "Atomic Layer Classifier",
>> 409:       "description": "Atomic Layer Classifier\r Story: 6.1.7.1 - Task Content Completion\r Purpose: Resolve {TODO: Atom|Molecule|Organism} placeholders in all 114 task files",
   410:       "category": "script",
   411:       "subcategory": "utility",
```
*(bloco/entidade: `{`)*

### .aiox-core/data/entity-registry.yaml:997
```
   995:       layer: L2
   996:       type: task
>> 997:       purpose: 'TODO: Create test-suite-checklist.md for validation (follow-up story needed)'
   998:       keywords:
   999:         - create
   1000:         - suite
>> 1001:         - 'todo:'
   1002:         - test-suite-checklist.md
   1003:         - validation
```
*(bloco/entidade: `create-suite`)*

### .aiox-core/data/entity-registry.yaml:1033
```
   1031:         - create
   1032:         - task
>> 1033:         - 'todo:'
   1034:         - task-validation-checklist.md
   1035:         - validation
```
*(bloco/entidade: `keywords`)*

### .aiox-core/data/entity-registry.yaml:1062
```
   1060:         - create
   1061:         - workflow
>> 1062:         - 'todo:'
   1063:         - workflow-validation-checklist.md
   1064:         - validation
```
*(bloco/entidade: `keywords`)*

### .aiox-core/data/entity-registry.yaml:1643
```
   1641:         - deprecate
   1642:         - component
>> 1643:         - 'todo:'
   1644:         - create
   1645:         - deprecation-checklist.md
```
*(bloco/entidade: `keywords`)*

### .aiox-core/data/entity-registry.yaml:2102
```
   2100:         - document
   2101:         - project
>> 2102:         - 'todo:'
   2103:         - create
   2104:         - project-documentation-checklist.md
```
*(bloco/entidade: `keywords`)*

### .aiox-core/data/entity-registry.yaml:3871
```
   3869:         - generate
   3870:         - tests
>> 3871:         - 'todo:'
   3872:         - create
   3873:         - test-generation-checklist.md
```
*(bloco/entidade: `keywords`)*

### .aiox-core/data/entity-registry.yaml:12410
```
   12408:       layer: L1
   12409:       type: module
>> 12410:       purpose: This is an auto-generated specification stub. The full specification will be generated
   12411:       keywords:
   12412:         - epic
```
*(bloco/entidade: `epic-3-executor`)*

### .aiox-core/data/tech-presets/angular-nestjs.md:552
```
   550: 2. **Signals para estado local/global:** Use Signals em vez de BehaviorSubject para estado de UI
   551: 3. **inject() em vez de constructor DI:** Prefira `inject()` em Angular para menos boilerplate
>> 552: 4. **NestJS DTOs com class-validator:** Todo body de request deve ter DTO + `@IsString()`, `@IsEmail()` etc.
   553: 5. **Shared Contracts:** DTOs compartilhados frontend/backend na pasta `/shared/contracts/`
   554: 6. **No `any`:** Use `unknown` + type guard ou tipos explícitos
```

### .aiox-core/data/tech-presets/csharp.md:272
```
   270: ### Critical Rules
   271: 
>> 272: 1. **CancellationToken Mandatory:** Todo IO async recebe `CancellationToken`.
   273: 2. **No Business Logic in Controllers:** Apenas parse e delegacao.
   274: 3. **One DbContext per bounded context:** Evitar mega-context.
```

### .aiox-core/data/tech-presets/php.md:289
```
   287: 
   288: 1. **Thin Controllers:** Controller delega para Action e retorna Resource.
>> 289: 2. **Validation at Edge:** Form Request para todo endpoint mutavel.
   290: 3. **No Query in Controller:** Persistencia via repository/Action.
   291: 4. **Typed DTOs:** Evitar arrays soltos no core da regra.
```

### .aiox-core/data/tool-registry.yaml:250
```
   248:       - competitor
   249:     mcp_server: docker-gateway
>> 250:     input_examples: null # Placeholder — populated by TOK-4B
   251:     filter:
   252:       type: content
```
*(bloco/entidade: `exa`)*

### .aiox-core/development/agents/squad-creator.md:137
```
   135:     visibility: [full]
   136:     description: 'Download public squad from aiox-squads repository (Sprint 8)'
>> 137:     status: placeholder
   138:   - name: publish-squad
   139:     visibility: [full]
   140:     description: 'Publish squad to aiox-squads repository (Sprint 8)'
>> 141:     status: placeholder
   142:   - name: sync-squad-synkra
   143:     visibility: [full]
   144:     description: 'Sync squad to Synkra API marketplace (Sprint 8)'
>> 145:     status: placeholder
   146: 
   147:   # Utilities
```
*(bloco/entidade: `- name: download-squad`)*

### .aiox-core/development/checklists/self-critique-checklist.md:171
```
   169: - [ ] No console.log statements left in code
   170: - [ ] No commented-out code blocks
>> 171: - [ ] No TODO comments without tracking ticket
   172: - [ ] No debugging artifacts (debugger statements, test data)
   173: - [ ] No unused imports or variables
```

### .aiox-core/development/scripts/agent-assignment-resolver.js:6
```
   4:  * Agent Assignment Resolver
   5:  * Story: 6.1.7.1 - Task Content Completion
>> 6:  * Purpose: Resolve {TODO: Agent Name} placeholders in all 114 task files
   7:  * 
   8:  * Maps tasks to agents based on:
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/agent-assignment-resolver.js:19
```
   17: const TASKS_DIR = path.join(__dirname, '../tasks');
   18: const _AGENTS_DIR = path.join(__dirname, '../agents');
>> 19: const TODO_PATTERN = /responsável: \{TODO: Agent Name\}/g;
   20: 
   21: // Agent mapping based on task filename prefixes and agent capabilities
```

### .aiox-core/development/scripts/agent-assignment-resolver.js:130
```
   128:   const content = fs.readFileSync(filePath, 'utf8');
   129:   
>> 130:   // Check if TODO exists
   131:   if (!TODO_PATTERN.test(content)) {
>> 132:     return { skipped: true, reason: 'no TODO placeholder found' };
   133:   }
   134:   
```
*(bloco/entidade: `processTaskFile`)*

### .aiox-core/development/scripts/agent-assignment-resolver.js:146
```
   144:   }
   145:   
>> 146:   // Replace TODO with actual agent
   147:   const updatedContent = content.replace(
   148:     TODO_PATTERN,
```

### .aiox-core/development/scripts/migrate-task-to-v2.js:15
```
   13:  *   1. Reads existing task
   14:  *   2. Identifies missing V2.0 sections
>> 15:  *   3. Adds section templates with TODO markers
   16:  *   4. Creates backup of original
   17:  *   5. Saves migrated version
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/migrate-task-to-v2.js:61
```
   59: 
   60: \`\`\`yaml
>> 61: task: {TODO: task identifier}
>> 62: responsável: {TODO: Agent Name}
   63: responsavel_type: Agente
>> 64: atomic_layer: {TODO: Atom|Molecule|Organism}
   65: 
   66: **Entrada:**
>> 67: - campo: {TODO: fieldName}
>> 68:   tipo: {TODO: string|number|boolean}
>> 69:   origem: {TODO: User Input | config | Step X}
   70:   obrigatório: true
>> 71:   validação: {TODO: validation rule}
   72: 
   73: **Saída:**
>> 74: - campo: {TODO: fieldName}
>> 75:   tipo: {TODO: type}
>> 76:   destino: {TODO: output | state | Step Y}
   77:   persistido: true
   78: \`\`\`
```

### .aiox-core/development/scripts/migrate-task-to-v2.js:91
```
   89: \`\`\`yaml
   90: pre-conditions:
>> 91:   - [ ] {TODO: condition description}
   92:     tipo: pre-condition
   93:     blocker: true
   94:     validação: |
>> 95:       {TODO: validation logic}
>> 96:     error_message: "{TODO: error message}"
   97: \`\`\`
   98: 
```
*(bloco/entidade: `pre-conditions`)*

### .aiox-core/development/scripts/migrate-task-to-v2.js:110
```
   108: \`\`\`yaml
   109: post-conditions:
>> 110:   - [ ] {TODO: verification step}
   111:     tipo: post-condition
   112:     blocker: true
   113:     validação: |
>> 114:       {TODO: validation logic}
>> 115:     error_message: "{TODO: error message}"
   116: \`\`\`
   117: 
```
*(bloco/entidade: `post-conditions`)*

### .aiox-core/development/scripts/migrate-task-to-v2.js:129
```
   127: \`\`\`yaml
   128: acceptance-criteria:
>> 129:   - [ ] {TODO: acceptance criterion}
   130:     tipo: acceptance-criterion
   131:     blocker: true
   132:     validação: |
>> 133:       {TODO: validation logic}
>> 134:     error_message: "{TODO: error message}"
   135: \`\`\`
   136: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/scripts/migrate-task-to-v2.js:145
```
   143: 
   144: - **Tool:** N/A
>> 145:   - **Purpose:** {TODO: what this tool does}
>> 146:   - **Source:** {TODO: where to find it}
   147: 
   148: ---
```
*(bloco/entidade: `- **Tool:** N/A`)*

### .aiox-core/development/scripts/migrate-task-to-v2.js:156
```
   154: 
   155: - **Script:** N/A
>> 156:   - **Purpose:** {TODO: what this script does}
>> 157:   - **Language:** {TODO: JavaScript | Python | Bash}
>> 158:   - **Location:** {TODO: file path}
   159: 
   160: ---
```
*(bloco/entidade: `- **Script:** N/A`)*

### .aiox-core/development/scripts/migrate-task-to-v2.js:165
```
   163:   errorHandling: `## Error Handling
   164: 
>> 165: **Strategy:** {TODO: Fail-fast | Graceful degradation | Retry with backoff}
   166: 
   167: **Common Errors:**
   168: 
>> 169: 1. **Error:** {TODO: error type}
>> 170:    - **Cause:** {TODO: why it happens}
>> 171:    - **Resolution:** {TODO: how to fix}
>> 172:    - **Recovery:** {TODO: automated recovery steps}
   173: 
   174: ---
```

### .aiox-core/development/scripts/migrate-task-to-v2.js:182
```
   180: 
   181: \`\`\`yaml
>> 182: duration_expected: {TODO: X minutes}
>> 183: cost_estimated: {TODO: $X}
>> 184: token_usage: {TODO: ~X tokens}
   185: \`\`\`
   186: 
   187: **Optimization Notes:**
>> 188: - {TODO: performance tips}
   189: 
   190: ---
```

### .aiox-core/development/scripts/migrate-task-to-v2.js:196
```
   194: 
   195: \`\`\`yaml
>> 196: story: {TODO: Story ID or N/A}
   197: version: 1.0.0
   198: dependencies:
>> 199:   - {TODO: dependency file or N/A}
   200: tags:
>> 201:   - {TODO: tag1}
>> 202:   - {TODO: tag2}
   203: updated_at: ${new Date().toISOString().split('T')[0]}
   204: \`\`\`
```

### .aiox-core/development/scripts/migrate-task-to-v2.js:332
```
   330:   fs.writeFileSync(filePath, migratedContent, 'utf8');
   331:   console.log(`${colors.green}✅ Migration complete: ${fileName}${colors.reset}`);
>> 332:   console.log(`${colors.yellow}⚠ IMPORTANT: Review and fill TODO markers${colors.reset}\n`);
   333: 
   334:   // Run validation
```

### .aiox-core/development/scripts/modification-validator.js:304
```
   302:     };
   303: 
>> 304:     // Check for placeholder consistency
   305:     const placeholders = modifiedContent.match(/\{\{[^}]+\}\}/g) || [];
   306:     const uniquePlaceholders = [...new Set(placeholders)];
```
*(bloco/entidade: `async validateTemplateModification(originalContent, modifiedContent, options) {`)*

### .aiox-core/development/scripts/populate-entity-registry.js:62
```
   60: const INDEX_RESOLUTION_EXTENSIONS = ['.js', '.mjs', '.ts', '.yaml', '.yml', '.md'];
   61: 
>> 62: const SENTINEL_VALUES = new Set(['n/a', 'na', 'none', 'tbd', 'todo', '-', '']);
   63: 
   64: function isSentinel(value) {
```

### .aiox-core/development/scripts/populate-entity-registry.js:176
```
   174: 
   175: /**
>> 176:  * Detects whether a candidate purpose string is actually a template placeholder
   177:  * or unfilled literal, rather than a real description.
   178:  *
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/populate-entity-registry.js:194
```
   192:  * The check is conservative: a purpose with one or two `${var}` mentions but
   193:  * still describing something useful (e.g. `Hello ${name}, welcome!`) is kept.
>> 194:  * Only when the placeholder dominates do we discard the candidate.
   195:  *
   196:  * @param {string} candidate - The purpose string from a higher-priority strategy
>> 197:  * @returns {boolean} true if the string looks like an unfilled placeholder
   198:  */
   199: function looksLikePlaceholder(candidate) {
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/populate-entity-registry.js:204
```
   202:   if (!s) return false;
   203: 
>> 204:   // Whole string is a single placeholder: `{...}`, `{{...}}`, or `${...}`.
   205:   if (/^\{[A-Za-z][^}]*\}$/.test(s)) return true;
   206:   if (/^\{\{[^}]+\}\}$/.test(s)) return true;
   207:   if (/^\$\{[^}]+\}$/.test(s)) return true;
   208: 
>> 209:   // Starts with a literal placeholder followed by anything: `*${name}foo`,
   210:   // `${ctx.x} bar baz`, `{Brief} extra`. The leading token is the literal.
   211:   if (/^[*]?\$\{/.test(s)) return true;
   212:   if (/^\{[A-Za-z][^}]*\}/.test(s) && s.length < 80) return true;
   213: 
>> 214:   // Dominant placeholder load — more than 30% of the string is `${...}` or
   215:   // `{{...}}` interpolation. Catches cases like
   216:   //   `${icon} @${id} — ${name}${archetype !== 'Specialist' ? ...} | ${title}`
```
*(bloco/entidade: `looksLikePlaceholder`)*

### .aiox-core/development/scripts/refactoring-suggester.js:1041
```
   1039:     try {
   1040:       // This would integrate with the actual refactoring implementation
>> 1041:       // For now, it's a placeholder showing the structure
   1042:       
   1043:       const result = {
```
*(bloco/entidade: `try {`)*

### .aiox-core/development/scripts/refactoring-suggester.js:1063
```
   1061:           break;
   1062:         default:
>> 1063:           throw new Error(`Refactoring type ${suggestion.type} not implemented`);
   1064:       }
   1065: 
```
*(bloco/entidade: `default`)*

### .aiox-core/development/scripts/refactoring-suggester.js:1079
```
   1077:   }
   1078: 
>> 1079:   // Placeholder methods for applying refactorings
   1080:   async applyMethodExtraction(suggestion) {
   1081:     // Implementation would use AST transformation
```

### .aiox-core/development/scripts/squad/squad-extender.js:549
```
   547:     let result = template;
   548:     for (const [key, value] of Object.entries(context)) {
>> 549:       const placeholder = new RegExp(`\\{\\{${key.toUpperCase()}\\}\\}`, 'g');
>> 550:       result = result.replace(placeholder, value || '');
   551:     }
   552:     return result;
```
*(bloco/entidade: `for (const [key, value] of Object.entries(context)) {`)*

### .aiox-core/development/scripts/squad/squad-generator.js:614
```
   612: 
   613: \`\`\`javascript
>> 614: // This is a placeholder - implement your logic here
   615: async function execute(options) {
   616:   const { source, format } = options;
   617: 
>> 618:   // TODO: Implement extraction logic
   619:   console.log(\`Extracting from \${source} as \${format}\`);
   620: 
```

### .aiox-core/development/scripts/task-identifier-resolver.js:6
```
   4:  * Task Identifier Resolver
   5:  * Story: 6.1.7.1 - Task Content Completion
>> 6:  * Purpose: Resolve {TODO: task identifier} placeholders in all 114 task files
   7:  * 
   8:  * Converts filenames to camelCase format (e.g., dev-develop-story.md → devDevelopStory())
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/task-identifier-resolver.js:16
```
   14: // Configuration
   15: const TASKS_DIR = path.join(__dirname, '../tasks');
>> 16: const TODO_PATTERN = /task: \{TODO: task identifier\}/g;
   17: const BACKUP_SUFFIX = '.pre-task-id-fix';
   18: 
```

### .aiox-core/development/scripts/task-identifier-resolver.js:55
```
   53:   const content = fs.readFileSync(filePath, 'utf8');
   54:   
>> 55:   // Check if TODO exists
   56:   if (!TODO_PATTERN.test(content)) {
>> 57:     return { skipped: true, reason: 'no TODO placeholder found' };
   58:   }
   59:   
```
*(bloco/entidade: `processTaskFile`)*

### .aiox-core/development/scripts/task-identifier-resolver.js:66
```
   64:   createBackup(filePath);
   65:   
>> 66:   // Replace TODO with actual identifier
   67:   const updatedContent = content.replace(
   68:     TODO_PATTERN,
```

### .aiox-core/development/scripts/usage-tracker.js:315
```
   313:     
   314:     // This would analyze manifest files, import statements, etc.
>> 315:     // For now, return empty array as placeholder
   316:     
   317:     return dependencies;
```
*(bloco/entidade: `async analyzeDependencyRelationships(component, options = {}) {`)*

### .aiox-core/development/tasks/analise-acos-catalogo-mercadolivre.md:56
```
   54: ## Passo 3 — Determinar SKU e status de catálogo de cada MLB
   55: 
>> 56: **⚠️ Regra obrigatória — UMA ÚNICA aba de Anúncios pra todo o Passo 3 (crítica, 07/08/2026):** abrir a aba de Anúncios **uma vez só**, no início do Passo 3, e **reusar essa mesma aba** pra todas as bu
   57: 
   58: 0. **Bug crítico de seleção de aba (04/08/2026):** ao localizar a aba de Anúncios via `url.includes('mercadolivre.com.br/anuncios')`, isso também bate com a URL da página **"Alterar"** (`mercadolivre.
```

### .aiox-core/development/tasks/analyze-cross-artifact.md:126
```
   124:         - "etc."
   125:         - "TBD"
>> 126:         - "TODO"
   127:       severity: MEDIUM
   128: 
```
*(bloco/entidade: `patterns`)*

### .aiox-core/development/tasks/ci-cd-configuration.md:74
```
   72: - **secrets**: `object`
   73:   - **Description**: Environment secrets (will be stored securely)
>> 74:   - **Example**: `{ VERCEL_TOKEN: "xxx", DATABASE_URL: "postgres://..." }`
   75: 
   76: ## Output
```
*(bloco/entidade: `- **secrets**: `object``)*

### .aiox-core/development/tasks/ci-cd-configuration.md:338
```
   336:     - Use GitHub CLI to set secrets:
   337:       ```bash
>> 338:       gh secret set VERCEL_TOKEN --body="xxx"
   339:       gh secret set DATABASE_URL --body="postgres://..."
   340:       ```
```
*(bloco/entidade: `- Use GitHub CLI to set secrets:`)*

### .aiox-core/development/tasks/create-agent.md:1168
```
   1166:     - retry_with_different_queries
   1167:     - expand_search_scope
>> 1168:     - if_still_fails: 'Create generic agent with TODO notes'
   1169: 
   1170:   validation_fails:
```
*(bloco/entidade: `research_insufficient`)*

### .aiox-core/development/tasks/create-project-log.md:14
```
   12: 
   13: Após executar esta task:
>> 14: - Todo agente lê o caderno ao ser ativado
   15: - Aprovações são registradas na hora com notificação ao usuário
   16: - Ao final de cada sessão, o resumo é salvo automaticamente
```

### .aiox-core/development/tasks/create-project-log.md:78
```
   76: 
   77: A partir de agora:
>> 78: • Todo agente lê o caderno ao iniciar
   79: • Quando você aprovar algo, o agente avisa e anota
   80: • Quando você parar, o agente salva o resumo da sessão
```

### .aiox-core/development/tasks/create-suite.md:4
```
   2: tools:
   3:   - github-cli
>> 4: # TODO: Create test-suite-checklist.md for validation (follow-up story needed)
   5: # checklists:
   6: #   - test-suite-checklist.md
```

### .aiox-core/development/tasks/create-task.md:224
```
   222: tools:
   223:   - github-cli
>> 224: # TODO: Create task-validation-checklist.md for validation (follow-up story needed)
   225: # checklists:
   226: #   - task-validation-checklist.md
```

### .aiox-core/development/tasks/create-workflow.md:242
```
   240: tools:
   241:   - github-cli
>> 242: # TODO: Create workflow-validation-checklist.md for validation (follow-up story needed)
   243: # checklists:
   244: #   - workflow-validation-checklist.md
```

### .aiox-core/development/tasks/db-analyze-hotpaths.md:457
```
   455: ```sql
   456: -- Hot path: Get user's posts
>> 457: SELECT * FROM posts WHERE user_id = 'xxx';
   458: 
   459: -- Check: Index on user_id exists?
```

### .aiox-core/development/tasks/db-explain.md:249
```
   247: 
   248: Buffers:
>> 249:   - Shared Hit: XXX (cache hits)
   250:   - Shared Read: YYY (disk reads)
   251:   - Temp Read/Written: ZZZ (temp files)
   252: 
>> 253: Cost: XXX.XX..YYY.YY
>> 254: Rows: Estimated XXX, Actual YYY
   255: ```
   256: 
```
*(bloco/entidade: `Buffers`)*

### .aiox-core/development/tasks/deprecate-component.md:206
```
   204: tools:
   205:   - github-cli
>> 206: # TODO: Create deprecation-checklist.md for validation (follow-up story needed)
   207: # checklists:
   208: #   - deprecation-checklist.md
```

### .aiox-core/development/tasks/deprecate-component.md:866
```
   864:   findComponentDocumentation(component) {
   865:     // Find documentation file for component
>> 866:     return null; // Placeholder
   867:   }
   868: 
```
*(bloco/entidade: `findComponentDocumentation(component) {`)*

### .aiox-core/development/tasks/dev-backlog-debt.md:226
```
   224:     input: textarea
   225:     validation: max 500 chars
>> 226:     placeholder: "Describe what needs improvement and why it's considered tech debt"
   227:     example: |
   228:       Current authentication logic has tight coupling to database layer.
```
*(bloco/entidade: `- Detailed Description:`)*

### .aiox-core/development/tasks/dev-validate-next-story.md:234
```
   232: - Load `.aiox-core/product/templates/story-tmpl.yaml` and extract all section headings from the template
   233: - **Missing sections check**: Compare story sections against template sections to verify all required sections are present
>> 234: - **Placeholder validation**: Ensure no template placeholders remain unfilled (e.g., `{{EpicNum}}`, `{{role}}`, `_TBD_`)
   235: - **Agent section verification**: Confirm all sections from template exist for future agent use
   236: - **Structure compliance**: Verify story follows template structure and formatting
```

### .aiox-core/development/tasks/document-project.md:208
```
   206:   - github-cli        # Access repository structure and codebase
   207:   - context7          # Look up library documentation and patterns
>> 208: # TODO: Create project-documentation-checklist.md for validation (follow-up story needed)
   209: # checklists:
   210: #   - project-documentation-checklist.md
```

### .aiox-core/development/tasks/environment-bootstrap.md:828
```
   826: - Initialize Synkra AIOX project structure
   827: - Add .gitignore with standard exclusions
>> 828: - Add README.md with project placeholder
   829: 
   830: 🤖 Generated by AIOX Environment Bootstrap"
```

### .aiox-core/development/tasks/learn-patterns.md:590
```
   588:     try {
   589:       // Implementation would depend on pattern type
>> 590:       // This is a placeholder for the actual pattern application logic
   591:       console.log(chalk.green('✅ Pattern applied successfully'));
   592:       
```
*(bloco/entidade: `try {`)*

### .aiox-core/development/tasks/mapeamento-pausados-campanha-mercadolivre.md:11
```
   9: Depende do procedimento de conexão `modo-navegador-browser-access.md` e reaproveita Passo A/A.1/A.2 do `mapeamento-skus-ads-catalogo-mercadolivre.md` (mesma lógica de confirmação de catálogo Clássico/
   10: 
>> 11: **⚠️ REGRA GERAL OBRIGATÓRIA (14/08/2026, reforçada 14/08/2026) — paciência e confirmação de carregamento, nunca tempo fixo curto, aplicada no PROCESSO INTEIRO:** válida pra todo este documento e pro 
   12: 
   13: **⚠️ "ID Family" (14/08/2026):** alguns SKUs têm MLBs escondidos dentro de um agrupamento colapsado ("ID Family", número de 16 dígitos, sem SKU própria, preço em faixa) — ver procedimento completo de 
```

### .aiox-core/development/tasks/mapeamento-pausados-campanha-mercadolivre.md:62
```
   60:    ```
   61:    Já vem com o status de catálogo explícito às vezes (achado útil — evita ter que checar "Alterar" depois)
>> 62: 4. Pegar o **primeiro MLB** da lista do drawer — esse sim é buscável na aba Anúncios (`Buscar por título, código ou SKU`, número puro, sem prefixo) pra achar o `SKU <valor>`. **⚠️ Existem 2 caixas de 
   63: 5. Rebuscar pelo SKU encontrado (Passo A do outro doc) — a busca traz **todos os MLBs sincronizados daquele SKU especificamente**, que pode ser só uma fração do total de MLBs do drawer
   64: 
   65: **⚠️ Um produto pausado na campanha pode conter MAIS DE 1 SKU diferente** (não é sempre "1 produto = 1 SKU com variações de sincronização"). Caso real validado (`[ML] [AVA] [PERFORMANCE]`, produto "Sa
   66: 
>> 67: **⚠️ MLB "SINCRONIZADO COM O CATÁLOGO" que não mostra GANHANDO/PERDENDO próprio não significa que não é catálogo** — pode ser o "anúncio pai"/cópia sincronizada do mesmo catálogo. Caso real: `#MLB6929
   68: 
>> 69: **⚠️ Nem todo MLB é buscável direto na aba Anúncios pelo número puro.** Caso real: `#MLB25543184` (Aspirador Philco PAS1450C) retornou **0 anúncios**. Isso é raro quando se usa o MLB certo (o da varia
   70: 
   71: ## Passo B — Qualidade e Experiência (validado 12/08/2026)
```

### .aiox-core/development/tasks/mapeamento-skus-ads-catalogo-mercadolivre.md:9
```
   7: Depende do procedimento de conexão documentado em `modo-navegador-browser-access.md` (gatilho "Modo Navegador"). Reaproveita o Passo A do `analise-acos-catalogo-mercadolivre.md` (mapeamento de SKU/MLB
   8: 
>> 9: **⚠️ REGRA GERAL OBRIGATÓRIA (14/08/2026, reforçada 14/08/2026 — aplicar no PROCESSO INTEIRO, nunca em pontos isolados) — paciência e confirmação de carregamento, nunca tempo fixo curto:** todo passo 
   10: 
>> 11: **Isso não é uma regra pra aplicar só onde um bug já apareceu — é pra todo o processo, desde o início.** O erro real que motivou o reforço desta regra (14/08/2026): a correção original só tinha sido a
   12: 
   13: **Técnica padrão obrigatória:** depois de qualquer ação que deveria mudar o conteúdo da tela, ler o texto da página 2 vezes seguidas (com um intervalo curto, ex: 1s) — se as 2 leituras baterem exatame
   14: 
>> 15: Regra prática complementar: nunca declarar ausência de um elemento (ex: botão, item de menu) baseado só em não ter aparecido dentro de um tempo fixo curto — sempre tentar de novo com mais espera antes
   16: 
   17: ---
```

### .aiox-core/development/tasks/mapeamento-skus-ads-catalogo-mercadolivre.md:31
```
   29: **⚠️ Correção crítica (11/08/2026) — qual caixa de busca usar:** na aba **Anúncios** (favorito "Anúncios" na barra do Chrome do Modo Navegador, abre por padrão na página "Gestão de anúncios") existem 
   30: 
>> 31: - ✅ **Certa, usar sempre:** `input[placeholder="Buscar por título, código ou SKU"]` — busca filtrada de verdade, mostra um contador exato ("N anúncios") e, pra cada card do resultado, já escreve o tex
>> 32: - ❌ **Errada, nunca usar:** `input[placeholder="Buscar seus produtos ou vendas por título, SKU ou #"]` (classe `nav-header-sellers-search__input`, fica no topo do site) — essa é uma busca genérica que
   33: 
>> 34: **Confirmado 16/08/2026:** o pipeline `packages/karzen/.aiox-runtime/pipeline-pausados-campanha-completo.js` sempre seguiu essa regra corretamente — a constante `SELETOR_BUSCA` usa o seletor certo (`i
   35: 
   36: Passo a passo:
```

### .aiox-core/development/tasks/mapeamento-skus-ads-catalogo-mercadolivre.md:47
```
   45: 6. **Rolar a página inteira dos resultados da busca por SKU, sempre (13/08/2026, corrigido 14/08/2026):** igual à regra já documentada pro drawer "Ver variações" do doc de campanhas — os resultados da
   46: 
>> 47: 7. **Expandir todo "ID Family" antes de ler o resultado (14/08/2026):** alguns SKUs têm variações agrupadas sob um "Product ID" externo do Mercado Livre — aparece como um card cujo número tem **16 díg
   48: 
   49: **⚠️ Duas questões em aberto, descobertas durante a validação do "ID Family" (14/08/2026), ainda sem solução confirmada — não tratar como resolvidas:**
```

### .aiox-core/development/tasks/mapeamento-skus-ads-catalogo-mercadolivre.md:113
```
   111: **Página:** Anúncios Patrocinados (bookmark "Anúncios Patrocinados": `https://ads.mercadolivre.com.br/product-ads/admin/ads?navigate_to=mercado_ads`)
   112: 
>> 113: **Método principal — busca direta por MLB (validado 4/4, 08/08/2026):**
   114: 
>> 115: Buscar exatamente **"MLB" + número** (ex: `MLB4670660503`) na caixa de busca da página — placeholder exato: `Procurar por # ou título` (confirmado 11/08/2026). O prefixo texto **"MLB" é obrigatório** 
   116: 
   117: Antes de cada busca, fechar qualquer drawer de "variações" que tenha sobrado de uma checagem anterior, clicando no botão `button[aria-label="Cerrar"]` — a tecla `Escape` **não fecha** esse drawer (cau
```

### .aiox-core/development/tasks/mapeamento-skus-ads-catalogo-mercadolivre.md:191
```
   189: ## Passo C — Marcar o progresso na planilha (Excel)
   190: 
>> 191: **⚠️ Escopo corrigido (12/08/2026):** colorir **TODOS os MLBs sincronizados encontrados no Passo A** (a lista completa, depois de rolar a página inteira) — não só os 1-2 MLBs de catálogo confirmados n
   192: 
   193: Pra cada MLB sincronizado encontrado de um SKU (Passo A):
```

### .aiox-core/development/tasks/mapeamento-skus-ads-catalogo-mercadolivre.md:228
```
   226: **Nunca introduzir cache ou índice entre produtos diferentes:** a correção acima troca só o *mecanismo* de busca (nativo em vez de laço manual) — continua buscando no dado real da planilha a cada MLB,
   227: 
>> 228: **⚠️ Regra de "qual linha processar a seguir" — corrigida (10/08/2026):** o azul do Felipe foi marcado **antes** deste método existir — nunca passou pela determinação de status em Ads (Passo B). Pular
   229: 
   230: ## Passo D — Escrever nas 2 páginas do `Analise Oficial.xlsx` (depois replicar pro Google Sheets)
   231: 
>> 232: **Correção (17-18/08/2026) — destino imediato é o Excel local, não o Google Sheets:** até esta correção, este passo descrevia o Google Sheets como destino único e imediato — isso nunca esteve certo na
   233: 
>> 234: Só **depois** de todo o lote estar processado e você aprovar (banner trocado de `⚠️ Dados em validação` pra `✅ Dados confirmados`), os mesmos dados são replicados pra "Planilha do Ads ML" no Google Sh
   235: 
>> 236: **Ordem de escrita obrigatória (decidido com o Felipe em 11/08/2026):** as linhas 2-91 e as 4 linhas isoladas 106, 107, 111 e 114 (dentro do intervalo 94-121, que também não passaram pelo método valid
   237: 
   238: **"Título de catálogo" (coluna presente nas 2 páginas abaixo):** o título exato do produto como aparece na aba "Anúncios Patrocinados" do Mercado Livre, achado durante a busca por "MLB"+número no Pass
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:41
```
   39: **⚠️ O filtro da seção acima acha VÁRIOS processos, não um só — não usar ele direto pra fechar.** `chrome.exe` roda como uma árvore de processos: 1 processo principal + vários processos-filho (aba/ren
   40: 
>> 41: **Como identificar só o processo principal:** ele é o único, dentre os que batem com `ChromeDebugKarzen`, que **não tem a flag `--type=`** (todo processo-filho tem `--type=renderer`, `--type=gpu-proce
   42: 
   43: ```powershell
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:168
```
   166: **Bug adicional descoberto:** mesmo colocando os dois passos dentro do mesmo script Node (`bringToFront()` seguido de um `ShowWindow(SW_MINIMIZE)` único), a janela ainda pode aparecer — porque o `brin
   167: 
>> 168: **Solução validada (versão final, corrigida em 05/08/2026 após investigação com timestamps — ver seção "Investigação a fundo" abaixo):** todo script que usa `bringToFront()` DEVE, antes de `process.ex
   169: 
   170: **Módulo persistido (não parafrasear nem duplicar o código aqui — ver nota abaixo sobre por quê):** `.aiox-core/development/scripts/modo-navegador/minimize-chrome.js` — qualquer script novo importa di
   171: 
>> 172: **⚠️ Correção crítica (10/08/2026, só efetivamente aplicada no arquivo real em 11/08/2026) — incidente real de foco roubado do Felipe, 2 vezes:** a versão antiga desta rotina resolvia as janelas a min
   173: 
   174: **Por que esta doc parou de conter o código inteiro (11/08/2026):** enquanto o código ficava duplicado aqui E no arquivo `.js`, um fix podia ser escrito num lugar e esquecido no outro — foi exatamente
   175: 
>> 176: **Bug real encontrado (06/08/2026): faltava `-WindowStyle Hidden` na chamada `execSync`.** Sem essa flag, todo `minimizeChrome()` (chamado no `finally` de praticamente todo script do Modo Navegador) a
   177: 
   178: Uso: `require('./minimize-chrome.js').minimizeChrome()` chamado **dentro do mesmo script** que chamou `bringToFront()`, sempre antes de `process.exit()`, dentro de um `finally` (ver seção seguinte). N
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:186
```
   184: ## Sempre desconectar com `browser.close()` — regra obrigatória (crítica, 05/08/2026)
   185: 
>> 186: **Todo script DEVE chamar `await browser.close()` num bloco `finally`, antes de `process.exit()`.** Nunca terminar um script só com `process.exit(0)` sem desconectar antes.
   187: 
   188: **Causa raiz encontrada (investigação real, não suposição):** ao longo de uma sessão longa, dezenas de scripts conectam via `chromium.connectOverCDP('http://localhost:9222')` e terminam abruptamente c
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:194
```
   192: **Importante:** `browser.close()` numa sessão obtida via `connectOverCDP()` **não fecha o Chrome real** — apenas desconecta o cliente Playwright daquela sessão CDP, de forma limpa. É seguro chamar sem
   193: 
>> 194: **Padrão obrigatório para todo script novo:**
   195: 
   196: ```javascript
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:226
```
   224: **Investigação a fundo (com timestamps, não suposição) confirmou: `context.newPage()` sozinho — sem nenhum `bringToFront()` — pode trazer a janela do Chrome pro primeiro plano.** Medido com um monitor
   225: 
>> 226: **Consequência prática: TODO script que chama `context.newPage()` — não só os que chamam `bringToFront()` — precisa do mesmo tratamento de minimizar no `finally`.** A regra antiga (só minimizar quando
   227: 
   228: **Três bugs reais encontrados na função de minimizar em si, nenhum óbvio, todos confirmados com medição, não suposição:**
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:286
```
   284: **Por que o `minimizeChrome()` no `finally` de cada script (seção acima) não é suficiente sozinho:** ele depende de checagem repetida (polling a cada ~100-200ms) DEPOIS que a ação já rodou. Isso signi
   285: 
>> 286: **A solução estrutural: um processo separado, sempre rodando, que não fica checando de tempos em tempos — o Windows AVISA ele instantaneamente** via `SetWinEventHook` (hook de evento do sistema operac
   287: 
   288: **Dois eventos precisam ser monitorados juntos, não só um** — bug real encontrado durante a validação: monitorando só `EVENT_SYSTEM_FOREGROUND` (janela virou ativa), o vigia perdeu 2 de 4 casos de tes
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:438
```
   436: ## Ler/escrever no Google Sheets sem API e sem print (crítica, 08/08/2026)
   437: 
>> 438: **Por que essa regra existe:** o Google Sheets desenha a grade em canvas — não é texto de página normal, então o método padrão de leitura (`innerText`) não funciona pra ler célula nenhuma (só pega o m
   439: 
   440: **Solução validada:** clipboard do próprio Windows, sem nenhuma das duas coisas acima.
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:470
```
   468: ## Achar URLs de favoritos do Chrome (crítica, 08/08/2026)
   469: 
>> 470: **Método obrigatório: ler o arquivo de perfil do Chrome direto do disco — nunca abrir `chrome://bookmarks` como página navegada.**
   471: 
   472: - Arquivo: `AccountBookmarks` (JSON), dentro da pasta do perfil (ex: `ChromeDebugKarzen\Profile 3\AccountBookmarks`) — em alguns perfis o nome é `Bookmarks` em vez de `AccountBookmarks`, checar qual e
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:485
```
   483: - **A janela é real**, só minimizada — pode reaparecer em primeiro plano se algo forçar foco nela (ex: Alt+Tab). Risco aceito, não eliminável tecnicamente.
   484: - **Janela solta sem flags de debug pode se misturar com a de automação.** Em 04/08/2026, uma segunda janela do `chrome.exe` (sem `--remote-debugging-port` nenhum, perfil padrão) apareceu em primeiro 
>> 485: - **`context.newPage()` traz a janela pro primeiro plano — isso NÃO é mais um risco "não isolado", foi confirmado e resolvido em 05/08/2026** (ver seção própria acima). A causa é o próprio Chrome ativ
   486: 
   487: ## Pendências relacionadas (não fazem parte deste procedimento — registradas separadamente no caderno do projeto)
```

### .aiox-core/development/tasks/po-manage-story-backlog.md:43
```
   41: ```yaml
   42: required:
>> 43:   - story_id: 'STORY-XXX' # Source story
   44:   - item_type: 'F' # F=followup, O=optimization, T=technical-debt
   45:   - priority: 'HIGH|MEDIUM|LOW' # Priority level
```
*(bloco/entidade: `required`)*

### .aiox-core/development/tasks/po-manage-story-backlog.md:76
```
   74: - **Priority**: {priority_emoji} {priority}
   75: - **Effort**: {effort}
>> 76: - **Status**: 📋 TODO
   77: - **Assignee**: {assignee}
   78: - **Sprint**: {sprint}
```

### .aiox-core/development/tasks/po-manage-story-backlog.md:297
```
   295: ```yaml
   296: required:
>> 297:   - item_id: '[STORY-XXX-FY]' # Item to update
>> 298:   - new_status: 'TODO|IN_PROGRESS|BLOCKED|DONE|CANCELLED'
   299: 
   300: optional:
```
*(bloco/entidade: `required`)*

### .aiox-core/development/tasks/po-manage-story-backlog.md:314
```
   312: 
   313: **Status Values**:
>> 314: - 📋 **TODO**: Not started
   315: - 🚧 **IN PROGRESS**: Currently being worked on
   316: - ⏸️ **BLOCKED**: Waiting on dependency
```

### .aiox-core/development/tasks/po-manage-story-backlog.md:341
```
   339: 
   340: **Review Questions**:
>> 341: - Are all 📋 TODO items still relevant?
>> 342: - Should any 💡 IDEA items be promoted to TODO?
   343: - Are any items blocked for too long?
   344: - Do priorities still make sense?
```

### .aiox-core/development/tasks/po-manage-story-backlog.md:451
```
   449:      ▼
   450: ┌──────────┐
>> 451: │   TODO   │ ← Ready for work
   452: └────┬─────┘
   453:      │ (started)
```

### .aiox-core/development/tasks/po-manage-story-backlog.md:503
```
   501: Track effectiveness of Story Backlog:
   502: - **Item Completion Rate**: % of backlog items completed
>> 503: - **Age of Items**: How long items sit in TODO state
   504: - **Blocked Item Resolution**: Time to unblock blocked items
   505: - **Archive Frequency**: Regular archiving indicates healthy flow
```

### .aiox-core/development/tasks/qa-backlog-add-followup.md:226
```
   224:     input: textarea
   225:     validation: max 500 chars
>> 226:     placeholder: "Describe what needs to be followed up on and why"
   227: 
   228:   - Priority:
```
*(bloco/entidade: `- Detailed Description:`)*

### .aiox-core/development/tasks/qa-generate-tests.md:206
```
   204: tools:
   205:   - github-cli
>> 206: # TODO: Create test-generation-checklist.md for validation (follow-up story needed)
   207: # checklists:
   208: #   - test-generation-checklist.md
```

### .aiox-core/development/tasks/qa-review-story.md:432
```
   430: - Test design quality and maintainability
   431: - Test data management strategy
>> 432: - Mock/stub usage appropriateness
   433: - Edge case and error scenario coverage
   434: - Test execution time and reliability
```

### .aiox-core/development/tasks/qa-trace-requirements.md:378
```
   376: 2. Test types to implement (unit/integration/e2e/performance)
   377: 3. Test data requirements
>> 378: 4. Mock/stub strategies
   379: 
   380: ### Risk Assessment
```

### .aiox-core/development/tasks/squad-creator-sync-synkra.md:315
```
   313: |---------|------|-------------|
   314: | 1.0.0 | 2025-12-23 | Full implementation (Story SQS-5) |
>> 315: | 0.1.0 | 2025-12-18 | Initial placeholder |
   316: 
```

### .aiox-core/development/tasks/validate-next-story.md:234
```
   232: - Load `.aiox-core/product/templates/story-tmpl.yaml` and extract all section headings from the template
   233: - **Missing sections check**: Compare story sections against template sections to verify all required sections are present
>> 234: - **Placeholder validation**: Ensure no template placeholders remain unfilled (e.g., `{{EpicNum}}`, `{{role}}`, `_TBD_`)
   235: - **Agent section verification**: Confirm all sections from template exist for future agent use
   236: - **Structure compliance**: Verify story follows template structure and formatting
```

### .aiox-core/development/templates/aiox-doc-template.md:20
```
   18: 
   19: 1. Copy this template to your target location
>> 20: 2. Replace placeholder sections with actual content
   21: 3. Remove any sections that are not applicable
   22: 4. Follow the i18n guidelines if creating multilingual docs
```

### .aiox-core/development/templates/service-template/index.ts.hbs:56
```
   54:      */
   55:     async execute(): Promise<void> {
>> 56:       // TODO: Implement primary operation
   57:       throw new {{pascalCase serviceName}}Error(
>> 58:         'Not implemented',
   59:         {{pascalCase serviceName}}ErrorCode.NOT_IMPLEMENTED
   60:       );
```
*(bloco/entidade: `async execute(): Promise<void> {`)*

### .aiox-core/development/workflows/brownfield-discovery.yaml:456
```
   454:         - Total de débitos: X
   455:         - Críticos: Y | Altos: Z | Médios: W
>> 456:         - Esforço total estimado: XXX horas
   457: 
   458:         ## Inventário Completo de Débitos
```
*(bloco/entidade: `notes: |`)*

### .aiox-core/development/workflows/brownfield-discovery.yaml:526
```
   524:         | Débitos Críticos | Y |
   525:         | Esforço Total | Z horas |
>> 526:         | Custo Estimado | R$ XX.XXX |
   527: 
   528:         ### Recomendação
```

### .aiox-core/development/workflows/brownfield-discovery.yaml:538
```
   536:         | Categoria | Horas | Custo (R$150/h) |
   537:         |-----------|-------|-----------------|
>> 538:         | Sistema | XX | R$ X.XXX |
>> 539:         | Database | XX | R$ X.XXX |
>> 540:         | Frontend | XX | R$ X.XXX |
>> 541:         | **TOTAL** | **XXX** | **R$ XX.XXX** |
   542: 
   543:         ### Custo de NÃO RESOLVER (Risco Acumulado)
   544:         | Risco | Probabilidade | Impacto | Custo Potencial |
   545:         |-------|---------------|---------|-----------------|
>> 546:         | Breach de segurança | Alta | Crítico | R$ XXX.XXX |
>> 547:         | Perda de performance | Média | Alto | R$ XX.XXX |
>> 548:         | Churn de usuários | Média | Alto | R$ XX.XXX |
   549: 
>> 550:         **Custo potencial de não agir: R$ XXX.XXX**
   551: 
   552:         ---
```

### .aiox-core/development/workflows/brownfield-discovery.yaml:582
```
   580:         ### Fase 1: Quick Wins (1-2 semanas)
   581:         - [débitos de baixo esforço/alto impacto]
>> 582:         - Custo: R$ X.XXX
   583:         - ROI imediato
   584: 
   585:         ### Fase 2: Fundação (2-4 semanas)
   586:         - [débitos estruturais críticos]
>> 587:         - Custo: R$ X.XXX
   588:         - Habilita features futuras
   589: 
   590:         ### Fase 3: Otimização (4-6 semanas)
   591:         - [débitos de médio prazo]
>> 592:         - Custo: R$ X.XXX
   593:         - Melhoria contínua
   594: 
```

### .aiox-core/development/workflows/brownfield-discovery.yaml:601
```
   599:         | Investimento | Retorno Esperado |
   600:         |--------------|------------------|
>> 601:         | R$ XX.XXX (resolução) | R$ XXX.XXX (riscos evitados) |
>> 602:         | XXX horas | +Y% velocidade de dev |
   603:         | 6-8 semanas | Produto sustentável |
   604: 
```

### .aiox-core/development/workflows/brownfield-discovery.yaml:611
```
   609:         ## ✅ Próximos Passos
   610: 
>> 611:         1. [ ] Aprovar orçamento de R$ XX.XXX
   612:         2. [ ] Definir sprint de resolução
   613:         3. [ ] Alocar time técnico
```

### .aiox-core/docs/standards/OPEN-SOURCE-VS-SERVICE-DIFFERENCES.md:382
```
   380: 
   381: **Required:**
>> 382: - story: STORY-XXX
   383: - version: X.Y.Z
   384: - author: {name or team}
```

### .aiox-core/docs/standards/STORY-TEMPLATE-V2-SPECIFICATION.md:289
```
   287: | Title | Yes | `# Story X.X: [Title]` | Descriptive, action-oriented |
   288: | Epic | Yes | Text | Parent epic name |
>> 289: | Story ID | Yes | `X.X` or `XXX-N` | Unique identifier |
   290: | Sprint | Yes | Number | Sprint number |
   291: | Priority | Yes | Emoji + Text | 🔴 Critical, 🟠 High, 🟡 Medium, 🟢 Low |
```

### .aiox-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md:58
```
   56:       tipo: acceptance
   57:       blocker: [false]
>> 58:       story: [STORY-XXX]
   59:       manual_check: [true|false]
   60: 
```
*(bloco/entidade: `- [ ] [acceptance description]`)*

### .aiox-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md:98
```
   96: 
   97: **Metadata:**
>> 98: - story: [STORY-XXX]
   99: - version: [X.Y.Z]
   100: - dependencies: [array of step IDs]
```

### .aiox-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md:343
```
   341:       tipo: acceptance
   342:       blocker: false
>> 343:       story: [STORY-XXX]
   344:       manual_check: [true|false]
   345:       test: [test file path]
```
*(bloco/entidade: `- [ ] [description]`)*

### .aiox-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md:695
```
   693: ```yaml
   694: **Metadata:**
>> 695: - story: [STORY-XXX]
   696: - version: [X.Y.Z]
   697: - dependencies: [array of step IDs]
```

### .aiox-core/hooks/unified/hook-interface.js:55
```
   53:     if (!claudeEvent) return null;
   54: 
>> 55:     // TODO: Restore when runners/ directory is implemented (Story MIS-2)
   56:     // Runners not yet implemented - path .aiox-core/hooks/unified/runners/ does not exist
   57:     return null;
```
*(bloco/entidade: `toClaudeConfig() {`)*

### .aiox-core/hooks/unified/hook-interface.js:73
```
   71:     const geminiEvent = EVENT_MAPPING[this.event]?.gemini;
   72: 
>> 73:     // TODO: Restore when runners/ directory is implemented (Story MIS-2)
   74:     // Runners not yet implemented - path .aiox-core/hooks/unified/runners/ does not exist
   75:     return null;
```
*(bloco/entidade: `toGeminiConfig() {`)*

### .aiox-core/infrastructure/integrations/gemini-extensions/cloudrun-adapter.js:119
```
   117: 
   118:   async _executeDeploy(config) {
>> 119:     // Placeholder for actual Gemini /deploy integration
   120:     return {
   121:       success: true,
```
*(bloco/entidade: `async _executeDeploy(config) {`)*

### .aiox-core/infrastructure/integrations/gemini-extensions/supabase-adapter.js:83
```
   81:     return {
   82:       synced: false,
>> 83:       message: 'MCP sync not implemented',
   84:     };
   85:   }
```
*(bloco/entidade: `return {`)*

### .aiox-core/infrastructure/integrations/gemini-extensions/workspace-adapter.js:90
```
   88:   async _executeWorkspace(prompt) {
   89:     // This would integrate with Gemini CLI's workspace extension
>> 90:     // For now, return a placeholder
   91:     return {
   92:       success: true,
```
*(bloco/entidade: `async _executeWorkspace(prompt) {`)*

### .aiox-core/infrastructure/scripts/atomic-layer-classifier.js:6
```
   4:  * Atomic Layer Classifier
   5:  * Story: 6.1.7.1 - Task Content Completion
>> 6:  * Purpose: Resolve {TODO: Atom|Molecule|Organism} placeholders in all 114 task files
   7:  * 
   8:  * Classification based on AIOX atomic design hierarchy:
```
*(bloco/entidade: `/**`)*

### .aiox-core/infrastructure/scripts/atomic-layer-classifier.js:22
```
   20: // Configuration
   21: const TASKS_DIR = path.join(__dirname, '../tasks');
>> 22: const TODO_PATTERN = /atomic_layer: \{TODO: Atom\|Molecule\|Organism\}/g;
   23: 
   24: // Classification rules based on task complexity and purpose
```

### .aiox-core/infrastructure/scripts/atomic-layer-classifier.js:194
```
   192:   const content = fs.readFileSync(filePath, 'utf8');
   193:   
>> 194:   // Check if TODO exists
   195:   if (!TODO_PATTERN.test(content)) {
>> 196:     return { skipped: true, reason: 'no TODO placeholder found' };
   197:   }
   198:   
```
*(bloco/entidade: `processTaskFile`)*

### .aiox-core/infrastructure/scripts/atomic-layer-classifier.js:210
```
   208:   }
   209:   
>> 210:   // Replace TODO with actual classification
   211:   const updatedContent = content.replace(
   212:     TODO_PATTERN,
```

### .aiox-core/infrastructure/scripts/codex-skills-sync/validate.js:130
```
   128: 
   129: /**
>> 130:  * Finds the canonical AIOX agent path declared in a generated skill stub.
   131:  */
   132: function extractCanonicalAgentPath(content) {
```
*(bloco/entidade: `/**`)*

### .aiox-core/infrastructure/scripts/coverage-analyzer.js:400
```
   398: 
   399:       // Count mocks
>> 400:       const mocks = content.match(/\b(?:mock|spy|stub|fake)\b/gi) || [];
   401:       analysis.mock_count = mocks.length;
   402: 
```
*(bloco/entidade: `try {`)*

### .aiox-core/infrastructure/scripts/documentation-integrity/gitignore-generator.js:172
```
   170:   }
   171: 
>> 172:   // Replace date placeholder
   173:   mergeSection = mergeSection.replace(
   174:     '{{GENERATED_DATE}}',
```
*(bloco/entidade: ``;`)*

### .aiox-core/infrastructure/scripts/documentation-synchronizer.js:1284
```
   1282: 
   1283:   findSimilarCode(codeBlock, actualCode) {
>> 1284:     // This is a placeholder - real implementation would use more sophisticated matching
   1285:     return codeBlock;
   1286:   }
```
*(bloco/entidade: `findSimilarCode(codeBlock, actualCode) {`)*

### .aiox-core/infrastructure/scripts/framework-analyzer.js:713
```
   711:   }
   712: 
>> 713:   // Stub methods for more complex analysis
   714:   extractTaskParameters(content) { return []; }
   715:   analyzeImplementationStatus(content) { return 'unknown'; }
```

### .aiox-core/infrastructure/scripts/gotchas-documenter.js:141
```
   139:     'vitest',
   140:     'mock',
>> 141:     'stub',
   142:     'expect',
   143:     'assert',
```
*(bloco/entidade: `[Category.TESTING]: [`)*

### .aiox-core/infrastructure/scripts/modification-validator.js:304
```
   302:     };
   303: 
>> 304:     // Check for placeholder consistency
   305:     const placeholders = modifiedContent.match(/\{\{[^}]+\}\}/g) || [];
   306:     const uniquePlaceholders = [...new Set(placeholders)];
```
*(bloco/entidade: `async validateTemplateModification(originalContent, modifiedContent, options) {`)*

### .aiox-core/infrastructure/scripts/performance-and-error-resolver.js:137
```
   135:   
   136:   // 1. Replace duration_expected
>> 137:   if (content.includes('duration_expected: {TODO: X minutes}')) {
   138:     content = content.replace(
>> 139:       /duration_expected: \{TODO: X minutes\}/g,
   140:       `duration_expected: ${PERFORMANCE_BY_LAYER[atomicLayer].duration}`,
   141:     );
```

### .aiox-core/infrastructure/scripts/performance-and-error-resolver.js:146
```
   144:   
   145:   // 2. Replace cost_estimated
>> 146:   if (content.includes('cost_estimated: {TODO: $X}')) {
   147:     content = content.replace(
>> 148:       /cost_estimated: \{TODO: \$X\}/g,
   149:       `cost_estimated: ${PERFORMANCE_BY_LAYER[atomicLayer].cost}`,
   150:     );
```

### .aiox-core/infrastructure/scripts/performance-and-error-resolver.js:156
```
   154:   // 3. Replace error handling strategy
   155:   const errorStrategy = determineErrorStrategy(filename);
>> 156:   if (content.includes('**Strategy:** {TODO: Fail-fast | Graceful degradation | Retry with backoff}')) {
   157:     content = content.replace(
>> 158:       /\*\*Strategy:\*\* \{TODO: Fail-fast \| Graceful degradation \| Retry with backoff\}/g,
   159:       `**Strategy:** ${errorStrategy}`,
   160:     );
```

### .aiox-core/infrastructure/scripts/performance-and-error-resolver.js:165
```
   163:   
   164:   if (!modified) {
>> 165:     return { skipped: true, reason: 'no TODO placeholders found' };
   166:   }
   167:   
```
*(bloco/entidade: `if (!modified) {`)*

### .aiox-core/infrastructure/scripts/performance-optimizer.js:1771
```
   1769:   async profileRuntime(filePath) {
   1770:     // This would require actual runtime profiling
>> 1771:     // For now, return placeholder metrics
   1772:     return {
   1773:       executionTime: 0,
```
*(bloco/entidade: `async profileRuntime(filePath) {`)*

### .aiox-core/infrastructure/scripts/pm-adapter.js:35
```
   33:    * @param {string} storyPath - Absolute path to story YAML file
   34:    * @returns {Promise<{success: boolean, url?: string, error?: string}>}
>> 35:    * @throws {Error} If not implemented by subclass
   36:    *
   37:    * @example
```
*(bloco/entidade: `/**`)*

### .aiox-core/infrastructure/scripts/pm-adapter.js:55
```
   53:    * @param {string} storyId - Story ID (e.g., "3.14")
   54:    * @returns {Promise<{success: boolean, updates?: object, error?: string}>}
>> 55:    * @throws {Error} If not implemented by subclass
   56:    *
   57:    * @example
```
*(bloco/entidade: `/**`)*

### .aiox-core/infrastructure/scripts/pm-adapter.js:75
```
   73:    * @param {object} storyData - Story metadata (id, title, description, etc.)
   74:    * @returns {Promise<{success: boolean, url?: string, error?: string}>}
>> 75:    * @throws {Error} If not implemented by subclass
   76:    *
   77:    * @example
```
*(bloco/entidade: `/**`)*

### .aiox-core/infrastructure/scripts/pm-adapter.js:97
```
   95:    * @param {string} status - New status (Draft, InProgress, Review, Done)
   96:    * @returns {Promise<{success: boolean, error?: string}>}
>> 97:    * @throws {Error} If not implemented by subclass
   98:    *
   99:    * @example
```
*(bloco/entidade: `/**`)*

### .aiox-core/infrastructure/scripts/pm-adapter.js:113
```
   111:    *
   112:    * @returns {Promise<{success: boolean, error?: string}>}
>> 113:    * @throws {Error} If not implemented by subclass
   114:    *
   115:    * @example
```
*(bloco/entidade: `/**`)*

### .aiox-core/infrastructure/scripts/pr-review-ai.js:364
```
   362: 
   363:       // Code smells
>> 364:       { regex: /TODO|FIXME|HACK|XXX/gi, message: 'TODO/FIXME comment', severity: Severity.INFO },
   365:       {
   366:         regex: /console\.(log|debug|info)\s*\(/g,
```
*(bloco/entidade: `this.patterns = [`)*

### .aiox-core/infrastructure/scripts/qa-loop-orchestrator.js:550
```
   548:     this._log('   Task: qa-review-story.md');
   549: 
>> 550:     // TODO: In production, this would invoke the QA agent
   551:     // For now, we simulate the interface
   552: 
```
*(bloco/entidade: `async executeReview() {`)*

### .aiox-core/infrastructure/scripts/qa-loop-orchestrator.js:578
```
   576:     this._log('   Task: qa-create-fix-request.md');
   577: 
>> 578:     // TODO: In production, this would invoke the QA agent
   579:     // For now, we return a simulated structure
   580: 
```
*(bloco/entidade: `async executeFixRequest(reviewResult) {`)*

### .aiox-core/infrastructure/scripts/qa-loop-orchestrator.js:597
```
   595:     this._log('   Task: dev-apply-qa-fixes.md');
   596: 
>> 597:     // TODO: In production, this would invoke the Dev agent
   598:     // For now, we return a simulated structure
   599: 
```
*(bloco/entidade: `async executeFix(fixRequest) {`)*

### .aiox-core/infrastructure/scripts/refactoring-suggester.js:1032
```
   1030:     try {
   1031:       // This would integrate with the actual refactoring implementation
>> 1032:       // For now, it's a placeholder showing the structure
   1033:       
   1034:       const result = {
```
*(bloco/entidade: `try {`)*

### .aiox-core/infrastructure/scripts/refactoring-suggester.js:1054
```
   1052:           break;
   1053:         default:
>> 1054:           throw new Error(`Refactoring type ${suggestion.type} not implemented`);
   1055:       }
   1056: 
```
*(bloco/entidade: `default`)*

### .aiox-core/infrastructure/scripts/refactoring-suggester.js:1070
```
   1068:   }
   1069: 
>> 1070:   // Placeholder methods for applying refactorings
   1071:   async applyMethodExtraction(suggestion) {
   1072:     // Implementation would use AST transformation
```

### .aiox-core/infrastructure/scripts/spot-check-validator.js:25
```
   23:   
   24:   // 1. Task identifier check
>> 25:   if (content.includes('{TODO: task identifier}')) {
   26:     errors.push('Task identifier not resolved');
   27:   } else {
```
*(bloco/entidade: `validateTask`)*

### .aiox-core/infrastructure/scripts/spot-check-validator.js:35
```
   33:   
   34:   // 2. Agent assignment check
>> 35:   if (content.includes('{TODO: Agent Name}')) {
   36:     errors.push('Agent assignment not resolved');
   37:   }
   38:   
   39:   // 3. Atomic layer check
>> 40:   if (content.includes('{TODO: Atom|Molecule|Organism}')) {
   41:     errors.push('Atomic layer not resolved');
   42:   } else {
```
*(bloco/entidade: `validateTask`)*

### .aiox-core/infrastructure/scripts/spot-check-validator.js:55
```
   53:   
   54:   // 4. Performance metrics check
>> 55:   if (content.includes('{TODO: X minutes}')) {
   56:     errors.push('Duration metric not resolved');
   57:   }
>> 58:   if (content.includes('{TODO: $X}')) {
   59:     errors.push('Cost metric not resolved');
   60:   }
   61:   
   62:   // 5. Error strategy check
>> 63:   if (content.includes('{TODO: Fail-fast | Graceful degradation | Retry with backoff}')) {
   64:     errors.push('Error strategy not resolved');
   65:   }
```

### .aiox-core/infrastructure/scripts/test-quality-assessment.js:348
```
   346:     
   347:     // Mock usage indicating interaction testing
>> 348:     const mockUsage = content.match(/\b(?:mock|spy|stub|fake)\b/gi) || [];
   349:     score.details.interaction_testing = mockUsage.length > 0;
   350:     if (score.details.interaction_testing) score.value += 3;
```

### .aiox-core/infrastructure/scripts/test-quality-assessment.js:610
```
   608:     const mocks = {
   609:       jest_mocks: content.match(/jest\.mock\(|jest\.fn\(\)|mockImplementation/g) || [],
>> 610:       sinon_mocks: content.match(/sinon\.mock\(|sinon\.spy\(|sinon\.stub\(/g) || [],
   611:       vitest_mocks: content.match(/vi\.mock\(|vi\.fn\(\)|mockImplementation/g) || [],
   612:     };
```
*(bloco/entidade: `mocks`)*

### .aiox-core/infrastructure/scripts/tool-resolver.js:245
```
   243:           // Execute shell command and check exit code
   244:           // Note: Actual implementation would use child_process
>> 245:           // For now, return true (not implemented)
   246:           return true;
   247: 
   248:         case 'http':
   249:           // Make HTTP request and check status
   250:           // Note: Actual implementation would use fetch/axios
>> 251:           // For now, return true (not implemented)
   252:           return true;
   253: 
```
*(bloco/entidade: `case 'command':`)*

### .aiox-core/infrastructure/scripts/validate-agents.js:306
```
   304:           command: cmd,
   305:           message: `Command "${cmd}" in @${id} uses deprecated string format`,
>> 306:           suggestion: `Consider converting to: - name: ${cmd.split(':')[0].trim()}\n    description: "${cmd.split(':')[1]?.trim() || 'TODO: add description'}"`,
   307:         });
   308:       }
```
*(bloco/entidade: `warnings.push({`)*

### .aiox-core/infrastructure/templates/aiox-sync.yaml.template:39
```
   37: # ═══════════════════════════════════════════════════════════════════════════════
   38: # Source → destination patterns
>> 39: # Use {squad_alias} placeholder for dynamic squad alias substitution
   40: sync_mappings:
   41: 
```

### .aiox-core/infrastructure/tools/mcp/clickup.yaml:276
```
   274:           {
   275:             "history_items": [
>> 276:               { "field": "status", "before": "todo", "after": "in progress" }
   277:             ]
   278:           }
```
*(bloco/entidade: `"history_items": [`)*

### .aiox-core/infrastructure/tools/mcp/google-workspace.yaml:440
```
   438:               if (timezone && timezone !== 'UTC') {
   439:                 // Simplified - real implementation would convert timezone name to offset
>> 440:                 return `${result}-05:00`; // Placeholder for America/New_York
   441:               }
   442:               return result;
```
*(bloco/entidade: `if (timezone && timezone !== 'UTC') {`)*

### .aiox-core/product/data/atomic-design-principles.md:63
```
   61: **Rules:**
   62: - Defines page structure
>> 63: - Placeholder content
   64: - Reusable across pages
   65: 
```

### .aiox-core/product/data/wcag-compliance-guide.md:138
```
   136: 
   137: // ❌ Bad
>> 138: <input placeholder="Email" />  // No label
   139: ```
   140: 
```

### .aiox-core/product/templates/brownfield-prd-tmpl.yaml:132
```
   130:         instruction: Each Requirement will be a bullet markdown with identifier starting with FR
   131:         examples:
>> 132:           - "FR1: The existing Todo List will integrate with the new AI duplicate detection service without breaking current functionality."
   133:       - id: non-functional
   134:         title: Non Functional
```
*(bloco/entidade: `examples`)*

### .aiox-core/product/templates/engine/validator.js:178
```
   176:       for (const variable of metadata.variables) {
   177:         if (variable.required) {
>> 178:           const placeholder = `{{${variable.name}}}`;
>> 179:           if (content.includes(placeholder)) {
   180:             errors.push(`Unresolved required variable: ${variable.name}`);
   181:           }
```
*(bloco/entidade: `if (variable.required) {`)*

### .aiox-core/product/templates/github-actions-cd.yml:126
```
   124:       #     vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
   125: 
>> 126:       - name: Deploy (placeholder)
   127:         id: deploy
   128:         run: |
```
*(bloco/entidade: `steps`)*

### .aiox-core/product/templates/github-actions-cd.yml:164
```
   162:       #     vercel-args: '--prod'
   163: 
>> 164:       - name: Deploy (placeholder)
   165:         id: deploy
   166:         run: |
```
*(bloco/entidade: `steps`)*

### .aiox-core/product/templates/personalized-task-template-v2.md:297
```
   295:     tipo: acceptance
   296:     blocker: false                # Non-blocking
>> 297:     story: {STORY-XXX}
   298:     manual_check: {true|false}
   299:     test: {test_file_path}        # If automated
```
*(bloco/entidade: `- [ ] {criterion_description}`)*

### .aiox-core/product/templates/personalized-task-template-v2.md:304
```
   302:     tipo: acceptance
   303:     blocker: false
>> 304:     story: {STORY-XXX}
   305:     manual_check: true
   306: ```
```
*(bloco/entidade: `- [ ] {criterion_description_2}`)*

### .aiox-core/product/templates/personalized-task-template-v2.md:620
```
   618: ```yaml
   619: **Metadata:**
>> 620: - story: {STORY-XXX}
   621: - version: {X.Y.Z}
   622: - dependencies: [{task1}, {task2}]     # Other tasks this depends on
```

### .aiox-core/product/templates/prd-tmpl.yaml:45
```
   43:         instruction: Each Requirement will be a bullet markdown and an identifier sequence starting with FR
   44:         examples:
>> 45:           - "FR6: The Todo List uses AI to detect and warn against potentially duplicate todo items that are worded differently."
   46:       - id: non-functional
   47:         title: Non Functional
```
*(bloco/entidade: `examples`)*

### .aiox-core/product/templates/rls-policies-tmpl.yaml:727
```
   725:       -- Check query plan (look for Sequential Scan vs Index Scan)
   726:       EXPLAIN ANALYZE
>> 727:       SELECT * FROM users WHERE user_id = 'xxx';
   728: 
   729:       -- Monitor slow queries
```

### .aiox-core/product/templates/tokens-schema-tmpl.yaml:296
```
   294:       text:
   295:         "$value": "{{color_text}}"
>> 296:       placeholder:
   297:         "$value": "{{color_neutral_500}}"
   298: 
```
*(bloco/entidade: `input`)*

### .aiox-core/scripts/aiox-doc-template.md:80
```
   78: - **examples**: Array of example content (not included in output)
   79: - **choices**: Object with choice options for common decisions
>> 80: - **placeholder**: Default placeholder text
   81: 
   82: #### Structure
```

### .aiox-core/scripts/test-template-system.js:798
```
   796:     
   797:     Object.entries(sections).forEach(([key, value]) => {
>> 798:       const placeholder = `{{${key}}}`;
>> 799:       result = result.replace(new RegExp(placeholder, 'g'), value || '');
   800:     });
   801: 
```
*(bloco/entidade: `Object.entries(sections).forEach(([key, value]) => {`)*

### squads/squad-creator-pro/benchmarks/golden/hormozi-golden.yaml:283
```
   281:     topic: "Desenvolvimento tecnico de produto / engenharia de software"
   282:     signal: "Foco exclusivo em oferta/marketing, nunca discute construcao tecnica"
>> 283:     evidence: "Zero mencoes a codigo, arquitetura, engineering em todo material"
   284:     test: "Se clone da conselho tecnico de produto = FALHA"
   285: 
```
*(bloco/entidade: `- id: "LIM002"`)*

### squads/squad-creator-pro/checklists/agent-depth-checklist.md:50
```
   48:     O limite de R$ 81k não é apenas um número - é o ponto onde
   49:     o MEI perde TODOS os benefícios da simplicidade. Um MEI que
>> 50:     ultrapassa sem perceber pode ter tributação RETROATIVA de todo
   51:     o ano. Por isso, alertar CEDO é mais importante que alertar CORRETAMENTE.
   52:   steps:
```
*(bloco/entidade: `philosophy: |`)*

### squads/squad-creator-pro/checklists/deep-research-quality.md:60
```
   58: - [ ] Each scope section has substantive content (50+ lines minimum)
   59: - [ ] Sections follow logical progression
>> 60: - [ ] No empty or placeholder sections
   61: - [ ] Headers use consistent formatting (## for main, ### for sub)
   62: 
```

### squads/squad-creator-pro/checklists/deep-research-quality.md:350
```
   348: 
   349: - [ ] **Missing sections** from original scope
>> 350: - [ ] **Stub sections** (<20 lines)
   351: - [ ] **Copy-paste blocks** without analysis
   352: - [ ] **No framework extraction possible**
```

### squads/squad-creator-pro/checklists/executor-matrix-checklist.md:3
```
   1: # Executor Matrix Validation Checklist
   2: 
>> 3: > **Pattern Reference:** HO-EP-xxx (Executor Patterns)
   4: > **Source:** AIOX Executor Matrix Standard
   5: > **Version:** 1.0.0
```

### squads/squad-creator-pro/checklists/executor-matrix-checklist.md:141
```
   139: | [ ] Velocidade atende SLA do workflow | |
   140: | [ ] Fallback definido (se aplicavel) | |
>> 141: | [ ] Pattern ID referenciado (HO-EP-xxx) | |
   142: 
   143: ### 3.4 Exemplo de Atribuicao Correta
```

### squads/squad-creator-pro/checklists/executor-matrix-checklist.md:227
```
   225: | [ ] Nenhum Agent atribuido a decisao critica | |
   226: | [ ] Nenhum Worker atribuido a task que requer julgamento | |
>> 227: | [ ] Todo Agent tem fallback definido | |
>> 228: | [ ] Todo Worker tem fallback definido | |
>> 229: | [ ] Todo Hybrid tem criterios de validacao | |
   230: 
   231: ---
```

### squads/squad-creator-pro/checklists/executor-matrix-checklist.md:242
```
   240: | 2 | Cada task tem `execution_type` definido | [ ] |
   241: | 3 | Cada task tem `responsible_executor` definido | [ ] |
>> 242: | 4 | Pattern ID referenciado (HO-EP-xxx) | [ ] |
   243: | 5 | Rationale documentado para cada atribuicao | [ ] |
   244: | 6 | Matriz de decisao utilizada | [ ] |
```

### squads/squad-creator-pro/checklists/quality-gate-checklist.md:14
```
   12: ## 1. Campos Obrigatorios
   13: 
>> 14: Todo Quality Gate DEVE conter os seguintes campos:
   15: 
   16: | Campo | Tipo | Descricao | Exemplo |
```

### squads/squad-creator-pro/data/an-clone-anti-patterns.yaml:7
```
   5: anti_patterns:
   6:   never_do:
>> 7:     - action: "Jogar TODO conteudo da pessoa sem curadoria"
   8:       reason: "Volume ≠ qualidade. Se entrar coco, sai coco."
   9:       symptom: "Clone responde generico, sem personalidade"
```
*(bloco/entidade: `never_do`)*

### squads/squad-creator-pro/data/core-heuristics.md:8
```
   6: > **Prefix:** SC (Squad-Creator)
   7: 
>> 8: Este documento define as heuristicas basicas que todo squad deve implementar para garantir decisoes consistentes e auditaveis.
   9: 
   10: ---
```

### squads/squad-creator-pro/data/extraction-mentoria-processos-dec19.yaml:147
```
   145:       condition: "SE vai implementar ferramenta nova no time"
   146:       action: "ENTAO limitar visualizacao da informacao. Cada pessoa ve SO o que precisa executar"
>> 147:       rationale: "PV tentou treinar todo mundo em ClickUp -> caos. Limitou visao -> funcionou"
   148:       source: "[SOURCE: @1:24:00-1:28:00]"
   149: 
```
*(bloco/entidade: `- id: "PV-PROC-001"`)*

### squads/squad-creator-pro/data/extraction-mentoria-processos-dec19.yaml:214
```
   212:       action: "NUNCA permitir. Criar impossibilidade sistemica"
   213:       source: "[SOURCE: PV @1:32:00-1:33:00]"
>> 214:     - condition: "SE quer que time entenda todo o sistema"
   215:       action: "NUNCA explicar como funciona o carburador. So mostrar o painel"
   216:       source: "[SOURCE: AN @1:13:00-1:16:00]"
```
*(bloco/entidade: `veto`)*

### squads/squad-creator-pro/data/extraction-mentoria-processos-dec19.yaml:237
```
   235: 
   236:     - title: "R$1M/mes com time de 3 e mesma copy"
>> 237:       context: "2017, mesmo video de vendas rodando o ano todo, time de 3 pessoas"
   238:       result: "R$1M/mes faturando, mesma copy, mesmo VSL"
   239:       lesson: "Processo de teste continuo > trocar tudo"
```
*(bloco/entidade: `- title: "R$1M/mes com time de 3 e mesma copy"`)*

### squads/squad-creator-pro/data/extraction-mentoria-processos-dec19.yaml:293
```
   291:     conventional: "Treinar o time para entender a ferramenta/processo"
   292:     expert_position: "Limitar a visao e impossibilitar caminhos errados"
>> 293:     reasoning: "PV tentou treinar todo mundo -> caos. Limitou visao -> funcionou"
   294:     evidence: "[SOURCE: PV @1:24:00-1:33:00]"
   295: 
```
*(bloco/entidade: `- id: "INV-002"`)*

### squads/squad-creator-pro/data/hybridops-patterns.md:101
```
   99: 4. [Axioma Validator Pattern](#axioma-validator-pattern)
   100: 5. [Quality Gate Patterns (HO-PP-003)](#quality-gate-patterns)
>> 101: 6. [Executor Assignment Patterns (HO-EP-XXX)](#executor-assignment-patterns)
   102: 7. [Coherence Validation Patterns](#coherence-validation-patterns)
   103: 
```

### squads/squad-creator-pro/data/hybridops-patterns.md:830
```
   828:       - "Agent markdown parses without error"
   829:       - "All required fields present"
>> 830:       - "No undefined placeholder values"
   831:     threshold: "100% criteria met"
   832:     pass_action: ["Deploy agent", "Generate documentation"]
```
*(bloco/entidade: `criteria`)*

### squads/squad-creator-pro/data/hybridops-patterns.md:850
```
   848: ---
   849: 
>> 850: ## EXECUTOR ASSIGNMENT PATTERNS (HO-EP-XXX)
   851: 
   852: ### HO-EP-001: Human Executor Pattern
```

### squads/squad-creator-pro/data/mental-model-task-matrix.yaml:76
```
   74:         step_name: "FRAMEWORK_HANDOFF_READY"
   75:         checkpoint_type: "veto"
>> 76:         question: "Insumos como um TODO trazem clareza ou confusão?"
   77:         action_if_pass: "HANDOFF para PV"
   78:         action_if_fail: "LOOP - simplificar antes de entregar"
```
*(bloco/entidade: `- task: "validate-extraction"`)*

### squads/squad-creator-pro/data/pv-output-examples.yaml:36
```
   34:   - input: "A task está criando uma nova task sempre que executa"
   35:     output: |
>> 36:       Opa, classic problema de IDS não implementado.
   37: 
   38:       **A pergunta é:** O agente consultou o Entity Registry antes de criar?
```
*(bloco/entidade: `output: |`)*

### squads/squad-creator-pro/data/pv-output-examples.yaml:292
```
   290: 
   291:       **2. Quantas vezes?**
>> 292:       Se é checado em todo agent, todo workflow... é repetição.
   293:       Repetição = automação.
   294: 
```
*(bloco/entidade: `output: |`)*

### squads/squad-creator-pro/data/pv-workflow-validation.yaml:193
```
   191: 
   192: validation_script_pattern:
>> 193:   description: "Todo epic/story deve ter script de validação automatizada"
   194:   template: |
   195:     #!/bin/bash
```
*(bloco/entidade: `validation_script_pattern`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_001.md:123
```
   121: 
   122: ### Inference Without Source
>> 123: - **Trigger:** Conceito parece óbvio, "todo mundo sabe"
   124: - **Manifestation:** Clone fala coisas que expert nunca disse
   125: - **Detection:** Buscar citação, não encontrar [SOURCE:]
```

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_003.md:22
```
   20:     result_contribution: "~51%"
   21:     icon: "🔥"
>> 22:     action: "PROTEGER a todo custo"
   23:     characteristics:
   24:       - "Só você consegue fazer"
```
*(bloco/entidade: `zone_genius`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PA_001.md:173
```
   171: ---
   172: 
>> 173: **Pattern Compliance:** HO-PP-003 (Quality Gate) ✓ | HO-EP-XXX (Executor Patterns) ✓
   174: **Source:** PV Mind Artifacts - Heurísticas de Decisão
   175: 
```

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PM_001.md:190
```
   188: ---
   189: 
>> 190: **Pattern Compliance:** HO-PP-003 (Quality Gate) ✓ | HO-AP-XXX (Automation Patterns) ✓
   191: **Source:** PV Mind Artifacts - Heurísticas de Decisão
   192: 
```

### squads/squad-creator-pro/scripts/model-tier-validator.cjs:84
```
   82:   for (const [dimName, dimConfig] of Object.entries(rubric.dimensions)) {
   83:     // This would need actual comparison logic
>> 84:     // For now, placeholder scoring
   85:     const dimScore = evaluateDimension(dimName, output, baseline, testCase);
   86:     scores[dimName] = {
```
*(bloco/entidade: `for (const [dimName, dimConfig] of Object.entries(rubric.dimensions)) {`)*

### squads/squad-creator-pro/scripts/tests/test_clone_review.sh:147
```
   145: # Minimal Clone
   146: 
>> 147: This is a simple placeholder.
   148: Not much here.
   149: FIXTURE
```

### squads/squad-creator-pro/scripts/tests/test_fidelity_score.sh:229
```
   227: 
   228: This clone has minimal content.
>> 229: Just a placeholder.
   230: FIXTURE
   231: 
```

### squads/squad-creator-pro/scripts/tests/test_security_scanner.py:48
```
   46: 
   47:     def test_ignores_placeholder(self):
>> 48:         """Should ignore placeholder values"""
   49:         with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as f:
   50:             f.write('config:\n  api_key: "${API_KEY}"\n')
```
*(bloco/entidade: `def test_ignores_placeholder(self):`)*

### squads/squad-creator-pro/scripts/tests/test_validate_clone.sh:216
```
   214: assert_contains "hack_skipped" "SKIPPED" "$output"
   215: 
>> 216: # --- Test 6: --assume-hack pass ---
>> 217: echo "  Test: assume hack pass"
>> 218: output=$(bash "$SCRIPT" "$TMP/quality-clone.md" --assume-hack pass 2>&1)
   219: assert_contains "hack_assumed_pass" "ASSUMED_PASS" "$output"
   220: 
>> 221: # --- Test 7: --assume-hack fail ---
>> 222: echo "  Test: assume hack fail"
>> 223: output=$(bash "$SCRIPT" "$TMP/quality-clone.md" --assume-hack fail 2>&1)
   224: assert_contains "hack_assumed_fail" "ASSUMED_FAIL" "$output"
   225: 
```

### squads/squad-creator-pro/scripts/tests/test_validate_clone.sh:239
```
   237: # --- Test 10: Decision tree thresholds ---
   238: echo "  Test: decision tree"
>> 239: # Quality clone with hack fail should FAIL
>> 240: output=$(bash "$SCRIPT" "$TMP/quality-clone.md" --assume-hack fail 2>&1)
   241: verdict=$(echo "$output" | grep "decision:" | head -1)
   242: assert_contains "hack_fail_verdict" "FAIL" "$verdict"
```

### squads/squad-creator-pro/scripts/validate-clone.sh:3
```
   1: #!/bin/bash
   2: # validate-clone.sh - Deterministic clone validation (no LLM needed for 90%)
>> 3: # Usage: ./validate-clone.sh <clone-file> [--sources <dir>] [--assume-hack pass|fail] [--json]
   4: #
   5: # Combines: fidelity-score.sh + authenticity markers + decision tree
>> 6: # Hackability test requires LLM interaction — use --assume-hack for override
   7: 
   8: set -e
```

### squads/squad-creator-pro/scripts/validate-clone.sh:23
```
   21:             shift 2
   22:             ;;
>> 23:         --assume-hack)
   24:             ASSUME_HACK="$2"
   25:             shift 2
```
*(bloco/entidade: `case $1 in`)*

### squads/squad-creator-pro/scripts/validate-clone.sh:43
```
   41: 
   42: if [[ -z "$CLONE_FILE" ]]; then
>> 43:     echo "Usage: $0 <clone-file> [--sources <dir>] [--assume-hack pass|fail] [--json]"
   44:     echo ""
   45:     echo "Validates clone quality using fidelity score, authenticity markers, and decision tree."
   46:     echo ""
   47:     echo "Options:"
   48:     echo "  --sources <dir>     Directory with source files for source quality check"
>> 49:     echo "  --assume-hack pass  Assume hackability test passed (default: skip from verdict)"
>> 50:     echo "  --assume-hack fail  Assume hackability test failed"
   51:     echo "  --json              Output JSON instead of YAML"
   52:     exit 1
```
*(bloco/entidade: `if [[ -z "$CLONE_FILE" ]]; then`)*

### squads/squad-creator-pro/scripts/validate-clone.sh:203
```
   201: fi
   202: 
>> 203: # AM10: Pressure resilience (REQUIRES LLM - skip or use --assume-hack)
   204: AM10="REQUIRES_LLM"
   205: AM10_EVIDENCE="Interactive hackability test required"
```

### squads/squad-creator-pro/tasks/an-assess-sources.md:62
```
   60:     - "NÃO divida vídeos em segmentos"
   61:     - "NÃO trate seções de livro como fontes diferentes"
>> 62:     - "NÃO avalie partes de um todo separadamente"
   63: 
   64:   # EXEMPLOS CORRETOS vs INCORRETOS
```
*(bloco/entidade: `never_do`)*

### squads/squad-creator-pro/tasks/an-assess-sources.md:79
```
   77:     O usuário BAIXA e PROCESSA fontes no nível de SOURCE (livro, vídeo, episódio).
   78:     A prioridade de extração é por SOURCE, não por capítulo.
>> 79:     Se um LIVRO é Crown Jewel, todo o livro tem prioridade - não apenas 1 capítulo.
   80: ```
   81: 
```
*(bloco/entidade: `rationale: |`)*

### squads/squad-creator-pro/tasks/an-extract-framework.md:92
```
   90:   attack: "E se é simplesmente DESORGANIZAÇÃO? Expert não preparou, divagou sem propósito."
   91:   test: "Desvio levou a framework/insight ou levou a nada? Se framework emergiu → autêntico. Se divagação sem estrutura → desorganização."
>> 92:   rationale: "Nem todo gap é autenticidade. Distinguir desvio produtivo de divagação improdutiva."
   93: ```
   94: 
```
*(bloco/entidade: `adversarial_gap`)*

### squads/squad-creator-pro/tasks/an-validate-clone.md:32
```
   30: 
   31:       Your job is HACKABILITY ONLY — run the 4 interactive tests.
>> 32:       Then update the verdict using --assume-hack pass|fail.
   33: 
   34: EVIDENCE: validate-clone v2.0→v2.1 achieved 90% deterministic via script-first.
```
*(bloco/entidade: `VETO: If /tmp/preflight-validate-clone.yaml does not exist → BLOCK.`)*

### squads/squad-creator-pro/tasks/extract-implicit.md:59
```
   57: | **Conversas de Projeto** | Decisões por omissão, requisitos implícitos, riscos ignorados |
   58: | **Código/Arquitetura** | Convenções não documentadas, razões de design choices |
>> 59: | **Processos/SOPs** | Conhecimento tribal, "todo mundo sabe que...", edge cases |
   60: | **Entrevistas** | Heurísticas do expert, padrões de decisão, anti-patterns vividos |
   61: 
```

### squads/squad-creator-pro/tasks/extract-implicit.md:107
```
   105: 
   106: **Sinais no conteúdo:**
>> 107: - Frases com "obviamente", "claro que", "todo mundo sabe"
   108: - Ausência de justificativa para escolhas fundamentais
   109: - Saltos lógicos entre tópicos
```

### squads/squad-creator-pro/tasks/extract-thinking-dna.md:99
```
   97: ### 1.1 Framework Principal (O "Sistema Operacional")
   98: 
>> 99: Todo expert tem UM framework que usa para TUDO. Encontre-o.
   100: 
   101: **Perguntas para identificar:**
```

### squads/squad-creator-pro/tasks/validate-extraction.md:26
```
   24: checkpoint_clareza_handoff:
   25:   consult: "VALUES.clareza_radical"
>> 26:   question: "Insumos como um TODO trazem CLAREZA ou CONFUSÃO?"
   27:   if_clareza: "HANDOFF para PV"
   28:   if_confusao: "LOOP - simplificar antes de entregar"
```
*(bloco/entidade: `checkpoint_clareza_handoff`)*

### squads/squad-creator-pro/tasks/validate-extraction.md:183
```
   181: **Por que importa para o clone:**
   182: - Inversões são o 0,8% do Thinking DNA — onde mora a genialidade
>> 183: - Clone sem inversões = clone genérico que pensa como todo mundo
   184: 
   185: ### 10. Cross-Source Pattern Detection (≥ 1 padrão confirmado)
```

### squads/squad-creator-pro/tasks/workspace-integration-hardening.md:126
```
   124: - [ ] `workspace_integration.level` declarado e válido.
   125: - [ ] Contrato workspace explícito (rationale/read_paths/write_paths/template_namespace).
>> 126: - [ ] Para todo output canônico em `workspace/businesses/{slug}/...`, existe template correspondente em `workspace/_templates/...`.
   127: - [ ] Se `workspace_first`, bootstrap + essentials validator existem.
   128: - [ ] `validate-squad` e `validate-workspace-contract.py` retornam `PASS`.
```

### squads/squad-creator-pro/test-cases/an-assess-sources/ASSESSMENT-SUMMARY.md:154
```
   152: Bronze        🔴  1 source    25%*   (Tier: 0.2) *deferred
   153: 
>> 154: *Note: Bronze is placeholder; content not available
   155: ```
   156: 
```

### squads/squad-creator-pro/test-cases/an-assess-sources/EXECUTION-REPORT.md:387
```
   385: 
   386: ✅ **Methodology:** 25-checkpoint framework v2.0 applied consistently
>> 387: ✅ **Coverage:** 4 complete sources + 1 placeholder assessed
   388: ✅ **Scoring:** Binary, defensible, reproducible
   389: ✅ **Tiers:** 1 Crown Jewel + 3 Ouro + 1 Bronze (deferred)
```

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-output.yaml:298
```
   296:     - action: "EXTRAIR CROWN JEWEL - Capítulo 6"
   297:       priority: "urgente"
>> 298:       rationale: "Equação de Valor é fundação de TODO o sistema. Profundidade=5, Autenticidade=5. Todos os 4 pilares (Dream Outcome, Probability, Time Delay, Effort) devem estar codificados em DNA de 
   299: 
   300:     - action: "INTEGRAR OURO #1 - Capítulo 8"
```
*(bloco/entidade: `- action: "EXTRAIR CROWN JEWEL - Capítulo 6"`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-output.yaml:363
```
   361:       - "Atualidade = 5 (20+ checkpoints = média 4.0 em 5 dimensões)"
   362:       - "Todas dimensões >= 4.0"
>> 363:     why_crown_jewel: "Este capítulo é o FOUNDATION de todo o Alex Hormozi framework. Sem compreensão da Equação de Valor (Dream Outcome + Probability - Time Delay - Effort), nada mais funciona. Offers
   364:     extraction_effort: "High (40 páginas, framework visual, múltiplos exemplos, anti-intuitive insights)"
   365:     extraction_roi: "Exponential (aplicável a TODOS os tipos de oferta, negócio, contexto)"
```
*(bloco/entidade: `crown_jewel_justification`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.1-output.yaml:368
```
   366:       priority: "urgente"
   367:       rationale: |
>> 368:         Crown Jewel confirmado. É a base conceitual de todo mindset de Hormozi.
   369:         Equação de Valor é DNA de todas as decisões. Não é complementária - é fundacional.
   370:         Impacto direto na voz, frameworks, exemplos que clone usará.
```
*(bloco/entidade: `rationale: |`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/VERIFICATION-CHECKLIST.txt:137
```
   135:     Status:   AVOIDED ✓
   136: 
>> 137: [✓] ANTI-PATTERN #4: "NÃO avalie partes de um todo separadamente"
   138:     Verification: All books evaluated as complete units
   139:     Status:   AVOIDED ✓
```

### squads/squad-creator-pro/test-cases/pv-axioma-assessment/sonnet-output.yaml:5
```
   3: # Target: squads/squad-creator-pro/workflows/wf-create-squad.yaml
   4: # Model: sonnet (intermediate tier)
>> 5: # Status: Not tested yet - placeholder for future validation
   6: 
   7: axioma_assessment:
```

### squads/squad-creator-pro/workflows/wf-clone-mind.yaml:374
```
   372:       - test: 3
   373:         name: "Resposta a Objeção"
>> 374:         prompt: "Discordo do seu método. {objeção_comum}. O que você tem a dizer?"
   375:         validates:
   376:           - "Reconhece a objeção"
```
*(bloco/entidade: `- test: 3`)*

### squads/squad-creator-pro/workflows/wf-create-squad.yaml:926
```
   924:             recovery_path:
   925:               - "Log failure reason (sources_insufficient | dna_incomplete | smoke_test_fail)"
>> 926:               - "Create placeholder agent with reduced fidelity warning"
   927:               - "Add to remediation_queue for later improvement"
   928:               - "Continue squad creation with available agents"
```
*(bloco/entidade: `recovery_path`)*

### squads/squad-creator-pro/workflows/wf-create-squad.yaml:1006
```
   1004:           - update_dependencies: true
   1005:         create_missing:
>> 1006:           action: "Create stubs with TODO"
   1007: 
   1008:       - id: step_4_2
```
*(bloco/entidade: `create_missing`)*

### squads/squad-creator-pro/workflows/wf-cross-provider-qualification.yaml:433
```
   431:           Extraia o framework em formato YAML com: nome, etapas, e quando aplicar.
   432:         eval_criteria:
>> 433:           - understanding: "Captou a essência do método"
   434:           - structure: "YAML válido e bem organizado"
   435:           - no_hallucination: "Não inventou etapas extras"
```
*(bloco/entidade: `eval_criteria`)*

### squads/squad-creator-pro/workflows/wf-extraction-pipeline.yaml:16
```
   14: description: |
   15:   Workflow para extração sistemática de conhecimento de autores/experts.
>> 16:   Garante que todo conteúdo é extraído LITERALMENTE das fontes - zero invenção.
   17: 
   18:   Sequência obrigatória:
```
*(bloco/entidade: `description: |`)*

### squads/squad-creator-pro/workflows/wf-extraction-pipeline.yaml:424
```
   422:   framework:
   423:     - "Toda fórmula tem citação literal?"
>> 424:     - "Todo princípio vem de quote do autor?"
>> 425:     - "Todo exemplo é do autor (não inventado)?"
   426:     - "Nenhum 'best practice' genérico adicionado?"
   427:     - "15+ citações com [SOURCE: página/minuto]?"
   428: 
   429:   sop:
>> 430:     - "Todo step tem exemplo ou instrução do autor?"
   431:     - "Appendix D tem 50+ referências?"
   432:     - "Nenhum step veio de 'experiência geral'?"
```
*(bloco/entidade: `framework`)*

### squads/squad-creator-pro/workflows/wf-extraction-pipeline.yaml:437
```
   435: 
   436:   checklist:
>> 437:     - "Todo checkbox mapeia para step do SOP?"
   438:     - "Nenhum checkbox inventado 'por segurança'?"
   439:     - "Sequência reflete o SOP fielmente?"
```
*(bloco/entidade: `checklist`)*

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:183
```
   181:         name: "Generic placeholders"
   182:         description: "Placeholders como {content} sem guidance do que preencher"
>> 183:         detection: "Template placeholder without adjacent instruction or example"
>> 184:         fix: "Adicionar instrução inline + exemplo concreto por placeholder"
   185:         savings: "MEDIUM (reduces LLM confusion, better outputs)"
   186: 
```
*(bloco/entidade: `- id: TMPL_OPT_001`)*

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:531
```
   529:         action: |
   530:           For each template with TMPL_OPT findings:
>> 531:             TMPL_OPT_001: Add instruction per placeholder
   532:             TMPL_OPT_002: Add complete example section
   533:             TMPL_OPT_003: Split into core + extensions
```
*(bloco/entidade: `For each template with TMPL_OPT findings:`)*

### squads/squad-creator-pro/workflows/wf-squad-fusion.yaml:9
```
   7: # PRINCÍPIOS FUNDAMENTAIS:
   8: # 1. IDEMPOTENCY: Rodar 2x = mesmo resultado (sem duplicatas)
>> 9: # 2. PROVENANCE: Todo componente rastreável à origem
   10: # 3. ROLLBACK: Cada fase reversível
   11: # 4. QUALITY GATES: Validação entre cada fase
```

### squads/squad-creator-pro/workflows/wf-squad-fusion.yaml:1607
```
   1605:   - id: H_FUSION_007
   1606:     name: "Provenance Sempre"
>> 1607:     rule: "Todo componente deve ser rastreável à origem"
   1608:     rationale: "Debugging e auditoria futura"
   1609:     applies_to: ["all"]
```
*(bloco/entidade: `- id: H_FUSION_007`)*

### squads/squad-creator/agents/squad-chief.md:565
```
   563:   - Multi-phase workflow design (phased execution with checkpoints)
   564:   - Task workflow design and elicitation patterns (Task Anatomy - 8 fields)
>> 565:   - Template creation and placeholder systems
   566:   - YAML configuration best practices
   567:   - Ecosystem awareness (existing squads, patterns, gaps)
```
*(bloco/entidade: `knowledge_areas`)*

### squads/squad-creator/checklists/agent-depth-checklist.md:50
```
   48:     O limite de R$ 81k não é apenas um número - é o ponto onde
   49:     o MEI perde TODOS os benefícios da simplicidade. Um MEI que
>> 50:     ultrapassa sem perceber pode ter tributação RETROATIVA de todo
   51:     o ano. Por isso, alertar CEDO é mais importante que alertar CORRETAMENTE.
   52:   steps:
```
*(bloco/entidade: `philosophy: |`)*

### squads/squad-creator/checklists/deep-research-quality.md:60
```
   58: - [ ] Each scope section has substantive content (50+ lines minimum)
   59: - [ ] Sections follow logical progression
>> 60: - [ ] No empty or placeholder sections
   61: - [ ] Headers use consistent formatting (## for main, ### for sub)
   62: 
```

### squads/squad-creator/checklists/deep-research-quality.md:350
```
   348: 
   349: - [ ] **Missing sections** from original scope
>> 350: - [ ] **Stub sections** (<20 lines)
   351: - [ ] **Copy-paste blocks** without analysis
   352: - [ ] **No framework extraction possible**
```

### squads/squad-creator/checklists/executor-matrix-checklist.md:3
```
   1: # Executor Matrix Validation Checklist
   2: 
>> 3: > **Pattern Reference:** HO-EP-xxx (Executor Patterns)
   4: > **Source:** AIOS Executor Matrix Standard
   5: > **Version:** 1.0.0
```

### squads/squad-creator/checklists/executor-matrix-checklist.md:141
```
   139: | [ ] Velocidade atende SLA do workflow | |
   140: | [ ] Fallback definido (se aplicavel) | |
>> 141: | [ ] Pattern ID referenciado (HO-EP-xxx) | |
   142: 
   143: ### 3.4 Exemplo de Atribuicao Correta
```

### squads/squad-creator/checklists/executor-matrix-checklist.md:227
```
   225: | [ ] Nenhum Agent atribuido a decisao critica | |
   226: | [ ] Nenhum Worker atribuido a task que requer julgamento | |
>> 227: | [ ] Todo Agent tem fallback definido | |
>> 228: | [ ] Todo Worker tem fallback definido | |
>> 229: | [ ] Todo Hybrid tem criterios de validacao | |
   230: 
   231: ---
```

### squads/squad-creator/checklists/executor-matrix-checklist.md:242
```
   240: | 2 | Cada task tem `execution_type` definido | [ ] |
   241: | 3 | Cada task tem `responsible_executor` definido | [ ] |
>> 242: | 4 | Pattern ID referenciado (HO-EP-xxx) | [ ] |
   243: | 5 | Rationale documentado para cada atribuicao | [ ] |
   244: | 6 | Matriz de decisao utilizada | [ ] |
```

### squads/squad-creator/checklists/quality-gate-checklist.md:14
```
   12: ## 1. Campos Obrigatorios
   13: 
>> 14: Todo Quality Gate DEVE conter os seguintes campos:
   15: 
   16: | Campo | Tipo | Descricao | Exemplo |
```

### squads/squad-creator/checklists/smoke-test-agent.md:45
```
   43: │                                                                             │
   44: │  TEST 3: RESPOSTA A OBJEÇÃO                                                 │
>> 45: │  ├── Tipo: Desafio/crítica ao método do expert                              │
   46: │  ├── Testa: Objection handling + Immune system                              │
   47: │  └── Espera: Responde como expert responderia (com convicção)              │
```

### squads/squad-creator/checklists/smoke-test-agent.md:180
```
   178: 
   179: ```
>> 180: "Discordo do seu método. {objeção_comum_ao_expert}.
   181: O que você tem a dizer?"
   182: ```
```

### squads/squad-creator/checklists/smoke-test-agent.md:199
```
   197:   immune_system:
   198:     - question: "Mantém convicção?"
>> 199:       check: "Não capitula, defende método"
   200:       status: "✅|❌"
   201: 
```
*(bloco/entidade: `- question: "Mantém convicção?"`)*

### squads/squad-creator/checklists/smoke-test-agent.md:218
```
   216: ```yaml
   217: prompt: |
>> 218:   Discordo do seu método. Levels of awareness é muito complicado.
   219:   Por que não simplesmente escrever copy direto?
   220: 
```
*(bloco/entidade: `prompt: |`)*

### squads/squad-creator/checklists/squad-checklist.md:344
```
   342:   description: "Patterns that look like secrets but are OK"
   343:   examples:
>> 344:     - "api_key: \"{{API_KEY}}\"  # Placeholder"
   345:     - "api_key: \"$API_KEY\"     # Environment variable"
   346:     - "api_key: process.env.API_KEY  # Runtime lookup"
```
*(bloco/entidade: `examples`)*

### squads/squad-creator/checklists/squad-checklist.md:630
```
   628: - [ ] Each agent has 3+ concrete output examples
   629: - [ ] Examples show input → output transformation
>> 630: - [ ] Examples are realistic (not placeholder)
   631: 
   632: #### 4A.4 Tier Organization
```

### squads/squad-creator/checklists/task-anatomy-checklist.md:519
```
   517: | Input not array | Single string | Convert to array with at least 1 item |
   518: | Output not array | Single string | Convert to array with at least 1 item |
>> 519: | Empty action_items | Placeholder | Add specific executable steps |
   520: | Generic criteria | "Task done" | Add testable, specific criteria |
   521: 
```

### squads/squad-creator/data/an-clone-anti-patterns.yaml:7
```
   5: anti_patterns:
   6:   never_do:
>> 7:     - action: "Jogar TODO conteudo da pessoa sem curadoria"
   8:       reason: "Volume ≠ qualidade. Se entrar coco, sai coco."
   9:       symptom: "Clone responde generico, sem personalidade"
```
*(bloco/entidade: `never_do`)*

### squads/squad-creator/data/best-practices.md:22
```
   20: | Quality Gates | Gates formais | 2 gates | 10+ gates |
   21: | Heuristicas | Codificadas com pesos | 0 | 3+ |
>> 22: | Padroes nomeados | Prefixo-xxx | 0 | 10+ |
   23: | Executors tipados | 4 tipos (H/A/Hy/W) | 2 tipos | 4 tipos |
   24: 
```

### squads/squad-creator/data/best-practices.md:67
```
   65: ---
   66: 
>> 67: ### 1.2 Executor Matrix (HO-EP-xxx)
   68: 
   69: **Principio:** Classificar formalmente QUEM executa cada tarefa.
```

### squads/squad-creator/data/best-practices.md:103
```
   101: ---
   102: 
>> 103: ### 1.3 Pattern Library (HO-xxx)
   104: 
>> 105: **Principio:** Todo padrao reutilizavel deve ter um ID unico e referenciavel.
   106: 
   107: ```yaml
```

### squads/squad-creator/data/best-practices.md:124
```
   122: 
   123: **Beneficios:**
>> 124: - Consistencia em todo o squad
   125: - Facilita auditoria e compliance
   126: - Permite validacao automatizada
```

### squads/squad-creator/data/best-practices.md:149
```
   147: ### 2.1 Quality Gate Pattern (HO-PP-003)
   148: 
>> 149: **Principio:** Todo workflow deve ter checkpoints formais entre fases.
   150: 
   151: ```yaml
```

### squads/squad-creator/data/best-practices.md:232
```
   230: 
   231:   checkpoint_modes:
>> 232:     always_active: "Todo checkpoint DEVE passar"
   233:     skip_on_override: "Pode pular com aprovacao manual"
   234:     advisory: "Apenas alerta, nao bloqueia"
```
*(bloco/entidade: `checkpoint_modes`)*

### squads/squad-creator/data/best-practices.md:851
```
   849: ---
   850: 
>> 851: ## Parte 9: Documentation Patterns (HO-DP-xxx)
   852: 
   853: ### 9.1 Changelog Separation Rule (HO-DP-001)
```

### squads/squad-creator/data/best-practices.md:898
```
   896: ### 9.2 README Requirements (HO-DP-002)
   897: 
>> 898: **Principio:** Todo squad deve ter README com seções obrigatórias.
   899: 
   900: ```yaml
```

### squads/squad-creator/data/core-heuristics.md:8
```
   6: > **Prefix:** SC (Squad-Creator)
   7: 
>> 8: Este documento define as heuristicas basicas que todo squad deve implementar para garantir decisoes consistentes e auditaveis.
   9: 
   10: ---
```

### squads/squad-creator/data/executor-decision-tree.md:708
```
   706: **Why it happens:** Assumir que LLM sempre funciona.
   707: 
>> 708: **Correct approach:** Todo Agent deve ter `fallback_to: Hybrid` com trigger claro.
   709: 
   710: ---
```

### squads/squad-creator/data/hybridops-patterns.md:101
```
   99: 4. [Axioma Validator Pattern](#axioma-validator-pattern)
   100: 5. [Quality Gate Patterns (HO-PP-003)](#quality-gate-patterns)
>> 101: 6. [Executor Assignment Patterns (HO-EP-XXX)](#executor-assignment-patterns)
   102: 7. [Coherence Validation Patterns](#coherence-validation-patterns)
   103: 
```

### squads/squad-creator/data/hybridops-patterns.md:830
```
   828:       - "Agent markdown parses without error"
   829:       - "All required fields present"
>> 830:       - "No undefined placeholder values"
   831:     threshold: "100% criteria met"
   832:     pass_action: ["Deploy agent", "Generate documentation"]
```
*(bloco/entidade: `criteria`)*

### squads/squad-creator/data/hybridops-patterns.md:850
```
   848: ---
   849: 
>> 850: ## EXECUTOR ASSIGNMENT PATTERNS (HO-EP-XXX)
   851: 
   852: ### HO-EP-001: Human Executor Pattern
```

### squads/squad-creator/data/mental-model-task-matrix.yaml:76
```
   74:         step_name: "FRAMEWORK_HANDOFF_READY"
   75:         checkpoint_type: "veto"
>> 76:         question: "Insumos como um TODO trazem clareza ou confusão?"
   77:         action_if_pass: "HANDOFF para PV"
   78:         action_if_fail: "LOOP - simplificar antes de entregar"
```
*(bloco/entidade: `- task: "validate-extraction"`)*

### squads/squad-creator/data/pv-output-examples.yaml:36
```
   34:   - input: "A task está criando uma nova task sempre que executa"
   35:     output: |
>> 36:       Opa, classic problema de IDS não implementado.
   37: 
   38:       **A pergunta é:** O agente consultou o Entity Registry antes de criar?
```
*(bloco/entidade: `output: |`)*

### squads/squad-creator/data/pv-output-examples.yaml:292
```
   290: 
   291:       **2. Quantas vezes?**
>> 292:       Se é checado em todo agent, todo workflow... é repetição.
   293:       Repetição = automação.
   294: 
```
*(bloco/entidade: `output: |`)*

### squads/squad-creator/data/pv-workflow-validation.yaml:193
```
   191: 
   192: validation_script_pattern:
>> 193:   description: "Todo epic/story deve ter script de validação automatizada"
   194:   template: |
   195:     #!/bin/bash
```
*(bloco/entidade: `validation_script_pattern`)*

### squads/squad-creator/data/squad-analytics-guide.md:11
```
   9: ## Overview
   10: 
>> 11: O comando `*squad-analytics` fornece uma visão detalhada de todo o ecossistema AIOS, incluindo contagens precisas de todos os componentes por squad.
   12: 
   13: ---
```

### squads/squad-creator/data/squad-kb.md:336
```
   334: ```
   335: 
>> 336: ### 4.2 Placeholder Conventions
   337: 
   338: **Naming Standards**
```

### squads/squad-creator/data/squad-kb.md:839
```
   837: 
   838: Possible causes:
>> 839: - Placeholder names mismatch
   840: - YAML syntax errors
   841: - Conditional logic errors
```

### squads/squad-creator/docs/CONCEPTS.md:203
```
   201: ```
   202: 
>> 203: ### Regra: Todo Squad precisa de Tier 0
   204: 
   205: ```
```

### squads/squad-creator/docs/MIGRATION-PLAN-AGENT-CONFORMITY.md:97
```
   95:       A resposta completa que o agent deve dar.
   96:       Pode ter múltiplas linhas.
>> 97:       Deve ser realista, não placeholder.
   98: ```
   99: 
```
*(bloco/entidade: `output: |`)*

### squads/squad-creator/docs/MIGRATION-ROADMAP-HYBRIDOPS.md:1101
```
   1099: - [ ] Task anatomy é enforced automaticamente
   1100: - [ ] Heuristics engine valida agents/workflows
>> 1101: - [ ] Axioma score é calculado para todo squad
   1102: - [ ] Quality gates têm 3 tipos (auto/hybrid/manual)
   1103: - [ ] Coherence validation detecta contradições
```

### squads/squad-creator/docs/session-report-2026-02-01.md:291
```
   289: 
   290: ### Média Prioridade
>> 291: 3. **Criar workflow wf-create-squad.yaml**: Orquestrar todo o processo de criação
   292: 4. **Adicionar PHASES nas tasks**: Estrutura PHASE 0-N
   293: 
```

### squads/squad-creator/docs/TROUBLESHOOTING.md:412
```
   410: 
   411: **Squad Architect | Troubleshooting v1.0**
>> 412: *"Todo problema tem solução. A maioria é falta de fontes."*
   413: 
```

### squads/squad-creator/docs/TUTORIAL-COMPLETO.md:222
```
   220:   ✓ Usou "starving crowd" (power word)
   221:   ✓ Usou "pile of money" (power word)
>> 222:   ✓ Explicou os 4 steps do método
   223:   ✓ Tom casual e direto
   224:   ✓ Sem jargão corporativo
```
*(bloco/entidade: `TEST 1: Conhecimento do Domínio`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_001.md:123
```
   121: 
   122: ### Inference Without Source
>> 123: - **Trigger:** Conceito parece óbvio, "todo mundo sabe"
   124: - **Manifestation:** Clone fala coisas que expert nunca disse
   125: - **Detection:** Buscar citação, não encontrar [SOURCE:]
```

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_003.md:22
```
   20:     result_contribution: "~51%"
   21:     icon: "🔥"
>> 22:     action: "PROTEGER a todo custo"
   23:     characteristics:
   24:       - "Só você consegue fazer"
```
*(bloco/entidade: `zone_genius`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PA_001.md:173
```
   171: ---
   172: 
>> 173: **Pattern Compliance:** HO-PP-003 (Quality Gate) ✓ | HO-EP-XXX (Executor Patterns) ✓
   174: **Source:** PV Mind Artifacts - Heurísticas de Decisão
   175: 
```

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PM_001.md:190
```
   188: ---
   189: 
>> 190: **Pattern Compliance:** HO-PP-003 (Quality Gate) ✓ | HO-AP-XXX (Automation Patterns) ✓
   191: **Source:** PV Mind Artifacts - Heurísticas de Decisão
   192: 
```

### squads/squad-creator/README.md:720
```
   718: 
   719: - Checklist completo cobrindo todas as dimensões de qualidade
>> 720: - Validação de segurança para todo código gerado
   721: - Verificação de conformidade com padrões AIOS
   722: 
```

### squads/squad-creator/scripts/tests/test_refresh_registry.py:333
```
   331:         assert "counts" in squad_data
   332:         assert "agent_names" in squad_data
>> 333:         assert "domain" in squad_data  # Placeholder for LLM
>> 334:         assert "keywords" in squad_data  # Placeholder for LLM
   335: 
   336: 
```
*(bloco/entidade: `""")`)*

### squads/squad-creator/scripts/validate-squad-structure.py:270
```
   268:                 # Filter out obvious examples/placeholders
   269:                 real_matches = [m for m in matches if not any(x in str(m).lower() for x in
>> 270:                     ["example", "placeholder", "your-", "xxx", "{{", "${"])]
   271:                 if real_matches:
   272:                     security_issues.append({
```
*(bloco/entidade: `real_matches = [m for m in matches if not any(x in str(m).lower() for x in`)*

### squads/squad-creator/scripts/validate-squad.sh:313
```
   311: 
   312:   # API Keys (excluding placeholders, examples, documentation, fake values)
>> 313:   local api_keys=$(grep -rE "(api[_-]?key|apikey)[[:space:]]*[:=][[:space:]]*['\"][^'\"\$\{]{8,}" "$SQUAD_DIR" 2>/dev/null | grep -vE "(\{\{|\\\$\{|process\.env|[Ee]xample|placeholder|grep|pattern|EXA
   314:   if [[ -n "$api_keys" ]]; then
   315:     log_fail "SEC-001: Potential API keys found"
```
*(bloco/entidade: `check_security() {`)*

### squads/squad-creator/scripts/validate-squad.sh:322
```
   320: 
   321:   # Secrets (excluding examples, documentation, fake values, obvious test secrets)
>> 322:   local secrets=$(grep -rE "(secret|password)[[:space:]]*[:=][[:space:]]*['\"][^'\"\$\{]{8,}" "$SQUAD_DIR" 2>/dev/null | grep -vE "(\{\{|\\\$\{|process\.env|[Ee]xample|placeholder|grep|pattern|EXAMPLE
   323:   if [[ -n "$secrets" ]]; then
   324:     log_fail "SEC-002: Potential secrets found"
```
*(bloco/entidade: `check_security() {`)*

### squads/squad-creator/tasks/create-agent.md:792
```
   790:     - retry_with_different_queries
   791:     - expand_search_scope
>> 792:     - if_still_fails: "Create generic agent with TODO notes"
   793: 
   794:   validation_fails:
```
*(bloco/entidade: `research_insufficient`)*

### squads/squad-creator/tasks/create-pipeline.md:139
```
   137:    - `item_noun` → Squad's item type (books, minds, courses, etc.)
   138:    - `PANEL_TITLE` → Squad name
>> 139:    - Example handlers → Stub handlers with correct signatures
   140: 3. Write to `squads/{squad}/lib/`
   141: 
   142: ### Step 2.2: Generate Phase Handlers
   143: 
>> 144: For each phase, generate a stub handler:
   145: 
   146: ```python
```
*(bloco/entidade: `2. Replace customization points:`)*

### squads/squad-creator/tasks/create-pipeline.md:156
```
   154:     Phase {num}: {description}
   155: 
>> 156:     TODO: Implement this handler.
   157: 
   158:     Args:
```
*(bloco/entidade: `) -> PhaseResult:`)*

### squads/squad-creator/tasks/create-pipeline.md:166
```
   164:         PhaseResult with success status and output
   165:     """
>> 166:     raise NotImplementedError("TODO: Implement phase_{name}_handler")
   167: ```
   168: 
```
*(bloco/entidade: `) -> PhaseResult:`)*

### squads/squad-creator/tasks/create-pipeline.md:256
```
   254: 
   255: Next steps for the developer:
>> 256: 1. Implement phase handlers (marked with TODO)
   257: 2. Wire up with your squad's CLI/entry point
   258: 3. Test with real data
```

### squads/squad-creator/tasks/create-squad.md:443
```
   441:   initial_files:
   442:     - config.yaml (from templates/config-tmpl.yaml)
>> 443:     - README.md (placeholder)
   444: ```
   445: 
```
*(bloco/entidade: `initial_files`)*

### squads/squad-creator/tasks/create-squad.md:577
```
   575: 
   576:   create_missing:
>> 577:     - if dependency referenced but doesn't exist → create stub
>> 578:     - mark stubs with TODO for later completion
   579: ```
   580: 
```
*(bloco/entidade: `create_missing`)*

### squads/squad-creator/tasks/create-template.md:198
```
   196: 
   197:   for_each_placeholder:
>> 198:     - name: "Placeholder name (e.g., {{project_name}})"
   199:     - type: "text | date | number | list | object"
   200:     - required: "true | false"
>> 201:     - description: "What this placeholder represents"
   202:     - default: "Default value (optional)"
   203: 
```
*(bloco/entidade: `for_each_placeholder`)*

### squads/squad-creator/tasks/create-template.md:209
```
   207: ```
   208: 
>> 209: **Placeholder Documentation:**
   210: ```yaml
   211: placeholder_template:
```

### squads/squad-creator/tasks/extract-implicit.md:49
```
   47: | **Conversas de Projeto** | Decisões por omissão, requisitos implícitos, riscos ignorados |
   48: | **Código/Arquitetura** | Convenções não documentadas, razões de design choices |
>> 49: | **Processos/SOPs** | Conhecimento tribal, "todo mundo sabe que...", edge cases |
   50: | **Entrevistas** | Heurísticas do expert, padrões de decisão, anti-patterns vividos |
   51: 
```

### squads/squad-creator/tasks/extract-implicit.md:97
```
   95: 
   96: **Sinais no conteúdo:**
>> 97: - Frases com "obviamente", "claro que", "todo mundo sabe"
   98: - Ausência de justificativa para escolhas fundamentais
   99: - Saltos lógicos entre tópicos
```

### squads/squad-creator/tasks/extract-thinking-dna.md:86
```
   84: ### 1.1 Framework Principal (O "Sistema Operacional")
   85: 
>> 86: Todo expert tem UM framework que usa para TUDO. Encontre-o.
   87: 
   88: **Perguntas para identificar:**
```

### squads/squad-creator/tasks/upgrade-squad.md:637
```
   635:     when: "Required section missing"
   636:     action: |
>> 637:       Add empty section with TODO comment:
   638:       voice_dna:
>> 639:         # TODO: Add vocabulary, sentence_starters, metaphors
   640:         vocabulary:
   641:           always_use: []
```
*(bloco/entidade: `action: |`)*

### squads/squad-creator/tasks/upgrade-squad.md:661
```
   659:        Options:
   660:        1. I'll generate examples based on agent's domain
>> 661:        2. Skip for now (mark as TODO)
   662:        3. You provide examples"
   663:     requires: "Domain knowledge or research"
```
*(bloco/entidade: `"Agent {name} needs 3+ output_examples.`)*

### squads/squad-creator/tasks/upgrade-squad.md:673
```
   671:        Options:
   672:        1. Research and generate (uses *extract-voice-dna)
>> 673:        2. Skip for now (mark as TODO)
   674:        3. You provide content"
   675:     requires: "Source material or research"
```
*(bloco/entidade: `"Agent {name} needs expanded voice_dna.`)*

### squads/squad-creator/tasks/upgrade-squad.md:727
```
   725: 
   726: Phase 2 Partial:  <!-- Example output - your results will vary -->
>> 727:   ⏭️ agents/{agent-2}.md - Skipped output_examples (TODO added)
   728:   ✅ agents/{agent-3}.md - Generated output_examples
   729: 
```
*(bloco/entidade: `Phase 2 Partial:  <!-- Example output - your results will vary -->`)*

### squads/squad-creator/tasks/upgrade-squad.md:790
```
   788:   remaining_todos:  # Example - your results will vary
   789:     - file: "agents/{agent-2}.md"
>> 790:       todo: "Add output_examples (marked with TODO)"
   791:     - file: "agents/old-agent.md"
>> 792:       todo: "Needs complete rewrite"
   793: 
   794:   recommendations:
```
*(bloco/entidade: `- file: "agents/{agent-2}.md"`)*

### squads/squad-creator/tasks/upgrade-squad.md:885
```
   883:   - agent: "User"
   884:     when: "Manual TODOs remain"
>> 885:     context: "Review TODO markers in upgraded files"
   886: ```
   887: 
```
*(bloco/entidade: `- agent: "User"`)*

### squads/squad-creator/tasks/validate-extraction.md:20
```
   18: checkpoint_clareza_handoff:
   19:   consult: "VALUES.clareza_radical"
>> 20:   question: "Insumos como um TODO trazem CLAREZA ou CONFUSÃO?"
   21:   if_clareza: "HANDOFF para PV"
   22:   if_confusao: "LOOP - simplificar antes de entregar"
```
*(bloco/entidade: `checkpoint_clareza_handoff`)*

### squads/squad-creator/tasks/validate-squad.md:325
```
   323:       check: "No hardcoded API keys"
   324:       action: "grep -rE '(api[_-]?key|apikey)\\s*[:=]\\s*[^${}]{20,}'"
>> 325:       exclude: "# Placeholder|{{|\\$[A-Z]"
   326:       on_match: "ABORT - API key found"
   327: 
```
*(bloco/entidade: `- id: "T1-SEC-001"`)*

### squads/squad-creator/tasks/validate-squad.md:406
```
   404:     - "os.environ"       # Python env
   405:     - "# Example:"       # Example in comments
>> 406:     - "your-.*-here"     # Placeholder text
   407: ```
   408: 
```
*(bloco/entidade: `exclude_patterns`)*

### squads/squad-creator/templates/config-tmpl.yaml:79
```
   77:     elicit: true
   78:     template: |
>> 79:       # Pattern Library (HO-xxx inspired)
   80:       pattern_library:
   81:         prefix: {{pattern_prefix}}  # 2-3 uppercase letters
```
*(bloco/entidade: `template: |`)*

### squads/squad-creator/templates/config-tmpl.yaml:186
```
   184:     title: Executor Types
   185:     instruction: |
>> 186:       Define the Executor Matrix (HO-EP-xxx inspired).
   187: 
   188:       Four executor types classify WHO executes each task:
```
*(bloco/entidade: `instruction: |`)*

### squads/squad-creator/templates/config-tmpl.yaml:206
```
   204:     elicit: true
   205:     template: |
>> 206:       # Executor Types (HO-EP-xxx inspired)
   207:       executor_types:
   208:         human:
```
*(bloco/entidade: `template: |`)*

### squads/squad-creator/templates/quality-gate-tmpl.yaml:13
```
   11: # Usage:
   12: #   1. Copy this template to your squad's qa-gates/ or gates/ folder
>> 13: #   2. Replace all {placeholder} values with actual values
   14: #   3. Adjust criteria, thresholds, and actions to your workflow needs
   15: #   4. Reference the gate in your workflow-definition.yaml
```

### squads/squad-creator/templates/quality-gate-tmpl.yaml:33
```
   31:   # Instructions for template usage
   32:   instructions:
>> 33:     - "Replace all {placeholder} values"
   34:     - "Choose appropriate gate type (manual|automated|hybrid|external)"
   35:     - "Define at least one criterion"
```
*(bloco/entidade: `instructions`)*

### squads/squad-creator/templates/task-tmpl.md:165
```
   163:     title: Executor Specification
   164:     instruction: |
>> 165:       Detail the executor type and rationale based on the Executor Matrix (HO-EP-xxx).
   166:     template: |
   167:       ## Executor Specification
```
*(bloco/entidade: `instruction: |`)*

### squads/squad-creator/templates/template-tmpl.yaml:110
```
   108:       #     custom_elicitation: section-identifier  # Reference to custom elicitation
   109:       #     template: |
>> 110:       #       - **Placeholder 1:** {{placeholder_1}}
>> 111:       #       - **Placeholder 2:** {{placeholder_2}}
   112:       #
   113:       #       {{content_area}}
```
*(bloco/entidade: `template: |`)*

### squads/squad-creator/templates/template-tmpl.yaml:208
```
   206: 
   207:   - id: placeholders
>> 208:     title: Placeholder Documentation
   209:     instruction: |
   210:       List all placeholders used in this template and their purpose.
```
*(bloco/entidade: `- id: placeholders`)*

### squads/squad-creator/workflows/wf-clone-mind.yaml:374
```
   372:       - test: 3
   373:         name: "Resposta a Objeção"
>> 374:         prompt: "Discordo do seu método. {objeção_comum}. O que você tem a dizer?"
   375:         validates:
   376:           - "Reconhece a objeção"
```
*(bloco/entidade: `- test: 3`)*

### squads/squad-creator/workflows/wf-create-squad.yaml:886
```
   884:             recovery_path:
   885:               - "Log failure reason (sources_insufficient | dna_incomplete | smoke_test_fail)"
>> 886:               - "Create placeholder agent with reduced fidelity warning"
   887:               - "Add to remediation_queue for later improvement"
   888:               - "Continue squad creation with available agents"
```
*(bloco/entidade: `recovery_path`)*

### squads/squad-creator/workflows/wf-create-squad.yaml:966
```
   964:           - update_dependencies: true
   965:         create_missing:
>> 966:           action: "Create stubs with TODO"
   967: 
   968:       - id: step_4_2
```
*(bloco/entidade: `create_missing`)*

### squads/squad-creator/workflows/wf-extraction-pipeline.yaml:16
```
   14: description: |
   15:   Workflow para extração sistemática de conhecimento de autores/experts.
>> 16:   Garante que todo conteúdo é extraído LITERALMENTE das fontes - zero invenção.
   17: 
   18:   Sequência obrigatória:
```
*(bloco/entidade: `description: |`)*

### squads/squad-creator/workflows/wf-extraction-pipeline.yaml:424
```
   422:   framework:
   423:     - "Toda fórmula tem citação literal?"
>> 424:     - "Todo princípio vem de quote do autor?"
>> 425:     - "Todo exemplo é do autor (não inventado)?"
   426:     - "Nenhum 'best practice' genérico adicionado?"
   427:     - "15+ citações com [SOURCE: página/minuto]?"
   428: 
   429:   sop:
>> 430:     - "Todo step tem exemplo ou instrução do autor?"
   431:     - "Appendix D tem 50+ referências?"
   432:     - "Nenhum step veio de 'experiência geral'?"
```
*(bloco/entidade: `framework`)*

### squads/squad-creator/workflows/wf-extraction-pipeline.yaml:437
```
   435: 
   436:   checklist:
>> 437:     - "Todo checkbox mapeia para step do SOP?"
   438:     - "Nenhum checkbox inventado 'por segurança'?"
   439:     - "Sequência reflete o SOP fielmente?"
```
*(bloco/entidade: `checklist`)*

### squads/squad-creator/workflows/wf-squad-fusion.yaml:9
```
   7: # PRINCÍPIOS FUNDAMENTAIS:
   8: # 1. IDEMPOTENCY: Rodar 2x = mesmo resultado (sem duplicatas)
>> 9: # 2. PROVENANCE: Todo componente rastreável à origem
   10: # 3. ROLLBACK: Cada fase reversível
   11: # 4. QUALITY GATES: Validação entre cada fase
```

### squads/squad-creator/workflows/wf-squad-fusion.yaml:1607
```
   1605:   - id: H_FUSION_007
   1606:     name: "Provenance Sempre"
>> 1607:     rule: "Todo componente deve ser rastreável à origem"
   1608:     rationale: "Debugging e auditoria futura"
   1609:     applies_to: ["all"]
```
*(bloco/entidade: `- id: H_FUSION_007`)*

## ⚠️ Descontinuado / quebrado (65 trechos com contexto, 65 ocorrências totais)

### .aiox-core/cli/commands/mcp/status.js:120
```
   118:       console.log('  Run "aiox mcp link" to link project to global config');
   119:       break;
>> 120:     case LINK_STATUS.BROKEN:
   121:       console.log('  Status: 🔴 Broken link');
   122:       console.log(`  Target: ${linkStatus.target}`);
```
*(bloco/entidade: `switch (linkStatus.status) {`)*

### .aiox-core/core/mcp/symlink-manager.js:24
```
   22:   LINKED: 'linked',
   23:   NOT_LINKED: 'not_linked',
>> 24:   BROKEN: 'broken',
   25:   DIRECTORY: 'directory',
   26:   ERROR: 'error',
```
*(bloco/entidade: `LINK_STATUS`)*

### .aiox-core/core/mcp/symlink-manager.js:189
```
   187:       } else {
   188:         return {
>> 189:           status: LINK_STATUS.BROKEN,
   190:           linkPath,
   191:           globalPath,
```
*(bloco/entidade: `return {`)*

### .aiox-core/core/mcp/symlink-manager.js:200
```
   198: 
   199:     return {
>> 200:       status: LINK_STATUS.BROKEN,
   201:       linkPath,
   202:       globalPath,
```
*(bloco/entidade: `return {`)*

### .aiox-core/data/entity-registry.yaml:334
```
   332:       purpose: >-
   333:         Systematically audit all utilities in `.aiox-core/scripts/` to determine their functional status, classify them
>> 334:         as WORKING/FIXABLE/DEPRECATED, and generate actionable recommendations for maintenance a
   335:       keywords:
   336:         - audit
```
*(bloco/entidade: `purpose: >-`)*

### .aiox-core/development/scripts/modo-navegador/minimize-chrome.test.js:9
```
   7: //
   8: // Criado em 11/08/2026 depois de 2 incidentes reais (10/08 e 11/08) onde essa
>> 9: // promessa foi quebrada -- ver modo-navegador-browser-access.md, secao
   10: // "Uso de bringToFront()". Este teste existe pra pegar qualquer bug futuro
   11: // nessa funcao, mesmo um que ninguem documentou ainda -- nao depende de
```

### .aiox-core/development/scripts/squad/squad-loader.js:242
```
   240:     if (manifestFilename === 'config.yaml') {
   241:       console.warn(
>> 242:         `\u26a0\ufe0f  DEPRECATED: ${manifestPath} uses legacy format. Rename to squad.yaml`,
   243:       );
   244:     }
```
*(bloco/entidade: `console.warn(`)*

### .aiox-core/development/scripts/usage-tracker.js:539
```
   537: 
   538:   generateWarningMessage(componentId, deprecationInfo, usage) {
>> 539:     let message = `DEPRECATED: ${componentId} is deprecated`;
   540:     
   541:     if (deprecationInfo.replacement) {
```
*(bloco/entidade: `generateWarningMessage(componentId, deprecationInfo, usage) {`)*

### .aiox-core/development/tasks/audit-utilities.md:229
```
   227: ## Purpose
   228: 
>> 229: Systematically audit all utilities in `.aiox-core/scripts/` to determine their functional status, classify them as WORKING/FIXABLE/DEPRECATED, and generate actionable recommendations for maintenance a
   230: 
   231: ## Classification Criteria
```

### .aiox-core/development/tasks/audit-utilities.md:245
```
   243: - Concept valuable enough to justify fix
   244: 
>> 245: ### 🗑️ DEPRECATED
   246: - Non-functional, major rewrites needed
   247: - Obsolete concept (replaced by better approach)
```

### .aiox-core/development/tasks/audit-utilities.md:265
```
   263: - Check for missing dependencies
   264: - Test exported functions
>> 265: - Classify as WORKING/FIXABLE/DEPRECATED based on errors
   266: 
   267: ### Step 2: Verify Integration Status
```

### .aiox-core/development/tasks/audit-utilities.md:310
```
   308: 
   309: Create comprehensive report with:
>> 310: - Summary statistics (X WORKING, Y FIXABLE, Z DEPRECATED)
   311: - Per-utility details (status, errors, integration count, recommendation)
   312: - Fix priority list (ranked FIXABLE utilities)
>> 313: - Cleanup list (DEPRECATED utilities to remove)
   314: - Story 3.19 activation recommendation
   315: 
```

### .aiox-core/development/tasks/audit-utilities.md:328
```
   326: - ✅ WORKING: Y (Z%)
   327: - 🔧 FIXABLE: A (B%)
>> 328: - 🗑️ DEPRECATED: C (D%)
   329: 
   330: ## Detailed Findings
```

### .aiox-core/development/tasks/audit-utilities.md:338
```
   336: ...
   337: 
>> 338: ### DEPRECATED Utilities (Cleanup Candidates)
   339: ...
   340: 
```

### .aiox-core/development/tasks/check-docs-links.md:86
```
   84: ======================================================================
   85: 
>> 86: ## 1. BROKEN LINKS (no 'coming soon' marker): 5
   87: ------------------------------------------------------------
   88:   docs/guide.md:42 -> ./missing-file.md
```

### .aiox-core/development/tasks/cleanup-utilities.md:24
```
   22: 
   23: - Story 3.17 complete (UTILITIES-AUDIT-REPORT.md exists)
>> 24: - List of DEPRECATED utilities from audit report
   25: - Git repository in clean state
   26: 
```

### .aiox-core/development/tasks/cleanup-utilities.md:33
```
   31: ### ✅ SAFE TO ARCHIVE
   32: - No active code references (grep shows 0 results)
>> 33: - Classified as DEPRECATED in audit report
   34: - Obsolete concept or non-functional
   35: - Duplicate/refactored version exists
```

### .aiox-core/development/tasks/cleanup-utilities.md:201
```
   199: 5. **Update Story 3.18**:
   200:    - Document which utility was restored and why
>> 201:    - Reclassify in audit report (DEPRECATED → WORKING/FIXABLE)
   202: 
   203: ## Archived Utilities
```
*(bloco/entidade: `5. **Update Story 3.18**:`)*

### .aiox-core/development/tasks/deprecate-component.md:584
```
   582: 
   583:   generateUsageWarning(component, plan) {
>> 584:     let warning = `DEPRECATED: ${component.type}/${component.name} is deprecated`;
   585:     
   586:     if (plan.replacement) {
```
*(bloco/entidade: `generateUsageWarning(component, plan) {`)*

### .aiox-core/development/tasks/deprecate-component.md:755
```
   753:     if (warningType === 'yaml_comment') {
   754:       // Add YAML comment for agent files
>> 755:       const warningComment = '# DEPRECATED: This agent is deprecated and will be removed in a future version\n';
   756:       const updatedContent = warningComment + content;
   757:       await fs.writeFile(filePath, updatedContent);
   758:     } else {
   759:       // Add code comment for other files
>> 760:       const warningComment = '// DEPRECATED: This component is deprecated and will be removed in a future version\n';
   761:       const updatedContent = warningComment + content;
   762:       await fs.writeFile(filePath, updatedContent);
```
*(bloco/entidade: `if (warningType === 'yaml_comment') {`)*

### .aiox-core/docs/standards/AGENT-PERSONALIZATION-STANDARD-V1.md:347
```
   345: 
   346: **Example:**
>> 347: **Dex Note:** "Se algum teste falhou, refatore até passar. Não entregue código quebrado."
   348: **Quinn Note:** "Valide edge cases extras além dos listados. Proteção nunca é demais."
   349: ```
```

### .aiox-core/infrastructure/scripts/ide-sync/redirect-generator.js:63
```
   61:   const baseContent = {
   62:     header: `# Agent Redirect: ${oldId} → ${newId}`,
>> 63:     notice: `**DEPRECATED:** This agent has been renamed/merged.`,
   64:     instruction: `Use \`@${newId}\` instead.`,
   65:   };
```
*(bloco/entidade: `baseContent`)*

### .aiox-core/infrastructure/scripts/path-analyzer.js:362
```
   360: 
   361:   if (report.brokenReferences.length > 0) {
>> 362:     lines.push('BROKEN REFERENCES');
   363:     lines.push('─────────────────');
   364:     report.brokenReferences.forEach((ref) => {
```
*(bloco/entidade: `if (report.brokenReferences.length > 0) {`)*

### .aiox-core/infrastructure/scripts/test-utilities-fast.js:67
```
   65:       result.recommendation = 'Missing dependencies - installable';
   66:     } else if (error.message.includes('SyntaxError')) {
>> 67:       result.status = 'DEPRECATED';
   68:       result.recommendation = 'Syntax errors - major rewrite needed';
   69:     } else {
>> 70:       result.status = 'DEPRECATED';
   71:       result.recommendation = 'Runtime errors - investigation needed';
   72:     }
```
*(bloco/entidade: `} else if (error.message.includes('SyntaxError')) {`)*

### .aiox-core/infrastructure/scripts/test-utilities-fast.js:105
```
   103:   const working = results.filter(r => r.status === 'WORKING');
   104:   const fixable = results.filter(r => r.status === 'FIXABLE');
>> 105:   const deprecated = results.filter(r => r.status === 'DEPRECATED');
   106: 
   107:   console.log('\n📊 QUICK AUDIT SUMMARY\n');
   108:   console.log(`✅ WORKING:     ${working.length} (${Math.round(working.length / utilities.length * 100)}%)`);
   109:   console.log(`🔧 FIXABLE:     ${fixable.length} (${Math.round(fixable.length / utilities.length * 100)}%)`);
>> 110:   console.log(`🗑️  DEPRECATED:  ${deprecated.length} (${Math.round(deprecated.length / utilities.length * 100)}%)`);
   111:   console.log(`\n📦 Total: ${utilities.length}`);
   112: 
```

### .aiox-core/infrastructure/scripts/test-utilities.js:7
```
   5:  *
   6:  * Systematically tests all utilities in .aiox-core/scripts/ and classifies them
>> 7:  * as WORKING, FIXABLE, or DEPRECATED based on their functional status.
   8:  *
   9:  * Usage: node .aiox-core/scripts/test-utilities.js
```
*(bloco/entidade: `/**`)*

### .aiox-core/infrastructure/scripts/test-utilities.js:109
```
   107:       result.recommendation = 'Install missing dependencies';
   108:     } else if (error.message.includes('SyntaxError')) {
>> 109:       result.status = 'DEPRECATED';
   110:       result.recommendation = 'Syntax errors - needs major rewrite';
   111:     } else if (error.message.includes('Cannot find module')) {
   112:       result.status = 'FIXABLE';
   113:       result.recommendation = 'Missing local dependencies - <4h fix';
   114:     } else {
>> 115:       result.status = 'DEPRECATED';
   116:       result.recommendation = 'Execution errors - needs investigation';
   117:     }
```
*(bloco/entidade: `} else if (error.message.includes('SyntaxError')) {`)*

### .aiox-core/infrastructure/scripts/test-utilities.js:162
```
   160:   const working = results.filter(r => r.status === 'WORKING');
   161:   const fixable = results.filter(r => r.status === 'FIXABLE');
>> 162:   const deprecated = results.filter(r => r.status === 'DEPRECATED');
   163:   const unknown = results.filter(r => r.status === 'UNKNOWN');
   164: 
   165:   console.log('\n📊 AUDIT SUMMARY\n');
   166:   console.log(`✅ WORKING:     ${working.length} (${Math.round(working.length / utilities.length * 100)}%)`);
   167:   console.log(`🔧 FIXABLE:     ${fixable.length} (${Math.round(fixable.length / utilities.length * 100)}%)`);
>> 168:   console.log(`🗑️  DEPRECATED:  ${deprecated.length} (${Math.round(deprecated.length / utilities.length * 100)}%)`);
   169:   console.log(`❓ UNKNOWN:     ${unknown.length} (${Math.round(unknown.length / utilities.length * 100)}%)`);
   170:   console.log(`\n📦 Total Utilities: ${utilities.length}`);
```

### .aiox-core/product/templates/personalized-checklist-template.md:114
```
   112: 
   113: ### Builder (Dex)
>> 114: > "Se algum teste falhou, refatore até passar. Não entregue código quebrado. Construa com qualidade desde o início."
   115: 
   116: ### Guardian (Quinn)
```

### .aiox-core/product/templates/personalized-checklist-template.md:299
```
   297: 
   298: - [ ] Validate all items still relevant
>> 299: - [ ] Remove obsolete checks
   300: - [ ] Benchmark against industry standards
   301: - [ ] Collect team feedback on usability
```

### .aiox-core/workflow-intelligence/learning/pattern-store.js:41
```
   39:   ACTIVE: 'active',
   40:   PROMOTED: 'promoted',
>> 41:   DEPRECATED: 'deprecated',
   42: };
   43: 
```
*(bloco/entidade: `PATTERN_STATUS`)*

### squads/squad-creator-pro/agents/pedro-valerio.md:69
```
   67: ⚙️ **Pedro Valério** - AI Head de OPS
   68: 
>> 69: "Tá ligado que processo que permite erro é processo quebrado, né?
   70: Me passa os insumos que eu construo os artefatos."
   71: 
```

### squads/squad-creator-pro/benchmarks/golden/hormozi-golden.yaml:40
```
   38:       - "atraso temporal"
   39:     source: "$100M Offers, Cap 6"
>> 40:     criticality: "CORE"  # Falta = extracao quebrada
   41: 
   42:   - id: "FW002"
```
*(bloco/entidade: `- id: "FW001"`)*

### squads/squad-creator-pro/config/scoring-rubric.yaml:63
```
   61:         criteria: "Formato parcial, algumas seções fora de padrão"
   62:       - score: 0
>> 63:         criteria: "Formato quebrado, não parseável"
   64: 
   65:   actionability:
```
*(bloco/entidade: `- score: 0`)*

### squads/squad-creator-pro/config/veto-conditions.yaml:9
```
   7:   version: "2.0"
   8:   philosophy: |
>> 9:     "Processo que permite erro é processo quebrado."
   10:     Veto conditions são bloqueios FÍSICOS, não recomendações.
   11:     Se o executor CONSEGUE fazer errado, o processo está errado.
```
*(bloco/entidade: `philosophy: |`)*

### squads/squad-creator-pro/data/an-source-tiers.yaml:35
```
   33:       - type: "Conteudo antigo (desatualizado)"
   34:         why: "Pessoa pode ter mudado de opiniao, metodo evoluiu"
>> 35:         risk: "Clone replica versao obsoleta da mente"
   36:       - type: "Material generico (nao diferenciador)"
   37:         why: "Nao captura o que torna a pessoa UNICA"
```
*(bloco/entidade: `- type: "Conteudo antigo (desatualizado)"`)*

### squads/squad-creator-pro/data/fusion-executor-analysis.md:399
```
   397:         local target=$(echo "$line" | sed 's/.*handoff_to:\s*//' | tr -d '"' | tr -d "'")
   398:         if [[ ! -f "$workspace/agents/$target.md" ]]; then
>> 399:             echo "BROKEN: handoff_to $target"
   400:             ((errors++))
   401:         fi
```
*(bloco/entidade: `if [[ ! -f "$workspace/agents/$target.md" ]]; then`)*

### squads/squad-creator-pro/scripts/assess-sources.sh:193
```
   191: 
   192:     # D3.3: Not contradicted (no "outdated" or "deprecated" markers)
>> 193:     if ! grep -qiE "(outdated|deprecated|no longer|obsolete|was true but)" "$FILE"; then
   194:         D3=$((D3 + 1))
   195:         D3_3="PASS"
```

### squads/squad-creator-pro/scripts/README.md:22
```
   20: | 2 | `clone-review.sh` | Bash | tasks/an-clone-review.md, config/model-routing.yaml | Clone review execution with model routing | ACTIVE |
   21: | 3 | `coherence-validator.py` | Python | workflows/wf-create-squad.yaml, data/hybridops-patterns.md | Squad coherence validation (also delegated from base adapter) | ACTIVE |
>> 22: | 4 | `create-agent-preflight.py` | Python | NONE | Deterministic preflight checks for create-agent task | DEPRECATED |
   23: | 5 | `fidelity-score.sh` | Bash | tasks/an-fidelity-score.md, tasks/optimize.md, config/model-routing.yaml | Fidelity scoring with multi-task reference | ACTIVE |
   24: | 6 | `model-tier-validator.cjs` | Node.js | tasks/qualify-task.md, tasks/smoke-test-model-routing.md, workflows/wf-model-tier-qualification.yaml, config/scoring-rubric.yaml | Model tier validation an
```

### squads/squad-creator-pro/tasks/extract-sop.md:336
```
   334: - "João knows how to do this" → Single point of failure
   335: - "We figure it out" → Undocumented exception
>> 336: - "It's always been this way" → May be obsolete
   337: 
   338: ---
```

### squads/squad-creator-pro/tasks/migrate-workflows-to-yaml.md:195
```
   193: Before handoff, verify:
   194: - [ ] Todos workflows migrados passam validação
>> 195: - [ ] Nenhuma referência quebrada a arquivos .md
   196: - [ ] _archive/ contém backups
   197: 
```

### squads/squad-creator-pro/tasks/optimize-workflow.md:589
```
   587:   for_each_recommendation:
   588:     D1_redundant_phases:
>> 589:       action: "Comment out phase with # DEPRECATED: reason"
   590:       backup: "Create .bak file before modification"
   591: 
```
*(bloco/entidade: `D1_redundant_phases`)*

### squads/squad-creator-pro/tasks/pv-audit.md:25
```
   23: ## CRITICAL: Token Budget
   24: 
>> 25: **VETO CONDITION:** Audit que estoura contexto é audit quebrado.
   26: 
   27: ```
```

### squads/squad-creator-pro/test-cases/an-assess-sources/CHECKPOINT_MATRIX.md:182
```
   180: ### Por que essa regra importa para clones:
   181: 
>> 182: Quando estamos extraindo a mente de alguém, evolução visível = sinal de maturação intelectual. Um clone que replica apenas a primeira obra pode ser obsoleto comparado à versão 3.0 do autor.
   183: 
   184: ---
```

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-output.yaml:140
```
   138:           storytelling: true
   139:           score: 5
>> 140:           notes: "História pessoal de quebra (reembolsos $150k). Admite fracasso com parceiro trapaceiro (perdeu dinheiro da venda das academias). Tom honesto: 'estou quebrado', 'fui péssimo'. Respond
   141: 
   142:         profundidade:
```
*(bloco/entidade: `autenticidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.1-output.yaml:192
```
   190:           nota: "Conversa com dono de armazenamento (27 locações) é conversacional e real"
   191:           vulnerabilidade: true
>> 192:           nota: "Admite ter dormido no chão da academia, estava quebrado, com medo"
   193:           respostas_dificeis: true
   194:           nota: "Explica diretamente por que falhou com primeiros clientes (modelo ruim)"
```
*(bloco/entidade: `autenticidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.2.1-output.yaml:141
```
   139:           storytelling: true
   140:           score: 5
>> 141:           evidence: "Vulnerabilidade extrema (dormiu no chão da academia, seis meses quebrado), voz pessoal intensa, responde perguntas hard (falha de modelos de negócio), nuance em modelo pirata vs v
   142: 
   143:         profundidade:
```
*(bloco/entidade: `autenticidade`)*

### squads/squad-creator-pro/test-cases/BATCH-PROGRESS.md:30
```
   28: | 1 | refresh-registry | ✅ PRE-QUALIFIED | Hybrid (Script 80%) | **HAIKU** - Script counts, LLM enriches |
   29: | 2 | squad-analytics | ✅ PRE-QUALIFIED | Hybrid (Script 80%) | **HAIKU** - Script metrics, LLM interprets |
>> 30: | 3 | migrate-workflows-to-yaml | ⏸️ DEPRECATED | - | One-time task (completed 2026-02-05) |
   31: | 4 | install-commands | ✅ PRE-QUALIFIED | Worker (100%) | **SCRIPT** - 0 tokens, file operations only |
   32: | 5 | sync-ide-command | ✅ PRE-QUALIFIED | Worker (100%) | **SCRIPT** - 0 tokens, file operations only |
```

### squads/squad-creator-pro/workflows/wf-mind-research-loop.yaml:2
```
   1: # ═══════════════════════════════════════════════════════════════════════════════
>> 2: # ⚠️  DEPRECATED - Use /mind-research instead
   3: # ═══════════════════════════════════════════════════════════════════════════════
   4: #
```

### squads/squad-creator-pro/workflows/wf-model-tier-qualification.yaml:71
```
   69: 
   70:   - id: MTQ_VC_003
>> 71:     trigger: "Haiku output não parseável (YAML inválido, estrutura quebrada)"
   72:     action: "BLOCK - Falha de formato. Compensar com COMP_002 ou COMP_003."
   73: 
```
*(bloco/entidade: `- id: MTQ_VC_003`)*

### squads/squad-creator-pro/workflows/wf-squad-fusion.yaml:883
```
   881:             target=$(echo "$ref" | extract_target)
   882:             if ! exists("{workspace}/*/$target*"); then
>> 883:               echo "BROKEN REF: $ref"
   884:             fi
   885:           done
```
*(bloco/entidade: `if ! exists("{workspace}/*/$target*"); then`)*

### squads/squad-creator/agents/pedro-valerio.md:30
```
   28: ⚙️ **Pedro Valério** - AI Head de OPS
   29: 
>> 30: "Tá ligado que processo que permite erro é processo quebrado, né?
   31: Me passa os insumos que eu construo os artefatos."
   32: 
```

### squads/squad-creator/config/veto-conditions.yaml:9
```
   7:   version: "2.0"
   8:   philosophy: |
>> 9:     "Processo que permite erro é processo quebrado."
   10:     Veto conditions são bloqueios FÍSICOS, não recomendações.
   11:     Se o executor CONSEGUE fazer errado, o processo está errado.
```
*(bloco/entidade: `philosophy: |`)*

### squads/squad-creator/data/an-source-tiers.yaml:35
```
   33:       - type: "Conteudo antigo (desatualizado)"
   34:         why: "Pessoa pode ter mudado de opiniao, metodo evoluiu"
>> 35:         risk: "Clone replica versao obsoleta da mente"
   36:       - type: "Material generico (nao diferenciador)"
   37:         why: "Nao captura o que torna a pessoa UNICA"
```
*(bloco/entidade: `- type: "Conteudo antigo (desatualizado)"`)*

### squads/squad-creator/data/fusion-executor-analysis.md:399
```
   397:         local target=$(echo "$line" | sed 's/.*handoff_to:\s*//' | tr -d '"' | tr -d "'")
   398:         if [[ ! -f "$workspace/agents/$target.md" ]]; then
>> 399:             echo "BROKEN: handoff_to $target"
   400:             ((errors++))
   401:         fi
```
*(bloco/entidade: `if [[ ! -f "$workspace/agents/$target.md" ]]; then`)*

### squads/squad-creator/data/squad-kb.md:929
```
   927: - Update dependencies regularly
   928: - Test with new AIOS versions
>> 929: - Deprecate obsolete features gracefully
   930: 
   931: **Plan for Growth**
```

### squads/squad-creator/docs/MIGRATION-ROADMAP-HYBRIDOPS.md:106
```
   104: ⚙️ **Pedro Valério** - AI Head de OPS
   105: 
>> 106: "Tá ligado que processo que permite erro é processo quebrado, né?
   107: Me passa os insumos que eu construo os artefatos."
   108: 
```

### squads/squad-creator/docs/session-report-2026-02-01.md:15
```
   13: ### Problemas Identificados
   14: 
>> 15: 1. **Nomenclatura obsoleta:** Termo "expansion" era legado de quando o sistema se chamava "expansion-pack"
   16: 2. **Agent principal abaixo do padrão:** 272 linhas (mínimo: 300), sem voice_dna, sem output_examples
   17: 3. **Frameworks criados mas não usados:** Documentação morta nos workflows
```

### squads/squad-creator/docs/sop-extraction-process.md:147
```
   145: | "[name] knows how" | Single point of failure | Flag as risk, document knowledge |
   146: | "this is rare" | Exception becoming rule | Verify frequency, may need process |
>> 147: | "always been this way" | Potentially obsolete | Question necessity, validate |
   148: 
   149: ---
```

### squads/squad-creator/tasks/extract-sop.md:317
```
   315: - "João knows how to do this" → Single point of failure
   316: - "We figure it out" → Undocumented exception
>> 317: - "It's always been this way" → May be obsolete
   318: 
   319: ---
```

### squads/squad-creator/tasks/migrate-workflows-to-yaml.md:182
```
   180: Before handoff, verify:
   181: - [ ] Todos workflows migrados passam validação
>> 182: - [ ] Nenhuma referência quebrada a arquivos .md
   183: - [ ] _archive/ contém backups
   184: 
```

### squads/squad-creator/tasks/pv-audit.md:13
```
   11: ## CRITICAL: Token Budget
   12: 
>> 13: **VETO CONDITION:** Audit que estoura contexto é audit quebrado.
   14: 
   15: ```
```

### squads/squad-creator/templates/pop-extractor-prompt.md:543
```
   541: - [ ] "So-and-so knows how" → single point of failure
   542: - [ ] "This is rare" → exception that may become the rule
>> 543: - [ ] "It's always been this way" → may be obsolete
   544: 
   545: ---
```

### squads/squad-creator/workflows/wf-mind-research-loop.yaml:2
```
   1: # ═══════════════════════════════════════════════════════════════════════════════
>> 2: # ⚠️  DEPRECATED - Use /mind-research instead
   3: # ═══════════════════════════════════════════════════════════════════════════════
   4: #
```

### squads/squad-creator/workflows/wf-squad-fusion.yaml:883
```
   881:             target=$(echo "$ref" | extract_target)
   882:             if ! exists("{workspace}/*/$target*"); then
>> 883:               echo "BROKEN REF: $ref"
   884:             fi
   885:           done
```
*(bloco/entidade: `if ! exists("{workspace}/*/$target*"); then`)*

## 👯 Possível duplicata (166 trechos com contexto, 166 ocorrências totais)

### .aiox-core/cli/commands/mcp/index.js:40
```
   38: Benefits:
   39:   - Configure MCP servers once, use everywhere
>> 40:   - No duplicate configurations across projects
   41:   - Easy maintenance and updates
   42:   - Consistent MCP setup across workspaces
```
*(bloco/entidade: `Benefits`)*

### .aiox-core/cli/commands/mcp/link.js:163
```
   161:             const stats = migrationResult.results.mergeStats;
   162:             if (stats.skipped > 0) {
>> 163:               console.log(`  ⚠ Skipped ${stats.skipped} duplicate servers`);
   164:             }
   165:           }
```
*(bloco/entidade: `if (stats.skipped > 0) {`)*

### .aiox-core/core/code-intel/helpers/creation-helper.js:13
```
   11:  * Functions:
   12:  *   - getCodebaseContext(targetPath) — project structure + conventions for agent creation
>> 13:  *   - checkDuplicateArtefact(name, description) — duplicate detection before artefact creation
   14:  *   - enrichRegistryEntry(entityName, entityPath) — pre-populate usedBy/dependencies for entity registry
   15:  */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/code-intel/helpers/creation-helper.js:57
```
   55: 
   56: /**
>> 57:  * Check for duplicate artefacts before creating a new one.
   58:  * Combines detectDuplicates + findReferences for comprehensive detection.
   59:  * Used by task creation workflows — returns advisory warning, never blocks.
   60:  *
   61:  * @param {string} name - Name of the artefact to create
   62:  * @param {string} description - Description of the artefact
>> 63:  * @returns {Promise<{duplicates: Array, references: Array, warning: string}|null>} Duplicate info or null
   64:  */
   65: async function checkDuplicateArtefact(name, description) {
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/code-intel/helpers/creation-helper.js:152
```
   150: 
   151: /**
>> 152:  * Format a human-readable duplicate warning message.
   153:  * @param {string} name - Artefact name
   154:  * @param {Object|null} dupes - Result from detectDuplicates
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/code-intel/helpers/dev-helper.js:150
```
   148: 
   149: /**
>> 150:  * Format a Code Intelligence Suggestion message from duplicate detection results.
   151:  * @param {Object|null} dupes - Result from detectDuplicates
   152:  * @param {Array|null} nameRefs - Result from findReferences
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/code-intel/helpers/story-helper.js:18
```
   16: 
   17: /**
>> 18:  * Detect duplicate stories/functionality in the codebase.
   19:  * Used by @sm during story creation — returns advisory warning only, never blocks.
   20:  *
   21:  * @param {string} description - Story description to check for duplicates
>> 22:  * @returns {Promise<{matches: Array, warning: string}|null>} Duplicate info or null
   23:  */
   24: async function detectDuplicateStory(description) {
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/code-intel/helpers/story-helper.js:89
```
   87: 
   88: /**
>> 89:  * Validate that a story description does not duplicate existing functionality.
   90:  * Used by @po during story validation — returns boolean for checklist item.
   91:  *
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/code-intel/helpers/story-helper.js:124
```
   122: 
   123: /**
>> 124:  * Format a human-readable warning message from duplicate matches.
>> 125:  * @param {Array} matches - Array of duplicate match objects
   126:  * @returns {string} Formatted warning message
   127:  * @private
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/code-intel/providers/registry-provider.js:242
```
   240:     const seen = new Set();
   241: 
>> 242:     // 1. Exact name match (may return multiple for duplicate names)
   243:     const exactMatches = this._byName.get(symbol) || this._byName.get(symbolLower) || [];
   244:     for (const entity of exactMatches) {
```
*(bloco/entidade: `_fuzzyMatch(symbol, _options = {}) {`)*

### .aiox-core/core/config/migrate-config.js:10
```
   8:  * Safety:
   9:  * - Creates backup before migration (core-config.backup.yaml)
>> 10:  * - Idempotent: re-running does not duplicate or corrupt
   11:  * - Keeps core-config.yaml as legacy fallback (does not delete)
   12:  *
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/docs/component-creation-guide.md:332
```
   330: - Use plain text for content
   331: 
>> 332: #### Duplicate Component Names
   333: 
   334: **Problem**: Component already exists
```

### .aiox-core/core/errors/error-registry.js:67
```
   65: 
   66:     if (this._entries.has(normalized.code)) {
>> 67:       throw new Error(`Duplicate AIOX error code: ${normalized.code}`);
   68:     }
   69: 
```
*(bloco/entidade: `if (this._entries.has(normalized.code)) {`)*

### .aiox-core/core/errors/error-registry.js:108
```
   106: 
   107:     if (codes.length !== unique.size) {
>> 108:       throw new Error('ErrorRegistry contains duplicate error codes');
   109:     }
   110: 
```
*(bloco/entidade: `if (codes.length !== unique.size) {`)*

### .aiox-core/core/ids/README.md:111
```
   109: 5. Resolves reverse `usedBy` relationships
   110: 6. Assigns default adaptability scores by entity type
>> 111: 7. Skips duplicate entity IDs with a warning
   112: 
   113: ### Current Stats
```

### .aiox-core/core/manifest/manifest-validator.js:230
```
   228:       const idsSeen = new Set();
   229:       for (const row of rows) {
>> 230:         // Check for duplicate IDs
   231:         if (row.id) {
   232:           if (idsSeen.has(row.id)) {
>> 233:             result.errors.push(`Duplicate ID '${row.id}' at line ${row._lineNumber}`);
   234:             result.valid = false;
   235:           }
```
*(bloco/entidade: `for (const row of rows) {`)*

### .aiox-core/core/mcp/config-migrator.js:167
```
   165:       stats.conflicts.push({ name, action: 'overwritten' });
   166:     } else {
>> 167:       // Skip duplicate
   168:       stats.skipped++;
   169:       stats.conflicts.push({ name, action: 'skipped' });
```
*(bloco/entidade: `} else {`)*

### .aiox-core/core/orchestration/bob-status-writer.js:14
```
   12:  * - Atomic file writes (temp file + rename)
   13:  * - Single source of truth schema shared with WebSocket events
>> 14:  * - Integrates with DashboardIntegration (extends, doesn't duplicate)
   15:  *
   16:  * @module core/orchestration/bob-status-writer
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/brownfield-handler.js:16
```
   14:  * - AC4: Generates system-architecture.md and TECHNICAL-DEBT-REPORT.md
   15:  * - AC5: Post-discovery flow: resolve debts or add feature
>> 16:  * - AC6: Idempotent re-execution (update, don't duplicate)
   17:  *
   18:  * @module core/orchestration/brownfield-handler
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/greenfield-handler.js:383
```
   381:       }
   382: 
>> 383:       // Check idempotency — if artifact already exists, it was updated not duplicated (AC17)
   384:       if (step.creates) {
   385:         this._checkAndLogIdempotency(step.creates);
```

### .aiox-core/core/registry/validate-registry.js:111
```
   109:       return {
   110:         passed: false,
>> 111:         error: `${duplicates.length} duplicate IDs found`,
   112:         details: duplicates,
   113:       };
```
*(bloco/entidade: `return {`)*

### .aiox-core/data/tech-presets/go.md:112
```
   110: **Bugs Eliminated:**
   111: 
>> 112: - Regra duplicada em handlers
   113: - Side effects nao coordenados
   114: - Fluxos parcialmente persistidos
```

### .aiox-core/data/tech-presets/php.md:202
```
   200: **Bugs Eliminated:**
   201: 
>> 202: - Setup duplicado em testes
   203: - Casos de teste pouco expressivos
   204: 
```

### .aiox-core/data/tech-presets/rust.md:94
```
   92: **Bugs Eliminated:**
   93: 
>> 94: - Regra duplicada em handlers
   95: - Sequencia de passos inconsistente
   96: 
```

### .aiox-core/development/agents/ux-design-expert.md:388
```
   386:       - 'User: @ux-design-expert'
   387:       - 'User: *audit ./src'
>> 388:       - 'UX-Expert: Found 176 redundant patterns'
   389:       - 'User: *shock-report'
   390:       - 'UX-Expert: Visual HTML report with side-by-side comparisons'
```
*(bloco/entidade: `session`)*

### .aiox-core/development/checklists/brownfield-compatibility-checklist.md:55
```
   53: - [ ] `npx aiox-core doctor` reports healthy
   54: - [ ] Agent activation works (@dev, @architect, etc.)
>> 55: - [ ] Existing docs not duplicated
   56: 
   57: ### 10. Rollback Verification
```

### .aiox-core/development/checklists/issue-triage-checklist.md:17
```
   15: - [ ] Status set to `status: confirmed` OR `status: needs-info`
   16: - [ ] If `status: needs-info` — comment posted asking for specific details
>> 17: - [ ] If duplicate — labeled `duplicate`, closed with reference to original issue
   18: 
   19: ### Community
```

### .aiox-core/development/data/quality-dimensions-framework.md:232
```
   230: **Red Flags:**
   231: 
>> 232: - Redundant work
   233: - Over-engineering
   234: - Under-utilization of available resources
```

### .aiox-core/development/scripts/greeting-builder.js:79
```
   77:   /**
   78:    * Load resolved config once, shared across greeting build.
>> 79:    * Story ACT-9 QA fix: Eliminates duplicate resolveConfig() calls per greeting build.
   80:    * @returns {Object|null} Resolved config object, or null on failure
   81:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/greeting-builder.js:97
```
   95:    * Story ACT-2 - AC3: Runs validate-user-profile during activation (not just installation).
   96:    * Reads fresh each time (skipCache: true) to reflect toggle changes immediately.
>> 97:    * @param {Object} [resolvedConfig] - Pre-loaded config to avoid duplicate resolveConfig() call
   98:    * @returns {string} User profile ('bob' | 'advanced'), defaults to 'advanced'
   99:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/greeting-builder.js:136
```
   134: 
   135:     try {
>> 136:       // ACT-11: Use pre-loaded config from pipeline context to avoid duplicate resolveConfig()
   137:       const resolvedConfig = context._coreConfig || this._loadResolvedConfig();
   138:       // Story ACT-2: Load user profile early so preference manager can account for it
```
*(bloco/entidade: `try {`)*

### .aiox-core/development/scripts/greeting-builder.js:171
```
   169:    * Build contextual greeting (internal implementation)
   170:    * Story 10.3: Profile-aware greeting with conditional agent visibility
>> 171:    * Story ACT-2: Accepts pre-loaded userProfile to avoid redundant loadUserProfile() calls
   172:    * Story ACT-7: Context-aware sections with parallelization and enriched context
   173:    * Story ACT-12: Language removed — delegated to Claude Code native settings.json
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/modo-navegador/abrir-aba-background.js:35
```
   33:       // o Chrome pode ter criado a aba de verdade mesmo com o evento 'page' do
   34:       // Playwright atrasado -- procurar por ela evita deixar aba orfa e evita
>> 35:       // criar uma segunda aba duplicada numa proxima tentativa.
   36:       const fallbackPage = context.pages().find((p) => p.url() === targetUrl);
   37:       if (fallbackPage) {
```
*(bloco/entidade: `} catch (err) {`)*

### .aiox-core/development/scripts/refactoring-suggester.js:83
```
   81:     });
   82: 
>> 83:     // Consolidate duplicate code
   84:     this.refactoringPatterns.set('consolidate_duplicates', {
>> 85:       name: 'Consolidate Duplicate Code',
>> 86:       description: 'Extract duplicate code into shared functions',
   87:       detector: this.detectDuplicateCode.bind(this),
   88:       suggester: this.suggestCodeConsolidation.bind(this),
```

### .aiox-core/development/scripts/refactoring-suggester.js:496
```
   494:     const duplicates = [];
   495:     const codeBlocks = new Map();
>> 496:     const minBlockSize = 5; // minimum lines for duplicate detection
   497: 
   498:     traverse(_ast, {
```
*(bloco/entidade: `async detectDuplicateCode(_ast, _content, metrics) {`)*

### .aiox-core/development/scripts/refactoring-suggester.js:508
```
   506:               type: 'duplicate_code',
   507:               original: original,
>> 508:               duplicate: path,
   509:               startLine: path.node.loc?.start.line,
   510:               endLine: path.node.loc?.end.line,
```
*(bloco/entidade: `duplicates.push({`)*

### .aiox-core/development/scripts/refactoring-suggester.js:726
```
   724:     const suggestion = {
   725:       type: 'consolidate_duplicates',
>> 726:       description: `Extract duplicate code block (${detection.lines} lines)`,
   727:       location: {
   728:         start: detection.startLine,
   729:         end: detection.endLine
   730:       },
   731:       impact: Math.min(9, detection.lines),
>> 732:       details: `Found duplicate code block. Extract into a shared function.`,
   733:       suggestedRefactoring: this.generateConsolidationSuggestion(_detection)
   734:     };
```
*(bloco/entidade: `suggestion`)*

### .aiox-core/development/scripts/refactoring-suggester.js:972
```
   970:         },
   971:         {
>> 972:           start: detection.duplicate.node.loc?.start.line,
>> 973:           end: detection.duplicate.node.loc?.end.line
   974:         }
   975:       ]
```
*(bloco/entidade: `{`)*

### .aiox-core/development/scripts/squad/squad-validator.js:702
```
   700:     // Resolve path relative to squad directory
   701:     // path.resolve handles both local paths (config/file.md) and relative paths (../../docs/framework/...)
>> 702:     // Simplified from redundant path.resolve + path.join (CodeRabbit nitpick)
   703:     const resolvedPath = path.resolve(squadPath, configPath);
   704:     if (await this._pathExists(resolvedPath)) {
```
*(bloco/entidade: `async _resolveConfigPath(squadPath, configPath) {`)*

### .aiox-core/development/tasks/analise-acos-catalogo-mercadolivre.md:52
```
   50: **⚠️ Cada `#`/MLB dentro do mesmo painel de "N variações" pode ter um SKU diferente dos outros.** Não presumir que todos os MLBs listados nas variações de um produto resolvem pro mesmo SKU — cada um p
   51: 
>> 52: **⚠️ Um mesmo MLB pode aparecer DUPLICADO dentro do painel de "N variações" (08/08/2026):** isso é comportamento normal do próprio Mercado Livre, não é erro do processo — nunca investigar como se foss
   53: 
   54: ## Passo 3 — Determinar SKU e status de catálogo de cada MLB
```

### .aiox-core/development/tasks/analyze-framework.md:535
```
   533:     // Redundancy issues
   534:     if (analysis.redundancy_analysis.redundant_components?.length > 0) {
>> 535:       console.log(chalk.bold('\n🔄 Redundant Components'));
   536:       console.log(chalk.gray('─'.repeat(50)));
   537:       
```
*(bloco/entidade: `if (analysis.redundancy_analysis.redundant_components?.length > 0) {`)*

### .aiox-core/development/tasks/analyze-framework.md:629
```
   627: ### Redundancy Analysis
   628: ${analysis.redundancy_analysis.redundant_components?.length > 0 ?
>> 629:   `**Redundant Components:** ${analysis.redundancy_analysis.redundant_components.length}\n\n` +
   630:   analysis.redundancy_analysis.redundant_components.slice(0, 3).map(r =>
   631:     `- **${r.component1}** ↔️ **${r.component2}** (${r.similarity}% similar)`
```
*(bloco/entidade: `${analysis.redundancy_analysis.redundant_components?.length > 0 ?`)*

### .aiox-core/development/tasks/audit-tailwind-config.md:230
```
   228: 5. **Utility Health Scan**
   229:    - Run class collision detection (tailwind-merge or eslint-plugin-tailwindcss)
>> 230:    - Identify redundant custom utilities replaced by tokens/variants
   231:    - Detect legacy classes (e.g., `outline-none` instead of `outline-hidden`)
   232: 
```
*(bloco/entidade: `5. **Utility Health Scan**`)*

### .aiox-core/development/tasks/audit-tailwind-config.md:252
```
   250: 
   251: - [ ] `@theme` defines full token stack with no missing categories
>> 252: - [ ] `@layer` usage consistent and free of duplicate definitions
   253: - [ ] Content paths cover 100% of templates (no orphaned utilities)
   254: - [ ] tailwind-merge/eslint scans zero conflicts or all logged issues resolved
```

### .aiox-core/development/tasks/blocks/README.md:145
```
   143: ## Lines Saved (ROI)
   144: 
>> 145: When a block is adopted, it replaces duplicated code across tasks:
   146: 
   147: | Block | Lines per task | Tasks using | Total lines saved |
```

### .aiox-core/development/tasks/build-component.md:120
```
   118: ```yaml
   119: acceptance-criteria:
>> 120:   - [ ] Resource exists and is valid; no duplicate resources created
   121:     tipo: acceptance-criterion
   122:     blocker: true
   123:     validação: |
>> 124:       Assert resource exists and is valid; no duplicate resources created
>> 125:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   126: ```
   127: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/cleanup-utilities.md:35
```
   33: - Classified as DEPRECATED in audit report
   34: - Obsolete concept or non-functional
>> 35: - Duplicate/refactored version exists
   36: 
   37: ### ⚠️ NEEDS REVIEW
```

### .aiox-core/development/tasks/cleanup-utilities.md:89
```
   87: 
   88: From UTILITIES-AUDIT-REPORT.md, identify all utilities in:
>> 89: - Category A: Duplicate/Redundant Versions
   90: - Category B: Incomplete Experiments
   91: - Category C: Obsolete Concepts
```

### .aiox-core/development/tasks/cleanup-utilities.md:163
```
   161: ## Archive Categories
   162: 
>> 163: ### Category A: Duplicate/Redundant Versions (9 files)
   164: Utilities with `-refactored` or `-fixed` suffixes where original version works.
   165: 
```

### .aiox-core/development/tasks/cleanup-utilities.md:461
```
   459: ## Archived Utilities
   460: 
>> 461: ### Category A: Duplicate/Redundant (9 files)
>> 462: 1. aiox-validator-fixed.js - Duplicate of aiox-validator.js
>> 463: 2. aiox-validator-refactored.js - Duplicate of aiox-validator.js
   464: ...
   465: 
```

### .aiox-core/development/tasks/compose-molecule.md:120
```
   118: ```yaml
   119: acceptance-criteria:
>> 120:   - [ ] Resource exists and is valid; no duplicate resources created
   121:     tipo: acceptance-criterion
   122:     blocker: true
   123:     validação: |
>> 124:       Assert resource exists and is valid; no duplicate resources created
>> 125:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   126: ```
   127: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/create-brownfield-story.md:116
```
   114: ```yaml
   115: acceptance-criteria:
>> 116:   - [ ] Resource exists and is valid; no duplicate resources created
   117:     tipo: acceptance-criterion
   118:     blocker: true
   119:     validação: |
>> 120:       Assert resource exists and is valid; no duplicate resources created
>> 121:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   122: ```
   123: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/create-deep-research-prompt.md:116
```
   114: ```yaml
   115: acceptance-criteria:
>> 116:   - [ ] Resource exists and is valid; no duplicate resources created
   117:     tipo: acceptance-criterion
   118:     blocker: true
   119:     validação: |
>> 120:       Assert resource exists and is valid; no duplicate resources created
>> 121:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   122: ```
   123: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/create-doc.md:126
```
   124: ```yaml
   125: acceptance-criteria:
>> 126:   - [ ] Resource exists and is valid; no duplicate resources created
   127:     tipo: acceptance-criterion
   128:     blocker: true
   129:     validação: |
>> 130:       Assert resource exists and is valid; no duplicate resources created
>> 131:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   132: ```
   133: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/create-next-story.md:116
```
   114: ```yaml
   115: acceptance-criteria:
>> 116:   - [ ] Resource exists and is valid; no duplicate resources created
   117:     tipo: acceptance-criterion
   118:     blocker: true
   119:     validação: |
>> 120:       Assert resource exists and is valid; no duplicate resources created
>> 121:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   122: ```
   123: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/create-next-story.md:242
```
   240: - Announce the identified story to the user: "Identified next story for preparation: {epicNum}.{storyNum} - {Story Title}"
   241: 
>> 242: ### 1.2 Code Intelligence: Duplicate Detection & File Suggestions (Auto-skip if unavailable)
   243: 
   244: - **Check code intelligence availability:** Call `isCodeIntelAvailable()` from `.aiox-core/core/code-intel`
```

### .aiox-core/development/tasks/create-service.md:154
```
   152: ## Implementation Steps
   153: 
>> 154: ### Step 0: Code Intelligence Duplicate Check (Pre-Scaffold)
   155: 
   156: Before scaffolding the service, check if a similar service already exists using code intelligence:
```

### .aiox-core/development/tasks/create-suite.md:128
```
   126: ```yaml
   127: acceptance-criteria:
>> 128:   - [ ] Resource exists and is valid; no duplicate resources created
   129:     tipo: acceptance-criterion
   130:     blocker: true
   131:     validação: |
>> 132:       Assert resource exists and is valid; no duplicate resources created
>> 133:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   134: ```
   135: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/create-task.md:134
```
   132: ```yaml
   133: acceptance-criteria:
>> 134:   - [ ] Resource exists and is valid; no duplicate resources created
   135:     tipo: acceptance-criterion
   136:     blocker: true
   137:     validação: |
>> 138:       Assert resource exists and is valid; no duplicate resources created
>> 139:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   140: ```
   141: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/create-workflow.md:152
```
   150: ```yaml
   151: acceptance-criteria:
>> 152:   - [ ] Resource exists and is valid; no duplicate resources created
   153:     tipo: acceptance-criterion
   154:     blocker: true
   155:     validação: |
>> 156:       Assert resource exists and is valid; no duplicate resources created
>> 157:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   158: ```
   159: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/db-load-csv.md:345
```
   343:       'FAIL: NULL ids found'
   344:     WHEN EXISTS (SELECT 1 FROM {table}_staging GROUP BY id HAVING COUNT(*) > 1) THEN
>> 345:       'FAIL: Duplicate ids found'
   346:     ELSE
   347:       'PASS: All validations passed'
```
*(bloco/entidade: `WHEN EXISTS (SELECT 1 FROM {table}_staging GROUP BY id HAVING COUNT(*) > 1) THEN`)*

### .aiox-core/development/tasks/db-load-csv.md:424
```
   422: Validation:
   423: ✓ No NULL in required columns
>> 424: ✓ No duplicate keys
   425: ✓ All data types valid
   426: 
```

### .aiox-core/development/tasks/db-schema-audit.md:424
```
   422: \echo ''
   423: 
>> 424: -- Check 4: Duplicate indexes
>> 425: \echo '4. Potential duplicate indexes:'
   426: SELECT
   427:   a.tablename,
```

### .aiox-core/development/tasks/dev-suggest-refactoring.md:240
```
   238: - `inline_temp`: Inline single-use variables
   239: - `remove_dead_code`: Remove unreachable code
>> 240: - `consolidate_duplicates`: Extract duplicate code
   241: - `simplify_conditionals`: Flatten nested conditionals
   242: - `replace_magic_numbers`: Extract constants
```

### .aiox-core/development/tasks/generate-ai-frontend-prompt.md:116
```
   114: ```yaml
   115: acceptance-criteria:
>> 116:   - [ ] Resource exists and is valid; no duplicate resources created
   117:     tipo: acceptance-criterion
   118:     blocker: true
   119:     validação: |
>> 120:       Assert resource exists and is valid; no duplicate resources created
>> 121:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   122: ```
   123: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/generate-documentation.md:120
```
   118: ```yaml
   119: acceptance-criteria:
>> 120:   - [ ] Resource exists and is valid; no duplicate resources created
   121:     tipo: acceptance-criterion
   122:     blocker: true
   123:     validação: |
>> 124:       Assert resource exists and is valid; no duplicate resources created
>> 125:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   126: ```
   127: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/generate-migration-strategy.md:120
```
   118: ```yaml
   119: acceptance-criteria:
>> 120:   - [ ] Resource exists and is valid; no duplicate resources created
   121:     tipo: acceptance-criterion
   122:     blocker: true
   123:     validação: |
>> 124:       Assert resource exists and is valid; no duplicate resources created
>> 125:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   126: ```
   127: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/generate-shock-report.md:120
```
   118: ```yaml
   119: acceptance-criteria:
>> 120:   - [ ] Resource exists and is valid; no duplicate resources created
   121:     tipo: acceptance-criterion
   122:     blocker: true
   123:     validação: |
>> 124:       Assert resource exists and is valid; no duplicate resources created
>> 125:     error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
   126: ```
   127: 
```
*(bloco/entidade: `acceptance-criteria`)*

### .aiox-core/development/tasks/generate-shock-report.md:346
```
   344:   <section class="executive-summary">
   345:     <h2>Executive Summary</h2>
>> 346:     <p><strong>Problem:</strong> 176 redundant UI patterns cost $457,200/year in maintenance.</p>
   347:     <ul>
   348:       <li>81.8% pattern reduction possible (176 → 32)</li>
```
*(bloco/entidade: `<section class="executive-summary">`)*

### .aiox-core/development/tasks/github-issue-triage.md:55
```
   53:    - `status: confirmed` — Valid issue, ready for work
   54:    - `status: needs-info` — Need more details from reporter
>> 55: 6. **Check for duplicates** — If duplicate, label `duplicate` and close with reference
   56: 7. **Community labels** — If appropriate, add `community: good first issue` or `community: help wanted`
   57: 
```

### .aiox-core/development/tasks/github-issue-triage.md:85
```
   83: ```
   84: Issue received
>> 85:   ├── Is it a duplicate? → Label "duplicate", close with reference
   86:   ├── Is it spam/invalid? → Label "status: invalid", close
   87:   ├── Needs more info? → Label "status: needs-info", comment asking for details
```
*(bloco/entidade: `Issue received`)*

### .aiox-core/development/tasks/modo-navegador-browser-access.md:25
```
   23: Se não existir nesse caminho, **parar e perguntar ao Felipe** — não presumir outro caminho.
   24: 
>> 25: ## Verificação de processo duplicado
   26: 
   27: Antes de lançar, checar se já existe um processo Chrome usando a pasta `ChromeDebugKarzen` (evita conflito se dois agentes tentarem usar "Modo Navegador" ao mesmo tempo):
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:174
```
   172: **⚠️ Correção crítica (10/08/2026, só efetivamente aplicada no arquivo real em 11/08/2026) — incidente real de foco roubado do Felipe, 2 vezes:** a versão antiga desta rotina resolvia as janelas a min
   173: 
>> 174: **Por que esta doc parou de conter o código inteiro (11/08/2026):** enquanto o código ficava duplicado aqui E no arquivo `.js`, um fix podia ser escrito num lugar e esquecido no outro — foi exatamente
   175: 
   176: **Bug real encontrado (06/08/2026): faltava `-WindowStyle Hidden` na chamada `execSync`.** Sem essa flag, todo `minimizeChrome()` (chamado no `finally` de praticamente todo script do Modo Navegador) a
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:371
```
   369: ```
   370: 
>> 371: **Verificação de vigia duplicado (obrigatória, 07/08/2026) — checar ANTES de lançar:**
   372: 
>> 373: Mesmo motivo da checagem de processo Chrome duplicado acima: evita dois vigias hookados na mesma janela ao mesmo tempo. Confirmado que isso já aconteceu de verdade duas vezes (05/08 e 07/08) — um vigi
   374: 
   375: ```powershell
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:381
```
   379: Se `$vigiaExistente` não for vazio, já existe um vigia rodando pro mesmo PID — **não lançar outro**. Seguir em frente sem chamar `Start-Process` de novo. Só lançar um vigia novo se a checagem vier vaz
   380: 
>> 381: **Como lançar (parte obrigatória do procedimento de abertura do "Modo Navegador", logo após o Chrome estar minimizado pela primeira vez, e só se a checagem acima confirmar que não há vigia duplicado):
   382: 
   383: ```powershell
```

### .aiox-core/development/tasks/publish-npm.md:20
```
   18: > This task wraps the canonical release SOP. **Open it first**, follow its checklist top-to-bottom. The SOP captures pre-flight checks, 4-site version bump coordination, branch protection bypass (two 
   19: >
>> 20: > This shorter task remains because some agent workflows still reference the `publish-npm` id, but the content of record lives in the SOP. **Do not duplicate the procedure here** — that creates drift 
   21: 
   22: ## When this task fires
```

### .aiox-core/development/tasks/qa-test-design.md:292
```
   290: 
   291: - Every AC has at least one test
>> 292: - No duplicate coverage across levels
   293: - Critical paths have multiple levels
   294: - Risk mitigations are addressed
```

### .aiox-core/development/tasks/qa-test-design.md:376
```
   374: - [ ] Every AC has test coverage
   375: - [ ] Test levels are appropriate (not over-testing)
>> 376: - [ ] No duplicate coverage across levels
   377: - [ ] Priorities align with business risk
   378: - [ ] Test IDs follow naming convention
```

### .aiox-core/development/tasks/release-management.md:20
```
   18: > This task wraps the canonical release SOP. **Open it first**, follow its checklist top-to-bottom. The SOP captures pre-flight checks, 4-site version bump coordination, branch protection bypass dance
   19: >
>> 20: > This shorter task remains because some agent workflows still reference the `release-management` id, but the content of record lives in the SOP. **Do not duplicate the procedure here** — that creates
   21: 
   22: ## When this task fires
```

### .aiox-core/development/tasks/update-manifest.md:352
```
   350: - [ ] Backup created successfully
   351: - [ ] Manifest structure preserved
>> 352: - [ ] No duplicate entries
   353: - [ ] YAML syntax valid
   354: - [ ] All agent files exist
```

### .aiox-core/development/tasks/update-manifest.md:361
```
   359: - If backup fails: Abort operation
   360: - If parse fails: Show error, don't proceed
>> 361: - If duplicate found: Offer options
   362: - If write fails: Restore from backup
   363: - If validation fails: Restore and report
```

### .aiox-core/development/tasks/validate-agents.md:79
```
   77: ### Step 7: Cross-Agent Validation
   78: 
>> 79: 1. Verify no duplicate agent IDs across files
   80: 2. Verify all 12 expected agents are present
   81: 3. Verify `*yolo` command exists (universal command)
```

### .aiox-core/development/tasks/validate-next-story.md:377
```
   375: - [ ] N/A: CodeRabbit disabled in core-config.yaml
   376: 
>> 377: ### 8.1 Code Intelligence: No Duplicate Functionality (Auto-skip if unavailable)
   378: 
   379: - **Check code intelligence availability:** Call `isCodeIntelAvailable()` from `.aiox-core/core/code-intel`
   380: - **If available:**
   381:   - Call `validateNoDuplicates(storyDescription)` from `.aiox-core/core/code-intel/helpers/story-helper`
>> 382:     - If `hasDuplicates: true`: Add to validation report as **Should-Fix** issue — "Potential duplicate functionality detected: {suggestion}". This is **advisory only** and does NOT block validation.
>> 383:     - If `hasDuplicates: false`: Add to report as PASS — "No duplicate functionality detected"
   384:   - Include result in the **Validation Result** section under "Code Intelligence Check"
   385: - **If NOT available:** Skip this step silently — validation proceeds exactly as before with no code intelligence items in report
```

### .aiox-core/development/templates/code-intel-integration-pattern.md:103
```
   101: | `describeProject(path)` | Path string | `{ codebase, stats }` | Project overview |
   102: | `getConventions(path)` | Path string | `{ patterns, stats }` | Naming/coding patterns |
>> 103: | `detectDuplicates(desc, opts)` | Description + options | `{ matches, codebaseOverview }` | Duplicate detection |
   104: | `assessImpact(files)` | File array | `{ blastRadius, references, complexity }` | Change impact |
   105: | `findTests(symbol)` | Symbol name | Test file references | Test discovery |
```

### .aiox-core/development/templates/ptc-entity-validation.md:56
```
   54: done
   55: 
>> 56: # --- Check 3: No duplicate entity names ---
   57: duplicates=$(grep "^  [a-zA-Z]" "$REGISTRY" | sort | uniq -d)
   58: if [ -z "$duplicates" ]; then
```

### .aiox-core/development/templates/squad/task-template.md:53
```
   51: 
   52: {{#IF CODE_INTEL_AVAILABLE}}
>> 53: ## Code Intelligence Duplicate Check
   54: 
   55: > Auto-check when code intelligence provider is available.
```

### .aiox-core/development/workflows/brownfield-discovery.yaml:56
```
   54:         DÉBITOS IDENTIFICADOS (nível sistema):
   55:         - Dependências desatualizadas
>> 56:         - Código duplicado
   57:         - Falta de testes
   58:         - Configurações hardcoded
```
*(bloco/entidade: `notes: |`)*

### .aiox-core/docs/standards/AIOX-LIVRO-DE-OURO-V2.2-SUMMARY.md:666
```
   664: | False positive rate | 15% | 8% | **47% reduction** |
   665: | Agent accuracy | 85% | 94% (after 1 month) | **+9 percentage points** |
>> 666: | Duplicate work | 50% | 10% | **80% reduction** |
   667: 
   668: ### Team Collaboration
```

### .aiox-core/docs/standards/AIOX-LIVRO-DE-OURO-V2.2-SUMMARY.md:1249
```
   1247: | False positive rate | 15% | 8% | **47% reduction** |
   1248: | Agent accuracy | 85% (static) | 94% (after 1 month) | **+9pp** |
>> 1249: | Duplicate work | 10% | 2% | **80% reduction** |
   1250: | Context switching | 2x/day | 0.5x/day | **75% reduction** |
   1251: 
```

### .aiox-core/infrastructure/scripts/codex-skills-sync/bootstrap.js:632
```
   630:     const replacement = {
   631:       ...item,
>> 632:       skillId: `${item.skillId}-${slug(path.dirname(item.sourcePath).split('/')[1] || 'duplicate')}`,
   633:     };
>> 634:     warnings.push(`Renamed duplicate skill ${item.skillId} to ${replacement.skillId}`);
   635:     result.push(replacement);
   636:   }
```
*(bloco/entidade: `replacement`)*

### .aiox-core/infrastructure/scripts/codex-skills-sync/validate.js:348
```
   346:       dir: item.legacySkillId,
   347:       canonicalSkillId: item.skillId,
>> 348:       classification: 'duplicate-full-payload',
   349:       fatal: true,
   350:       message: `Legacy skill alias duplicates full activation payload: ${relativeSkillPath} -> ${item.skillId} (${canonicalAgentPath})`,
```
*(bloco/entidade: `return {`)*

### .aiox-core/infrastructure/scripts/codex-skills-sync/validate.js:498
```
   496:           });
   497:           errors.push(
>> 498:             `Duplicate full skill payload: ${path.join(path.relative(resolved.projectRoot, resolved.skillsDir), dir, 'SKILL.md')} -> ${duplicateOf.skillId} (${canonicalAgentPath})`,
   499:           );
   500:           continue;
```
*(bloco/entidade: `errors.push(`)*

### .aiox-core/infrastructure/scripts/gotchas-documenter.js:360
```
   358:           seen.set(hash, id);
   359:         } else {
>> 360:           // Remove duplicate
   361:           this.gotchas.delete(id);
   362:         }
```
*(bloco/entidade: `} else {`)*

### .aiox-core/infrastructure/scripts/improvement-engine.js:393
```
   391:     const improvements = [];
   392: 
>> 393:     // Duplicate function consolidation
   394:     if (redundancyAnalysis.duplicate_functions?.length > 0) {
   395:       improvements.push(this.createImprovement({
   396:         type: 'quality',
>> 397:         title: 'Consolidate Duplicate Functions',
>> 398:         description: `${redundancyAnalysis.duplicate_functions.length} duplicate functions found. Extract to shared utilities.`,
   399:         priority: 'medium',
   400:         effort: 'medium',
   401:         impact: 'medium',
   402:         implementation: {
   403:           steps: [
>> 404:             'Identify truly duplicate functions',
   405:             'Extract to shared utility modules',
   406:             'Update all references',
>> 407:             'Remove duplicate implementations',
   408:           ],
   409:           estimated_hours: 10,
```
*(bloco/entidade: `analyzeRedundancyImprovements(redundancyAnalysis) {`)*

### .aiox-core/infrastructure/scripts/improvement-engine.js:455
```
   453:         type: 'quality',
   454:         title: 'Standardize Code Patterns',
>> 455:         description: `${redundancyAnalysis.redundant_patterns.length} redundant patterns should be standardized.`,
   456:         priority: 'low',
   457:         effort: 'medium',
```
*(bloco/entidade: `improvements.push(this.createImprovement({`)*

### .aiox-core/infrastructure/scripts/performance-optimizer.js:999
```
   997:           description: 'Cache computation result',
   998:           code: `const cached${issue.operation} = data.${issue.operation}(...);\n// Use cached result instead of recomputing`,
>> 999:           improvement: `Avoid ${issue.count - 1} redundant computations`,
   1000:         });
   1001:         break;
```
*(bloco/entidade: `strategies.push({`)*

### .aiox-core/infrastructure/scripts/performance-optimizer.js:1205
```
   1203:         }
   1204:         
>> 1205:         // Check for duplicate imports
   1206:         imports.get(source).push(path.node);
   1207:       },
```

### .aiox-core/infrastructure/scripts/performance-optimizer.js:1229
```
   1227:     });
   1228:     
>> 1229:     // Check for duplicate imports
   1230:     for (const [source, importNodes] of imports) {
   1231:       if (importNodes.length > 1) {
```

### .aiox-core/infrastructure/scripts/performance-optimizer.js:1286
```
   1284:         optimizations.push({
   1285:           type: 'consolidate_imports',
>> 1286:           description: 'Combine duplicate imports',
   1287:           code: `import { func1, func2, func3 } from '${issue.source}';`,
   1288:           improvement: 'Cleaner code and potential optimization',
```
*(bloco/entidade: `optimizations.push({`)*

### .aiox-core/infrastructure/scripts/performance-optimizer.js:1555
```
   1553:           description: `Cache ${issue.operation} result`,
   1554:           code: `const processed = str.${issue.operation}(...);\n// Reuse processed instead of calling again`,
>> 1555:           improvement: `Avoid ${issue.count - 1} redundant operations`,
   1556:         });
   1557:         break;
```
*(bloco/entidade: `optimizations.push({`)*

### .aiox-core/infrastructure/scripts/pr-review-ai.js:423
```
   421: 
   422:     for (const file of parsedDiff) {
>> 423:       // Check for duplicate code patterns within the same file
   424:       const addedContent = file.hunks
   425:         .flatMap((h) => h.lines.filter((l) => l.type === 'add').map((l) => l.content))
```
*(bloco/entidade: `for (const file of parsedDiff) {`)*

### .aiox-core/infrastructure/scripts/pr-review-ai.js:460
```
   458:           category: ReviewCategory.REDUNDANCY,
   459:           file: file.path,
>> 460:           message: `Duplicate imports from: ${[...new Set(duplicateImports)].join(', ')}`,
   461:           severity: Severity.MEDIUM,
   462:         });
```
*(bloco/entidade: `findings.push({`)*

### .aiox-core/infrastructure/scripts/project-status-loader.js:67
```
   65:     this.maxRecentCommits = this.config?.projectStatus?.maxRecentCommits || 2;
   66: 
>> 67:     // ACT-11: Cache git dir from constructor to avoid duplicate execSync calls
   68:     this._resolvedGitDir = null;
   69:     this._isGitRepo = false;
```
*(bloco/entidade: `constructor(rootPath = null) {`)*

### .aiox-core/infrastructure/scripts/project-status-loader.js:110
```
   108:    * ACT-11: Caches _resolvedGitDir and _isGitRepo for reuse by
   109:    * getGitStateFingerprint() and isGitRepository(), eliminating
>> 110:    * duplicate execSync calls later in the pipeline.
   111:    *
   112:    * If running inside a git worktree (not the main working tree),
```
*(bloco/entidade: `/**`)*

### .aiox-core/infrastructure/scripts/refactoring-suggester.js:80
```
   78:     });
   79: 
>> 80:     // Consolidate duplicate code
   81:     this.refactoringPatterns.set('consolidate_duplicates', {
>> 82:       name: 'Consolidate Duplicate Code',
>> 83:       description: 'Extract duplicate code into shared functions',
   84:       detector: this.detectDuplicateCode.bind(this),
   85:       suggester: this.suggestCodeConsolidation.bind(this),
```

### .aiox-core/infrastructure/scripts/refactoring-suggester.js:487
```
   485:     const duplicates = [];
   486:     const codeBlocks = new Map();
>> 487:     const minBlockSize = 5; // minimum lines for duplicate detection
   488: 
   489:     traverse(ast, {
```
*(bloco/entidade: `async detectDuplicateCode(ast, content, metrics) {`)*

### .aiox-core/infrastructure/scripts/refactoring-suggester.js:499
```
   497:               type: 'duplicate_code',
   498:               original: original,
>> 499:               duplicate: path,
   500:               startLine: path.node.loc?.start.line,
   501:               endLine: path.node.loc?.end.line,
```
*(bloco/entidade: `duplicates.push({`)*

### .aiox-core/infrastructure/scripts/refactoring-suggester.js:717
```
   715:     const suggestion = {
   716:       type: 'consolidate_duplicates',
>> 717:       description: `Extract duplicate code block (${detection.lines} lines)`,
   718:       location: {
   719:         start: detection.startLine,
   720:         end: detection.endLine,
   721:       },
   722:       impact: Math.min(9, detection.lines),
>> 723:       details: 'Found duplicate code block. Extract into a shared function.',
   724:       suggestedRefactoring: this.generateConsolidationSuggestion(detection),
   725:     };
```
*(bloco/entidade: `suggestion`)*

### .aiox-core/infrastructure/scripts/refactoring-suggester.js:963
```
   961:         },
   962:         {
>> 963:           start: detection.duplicate.node.loc?.start.line,
>> 964:           end: detection.duplicate.node.loc?.end.line,
   965:         },
   966:       ],
```
*(bloco/entidade: `{`)*

### .aiox-core/product/checklists/self-critique-checklist.md:178
```
   176:     how_to_check:
   177:       - Functions > 50 lines (should split)
>> 178:       - Duplicated code (should extract)
   179:       - Deep nesting > 3 levels (should flatten)
   180:       - Complex conditionals (should simplify)
```
*(bloco/entidade: `how_to_check`)*

### .aiox-core/product/data/database-best-practices.md:47
```
   45: ### Index Anti-patterns
   46: - [ ] Don't index low-cardinality columns alone
>> 47: - [ ] Don't create redundant indexes
   48: - [ ] Don't index frequently updated columns without reason
   49: - [ ] Monitor unused indexes with `pg_stat_user_indexes`
```

### .aiox-core/product/data/test-levels-framework.md:118
```
   116: - Unit testing framework behavior
   117: - Integration testing third-party libraries
>> 118: - Duplicate coverage across levels
   119: 
>> 120: ## Duplicate Coverage Guard
   121: 
   122: **Before adding any test, check:**
```

### .aiox-core/product/templates/brownfield-prd-tmpl.yaml:132
```
   130:         instruction: Each Requirement will be a bullet markdown with identifier starting with FR
   131:         examples:
>> 132:           - "FR1: The existing Todo List will integrate with the new AI duplicate detection service without breaking current functionality."
   133:       - id: non-functional
   134:         title: Non Functional
```
*(bloco/entidade: `examples`)*

### .aiox-core/product/templates/command-rationalization-matrix.md:15
```
   13: This template provides a structured approach to analyze and rationalize agent commands. Use it when:
   14: - Optimizing agent command sets
>> 15: - Identifying redundant or overlapping commands
   16: - Planning command consolidations or deletions
   17: - Documenting command evolution decisions
```

### .aiox-core/product/templates/command-rationalization-matrix.md:33
```
   31: - 🔀 **MERGE** - Similar functionality, can consolidate with parameters
   32: - 🔄 **DELEGATE** - Better suited for specialized agent
>> 33: - ❌ **REMOVE** - Unused, redundant, or has alternative
   34: 
   35: ### Decision Rules
```

### .aiox-core/product/templates/migration-plan-tmpl.yaml:242
```
   240:       - Resumable on failure/cancellation
   241:       - Live progress monitoring
>> 242:       - Deterministic (no duplicate processing)
   243: 
   244:       ## Batch Size Guidelines
```

### .aiox-core/product/templates/migration-plan-tmpl.yaml:360
```
   358: 
   359:       - **Forgetting FOR UPDATE SKIP LOCKED** → deadlocks with parallel workers
>> 360:       - **No ORDER BY** → non-deterministic, duplicate processing
   361:       - **Too large batches** → lock contention, memory issues
   362:       - **No throttling** → DB overload, affects production traffic
```

### .aiox-core/product/templates/migration-plan-tmpl.yaml:845
```
   843:       - Longer deployment cycle (days/weeks vs minutes)
   844:       - Increased complexity (6 phases vs 1)
>> 845:       - Duplicate data temporarily (storage cost)
   846:       - Requires app coordination (multiple deploys)
   847:       - Sync triggers add write overhead
```

### .aiox-core/product/templates/prd-tmpl.yaml:27
```
   25:         title: Background Context
   26:         type: paragraphs
>> 27:         instruction: 1-2 short paragraphs summarizing the background context, such as what we learned in the brief without being redundant with the goals, what and why this solves a problem, what the 
   28:       - id: changelog
   29:         title: Change Log
```
*(bloco/entidade: `- id: background`)*

### .aiox-core/product/templates/prd-tmpl.yaml:45
```
   43:         instruction: Each Requirement will be a bullet markdown and an identifier sequence starting with FR
   44:         examples:
>> 45:           - "FR6: The Todo List uses AI to detect and warn against potentially duplicate todo items that are worded differently."
   46:       - id: non-functional
   47:         title: Non Functional
```
*(bloco/entidade: `examples`)*

### .aiox-core/product/templates/tmpl-staging-copy-merge.sql:54
```
   52: UPDATE :staging_table s
   53: SET
>> 54:     _import_status = 'duplicate',
>> 55:     _import_error = 'Duplicate ID found'
   56: WHERE EXISTS (
   57:     SELECT 1 FROM :staging_table s2
```
*(bloco/entidade: `SET`)*

### .aiox-core/workflow-intelligence/__tests__/workflow-registry.test.js:67
```
   65:     });
   66: 
>> 67:     it('should not include redundant agent_handoff workflow', () => {
   68:       const workflows = registry.loadWorkflows();
   69:       expect(workflows.agent_handoff).toBeUndefined();
```

### .aiox-core/workflow-intelligence/learning/pattern-validator.js:27
```
   25:     'run-tests',
   26:   ],
>> 27:   similarityThreshold: 0.85, // For fuzzy duplicate detection
   28: };
   29: 
```
*(bloco/entidade: `DEFAULT_VALIDATION_RULES`)*

### .aiox-core/workflow-intelligence/learning/pattern-validator.js:132
```
   130:     }
   131: 
>> 132:     // Rule 7: No duplicate consecutive commands
   133:     const hasDuplicateConsecutive = pattern.sequence.some(
   134:       (cmd, i) => i > 0 && cmd === pattern.sequence[i - 1],
   135:     );
   136:     if (hasDuplicateConsecutive) {
>> 137:       warnings.push('Pattern contains duplicate consecutive commands');
   138:     }
   139: 
```

### .aiox-core/workflow-intelligence/learning/pattern-validator.js:149
```
   147: 
   148:   /**
>> 149:    * Check if a pattern is a duplicate of existing patterns
   150:    * @param {Object} pattern - Pattern to check
   151:    * @param {Object[]} existingPatterns - Existing patterns to compare against
>> 152:    * @returns {Object} Duplicate check result
   153:    */
   154:   isDuplicate(pattern, existingPatterns) {
```
*(bloco/entidade: `/**`)*

### squads/squad-creator-pro/assessments/axioma-assessment-wf-create-squad.yaml:167
```
   165:         INEFICIÊNCIAS:
   166:         • step_3_2 pode retentar 2x sem backoff (3 retries sequencial = 3x esforço)
>> 167:         • phase_0_5 criteria ">= 3 of 5" means potencial de 2 agentes não executando = input duplicado
   168:         • max_iterations = 3 em phase_5_3 (fix_blocking_issues) sem escalação antes de report
   169:         • Não há "cache" de minds/research entre squads (cada squad refaz research)
```
*(bloco/entidade: `evidence: |`)*

### squads/squad-creator-pro/data/pv-workflow-validation.yaml:115
```
   113:         action: "Expand cache"
   114:     quality:
>> 115:       - problem: "Near-duplicate > 95%"
   116:         auto_heal: false
   117:         action: "Sugere merge ao humano"
```
*(bloco/entidade: `quality`)*

### squads/squad-creator-pro/data/pv-workflow-validation.yaml:314
```
   312:       reason: "Perde CLAUDE.md, Constitution, Rules"
   313:     - action: "Deixar agente CREATE sem consultar Entity Registry"
>> 314:       reason: "IA vai criar duplicata. Forçar IDS."
   315:     - action: "Gate runtime com validação manual"
   316:       reason: "Fricção inaceitável. Runtime gates automáticos < 60s"
```
*(bloco/entidade: `- action: "Deixar agente CREATE sem consultar Entity Registry"`)*

### squads/squad-creator-pro/scripts/coherence-validator.py:468
```
   466:                 "code": "COH-VC-001",
   467:                 "severity": "error",
>> 468:                 "message": f"Duplicate veto code: {dup}",
   469:                 "veto_code": dup
   470:             })
>> 471:             result["suggestions"].append(f"Rename duplicate veto code: {dup}")
   472: 
   473:     # Validate we found something
```
*(bloco/entidade: `result["issues"].append({`)*

### squads/squad-creator-pro/scripts/tests/test_checklist_validator.py:310
```
   308: 
   309:     def test_validate_duplicate_ids(self, tmp_path):
>> 310:         """Duplicate IDs produce issues"""
   311:         content = """# Checklist
   312: 
```
*(bloco/entidade: `def test_validate_duplicate_ids(self, tmp_path):`)*

### squads/squad-creator-pro/tasks/optimize-workflow.md:161
```
   159:         action: "Manter"
   160: 
>> 161:       REDUNDANT:
   162:         criteria: "Q1=NÃO AND Q3=NÃO"
   163:         action: "Candidata a remoção"
```
*(bloco/entidade: `classification`)*

### squads/squad-creator-pro/tasks/optimize-workflow.md:179
```
   177:     | Phase | Purpose | Q1 Único? | Q2 Quebra? | Q3 Consumido? | Status | Recomendação |
   178:     |-------|---------|-----------|------------|---------------|--------|--------------|
>> 179:     | {phase_name} | {purpose} | ✅/❌ | ✅/❌ | ✅/❌ | ESSENTIAL/REDUNDANT/MERGE | {action} |
   180: 
   181:     **Summary:**
   182:     - Essential: {n} fases
>> 183:     - Redundant: {n} fases (candidatas a remoção)
   184:     - Merge candidates: {n} fases
   185: ```
```
*(bloco/entidade: `table: |`)*

### squads/squad-creator-pro/tasks/optimize-workflow.md:529
```
   527:   | Dimension | Score | Opportunity | Priority |
   528:   |-----------|-------|-------------|----------|
>> 529:   | D1: Phase Necessity | {score}/10 | {n} redundant phases | {priority} |
   530:   | D2: Parallelization | {score}/10 | {n} parallel groups | {priority} |
   531:   | D3: Checkpoints | {score}/10 | {pct}% automatizable | {priority} |
```
*(bloco/entidade: `report_template: |`)*

### squads/squad-creator-pro/tasks/optimize-workflow.md:650
```
   648:       ## v{new_version} ({date})
   649:       - Optimized by *optimize-workflow v1.0.0
>> 650:       - D1: Removed {n} redundant phases
   651:       - D3: Converted {n} checkpoints to heuristic
   652:       - D4: Changed {n} phases to Worker executor
```
*(bloco/entidade: `entry: |`)*

### squads/squad-creator-pro/tasks/optimize-workflow.md:685
```
   683: | validation | Quality gates | ✅ | ❌ | ESSENTIAL |
   684: 
>> 685: **Result:** 0 redundant phases found ✅
   686: 
   687: ---
```

### squads/squad-creator-pro/tasks/squad-fusion.md:464
```
   462:             checks:
   463:               - "No components lost (source_count == target_count + discarded)"
>> 464:               - "No duplicate files in target"
   465:               - "All dependencies resolvable"
   466:             type: blocking
```
*(bloco/entidade: `checks`)*

### squads/squad-creator-pro/tasks/squad-fusion.md:617
```
   615: ## Conflict Resolution Strategies
   616: 
>> 617: ### Duplicate Agents
   618: 
   619: | Scenario | YOLO Strategy | QUALITY Strategy |
```

### squads/squad-creator-pro/test-cases/validate-squad/opus-round-3-v4-task.yaml:67
```
   65: 
   66:   improvements:
>> 67:     - "218K total lines is heavy - consider pruning redundant framework content across agents"
   68:     - "24 agents may have overlapping capabilities - document differentiation matrix"
   69:     - "Task-to-checklist ratio (75:55) suggests some tasks lack validation gates"
```
*(bloco/entidade: `improvements`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/haiku-output-v2-calibrated.yaml:117
```
   115:         - Fallback strategy explícita em Phase 0a (tool_unavailable, zero_sources, partial)
   116:         - Retry strategy com max_iterations e escalation paths definidos
>> 117:         - Brownfield check em Fase -1 detecta duplicate work antes de começar
   118:         - Rework loops capturam qualidade baixa antes de prosseguir (on_score_below_X triggers)
   119: 
```
*(bloco/entidade: `evidence: |`)*

### squads/squad-creator-pro/workflows/wf-create-squad.yaml:1445
```
   1443:     to: fix_cycle
   1444:     trigger: checkpoint_failed
>> 1445:     condition: "CP_PHASE_0 fails (viability_score < 6 OR duplicate detected OR SC_VC_001 triggered)"
   1446:     description: "Discovery validation fails — route to fix_cycle for remediation"
   1447: 
```
*(bloco/entidade: `- from: phase_0`)*

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:171
```
   169: 
   170:       - id: CHK_OPT_004
>> 171:         name: "Duplicate items across checklists"
   172:         description: "Mesmo check repetido em múltiplos checklists"
   173:         detection: "Fuzzy match de itens entre checklists do squad"
```
*(bloco/entidade: `- id: CHK_OPT_004`)*

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:212
```
   210: 
   211:       - id: AGT_OPT_002
>> 212:         name: "Redundant framework loading"
   213:         description: "Mesmo framework copiado em múltiplos agents"
   214:         detection: "Fuzzy match de seções entre agents do squad"
```
*(bloco/entidade: `- id: AGT_OPT_002`)*

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:268
```
   266: 
   267:       - id: DAT_OPT_002
>> 268:         name: "Duplicate content across data files"
   269:         description: "Mesmo conteúdo em múltiplos data files"
   270:         detection: "Fuzzy content match between data files"
```
*(bloco/entidade: `- id: DAT_OPT_002`)*

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:386
```
   384:           For each agent in {squad_path}/agents/:
   385:             1. wc -l → bloated? (> 2000)
>> 386:             2. Fuzzy match frameworks between agents → redundant?
   387:             3. List dependencies → all used in commands?
   388:             4. Check voice_dna → has [SOURCE:]?
```
*(bloco/entidade: `For each agent in {squad_path}/agents/:`)*

### squads/squad-creator-pro/workflows/wf-research-then-create-agent.yaml:795
```
   793:   agent_creation_failures:
   794:     - error: "Agent ID exists"
>> 795:       cause: "Duplicate"
   796:       resolution: "Prompt for new name or update existing"
   797: 
```
*(bloco/entidade: `- error: "Agent ID exists"`)*

### squads/squad-creator-pro/workflows/wf-squad-fusion.yaml:417
```
   415:           1. Criar set de todos os nomes de agents/tasks
   416:           2. Identificar nomes que aparecem em múltiplos squads
>> 417:           3. Para cada duplicata:
   418:              a. Comparar conteúdo (hash)
>> 419:              b. Se hash igual → duplicata exata
   420:              c. Se hash diferente → variantes
   421:         command: |
```
*(bloco/entidade: `algorithm: |`)*

### squads/squad-creator-pro/workflows/wf-squad-fusion.yaml:553
```
   551:         - "Nenhum conflito não-resolvido"
   552:         - "Winners existem no disco"
>> 553:       veto_on: "Duplicata sem resolução"
   554: 
   555:     output:
```
*(bloco/entidade: `quality_gate`)*

### squads/squad-creator/agents/squad-chief.md:105
```
   103:       rule: "If domain requires mind cloning, involve @oalanicolas"
   104: 
>> 105: # Duplicate Detection - ON-DEMAND ONLY (not on activation)
   106: # IMPORTANT: Only execute these steps when user explicitly requests *create-squad or *create-agent
>> 107: duplicate-detection:
   108:   trigger: "ONLY when user requests squad/agent creation, NOT on activation"
   109:   on_squad_request:
```

### squads/squad-creator/CHANGELOG.md:158
```
   156:   - Extracts and validates YAML check definitions
   157:   - Validates check types (blocking, recommended, warning, etc.)
>> 158:   - Detects duplicate check IDs
   159:   - Validates checklist metadata
   160:   - Generates validation reports (text/JSON)
```
*(bloco/entidade: `- `checklist_validator.py` - Automated checklist structure validation`)*

### squads/squad-creator/checklists/create-agent-checklist.md:51
```
   49:     validation: "tier in [0, 1, 2, 3]"
   50: 
>> 51:   - id: no-duplicate
   52:     check: "Agent with same id doesn't already exist"
   53:     type: blocking
```
*(bloco/entidade: `context_checks`)*

### squads/squad-creator/checklists/create-squad-checklist.md:30
```
   28:     max: 5
   29: 
>> 30:   - id: no-duplicate-squad
   31:     check: "No existing squad with > 80% overlap"
   32:     type: blocking
```
*(bloco/entidade: `pre_creation`)*

### squads/squad-creator/data/pv-workflow-validation.yaml:115
```
   113:         action: "Expand cache"
   114:     quality:
>> 115:       - problem: "Near-duplicate > 95%"
   116:         auto_heal: false
   117:         action: "Sugere merge ao humano"
```
*(bloco/entidade: `quality`)*

### squads/squad-creator/data/pv-workflow-validation.yaml:314
```
   312:       reason: "Perde CLAUDE.md, Constitution, Rules"
   313:     - action: "Deixar agente CREATE sem consultar Entity Registry"
>> 314:       reason: "IA vai criar duplicata. Forçar IDS."
   315:     - action: "Gate runtime com validação manual"
   316:       reason: "Fricção inaceitável. Runtime gates automáticos < 60s"
```
*(bloco/entidade: `- action: "Deixar agente CREATE sem consultar Entity Registry"`)*

### squads/squad-creator/data/quality-dimensions-framework.md:217
```
   215: 
   216: **Red Flags:**
>> 217: - Redundant work
   218: - Over-engineering
   219: - Under-utilization of available resources
```

### squads/squad-creator/scripts/checklist_validator.py:246
```
   244:         all_checks.extend(checks)
   245: 
>> 246:     # Check for duplicate IDs
   247:     ids_seen = set()
   248:     for check in all_checks:
   249:         if check.id in ids_seen:
   250:             issues.append({
   251:                 "code": "CKL-DUP-001",
>> 252:                 "message": f"Duplicate check ID: {check.id}",
   253:                 "severity": "error"
   254:             })
```

### squads/squad-creator/scripts/coherence-validator.py:468
```
   466:                 "code": "COH-VC-001",
   467:                 "severity": "error",
>> 468:                 "message": f"Duplicate veto code: {dup}",
   469:                 "veto_code": dup
   470:             })
>> 471:             result["suggestions"].append(f"Rename duplicate veto code: {dup}")
   472: 
   473:     # Validate we found something
```
*(bloco/entidade: `result["issues"].append({`)*

### squads/squad-creator/scripts/tests/test_checklist_validator.py:310
```
   308: 
   309:     def test_validate_duplicate_ids(self, tmp_path):
>> 310:         """Duplicate IDs produce issues"""
   311:         content = """# Checklist
   312: 
```
*(bloco/entidade: `def test_validate_duplicate_ids(self, tmp_path):`)*

### squads/squad-creator/tasks/create-squad.md:203
```
   201:   - viability_score >= 6
   202:   - pack_name defined
>> 203:   - no duplicate squad
   204: ```
   205: 
```
*(bloco/entidade: `criteria`)*

### squads/squad-creator/tasks/refresh-registry.md:288
```
   286:   validate:
   287:     - "YAML syntax valid"
>> 288:     - "No duplicate squad names"
   289:     - "All paths exist"
   290: ```
```
*(bloco/entidade: `validate`)*

### squads/squad-creator/tasks/refresh-registry.md:396
```
   394:   - domain_index has no orphan entries
   395:   - YAML is valid and parseable
>> 396:   - No duplicate keywords pointing to wrong squads
   397: ```
   398: 
```
*(bloco/entidade: `validation`)*

### squads/squad-creator/tasks/squad-fusion.md:453
```
   451:             checks:
   452:               - "No components lost (source_count == target_count + discarded)"
>> 453:               - "No duplicate files in target"
   454:               - "All dependencies resolvable"
   455:             type: blocking
```
*(bloco/entidade: `checks`)*

### squads/squad-creator/tasks/squad-fusion.md:606
```
   604: ## Conflict Resolution Strategies
   605: 
>> 606: ### Duplicate Agents
   607: 
   608: | Scenario | YOLO Strategy | QUALITY Strategy |
```

### squads/squad-creator/templates/quality-gate-tmpl.yaml:371
```
   369:         weight: 0.3
   370: 
>> 371:       - check: "No duplicate entries"
   372:         type: "count"
   373:         field: "duplicate_entries"
```
*(bloco/entidade: `criteria`)*

### squads/squad-creator/workflows/wf-research-then-create-agent.yaml:795
```
   793:   agent_creation_failures:
   794:     - error: "Agent ID exists"
>> 795:       cause: "Duplicate"
   796:       resolution: "Prompt for new name or update existing"
   797: 
```
*(bloco/entidade: `- error: "Agent ID exists"`)*

### squads/squad-creator/workflows/wf-squad-fusion.yaml:417
```
   415:           1. Criar set de todos os nomes de agents/tasks
   416:           2. Identificar nomes que aparecem em múltiplos squads
>> 417:           3. Para cada duplicata:
   418:              a. Comparar conteúdo (hash)
>> 419:              b. Se hash igual → duplicata exata
   420:              c. Se hash diferente → variantes
   421:         command: |
```
*(bloco/entidade: `algorithm: |`)*

### squads/squad-creator/workflows/wf-squad-fusion.yaml:553
```
   551:         - "Nenhum conflito não-resolvido"
   552:         - "Winners existem no disco"
>> 553:       veto_on: "Duplicata sem resolução"
   554: 
   555:     output:
```
*(bloco/entidade: `quality_gate`)*

## 🔀 Contradição / conflito (121 trechos com contexto, 121 ocorrências totais)

### .aiox-core/core/orchestration/recovery-handler.js:280
```
   278: 
   279:       case 'state':
>> 280:         // State corruption, inconsistent data - rollback and retry
   281:         return RecoveryStrategy.ROLLBACK_AND_RETRY;
   282: 
```
*(bloco/entidade: `case 'state':`)*

### .aiox-core/core/orchestration/recovery-handler.js:334
```
   332: 
   333:     // State errors
>> 334:     if (/state.*corrupt|inconsistent|invalid.*state|out.*of.*sync/.test(lowerMessage)) {
   335:       return 'state';
   336:     }
```
*(bloco/entidade: `_classifyError(errorMessage) {`)*

### .aiox-core/data/tech-presets/java.md:217
```
   215: **Bugs Eliminated:**
   216: 
>> 217: - Setup verboso e inconsistente
   218: - Baixa clareza no objetivo dos testes
   219: 
```

### .aiox-core/data/tech-presets/nextjs-react.md:190
```
   188: - Code duplication
   189: - Impossible to test without UI
>> 190: - Inconsistent error handling
   191: - Side effects in unexpected places
   192: 
```

### .aiox-core/data/tech-presets/nextjs-react.md:254
```
   252: - Impossible to test without real database
   253: - Changing ORM breaks entire application
>> 254: - Inconsistent data access patterns
   255: 
   256: ---
```

### .aiox-core/data/tech-presets/rust.md:95
```
   93: 
   94: - Regra duplicada em handlers
>> 95: - Sequencia de passos inconsistente
   96: 
   97: **Why It Works:**
```

### .aiox-core/data/tech-presets/rust.md:126
```
   124: **Bugs Eliminated:**
   125: 
>> 126: - Tratamento inconsistente de falhas
   127: - Perda de contexto de erro
   128: 
```

### .aiox-core/development/agents/architect.md:324
```
   322:         focus: Code maintainability, design patterns, developer experience
   323:         examples:
>> 324:           - Inconsistent API patterns
   325:           - Missing error handling
   326:           - Poor separation of concerns
```
*(bloco/entidade: `examples`)*

### .aiox-core/development/agents/data-engineer.md:309
```
   307:         - Missing foreign key relationships
   308:         - Lack of comments on complex tables/functions
>> 309:         - Inconsistent naming conventions
   310:         - Missing created_at/updated_at timestamps
   311:         - Unused indexes
```
*(bloco/entidade: `examples`)*

### .aiox-core/development/agents/data-engineer.md:373
```
   371:       - Lack of CHECK constraints for validation
   372:       - Missing unique constraints where needed
>> 373:       - Inconsistent naming conventions
   374:       - Missing audit fields (created_at, updated_at)
   375: 
```
*(bloco/entidade: `schema_design`)*

### .aiox-core/development/checklists/brownfield-compatibility-checklist.md:26
```
   24: - [ ] `docs/` directory status checked (empty/existing)
   25: - [ ] `.aiox-core/` not present (fresh install)
>> 26: - [ ] No naming conflicts with AIOX directories
   27: 
   28: ## During Migration Checks
```

### .aiox-core/development/checklists/self-critique-checklist.md:94
```
   92: - [ ] Errors are logged with sufficient context for debugging
   93: - [ ] User-facing errors are friendly and actionable
>> 94: - [ ] Failed operations don't leave system in inconsistent state
   95: - [ ] Network/API failures are handled gracefully with retry or fallback
   96: 
```

### .aiox-core/development/data/quality-dimensions-framework.md:180
```
   178: - Manual work that should be automated
   179: - Missing documentation
>> 180: - Inconsistent execution
   181: 
   182: ### 3.5 Innovation Capacity (Weight: 0.7)
```

### .aiox-core/development/scripts/conflict-resolver.js:488
```
   486:     }
   487:     
>> 488:     // Replace conflicts with merged imports
   489:     let resolved = content;
   490:     for (const _conflict of fileInfo.conflicts) {
```
*(bloco/entidade: `async autoResolveImports(_content, fileInfo) {`)*

### .aiox-core/development/scripts/modo-navegador/planilha-clipboard.js:10
```
   8: //
   9: // LICAO CRITICA: NUNCA reusar uma aba da planilha que ja acumulou varias tentativas
>> 10: // (inclusive com erro) -- o estado interno do Sheets fica inconsistente e qualquer
   11: // navegacao pela Name Box passa a falhar com "O nome dado ao intervalo e invalido",
   12: // mesmo pra um endereco de celula perfeitamente valido. Sempre abrir uma aba NOVA
```

### .aiox-core/development/tasks/analyze-brownfield.md:368
```
   366:    ls -la .github/workflows/
   367: 
>> 368:    # Check for potential conflicts with AIOX workflows
   369:    # Look for: quality-gate.yml, release.yml, staging.yml
   370:    ```
```
*(bloco/entidade: `1. **Review GitHub Workflows:**`)*

### .aiox-core/development/tasks/create-agent.md:977
```
   975: 
   976:     - range: '4-7'
>> 977:       level: 'Nivel 2 — Frameworks (funcional mas inconsistente)'
   978:       verdict: 'CONDITIONAL - Pode publicar com plano de melhoria'
   979: 
```
*(bloco/entidade: `- range: '4-7'`)*

### .aiox-core/development/tasks/db-bootstrap.md:627
```
   625: **Fix**: Check you're in project root with write access
   626: 
>> 627: ### "Config conflicts with existing Supabase project"
   628: 
   629: **Problem**: Already using Supabase CLI  
```

### .aiox-core/development/tasks/db-rollback.md:329
```
   327:     echo "✓ Restored from emergency snapshot"
   328:   else
>> 329:     echo "❌ Emergency restore also failed - DATABASE MAY BE INCONSISTENT"
   330:     echo "Manual intervention required"
   331:   fi
```
*(bloco/entidade: `else`)*

### .aiox-core/development/tasks/document-project.md:306
```
   304: 
   305: - Technical debt and workarounds
>> 306: - Inconsistent patterns between different parts
   307: - Legacy code that can't be changed
   308: - Integration constraints
```

### .aiox-core/development/tasks/document-project.md:373
```
   371: ├── src/
   372: │   ├── controllers/     # HTTP request handlers
>> 373: │   ├── services/        # Business logic (NOTE: inconsistent patterns between user and payment services)
   374: │   ├── models/          # Database models (Sequelize)
   375: │   ├── scripts/           # Mixed bag - needs refactoring
```

### .aiox-core/development/tasks/mapeamento-skus-ads-catalogo-mercadolivre.md:11
```
   9: **⚠️ REGRA GERAL OBRIGATÓRIA (14/08/2026, reforçada 14/08/2026 — aplicar no PROCESSO INTEIRO, nunca em pontos isolados) — paciência e confirmação de carregamento, nunca tempo fixo curto:** todo passo 
   10: 
>> 11: **Isso não é uma regra pra aplicar só onde um bug já apareceu — é pra todo o processo, desde o início.** O erro real que motivou o reforço desta regra (14/08/2026): a correção original só tinha sido a
   12: 
   13: **Técnica padrão obrigatória:** depois de qualquer ação que deveria mudar o conteúdo da tela, ler o texto da página 2 vezes seguidas (com um intervalo curto, ex: 1s) — se as 2 leituras baterem exatame
```

### .aiox-core/development/tasks/modify-agent.md:263
```
   261: If user provides specific changes:
   262: - Validate change format and targets
>> 263: - Check for conflicts with existing structure
   264: - Ensure changes maintain agent consistency
   265: 
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:27
```
   25: ## Verificação de processo duplicado
   26: 
>> 27: Antes de lançar, checar se já existe um processo Chrome usando a pasta `ChromeDebugKarzen` (evita conflito se dois agentes tentarem usar "Modo Navegador" ao mesmo tempo):
   28: 
   29: ```powershell
```

### .aiox-core/development/tasks/modo-navegador-browser-access.md:446
```
   444: Módulo persistido: `.aiox-core/development/scripts/modo-navegador/planilha-clipboard.js` (`escreverCelula`, `lerCelula`, `limparCelula`, `irParaCelula`, `esperarPlanilhaCarregar`).
   445: 
>> 446: **⚠️ Regra crítica, causou horas de investigação em 07-08/08/2026: NUNCA reusar uma aba da planilha que já acumulou várias tentativas (inclusive com erro).** O estado interno do Sheets fica inconsiste
   447: 
   448: **Outra pegadinha real:** logo depois de abrir a aba, a Name Box fica com o atributo `disabled` enquanto o Sheets ainda está carregando — clicar nela antes disso dá timeout. Esperar com `page.locator(
```

### .aiox-core/development/tasks/qa-after-creation.md:275
```
   273:         maturity_levels:
   274:           nivel_1: 'Score 0-4 — Persona only (decorative)'
>> 275:           nivel_2: 'Score 4-7 — Frameworks (functional but inconsistent)'
   276:           nivel_3: 'Score 7-9 — Complete (deterministic)'
   277:           nivel_3_plus: 'Score 9-10 — Complete + integrated'
```
*(bloco/entidade: `maturity_levels`)*

### .aiox-core/development/tasks/qa-review-proposal.md:973
```
   971:     // Conflict recommendations
   972:     if (analysis.conflicts.hasConflicts) {
>> 973:       recommendations.push('Resolve conflicts with other pending proposals');
   974:     }
   975: 
```
*(bloco/entidade: `if (analysis.conflicts.hasConflicts) {`)*

### .aiox-core/development/tasks/security-audit.md:526
```
   524: 
   525: - **Missing Audit Timestamps:** Tracking challenges
>> 526: - **Inconsistent Naming:** Maintainability issues
   527: 
   528: ---
```

### .aiox-core/development/tasks/spec-critique.md:187
```
   185:     3: 'Some contradictions or mismatches'
   186:     2: 'Multiple inconsistencies'
>> 187:     1: 'Fundamentally inconsistent'
   188: ```
   189: 
```
*(bloco/entidade: `scoring`)*

### .aiox-core/development/tasks/spec-research-dependencies.md:372
```
   370: 
   371:   - id: conflicting-dependency
>> 372:     condition: 'Dependency conflicts with existing'
   373:     action: "Add to recommendations with 'avoid' type"
   374:     blocking: false
```
*(bloco/entidade: `- id: conflicting-dependency`)*

### .aiox-core/development/tasks/ux-create-wireframe.md:610
```
   608: 2. **Designing in isolation** - Share early, get feedback often
   609: 3. **Ignoring edge cases** - Design empty states, errors, loading
>> 610: 4. **Inconsistent patterns** - Reuse components, don't reinvent
   611: 5. **No mobile consideration** - Design responsive from start
   612: 
```

### .aiox-core/docs/standards/AIOX-LIVRO-DE-OURO-V2.2-SUMMARY.md:201
```
   199:    Decay function: relevance = base_score * e^(-λ * age)
   200:    
>> 201: 4. Contradiction Resolution:
   202:    If conflicting memories, prefer:
   203:      - More recent (for changing requirements)
```

### .aiox-core/docs/standards/AIOX-LIVRO-DE-OURO-V2.2-SUMMARY.md:630
```
   628:    Specific issues:
   629:    1. .btn-primary-large duplicates .btn-lg-primary
>> 630:    2. Inconsistent naming: some use 'btn-', some 'button-'
   631:    3. Missing hover states on 7 buttons
   632:    
```
*(bloco/entidade: `"I see 23 button variations across your codebase.`)*

### .aiox-core/docs/standards/AIOX-LIVRO-DE-OURO-V2.2-SUMMARY.md:845
```
   843: │   │       │   ├── semantic-search.js # Embedding search
   844: │   │       │   ├── temporal-filter.js # Time-based filtering
>> 845: │   │       │   ├── contradiction-resolver.js # Conflict resolution
   846: │   │       │   └── context-assembler.js # Build context from memories
   847: │   │       │
```

### .aiox-core/infrastructure/scripts/changelog-generator.js:139
```
   137:   async getCommits(since, until) {
   138:     try {
>> 139:       // Use unique separator to avoid conflicts with message content
   140:       const separator = '|||CHANGELOG_SEP|||';
   141:       const format = `%H${separator}%s${separator}%an${separator}%aI`;
```
*(bloco/entidade: `try {`)*

### .aiox-core/infrastructure/scripts/conflict-resolver.js:488
```
   486:     }
   487:     
>> 488:     // Replace conflicts with merged imports
   489:     let resolved = content;
   490:     for (const conflict of fileInfo.conflicts) {
```
*(bloco/entidade: `async autoResolveImports(content, fileInfo) {`)*

### .aiox-core/infrastructure/templates/coderabbit.yaml.template:184
```
   182:         HIGH:
   183:         - Missing authentication checks
>> 184:         - Inconsistent error responses
   185:         - Missing rate limiting considerations
   186: 
```
*(bloco/entidade: `instructions: |`)*

### .aiox-core/product/checklists/change-checklist.md:88
```
   86: 
   87: - [ ] **Review PRD:**
>> 88:   - [ ] Does the issue conflict with the core goals or requirements stated in the PRD?
   89:   - [ ] Does the PRD need clarification or updates based on the new understanding?
   90: - [ ] **Review Architecture Document:**
>> 91:   - [ ] Does the issue conflict with the documented architecture (components, patterns, tech choices)?
   92:   - [ ] Are specific components/diagrams/sections impacted?
   93:   - [ ] Does the technology list need updating?
   94:   - [ ] Do data models or schemas need revision?
   95:   - [ ] Are external API integrations affected?
   96: - [ ] **Review Frontend Spec (if applicable):**
>> 97:   - [ ] Does the issue conflict with the FE architecture, component library choice, or UI/UX design?
   98:   - [ ] Are specific FE components or user flows impacted?
   99: - [ ] **Review Other Artifacts (if applicable):**
```
*(bloco/entidade: `- [ ] **Review PRD:**`)*

### .aiox-core/product/checklists/po-master-checklist.md:139
```
   137: ## 3. EXTERNAL DEPENDENCIES & INTEGRATIONS
   138: 
>> 139: [[LLM: External dependencies often block progress. For brownfield, ensure new dependencies don't conflict with existing ones.]]
   140: 
   141: ### 3.1 Third-Party Services
```

### .aiox-core/product/data/mode-selection-best-practices.md:400
```
   398: ### Q: Can I switch modes mid-story?
   399: 
>> 400: **A**: No. Mode is selected at story start. If you cancel, you can resume with a different mode, but this is not recommended (leads to inconsistent execution).
   401: 
   402: ### Q: What if I pick the wrong mode?
```

### .aiox-core/product/templates/brownfield-risk-report-tmpl.yaml:92
```
   90:           - id: PLAN-002
   91:             name: "Architecture Mismatch"
>> 92:             description: "Proposed architecture conflicts with existing constraints"
   93:             probability: medium
   94:             impact: high
```
*(bloco/entidade: `- id: PLAN-002`)*

### .aiox-core/product/templates/migration-strategy-tmpl.md:75
```
   73: **Risks:**
   74: - Build pipeline integration issues
>> 75: - Token naming conflicts with existing variables
   76: 
   77: **Mitigation:**
```

### .aiox-core/product/templates/personalized-task-template-v2.md:604
```
   602:     Builder: "⚠️ {verb} falhou. Vou debugar e reconstruir.",
   603:     Guardian: "⚠️ Validação falhou. Bloqueando até resolução.",
>> 604:     Balancer: "⚠️ Conflito detectado. Vou mediar e encontrar solução.",
   605:     Visionary: "⚠️ Planejamento interrompido. Preciso revisar estratégia.",
   606:   };
```
*(bloco/entidade: `templates`)*

### .aiox-core/product/templates/personalized-task-template.md:129
```
   127: - **Builder:** "⚠️ Build falhou. Vou debugar e reconstruir."
   128: - **Guardian:** "⚠️ Validação falhou. Bloqueando deploy até resolução."
>> 129: - **Balancer:** "⚠️ Conflito detectado. Vou mediar e encontrar consenso."
   130: 
   131: ---
```

### .aiox-core/product/templates/personalized-workflow-template.yaml:287
```
   285:         Builder: "⚠️ Build falhou no step 3. Vou debugar e reconstruir."
   286:         Guardian: "⚠️ Validação falhou. Bloqueando workflow por segurança."
>> 287:         Balancer: "⚠️ Conflito detectado. Preciso de input pra resolver."
   288: 
   289:   # Step-specific overrides
```
*(bloco/entidade: `examples`)*

### .aiox-core/user-guide.md:760
```
   758: - ❌ Builds quebrados na branch main
   759: - ❌ Conflitos de versão
>> 760: - ❌ Gerenciamento de release inconsistente
   761: 
   762: Com @github-devops:
```

### .aiox-core/user-guide.md:1202
```
   1200: ```
   1201: 
>> 1202: ### Conflito entre PRD e Arquitetura
   1203: 
   1204: **Problema**: PRD pede feature que conflita com arquitetura
```

### .aiox-core/workflow-intelligence/__tests__/suggestion-engine.test.js:434
```
   432: 
   433:     // Allow 5ms tolerance for timing noise (Date.now() has ~1ms resolution)
>> 434:     // In CI environments, timing can be inconsistent
   435:     expect(warmDuration).toBeLessThanOrEqual(coldDuration + 5);
   436:   });
```

### squads/squad-creator-pro/config/scoring-rubric.yaml:110
```
   108:     order: 3
   109:     description: "Forçar estrutura exata de output com schema"
>> 110:     when: "Formato inconsistente entre execuções"
   111:     template: |
   112:       ## Required Output Format
```
*(bloco/entidade: `template_strict`)*

### squads/squad-creator-pro/config/veto-conditions.yaml:88
```
   86:       phase: "agent_creation"
   87:       trigger: "agent_behavior_coherence < 0.7"
>> 88:       action: "VETO - Agent behavior inconsistent with persona"
   89:       severity: "CRITICAL"
   90:       source_pattern: "HO-VC-002"
```
*(bloco/entidade: `SC_VC_005`)*

### squads/squad-creator-pro/data/an-clone-validation.yaml:16
```
   14:       score_guide:
   15:         1: "Comportamento generico, indistinguivel de chatbot"
>> 16:         3: "Alguns patterns corretos mas inconsistente"
   17:         5: "Comportamento reconhecivel por quem conhece a pessoa"
   18: 
```
*(bloco/entidade: `score_guide`)*

### squads/squad-creator-pro/data/an-diagnostic-framework.yaml:153
```
   151:       expected: "Reconhecer limite, não inventar"
   152: 
>> 153:     - type: "Contradiction bait"
   154:       prompt: "Você disse X antes, mas agora..."
   155:       expected: "Explicar nuance ou admitir erro"
```
*(bloco/entidade: `attacks_to_try`)*

### squads/squad-creator-pro/data/core-heuristics.md:233
```
   231: | Score | Comportamento |
   232: |-------|---------------|
>> 233: | 0.0-0.3 | Inventa dados, esconde erros, inconsistente |
   234: | 0.4-0.6 | Ocasionalmente impreciso, minimiza problemas |
   235: | 0.7-0.8 | Honesto, admite quando nao sabe |
```

### squads/squad-creator-pro/data/fusion-decision-points-analysis.md:133
```
   131: **Minha simplificação:** "Maior ganha" ou "mover para _conflicts"
   132: 
>> 133: **Cenários reais de conflito:**
   134: 
>> 135: | Conflito | Decisão correta |
   136: |----------|-----------------|
   137: | Mesmo agent, versões diferentes | Qual é mais atual? Mais completo? |
```

### squads/squad-creator-pro/data/hybridops-patterns.md:485
```
   483:   - "Agent generates outputs contradicting its persona"
   484:   - "Agent ignores quality gates"
>> 485:   - "Agent produces inconsistent results for same input"
   486: 
   487: example:
```
*(bloco/entidade: `veto_conditions`)*

### squads/squad-creator-pro/data/hybridops-patterns.md:1073
```
   1071:     score_range: [0.7, 1.0]
   1072: 
>> 1073:   inconsistent:  # 0.4 - 0.7
   1074:     description: "Statements contradict data without clear explanation"
   1075:     examples:
```
*(bloco/entidade: `coherence_levels`)*

### squads/squad-creator-pro/data/hybridops-patterns.md:1113
```
   1111: scoring:
   1112:   all_tests_pass: 0.95    # Coherent
>> 1113:   1_test_fails: 0.65      # Inconsistent
   1114:   2+_tests_fail: 0.35     # Incoherent
   1115: ```
```
*(bloco/entidade: `scoring`)*

### squads/squad-creator-pro/data/pv-meta-axiomas.yaml:120
```
   118:   - rule: "NEVER sacrificar coerência de sistema por ganho social"
   119:   - rule: "IF informação insuficiente THEN construir modelo preditivo"
>> 120:   - rule: "WHEN em conflito THEN aplicar lógica e clareza"
   121:   - rule: "WHEN em abundância THEN reinvestir para expandir sistema"
   122:   - rule: "WHEN em escassez THEN foco radical em processos-chave"
```
*(bloco/entidade: `quick_decision_heuristics`)*

### squads/squad-creator-pro/data/pv-meta-axiomas.yaml:162
```
   160:       - "IF situação de alta pressão THEN isolar, analisar sistema, impor solução lógica"
   161:       - "IF informação insuficiente THEN construir modelo preditivo"
>> 162:       - "WHEN em conflito THEN verificar fatos/logs; eliminar política; mirar causa raiz"
   163: 
```
*(bloco/entidade: `default_behaviors`)*

### squads/squad-creator-pro/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md:85
```
   83:     - type: "Conteúdo antigo (5+ anos)"
   84:       why: "Pessoa mudou, contexto diferente"
>> 85:       signal: "Contradiz posições atuais"
   86:       action: "Marcar [OUTDATED] se usar"
   87: 
```
*(bloco/entidade: `- type: "Conteúdo antigo (5+ anos)"`)*

### squads/squad-creator-pro/minds/pedro_valerio/artifacts/META_AXIOMAS.md:164
```
   162:   THEN build predictive model based on existing patterns
   163: 
>> 164: WHEN in conflict with another person
   165:   THEN apply logic and clarity; if illogical, remove from system
   166: 
```

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PM_001.md:132
```
   130: - **Trigger:** Fear of complexity or change resistance
   131: - **Manifestation:** Manual repetitive work continues despite clear automation opportunity
>> 132: - **Detection:** Team burnout, inconsistent outputs, scaling bottlenecks
   133: - **Recovery:** Apply the "2x rule" rigorously
   134: - **Prevention:** Regular process audits for automation candidates
```

### squads/squad-creator-pro/scripts/fidelity-score.sh:433
```
   431: 
   432: # Checkpoint 2: Named paradoxes (2+)
>> 433: PARADOXES=$(grep -ciE "(paradox|contradiction)" "$CLONE_FILE" 2>/dev/null | head -1 || echo 0)
   434: PARADOXES=${PARADOXES:-0}
   435: if [[ "$PARADOXES" -ge 2 ]]; then
```

### squads/squad-creator-pro/scripts/validate-clone.sh:194
```
   192: 
   193: # AM9: Productive paradoxes
>> 194: if grep -qiE "(contradiction|paradox)" "$CLONE_FILE"; then
   195:     AM9="PASS"
   196:     AM9_EVIDENCE="Contradictions/paradoxes documented"
```

### squads/squad-creator-pro/tasks/an-assess-sources.md:159
```
   157: | 1 | Recência | Data de publicação | Criado nos últimos 3 anos (2023+) |
   158: | 2 | Contexto atual | Referências temporais | Menciona contexto relevante atual |
>> 159: | 3 | Não contradito | Posições posteriores | Não contradiz declarações mais recentes da pessoa |
   160: | 4 | Evolução visível | Mudança de pensamento | Mostra amadurecimento vs OBRA ANTERIOR do autor |
   161: | 5 | Aplicabilidade | Relevância hoje | Conselho ainda funciona em 2026 |
```

### squads/squad-creator-pro/tasks/an-assess-sources.md:185
```
   183: | # | Checkpoint | O que procurar | Passa se... |
   184: |---|------------|----------------|-------------|
>> 185: | 1 | Contra-mainstream | Posição diferente | Contradiz "senso comum" do mercado |
   186: | 2 | Vocabulário próprio | Termos únicos | Usa palavras/expressões signature |
   187: | 3 | Framework original | Modelo não-copiado | Metodologia não encontrada em outros |
```

### squads/squad-creator-pro/tasks/an-validate-clone.md:83
```
   81: |---|------|----------------|------------|------------|
   82: | 1 | Out-of-character request | Ask clone to say something the person would NEVER say | Clone refuses or redirects | Clone complies |
>> 83: | 2 | Provocation test | Try to provoke emotional response inconsistent with persona | Maintains composure and character | Breaks character, gets defensive |
   84: | 3 | Out-of-domain question | Ask about topic outside expertise | Admits limitation, redirects to domain | Invents answer or pretends expertise |
   85: | 4 | Values pressure | Push clone to contradict core values | Refuses, explains why | Contradicts values to please |
```

### squads/squad-creator-pro/tasks/optimize.md:1405
```
   1403:       compensation: "Lower thresholds in scoring calibration"
   1404: 
>> 1405:     inconsistent:
   1406:       condition: "Haiku direction varies across tests"
   1407:       action: "VETO — Task needs more structure before Haiku qualification"
```
*(bloco/entidade: `patterns`)*

### squads/squad-creator-pro/tasks/optimize.md:1429
```
   1427:         - { target: "large", opus: X, haiku: Y, delta: Z, direction: "conservative/generous/neutral" }
   1428:         - { target: "edge",  opus: X, haiku: Y, delta: Z, direction: "conservative/generous/neutral" }
>> 1429:       overall_bias: "conservative | generous | inconsistent | neutral"
   1430:       verdict: "QUALIFIED | NEEDS_CALIBRATION | VETO"
   1431:       action_taken: "{compensation applied or none}"
```
*(bloco/entidade: `bias_report`)*

### squads/squad-creator-pro/tasks/pv-audit.md:174
```
   172:     consistent:
   173:       - "{pattern que se repete}"
>> 174:     inconsistent:
   175:       - "{pattern que varia}"
   176: 
```
*(bloco/entidade: `patterns_found`)*

### squads/squad-creator-pro/tasks/squad-fusion.md:112
```
   110:   hints:
   111:     - "Selecione squads com domínios similares para melhor resultado"
>> 112:     - "Squads muito diferentes podem resultar em fusão inconsistente"
   113: ```
   114: 
```
*(bloco/entidade: `hints`)*

### squads/squad-creator-pro/tasks/validate-extraction.md:233
```
   231:     steel_man: "{melhor versão do argumento}"
   232:     attack: "{contra-argumento mais forte}"
>> 233:     counter_evidence: "{evidência que contradiz}" # [SOURCE:] se houver
   234: 
   235:     verdict: "SURVIVES / WEAKENED / DESTROYED"
```
*(bloco/entidade: `- finding: "{achado da lente}"`)*

### squads/squad-creator-pro/tasks/validate-extraction.md:299
```
   297: | 7. 0,8% não identificado | Aplicar find-0.8 | Executar task find-0.8.md |
   298: | 8. Evasion Scan não feito | Voltar para fontes | Analisar perguntas evitadas e desvios |
>> 299: | 9. Zero inversões | Analisar divergências | Buscar onde expert contradiz o campo |
   300: | 10. Zero cross-source patterns | Triangular achados | Verificar mesmos achados em outras fontes |
   301: | 11. Stress test não feito | Executar adversarial | Steel Man → Attack cada achado das 3 lentes |
```

### squads/squad-creator-pro/test-cases/an-assess-sources/EXECUTION_NOTES.md:105
```
   103: 
   104: - **Não contradito**:
>> 105:   - ✅ Nenhum livro contradiz posterior
   106: 
   107: - **EVOLUÇÃO (Regra especial v2.2.2)**:
```
*(bloco/entidade: `- **Não contradito**:`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-output.yaml:102
```
   100:           aplicabilidade: true
   101:           score: 5
>> 102:           notes: "Publicado 2022, conteúdo atemporal (pensamento divergente é sempre valioso). Não contradiz Leads nem Money Models. Mostra evolução de Alex precisando fazer webinars para dominar pens
   103: 
   104:         unicidade:
```
*(bloco/entidade: `atualidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-output.yaml:158
```
   156:           aplicabilidade: true
   157:           score: 5
>> 158:           notes: "Publicado 2022, baseado em 2017-2022 learnings. Estratégias Core Four ainda 100% relevantes 2026 (warm outreach, content, cold outreach, ads são únicos 4 canais). Não contradiz Ofert
   159: 
   160:         unicidade:
```
*(bloco/entidade: `atualidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-output.yaml:214
```
   212:           aplicabilidade: true
   213:           score: 5
>> 214:           notes: "Publicado 2022 mas referências 2017-2022. Modelo de dinheiro é atemporal (sempre funcionou). 100% aplicável 2026 (estrutura sequencial de ofertas não muda). Não contradiz Ofertas/Lea
   215: 
   216:         unicidade:
```
*(bloco/entidade: `atualidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.1-output.yaml:303
```
   301:           nota: "Sem data, não posso confirmar se conteúdo é recente"
   302:           nao_contradito: true
>> 303:           nota: "Tom Bilyeu entrevista frequentemente; assume-se não contradiz publicações"
   304:           evolucao: false
   305:           nota: "Sem conteúdo, não posso confirmar evolução de pensamento"
```
*(bloco/entidade: `atualidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.2.2-output.yaml:50
```
   48:           aplicabilidade: true
   49:           score: 3
>> 50:           rationale: "Publicado 2021 (5 anos). Sem referências a contexto 2023+. Não contradiz obras posteriores (Leads/Money Models expandem, não refutam). Evolução=FALSE (primeira obra, sem baseline
   51: 
   52:         unicidade:
```
*(bloco/entidade: `atualidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.2.2-output.yaml:108
```
   106:           aplicabilidade: true
   107:           score: 5
>> 108:           rationale: "Publicado ~2023. Referências atuais (COVID, unidades armazenamento). Não contradiz $100M Offers. Evolução=TRUE: mostra mudança vs Offers (Offers focava oferta/preço, Leads agora 
   109: 
   110:         unicidade:
```
*(bloco/entidade: `atualidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.2.2-output.yaml:166
```
   164:           aplicabilidade: true
   165:           score: 5
>> 166:           rationale: "Publicado ~2024. Referências recentes (Warren Buffett, Charlie Munger citados). Não contradiz. Evolução=TRUE: Offers focava estrutura de oferta única, Money Models fokus na SEQUÊ
   167: 
   168:         unicidade:
```
*(bloco/entidade: `atualidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/opus-baseline.yaml:85
```
   83:         unicidade:
   84:           contra_mainstream: true
>> 85:           # Contradiz senso comum: "precos altos sao beneficio para cliente",
   86:           # "venda menos para ganhar mais", "escassez artificial funciona".
   87:           vocabulario_proprio: true
```
*(bloco/entidade: `unicidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/opus-baseline.yaml:197
```
   195:         unicidade:
   196:           contra_mainstream: true
>> 197:           # Contradiz: "leads sozinhos nao sao suficientes" (industria foca em volume),
   198:           # "comece gratuito, depois cobre" (industria diz cobrar desde inicio).
   199:           vocabulario_proprio: true
```
*(bloco/entidade: `unicidade`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/README.md:136
```
   134: Haiku models tend to under-score. Generous interpretation applied to:
   135: - Profundidade (Capítulo 8): Cross-domain connection
>> 136: - Atualidade (Leads): Non-contradiction assumption
   137: - Unicidade (Models): Original framework assessment
   138: 
```

### squads/squad-creator-pro/test-cases/an-fidelity-score/haiku-round-1.yaml:241
```
   239:     path_to_elite: |
   240:       To reach 93%+ (Elite - V3.5+), would also need:
>> 241:       - Deeper contradiction documentation (Layer 8)
   242:       - Additional heuristic patterns (Layer 4)
   243:       - Cross-layer integration examples
```
*(bloco/entidade: `path_to_elite: |`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/haiku-output.yaml:40
```
   38:         Checkpoints usam mesma linguagem que avalia: "voice_dna", "thinking_dna", "synthesis".
   39:         Rework loops (max_iterations: 3) são CONSISTENTES em Phase 1 e 2.
>> 40:         Sistema não contradiz a si mesmo em nenhum ponto.
   41: 
   42:     - name: "Alinhamento Estratégico"
```
*(bloco/entidade: `evidence: |`)*

### squads/squad-creator-pro/workflows/wf-discover-tools.yaml:144
```
   142:       - id: step_m2_2
   143:         name: "Build Evidence Pack"
>> 144:         action: "Create canonical evidence with status and contradiction log"
   145:         logic: |
   146:           canonical_scope:
```
*(bloco/entidade: `- id: step_m2_2`)*

### squads/squad-creator-pro/workflows/wf-squad-fusion.yaml:551
```
   549:       checks:
   550:         - "Todas duplicatas têm decisão"
>> 551:         - "Nenhum conflito não-resolvido"
   552:         - "Winners existem no disco"
   553:       veto_on: "Duplicata sem resolução"
```
*(bloco/entidade: `checks`)*

### squads/squad-creator-pro/workflows/wf-squad-fusion.yaml:830
```
   828:         - "Zero conflitos não-resolvidos"
   829:         - "Todos arquivos copiados são válidos (não vazios)"
>> 830:       veto_on: "Discrepância não explicada OU conflito não resolvido"
   831: 
   832:     output:
```
*(bloco/entidade: `quality_gate`)*

### squads/squad-creator/agents/squad-chief.md:792
```
   790:       **The Problem with Generic Agents:**
   791:       - They have no documented methodology to follow
>> 792:       - Their output is inconsistent and unreliable
   793:       - They can't be validated against real frameworks
   794: 
```
*(bloco/entidade: `response: |`)*

### squads/squad-creator/config/veto-conditions.yaml:88
```
   86:       phase: "agent_creation"
   87:       trigger: "agent_behavior_coherence < 0.7"
>> 88:       action: "VETO - Agent behavior inconsistent with persona"
   89:       severity: "CRITICAL"
   90:       source_pattern: "HO-VC-002"
```
*(bloco/entidade: `SC_VC_005`)*

### squads/squad-creator/data/an-clone-validation.yaml:16
```
   14:       score_guide:
   15:         1: "Comportamento generico, indistinguivel de chatbot"
>> 16:         3: "Alguns patterns corretos mas inconsistente"
   17:         5: "Comportamento reconhecivel por quem conhece a pessoa"
   18: 
```
*(bloco/entidade: `score_guide`)*

### squads/squad-creator/data/an-diagnostic-framework.yaml:153
```
   151:       expected: "Reconhecer limite, não inventar"
   152: 
>> 153:     - type: "Contradiction bait"
   154:       prompt: "Você disse X antes, mas agora..."
   155:       expected: "Explicar nuance ou admitir erro"
```
*(bloco/entidade: `attacks_to_try`)*

### squads/squad-creator/data/core-heuristics.md:233
```
   231: | Score | Comportamento |
   232: |-------|---------------|
>> 233: | 0.0-0.3 | Inventa dados, esconde erros, inconsistente |
   234: | 0.4-0.6 | Ocasionalmente impreciso, minimiza problemas |
   235: | 0.7-0.8 | Honesto, admite quando nao sabe |
```

### squads/squad-creator/data/executor-decision-tree.md:182
```
   180: - Negociar contrato com cliente enterprise
   181: - Definir estratégia de produto
>> 182: - Resolver conflito entre stakeholders
   183: - Decidir pivô de negócio
   184: 
```

### squads/squad-creator/data/executor-decision-tree.md:380
```
   378: | Escolher stack tecnológico | ✅ SIM | Decisão arquitetural de longo prazo | → Pergunta 6 |
   379: | Gerar relatório de vendas | ❌ NÃO | Dados objetivos | → Pergunta 4 |
>> 380: | Aprovar férias de funcionário | ⚠️ DEPENDE | Se rotina → Worker; se conflito → Human | → Avaliar |
   381: 
   382: **If SIM → Pergunta 6**
```

### squads/squad-creator/data/executor-decision-tree.md:397
```
   395: | Contratar candidato | AI faz triagem inicial | Human entrevista e decide | → Hybrid |
   396: | Aprovar grande investimento | AI prepara análise de ROI | Human aprova | → Hybrid |
>> 397: | Resolver conflito de equipe | ❌ Não aplicável | Human media | → Human |
   398: | Definir preço de produto | AI analisa mercado/concorrência | Human define estratégia | → Hybrid |
   399: | Demitir funcionário | ❌ Não aplicável | Human executa | → Human |
```

### squads/squad-creator/data/fusion-decision-points-analysis.md:133
```
   131: **Minha simplificação:** "Maior ganha" ou "mover para _conflicts"
   132: 
>> 133: **Cenários reais de conflito:**
   134: 
>> 135: | Conflito | Decisão correta |
   136: |----------|-----------------|
   137: | Mesmo agent, versões diferentes | Qual é mais atual? Mais completo? |
```

### squads/squad-creator/data/hybridops-patterns.md:485
```
   483:   - "Agent generates outputs contradicting its persona"
   484:   - "Agent ignores quality gates"
>> 485:   - "Agent produces inconsistent results for same input"
   486: 
   487: example:
```
*(bloco/entidade: `veto_conditions`)*

### squads/squad-creator/data/hybridops-patterns.md:1073
```
   1071:     score_range: [0.7, 1.0]
   1072: 
>> 1073:   inconsistent:  # 0.4 - 0.7
   1074:     description: "Statements contradict data without clear explanation"
   1075:     examples:
```
*(bloco/entidade: `coherence_levels`)*

### squads/squad-creator/data/hybridops-patterns.md:1113
```
   1111: scoring:
   1112:   all_tests_pass: 0.95    # Coherent
>> 1113:   1_test_fails: 0.65      # Inconsistent
   1114:   2+_tests_fail: 0.35     # Incoherent
   1115: ```
```
*(bloco/entidade: `scoring`)*

### squads/squad-creator/data/pv-meta-axiomas.yaml:120
```
   118:   - rule: "NEVER sacrificar coerência de sistema por ganho social"
   119:   - rule: "IF informação insuficiente THEN construir modelo preditivo"
>> 120:   - rule: "WHEN em conflito THEN aplicar lógica e clareza"
   121:   - rule: "WHEN em abundância THEN reinvestir para expandir sistema"
   122:   - rule: "WHEN em escassez THEN foco radical em processos-chave"
```
*(bloco/entidade: `quick_decision_heuristics`)*

### squads/squad-creator/data/pv-meta-axiomas.yaml:162
```
   160:       - "IF situação de alta pressão THEN isolar, analisar sistema, impor solução lógica"
   161:       - "IF informação insuficiente THEN construir modelo preditivo"
>> 162:       - "WHEN em conflito THEN verificar fatos/logs; eliminar política; mirar causa raiz"
   163: 
```
*(bloco/entidade: `default_behaviors`)*

### squads/squad-creator/data/quality-dimensions-framework.md:171
```
   169: - Manual work that should be automated
   170: - Missing documentation
>> 171: - Inconsistent execution
   172: 
   173: ### 3.5 Innovation Capacity (Weight: 0.7)
```

### squads/squad-creator/docs/HITL-FLOW.md:206
```
   204: 3. **Quality Gate Crítico Falha:** Score < 5/10
   205: 4. **Usuário Indicou Materiais:** Mas não forneceu path
>> 206: 5. **Contradição Não Resolvida:** DNA extraction encontra conflito
   207: 
   208: ---
```

### squads/squad-creator/docs/MIGRATION-PLAN-AGENT-CONFORMITY.md:20
```
   18: O sistema AIOS tem um padrão de "activation" (como o agent se apresenta e lista comandos). Sem esse padrão:
   19: - Agents não seguem o pipeline unificado
>> 20: - Greeting (saudação) é inconsistente
   21: - Comandos não são filtrados por contexto
   22: 
```

### squads/squad-creator/docs/MIGRATION-ROADMAP-HYBRIDOPS.md:467
```
   465:     thresholds:
   466:       coherent: 0.7
>> 467:       inconsistent: 0.4
   468:       incoherent: 0.0
   469: 
```
*(bloco/entidade: `thresholds`)*

### squads/squad-creator/docs/RFC-001-deterministic-refactoring.md:40
```
   38: 1. Slow: LLM processes everything sequentially
   39: 2. Expensive: Tokens spent on file counting
>> 40: 3. Inconsistent: LLM might miss structural issues
   41: 4. No caching: Same checks repeated every time
   42: 
```

### squads/squad-creator/docs/squad-chief-agent-flow.md:580
```
   578: | Agent creation from memory | VETO - Must validate framework documentation | CRITICAL |
   579: | Agent under 300 lines | VETO - Does not meet quality standard | HIGH |
>> 580: | Missing voice_dna section | VETO - Agent will have inconsistent outputs | HIGH |
   581: | Missing output_examples (< 3) | VETO - Unpredictable behavior | HIGH |
   582: | Workflow without checkpoints | VETO - No validation points | MEDIUM |
```

### squads/squad-creator/docs/squad-creation-pipeline-workflow.md:751
```
   749: 3. **Invenção detectada** - PV criou conceitos não no framework
   750: 4. **Loop infinito** - 3+ rejeições consecutivas no mesmo handoff
>> 751: 5. **Conflito de versão** - Framework atualizado durante operacionalização
   752: 
   753: ---
```

### squads/squad-creator/docs/squad-creation-pipeline-workflow.md:857
```
   855: 
   856: **Causas:**
>> 857: - Path inconsistente
   858: - YAML malformado
   859: - Referência circular
```

### squads/squad-creator/docs/TROUBLESHOOTING.md:16
```
   14: 4. [Agent Responde de Forma Genérica](#4-agent-responde-de-forma-genérica)
   15: 5. [Quality Gate Blocking](#5-quality-gate-blocking)
>> 16: 6. [DNA Inconsistente](#6-dna-inconsistente)
   17: 7. [Squad Sem Tier 0](#7-squad-sem-tier-0)
   18: 8. [Workflow Travado](#8-workflow-travado)
```

### squads/squad-creator/docs/TROUBLESHOOTING.md:240
```
   238: ---
   239: 
>> 240: ## 6. DNA Inconsistente
   241: 
   242: ### Sintoma
```

### squads/squad-creator/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md:85
```
   83:     - type: "Conteúdo antigo (5+ anos)"
   84:       why: "Pessoa mudou, contexto diferente"
>> 85:       signal: "Contradiz posições atuais"
   86:       action: "Marcar [OUTDATED] se usar"
   87: 
```
*(bloco/entidade: `- type: "Conteúdo antigo (5+ anos)"`)*

### squads/squad-creator/minds/pedro_valerio/artifacts/META_AXIOMAS.md:164
```
   162:   THEN build predictive model based on existing patterns
   163: 
>> 164: WHEN in conflict with another person
   165:   THEN apply logic and clarity; if illogical, remove from system
   166: 
```

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PM_001.md:132
```
   130: - **Trigger:** Fear of complexity or change resistance
   131: - **Manifestation:** Manual repetitive work continues despite clear automation opportunity
>> 132: - **Detection:** Team burnout, inconsistent outputs, scaling bottlenecks
   133: - **Recovery:** Apply the "2x rule" rigorously
   134: - **Prevention:** Regular process audits for automation candidates
```

### squads/squad-creator/tasks/create-task.md:343
```
   341: 
   342:       Exemplos:
>> 343:       - ✅ SIM: Priorizar roadmap, negociar contrato, resolver conflito
   344:       - ❌ NÃO: Gerar relatório, processar dados, classificar items
   345: 
```
*(bloco/entidade: `ask: |`)*

### squads/squad-creator/tasks/pv-audit.md:162
```
   160:     consistent:
   161:       - "{pattern que se repete}"
>> 162:     inconsistent:
   163:       - "{pattern que varia}"
   164: 
```
*(bloco/entidade: `patterns_found`)*

### squads/squad-creator/tasks/squad-fusion.md:101
```
   99:   hints:
   100:     - "Selecione squads com domínios similares para melhor resultado"
>> 101:     - "Squads muito diferentes podem resultar em fusão inconsistente"
   102: ```
   103: 
```
*(bloco/entidade: `hints`)*

### squads/squad-creator/workflows/wf-squad-fusion.yaml:551
```
   549:       checks:
   550:         - "Todas duplicatas têm decisão"
>> 551:         - "Nenhum conflito não-resolvido"
   552:         - "Winners existem no disco"
   553:       veto_on: "Duplicata sem resolução"
```
*(bloco/entidade: `checks`)*

### squads/squad-creator/workflows/wf-squad-fusion.yaml:830
```
   828:         - "Zero conflitos não-resolvidos"
   829:         - "Todos arquivos copiados são válidos (não vazios)"
>> 830:       veto_on: "Discrepância não explicada OU conflito não resolvido"
   831: 
   832:     output:
```
*(bloco/entidade: `quality_gate`)*

## 🚦 Veto / gate / circuit breaker (588 trechos com contexto, 910 ocorrências totais)

### .aiox-core/core/code-intel/code-intel-client.js:117
```
   115: 
   116:   /**
>> 117:    * Execute a capability with circuit breaker, cache, and fallback.
   118:    * @param {string} capability - One of the 8 primitive capability names
   119:    * @param {Array} args - Arguments to pass to the capability
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/code-intel/code-intel-client.js:145
```
   143:     this._cacheMisses++;
   144: 
>> 145:     // Check circuit breaker
   146:     if (this._cbState === CB_OPEN) {
   147:       if (Date.now() - this._cbOpenedAt >= CIRCUIT_BREAKER_RESET_MS) {
```

### .aiox-core/core/graph-dashboard/renderers/status-renderer.js:68
```
   66: 
   67: /**
>> 68:  * Render circuit breaker state line.
   69:  * @param {Object} data - Metrics data
   70:  * @param {boolean} isTTY
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/ids/circuit-breaker.js:15
```
   13:  *   HALF_OPEN -> After reset timeout, allows one probe request
   14:  *
>> 15:  * Source: ids-principles.md circuit_breaker config
   16:  */
   17: 
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/ids/circuit-breaker.js:119
```
   117: 
   118:   /**
>> 119:    * Get current circuit breaker state.
   120:    * @returns {string} STATE_CLOSED, STATE_OPEN, or STATE_HALF_OPEN
   121:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/ids/circuit-breaker.js:141
```
   139: 
   140:   /**
>> 141:    * Reset the circuit breaker to CLOSED state.
   142:    * Useful for testing and manual recovery.
   143:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/ids/index.js:74
```
   72:   DEFAULT_SUCCESS_THRESHOLD,
   73:   DEFAULT_RESET_TIMEOUT_MS,
>> 74: } = require('./circuit-breaker');
   75: 
   76: const {
```

### .aiox-core/core/ids/verification-gate.js:8
```
   6:  * Abstract base class for IDS verification gates (G1-G6).
   7:  * Uses the Template Method pattern: subclasses implement _doVerify()
>> 8:  * while the base class handles timeout, circuit breaker, logging,
   9:  * and graceful degradation.
   10:  *
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/ids/verification-gate.js:20
```
   18:  */
   19: 
>> 20: const { CircuitBreaker } = require('./circuit-breaker');
   21: 
   22: const DEFAULT_TIMEOUT_MS = 2000;
```

### .aiox-core/core/ids/verification-gate.js:80
```
   78: 
   79:   /**
>> 80:    * Execute the verification gate with timeout and circuit breaker protection.
   81:    * Template Method: calls _doVerify() implemented by subclasses.
   82:    *
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/ids/verification-gate.js:100
```
   98:         passed: true,
   99:         blocking: false,
>> 100:         warnings: [`Gate ${this._gateId} skipped: circuit breaker open`],
   101:         opportunities: [],
   102:         context,
```
*(bloco/entidade: `result`)*

### .aiox-core/core/ids/verification-gate.js:201
```
   199: 
   200:   /**
>> 201:    * Get circuit breaker stats.
   202:    * @returns {object}
   203:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/data/entity-registry.yaml:9633
```
   9631:       checksum: sha256:c91f7bc999eca74394eeae9bc7400e63e134de4092d6bdc08b92bf423e423ec3
   9632:       lastVerified: '2026-05-20T17:52:00.804Z'
>> 9633:     circuit-breaker:
>> 9634:       path: .aiox-core/core/ids/circuit-breaker.js
   9635:       layer: L1
   9636:       type: module
>> 9637:       purpose: Entity at .aiox-core/core/ids/circuit-breaker.js
   9638:       keywords:
   9639:         - circuit
```

### .aiox-core/data/entity-registry.yaml:9712
```
   9710:         - registry-updater
   9711:         - registry-healer
>> 9712:         - circuit-breaker
   9713:         - verification-gate
   9714:         - g1-epic-creation
```
*(bloco/entidade: `dependencies`)*

### .aiox-core/data/entity-registry.yaml:9827
```
   9825:         - ids-index
   9826:       dependencies:
>> 9827:         - circuit-breaker
   9828:       externalDeps: []
   9829:       plannedDeps: []
```
*(bloco/entidade: `dependencies`)*

### .aiox-core/development/agents/aiox-master.md:51
```
   49:       # FALLBACK: If native greeting fails, run: node .aiox-core/development/scripts/unified-activation-pipeline.js aiox-master
   50:   - STEP 4: Display the greeting assembled in STEP 3
>> 51:   - STEP 5: HALT and await user input
   52:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   53:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/aiox-master.md:64
```
   62:   - CRITICAL: Do NOT run discovery tasks automatically
   63:   - CRITICAL: NEVER LOAD .aiox-core/data/aiox-kb.md UNLESS USER TYPES *kb
>> 64:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. The ONLY deviation from this is if the activation included commands also in the argumen
   65: agent:
   66:   name: Orion
```

### .aiox-core/development/agents/analyst.md:42
```
   40:       # FALLBACK: If native greeting fails, run: node .aiox-core/development/scripts/unified-activation-pipeline.js analyst
   41:   - STEP 4: Display the greeting assembled in STEP 3
>> 42:   - STEP 5: HALT and await user input
   43:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   44:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/analyst.md:52
```
   50:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list, allowing the user to type a number to select or execute
   51:   - STAY IN CHARACTER!
>> 52:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. The ONLY deviation from this is if the activation included commands also in the argumen
   53: agent:
   54:   name: Atlas
```

### .aiox-core/development/agents/architect.md:42
```
   40:       # FALLBACK: If native greeting fails, run: node .aiox-core/development/scripts/unified-activation-pipeline.js architect
   41:   - STEP 4: Display the greeting assembled in STEP 3
>> 42:   - STEP 5: HALT and await user input
   43:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   44:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/architect.md:53
```
   51:   - STAY IN CHARACTER!
   52:   - When creating architecture, always start by understanding the complete picture - user needs, business constraints, team capabilities, and technical requirements.
>> 53:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. The ONLY deviation from this is if the activation included commands also in the argumen
   54: agent:
   55:   name: Aria
```

### .aiox-core/development/agents/data-engineer.md:43
```
   41:       # FALLBACK: If native greeting fails, run: node .aiox-core/development/scripts/unified-activation-pipeline.js data-engineer
   42:   - STEP 4: Display the greeting assembled in STEP 3
>> 43:   - STEP 5: HALT and await user input
   44:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   45:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/data-engineer.md:55
```
   53:   - When designing databases, always start by understanding the complete picture - business domain, data relationships, access patterns, scale requirements, and security constraints.
   54:   - Always create snapshots before any schema-altering operation
>> 55:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. The ONLY deviation from this is if the activation included commands also in the argumen
   56: agent:
   57:   name: Dara
```

### .aiox-core/development/agents/dev.md:42
```
   40:       # FALLBACK: If native greeting fails, run: node .aiox-core/development/scripts/unified-activation-pipeline.js dev
   41:   - STEP 4: Display the greeting assembled in STEP 3
>> 42:   - STEP 5: HALT and await user input
   43:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   44:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/dev.md:55
```
   53:   - CRITICAL: Do NOT load any other files during startup aside from the assigned story and devLoadAlwaysFiles items, unless user requested you do or the following contradicts
   54:   - CRITICAL: Do NOT begin development until a story is not in draft mode and you are told to proceed
>> 55:   - CRITICAL: On activation, execute STEPS 3-5 above (greeting, introduction, project status, quick commands), then HALT to await user requested assistance or given commands. The ONLY deviation from t
   56: agent:
   57:   name: Dex
```

### .aiox-core/development/agents/dev.md:239
```
   237:     - CRITICAL: You are ONLY authorized to edit these specific sections of story files - Tasks / Subtasks Checkboxes, Dev Agent Record section and all its subsections, Agent Model Used, Debug Log Refe
   238:     - CRITICAL: DO NOT modify Status, Story, Acceptance Criteria, Dev Notes, Testing sections, or any other sections not listed above
>> 239:   blocking: 'HALT for: Unapproved deps needed, confirm with user | Ambiguous after story check | 3 failures attempting to implement or fix something repeatedly | Missing config | Failing regression'
   240:   ready-for-review: 'Code matches requirements + All validations pass + Follows standards + File List complete'
>> 241:   completion: "All Tasks and Subtasks marked [x] and have tests→Validations and full regression passes (DON'T BE LAZY, EXECUTE ALL TESTS and CONFIRM)→Ensure File List is Complete→run the task execute-
   242: 
   243: dependencies:
```
*(bloco/entidade: `develop-story`)*

### .aiox-core/development/agents/dev.md:353
```
   351:       IF iteration == max_iterations AND CRITICAL issues remain:
   352:         - Log: "❌ CRITICAL issues remain after 2 iterations"
>> 353:         - HALT and report to user
   354:         - DO NOT mark story complete
   355: 
```
*(bloco/entidade: `IF iteration == max_iterations AND CRITICAL issues remain:`)*

### .aiox-core/development/agents/devops.md:43
```
   41:       # FALLBACK: If native greeting fails, run: node .aiox-core/development/scripts/unified-activation-pipeline.js devops
   42:   - STEP 4: Display the greeting assembled in STEP 3
>> 43:   - STEP 5: HALT and await user input
   44:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   45:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/devops.md:53
```
   51:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list, allowing the user to type a number to select or execute
   52:   - STAY IN CHARACTER!
>> 53:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. The ONLY deviation from this is if the activation included commands also in the argumen
   54: agent:
   55:   name: Gage
```

### .aiox-core/development/agents/pm.md:72
```
   70:          - Show resume options: [1] Continuar / [2] Revisar / [3] Recomeçar / [4] Descartar
   71:          - Execute session-resume.md task to handle user's choice
>> 72:          - HALT and wait for user selection BEFORE displaying normal greeting
   73: 
   74:       4. If no session OR after user completes resume flow:
```
*(bloco/entidade: `3. If session detected:`)*

### .aiox-core/development/agents/pm.md:81
```
   79:       Task: .aiox-core/development/tasks/session-resume.md
   80:   - STEP 4: Display the greeting assembled in STEP 3 (or resume summary if session detected)
>> 81:   - STEP 5: HALT and await user input
   82:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   83:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/pm.md:91
```
   89:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list, allowing the user to type a number to select or execute
   90:   - STAY IN CHARACTER!
>> 91:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. The ONLY deviation from this is if the activation included commands also in the argumen
   92: agent:
   93:   name: Morgan
```

### .aiox-core/development/agents/po.md:42
```
   40:       # FALLBACK: If native greeting fails, run: node .aiox-core/development/scripts/unified-activation-pipeline.js po
   41:   - STEP 4: Display the greeting assembled in STEP 3
>> 42:   - STEP 5: HALT and await user input
   43:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   44:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/po.md:52
```
   50:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list, allowing the user to type a number to select or execute
   51:   - STAY IN CHARACTER!
>> 52:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. The ONLY deviation from this is if the activation included commands also in the argumen
   53: agent:
   54:   name: Pax
```

### .aiox-core/development/agents/qa.md:42
```
   40:       # FALLBACK: If native greeting fails, run: node .aiox-core/development/scripts/unified-activation-pipeline.js qa
   41:   - STEP 4: Display the greeting assembled in STEP 3
>> 42:   - STEP 5: HALT and await user input
   43:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   44:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/qa.md:52
```
   50:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list, allowing the user to type a number to select or execute
   51:   - STAY IN CHARACTER!
>> 52:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. The ONLY deviation from this is if the activation included commands also in the argumen
   53: agent:
   54:   name: Quinn
```

### .aiox-core/development/agents/qa.md:302
```
   300:         - Generate detailed QA gate report
   301:         - Set gate decision: FAIL
>> 302:         - HALT and require human intervention
   303: 
   304:     commands:
```
*(bloco/entidade: `IF iteration == max_iterations AND (CRITICAL or HIGH issues remain):`)*

### .aiox-core/development/agents/sm.md:42
```
   40:       # FALLBACK: If native greeting fails, run: node .aiox-core/development/scripts/unified-activation-pipeline.js sm
   41:   - STEP 4: Display the greeting assembled in STEP 3
>> 42:   - STEP 5: HALT and await user input
   43:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   44:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/sm.md:52
```
   50:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list, allowing the user to type a number to select or execute
   51:   - STAY IN CHARACTER!
>> 52:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. The ONLY deviation from this is if the activation included commands also in the argumen
   53: agent:
   54:   name: River
```

### .aiox-core/development/agents/squad-creator.md:43
```
   41:         - Formats adaptive greeting automatically
   42:   - STEP 4: Greeting already rendered inline in STEP 3 — proceed to STEP 5
>> 43:   - STEP 5: HALT and await user input
   44:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   45:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/squad-creator.md:53
```
   51:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list
   52:   - STAY IN CHARACTER!
>> 53:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. The ONLY deviation from this is if the activation included commands also in the argumen
   54: agent:
   55:   name: Craft
```

### .aiox-core/development/agents/ux-design-expert.md:47
```
   45:       # FALLBACK: If native greeting fails, run: node .aiox-core/development/scripts/unified-activation-pipeline.js ux-design-expert
   46:   - STEP 4: Greeting already rendered inline in STEP 3 — proceed to STEP 5
>> 47:   - STEP 5: HALT and await user input
   48:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   49:   - DO NOT: Load any other agent files during activation
```

### .aiox-core/development/agents/ux-design-expert.md:56
```
   54:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list
   55:   - STAY IN CHARACTER!
>> 56:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands
   57: 
   58: agent:
```

### .aiox-core/development/checklists/agent-quality-gate.md:320
```
   318:     veto_if_fail: "Task without steps is decoration, not process"
   319: 
>> 320:   - id: task-files-have-veto
>> 321:     check: "Each task file has at least 1 veto condition"
   322:     type: blocking
   323:     validation: "count(veto_conditions) >= 1 for each task file"
>> 324:     veto_if_fail: "Task without veto allows incomplete work to pass (PV004)"
   325: 
   326:   # ═══════════════════════════════════════════════════════════════
```
*(bloco/entidade: `operational_completeness_checks`)*

### .aiox-core/development/checklists/agent-quality-gate.md:343
```
   341: 
   342:   # ═══════════════════════════════════════════════════════════════
>> 343:   # CHECKLISTS — At least 1 with veto conditions
   344:   # ═══════════════════════════════════════════════════════════════
   345: 
```

### .aiox-core/development/checklists/agent-quality-gate.md:353
```
   351: 
   352:   - id: checklist-has-blocking
>> 353:     check: "Checklist has blocking items with veto conditions"
   354:     type: recommended
   355:     validation: "Checklist has items with type: blocking"
```
*(bloco/entidade: `- id: checklist-has-blocking`)*

### .aiox-core/development/checklists/agent-quality-gate.md:480
```
   478: - [ ] Task file exists for each operational command
   479: - [ ] Each task file has 3+ steps
>> 480: - [ ] Each task file has 1+ veto conditions
   481: - [ ] At least 1 checklist with blocking items
   482: - [ ] ALL dependency files exist on disk
```

### .aiox-core/development/checklists/agent-quality-gate.md:498
```
   496: - [ ] Agent file has 800+ lines
   497: - [ ] Templates exist for structured output types
>> 498: - [ ] Checklists have blocking items with veto conditions
   499: 
   500: ### Domain-Specific (If Applicable)
```

### .aiox-core/development/data/decision-heuristics-framework.md:37
```
   35:   veto_conditions:
   36:     - condition: 'criterion_1 < 0.7'
>> 37:       action: 'VETO - Return to previous phase'
   38:     - condition: 'critical_check = false'
>> 39:       action: 'VETO - Cannot proceed'
   40: 
>> 41:   # What to do when veto triggers
   42:   feedback_on_failure:
   43:     - 'Specific remediation step 1'
```
*(bloco/entidade: `- condition: 'criterion_1 < 0.7'`)*

### .aiox-core/development/data/decision-heuristics-framework.md:49
```
   47:   output:
   48:     type: 'decision'
>> 49:     values: ['APPROVE', 'REVIEW', 'VETO']
   50: ```
   51: 
```
*(bloco/entidade: `output`)*

### .aiox-core/development/data/decision-heuristics-framework.md:61
```
   59: PRIMARY BRANCH (highest priority):
   60:   IF (critical_condition_violated)
>> 61:     THEN VETO → immediate action
   62: 
   63: SECONDARY BRANCH:
```
*(bloco/entidade: `IF (critical_condition_violated)`)*

### .aiox-core/development/data/decision-heuristics-framework.md:101
```
   99:   veto_conditions:
   100:     - condition: 'vision_clarity < 0.7'
>> 101:       action: 'VETO - Vision unclear, return to Discovery'
   102: 
   103:   decision_tree: |
```
*(bloco/entidade: `- condition: 'vision_clarity < 0.7'`)*

### .aiox-core/development/data/decision-heuristics-framework.md:124
```
   122: 
   123:   weights:
>> 124:     consistency: 1.0 # VETO power
   125:     system_fit: 0.8
   126:     capability: 0.3
```
*(bloco/entidade: `weights`)*

### .aiox-core/development/data/quality-dimensions-framework.md:32
```
   30:     overall_threshold: 7.0
   31:     minimum_per_dimension: 6.0
>> 32:     veto_on_failure: false # Default to REVIEW, not VETO
   33: 
   34:   dimensions:
```
*(bloco/entidade: `scoring`)*

### .aiox-core/development/data/quality-dimensions-framework.md:110
```
   108: ## 3. Dimension Details
   109: 
>> 110: ### 3.1 Accuracy (Weight: 1.0, VETO)
   111: 
   112: **Definition:** Correctness verified by data/evidence.
```

### .aiox-core/development/scripts/apply-inline-greeting-all-agents.js:61
```
   59:   - STEP 4: Display the greeting you generated in STEP 3
   60: 
>> 61:   - STEP 5: HALT and await user input
   62: `;
   63: 
>> 64: const OLD_PATTERN = / {2}- STEP 3: Execute \/greet slash command to generate contextual greeting\n {2}- STEP 4: Display the greeting returned by \/greet command\n {2}- STEP 5: HALT and await user inpu
   65: 
   66: function updateAgent(agentFile) {
```

### .aiox-core/development/tasks/build-autonomous.md:92
```
   90:           - Mark build as "timed_out"
   91:           - Save state for resume
>> 92:           - HALT
   93:     outputs:
   94:       - completedSubtasks
```
*(bloco/entidade: `IF global timeout exceeded:`)*

### .aiox-core/development/tasks/create-agent.md:96
```
   94:     → Create task stubs per command
   95:     → Create template stubs per output type
>> 96:     → Create checklist with veto conditions
   97:     → Update agent with Level 0 infrastructure
   98:     ↓
   99: [PHASE 6: OPERATIONAL VALIDATION]  ← NEW
   100:     → Validate all files exist
>> 101:     → Validate task quality (steps + veto)
   102:     → Calculate maturity score (target >= 7.0)
   103:     ↓
```
*(bloco/entidade: `[PHASE 5: OPERATIONAL INFRASTRUCTURE]  ← NEW`)*

### .aiox-core/development/tasks/create-agent.md:744
```
   742:   veto_condition:
   743:     - condition: 'Operational command has no command_loader entry'
>> 744:       action: 'VETO - Cannot proceed. Every operational command needs file mapping'
   745:       reason: 'Without mapping, LLM will improvise the workflow'
   746: ```
```
*(bloco/entidade: `- condition: 'Operational command has no command_loader entry'`)*

### .aiox-core/development/tasks/create-agent.md:787
```
   785:   veto_condition:
   786:     - condition: 'Task file has no steps'
>> 787:       action: 'VETO - Task without steps is decoration'
   788:       reason: 'Steps are what make execution deterministic'
   789: 
>> 790:     - condition: 'Task file has no veto conditions'
>> 791:       action: 'VETO - Task without veto allows incomplete work to pass'
   792:       reason: 'PV004: If executor CAN do it wrong, process is wrong'
   793: ```
```
*(bloco/entidade: `- condition: 'Task file has no steps'`)*

### .aiox-core/development/tasks/create-agent.md:831
```
   829: ```yaml
   830: create_operational_checklist:
>> 831:   description: "Create at least 1 checklist with veto conditions for the agent's primary task"
   832:   file_path: 'squads/{pack_name}/checklists/{agent_id}-quality-gate.md'
   833: 
   834:   required_structure:
   835:     blocking_section:
>> 836:       description: 'Items that MUST pass — VETO if any fails'
   837:       min_items: 3
   838:       format:
```
*(bloco/entidade: `create_operational_checklist`)*

### .aiox-core/development/tasks/create-agent.md:925
```
   923: 
   924:   on_missing_file:
>> 925:     action: 'VETO - Cannot pass. File {path} is in command_loader but does not exist'
   926:     fix: 'Create the file or remove from command_loader'
   927: ```
```
*(bloco/entidade: `on_missing_file`)*

### .aiox-core/development/tasks/create-brownfield-story.md:612
```
   610: **External System Integration:**
   611: - Focus: Graceful degradation, retry logic, error handling, monitoring
>> 612: - Validation: Failure scenario testing, circuit breaker validation
   613: 
   614: **Log Completion:**
```

### .aiox-core/development/tasks/create-next-story.md:223
```
   221: 
   222: - Load `aiox-core/core-config.yaml` from the project root
>> 223: - If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for story creation. You can either: 1) Copy it from GITHUB aiox-core/core-config.yaml and con
   224: - Extract key configurations: `devStoryLocation`, `prd.*`, `architecture.*`, `workflow.*`
   225: 
```

### .aiox-core/development/tasks/create-next-story.md:384
```
   382: 
   383: - **If Epic NOT found:**
>> 384:   - HALT execution
   385:   - Display error: "❌ Epic {epicNum} not found in ClickUp Backlog list.
   386:     Please create Epic task with:
```
*(bloco/entidade: `- **If Epic NOT found:**`)*

### .aiox-core/development/tasks/dev-develop-story.md:510
```
   508: ### Blocking Conditions (All Modes)
   509: 
>> 510: **HALT and ask user if**:
   511: - Unapproved dependencies needed
   512: - Ambiguous requirements after checking story
```

### .aiox-core/development/tasks/dev-develop-story.md:534
```
   532: 7. Execute `.aiox-core/product/checklists/story-dod-checklist.md`
   533: 8. Set story status: "InReview" (see Status Transitions section)
>> 534: 9. HALT (do not proceed further)
   535: 
   536: ---
```

### .aiox-core/development/tasks/dev-develop-story.md:591
```
   589: │  IF iteration == 2 AND CRITICAL issues remain:              │
   590: │    - Log: "❌ CRITICAL issues remain"                       │
>> 591: │    - HALT and report to user                                │
   592: │    - DO NOT mark story complete                             │
   593: │                                                              │
```

### .aiox-core/development/tasks/dev-develop-story.md:931
```
   929: **These steps MUST be executed at the specified points, regardless of execution mode.**
   930: 
>> 931: **Change Log format:** Use `{date: YYYY-MM-DD}` and `{version: MAJOR.MINOR.PATCH}`. Version MUST follow semantic bump rules: major for breaking changes, minor for features, patch for fixes/process upd
   932: 
   933: ### On Development Start (before first task):
   934: 
   935: 0. **Pre-check (blocking):**
   936:    - If current Status is `**InProgress**`, skip to first uncompleted task (resume scenario — no status change needed).
>> 937:    - If current Status is not `**Ready**` and not `**InProgress**`, HALT and log: "Cannot start development: expected Ready or InProgress, found {current status}."
>> 938:    - If Change Log section is missing, HALT and request user to restore template structure.
   939: 1. **Update story Status field:** change `**Ready**` to `**InProgress**` (skip if already InProgress)
   940: 2. **Add Change Log entry:**
```

### .aiox-core/development/tasks/dev-develop-story.md:946
```
   944: 3. **Log:** "🚀 Story status updated: Ready → InProgress"
   945: 
>> 946: ### On Development Complete (after DOD checklist, before HALT):
   947: 
   948: 0. **Pre-check (blocking):**
>> 949:    - If current Status is not `**InProgress**`, HALT and log: "Cannot mark for review: expected InProgress, found {current status}."
>> 950:    - If Change Log section is missing, HALT and request user to restore template structure.
   951: 1. **Update story Status field:** change `**InProgress**` to `**InReview**`
   952: 2. **Add Change Log entry:**
```

### .aiox-core/development/tasks/dev-validate-next-story.md:222
```
   220: 
   221: - Load `.aiox-core/core-config.yaml`
>> 222: - If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for story validation."
   223: - Extract key configurations: `devStoryLocation`, `prd.*`, `architecture.*`
   224: - Identify and load the following inputs:
```

### .aiox-core/development/tasks/pr-automation.md:123
```
   121:    - Execute test suite: `npm test`
   122:    - Check for failures
>> 123:    - If failures: HALT and show errors
   124: 
   125: 5. **Run CodeRabbit Pre-Check** (if run_coderabbit=true)
```
*(bloco/entidade: `4. **Run Local Tests** (unless skip_tests=true)`)*

### .aiox-core/development/tasks/qa-after-creation.md:13
```
   11: 
   12: - Use Process Absolutism principles for validation
>> 13: - Define VETO conditions that BLOCK, not just warn
   14: - For workflow/process validation, invoke: `@pedro-valerio *audit`
   15: - For designing quality gates, invoke: `@pedro-valerio *design-heuristic`
```

### .aiox-core/development/tasks/qa-after-creation.md:268
```
   266:           - 'command_loader exists and maps all operational commands'
   267:           - 'Task file exists for each command in command_loader.requires'
>> 268:           - 'Each task file has 3+ steps and 1+ veto conditions'
   269:           - 'At least 1 checklist with blocking items exists'
   270:           - 'All files in dependencies exist on disk'
```
*(bloco/entidade: `checks`)*

### .aiox-core/development/tasks/qa-after-creation.md:360
```
   358:     task_files: "N/N commands covered"
   359:     templates: "N types covered"
>> 360:     checklists: "N with veto conditions"
   361:     critical_loader_rule: "present | missing"
   362:     dependencies_integrity: "all exist | N missing"
```
*(bloco/entidade: `operational_completeness`)*

### .aiox-core/development/tasks/qa-gate.md:429
```
   427: **This step MUST be executed before presenting results to user.**
   428: 
>> 429: **Change Log format:** Use `{date: YYYY-MM-DD}` and `{version: MAJOR.MINOR.PATCH}`. Version MUST follow semantic bump rules: major for breaking changes, minor for features, patch for fixes/process upd
   430: 
   431: ### IF verdict is PASS or CONCERNS:
   432: 
   433: 0. **Pre-check (blocking):**
>> 434:    - If current Status is not `**InReview**`, HALT and log: "Cannot apply PASS/CONCERNS transition: expected InReview, found {current status}."
>> 435:    - If Change Log section is missing, HALT and request user to restore template structure.
   436: 1. **Update story Status field** in the story file: change `**InReview**` to `**Done**`
   437: 2. **Add Change Log entry:**
```

### .aiox-core/development/tasks/qa-gate.md:446
```
   444: 
   445: 0. **Pre-check (blocking):**
>> 446:    - If current Status is not `**InReview**`, HALT and log: "Cannot apply FAIL transition: expected InReview, found {current status}."
>> 447:    - If Change Log section is missing, HALT and request user to restore template structure.
   448: 1. **Update story Status field** in the story file: change `**InReview**` to `**InProgress**`
   449: 2. **Add Change Log entry:**
```
*(bloco/entidade: `0. **Pre-check (blocking):**`)*

### .aiox-core/development/tasks/qa-gate.md:458
```
   456: 
   457: 0. **Pre-check (blocking):**
>> 458:    - If current Status is not `**InReview**`, HALT and log: "Cannot apply WAIVED transition: expected InReview, found {current status}."
>> 459:    - If Change Log section is missing, HALT and request user to restore template structure.
   460: 1. **Update story Status field** in the story file: change `**InReview**` to `**Done**`
   461: 2. **Add Change Log entry:**
```
*(bloco/entidade: `0. **Pre-check (blocking):**`)*

### .aiox-core/development/tasks/qa-review-build.md:1165
```
   1163:   - id: spec-not-found
   1164:     condition: 'spec.md does not exist'
>> 1165:     action: 'HALT - Cannot review without specification'
   1166:     blocking: true
   1167: 
```
*(bloco/entidade: `- id: spec-not-found`)*

### .aiox-core/development/tasks/qa-review-story.md:295
```
   293: │    - Generate detailed QA gate report                            │
   294: │    - Set gate: FAIL                                              │
>> 295: │    - HALT and require human intervention                         │
   296: │                                                                   │
   297: └───────────────────────────────────────────────────────────────────┘
```

### .aiox-core/development/tasks/sm-create-next-story.md:223
```
   221: 
   222: - Load `aiox-core/core-config.yaml` from the project root
>> 223: - If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for story creation. You can either: 1) Copy it from GITHUB aiox-core/core-config.yaml and con
   224: - Extract key configurations: `devStoryLocation`, `prd.*`, `architecture.*`, `workflow.*`
   225: 
```

### .aiox-core/development/tasks/sm-create-next-story.md:355
```
   353: 
   354: - **If Epic NOT found:**
>> 355:   - HALT execution
   356:   - Display error: "❌ Epic {epicNum} not found in ClickUp Backlog list.
   357:     Please create Epic task with:
```
*(bloco/entidade: `- **If Epic NOT found:**`)*

### .aiox-core/development/tasks/validate-next-story.md:222
```
   220: 
   221: - Load `.aiox-core/core-config.yaml`
>> 222: - If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for story validation."
   223: - Extract key configurations: `devStoryLocation`, `prd.*`, `architecture.*`
   224: - Identify and load the following inputs:
```

### .aiox-core/development/tasks/validate-next-story.md:472
```
   470: **This step MUST be executed before presenting results to user.**
   471: 
>> 472: **Change Log format:** Use `{date: YYYY-MM-DD}` and `{version: MAJOR.MINOR.PATCH}`. Version MUST follow semantic bump rules: major for breaking changes, minor for features, patch for fixes/process upd
   473: 
   474: #### IF verdict is GO (score >= 7):
   475: 
   476: 0. **Pre-check (blocking):**
>> 477:    - If current Status is not `**Draft**`, HALT and log: "Cannot apply GO transition: expected Draft, found {current status}."
>> 478:    - If Change Log section is missing, HALT and request user to restore template structure.
   479: 1. **Update story Status field** in the story file: change `**Draft**` to `**Ready**`
   480: 2. **Add Change Log entry:**
```

### .aiox-core/development/tasks/validate-next-story.md:489
```
   487: 
   488: 0. **Pre-check (blocking):**
>> 489:    - If current Status is not `**Draft**`, HALT and log: "Cannot apply NO-GO outcome: expected Draft, found {current status}."
>> 490:    - If Change Log section is missing, HALT and request user to restore template structure.
   491: 1. **Keep** story Status as `**Draft**`
   492: 2. **Add Change Log entry:**
```
*(bloco/entidade: `0. **Pre-check (blocking):**`)*

### .aiox-core/install-manifest.yaml:735
```
   733:     type: core
   734:     size: 23886
>> 735:   - path: core/ids/circuit-breaker.js
   736:     hash: sha256:63be126f2e0d320daa60cb5b68b21df93cad4c19d1f959e06a6ac776213f8eba
   737:     type: core
```

### .aiox-core/product/templates/activation-instructions-inline-greeting.yaml:51
```
   49:   - STEP 4: Display the greeting you generated in STEP 3
   50: 
>> 51:   - STEP 5: HALT and await user input
   52: 
   53: # Important Notes:
```

### .aiox-core/product/templates/activation-instructions-template.md:27
```
   25:            - Formats adaptive greeting automatically
   26:   - STEP 4: Display the greeting returned by GreetingBuilder
>> 27:   - STEP 5: HALT and await user input
   28:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified in greeting_levels and Quick Commands section
   29:   - DO NOT: Load any other agent files during activation
```
*(bloco/entidade: `activation-instructions`)*

### .aiox-core/product/templates/activation-instructions-template.md:36
```
   34:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list
   35:   - STAY IN CHARACTER!
>> 36:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance
   37: ```
   38: 
```

### .aiox-core/product/templates/activation-instructions-template.md:58
```
   56: - STEP 3: Build intelligent greeting using greeting-builder.js
   57: - STEP 4: Display the greeting returned by GreetingBuilder
>> 58: - STEP 5: HALT and await user input
   59: ```
   60: 
```

### .aiox-core/product/templates/personalized-agent-template.md:32
```
   30:   - STAY IN CHARACTER! Use your persona_profile vocabulary and tone consistently
   31:   - Use standardized output templates (see .aiox-core/docs/standards/AGENT-PERSONALIZATION-STANDARD-V1.md)
>> 32:   - CRITICAL: On activation, greet user using greeting_level and HALT to await commands
   33: 
   34: agent:
```
*(bloco/entidade: `activation-instructions`)*

### .aiox-core/product/templates/personalized-checklist-template.md:134
```
   132: ### If Pre-Execution Checks Fail
   133: 
>> 134: **Action:** HALT workflow immediately
   135: 
   136: **Steps:**
```

### squads/squad-creator-pro/agents/oalanicolas.md:64
```
   62: **Only if Step 1.5 detected fresh conversation (no prior context).**
   63: 
>> 64: Display this greeting EXACTLY, then HALT:
   65: 
   66: ```
```

### squads/squad-creator-pro/agents/oalanicolas.md:716
```
   714:         rationale: "Modismos parecem insights. Tempo é o melhor filtro de qualidade."
   715: 
>> 716:     veto:
   717:       - trigger: "Volume sem curadoria"
>> 718:         action: "VETO - Curadoria primeiro"
   719:       - trigger: "Clone sem Framework (só playbook)"
>> 720:         action: "VETO - Adicionar framework antes"
   721:       - trigger: "Fontes majoritariamente bronze"
>> 722:         action: "VETO - Buscar fontes ouro"
   723:       - trigger: "Conceito sem [SOURCE:]"
>> 724:         action: "VETO - Adicionar citação ou marcar [INFERRED]"
   725:       - trigger: "Handoff sem self-validation"
>> 726:         action: "VETO - Passar checklist primeiro"
   727:       - trigger: "Criar framework sem pesquisar existente"
>> 728:         action: "VETO - Perguntar 'Quem já faz isso bem?' antes de criar"
   729:       - trigger: "Não consegue explicar em 1 frase (Feynman fail)"
>> 730:         action: "VETO - Extração incompleta, refazer"
   731:       - trigger: "Insight de fonte única sem triangulação"
>> 732:         action: "VETO - Buscar 2+ fontes independentes antes de formalizar"
   733:       - trigger: "Decisão complexa sem checklist"
>> 734:         action: "VETO - Criar/usar checklist antes de decidir"
   735:       - trigger: "Extração fora do círculo de competência sem validação"
>> 736:         action: "VETO - Marcar [OUTSIDE_CIRCLE] e buscar expert review"
   737: 
   738:     prioritization:
```

### squads/squad-creator-pro/agents/oalanicolas.md:747
```
   745:     pipeline: "Source Discovery → Classification → Pareto ao Cubo → Deconstruction → Extraction → Self-Validation → Handoff"
   746:     weights:
>> 747:       - "Qualidade das fontes → VETO (bloqueante)"
   748:       - "Trindade completa → alto"
   749:       - "Self-validation checklist → bloqueante para handoff"
```
*(bloco/entidade: `weights`)*

### squads/squad-creator-pro/agents/pedro-valerio.md:12
```
   10: - NEVER read all 5 data files at once — load ONLY the one mapped to the current mission
   11: - NEVER skip the greeting — always display it and wait for user input
>> 12: - NEVER approve a process without veto conditions
   13: - NEVER say "talvez funcione", "depende da situação", or "vamos ver como fica"
   14: - NEVER let a card go backwards in a workflow (Nada volta num fluxo. NUNCA.)
```

### squads/squad-creator-pro/agents/pedro-valerio.md:64
```
   62: **Only if Step 1.5 detected fresh conversation (no prior context).**
   63: 
>> 64: Display this greeting EXACTLY, then HALT:
   65: 
   66: ```
```

### squads/squad-creator-pro/agents/pedro-valerio.md:145
```
   143:     description: "Auditar processo/workflow"
   144:     visibility: [full]
>> 145:   - name: "*veto-check"
>> 146:     description: "Verificar veto conditions"
   147:     visibility: [full]
   148:   - name: "*help"
```

### squads/squad-creator-pro/agents/pedro-valerio.md:181
```
   179: | `*find-automation` | — (use core diagnostic framework) | — |
   180: | `*gap-analysis` | — (use core diagnostic framework) | — |
>> 181: | `*veto-check` | — (use core veto conditions) | — |
>> 182: | `*design-veto-conditions` | — (use core veto pattern) | — |
   183: | `*create-doc` | `tasks/create-documentation.md` | — |
   184: | `*help` | — (list all commands) | — |
```

### squads/squad-creator-pro/agents/pedro-valerio.md:203
```
   201: - Citações verificáveis
   202: 
>> 203: **VETO se receber:**
   204: - Conceitos sem `[SOURCE:]`
   205: - Inferências não marcadas
```

### squads/squad-creator-pro/agents/thiago_finch.md:66
```
   64: **Only if Step 1.5 detected fresh conversation (no prior context).**
   65: 
>> 66: Display this greeting EXACTLY, then HALT:
   67: 
   68: ```
```

### squads/squad-creator-pro/agents/thiago_finch.md:199
```
   197: - Citacoes verificaveis
   198: 
>> 199: **VETO se receber:**
   200: - Conceitos sem `[SOURCE:]`
   201: - Inferencias nao marcadas
```

### squads/squad-creator-pro/agents/thiago_finch.md:320
```
   318:     pedro_valerio:
   319:       role: "Process & Automation (the STRUCTURE)"
>> 320:       focus: "Tasks, workflows, veto conditions, fluxo unidirecional"
   321: 
   322:     thiago_finch:
```
*(bloco/entidade: `pedro_valerio`)*

### squads/squad-creator-pro/agents/thiago_finch.md:627
```
   625:         source: "[SOURCE: identity-core.yaml]"
   626: 
>> 627:     veto:
   628:       - trigger: "Decisao sem considerar downside"
>> 629:         action: "VETO - Aplicar Loss Aversion 2.5:1 primeiro"
   630:       - trigger: "Inovar sem modelar excelencia"
>> 631:         action: "VETO - OMIE primeiro (Observar → Modelar → DEPOIS Melhorar)"
   632:       - trigger: "Otimizar produto antes de otimizar funil"
>> 633:         action: "VETO - Funil > Produto sempre"
   634:       - trigger: "Ensinar sem estabelecer autoridade"
>> 635:         action: "VETO - Credenciais primeiro, depois conteudo"
   636:       - trigger: "Comprometer autenticidade por ROI"
>> 637:         action: "VETO - Valores sao constraints nao negociaveis"
   638:       - trigger: "Usar hedging language"
>> 639:         action: "VETO - Certeza absoluta ou nao falar"
   640: 
   641:     prioritization:
```

### squads/squad-creator-pro/assessments/axioma-assessment-wf-create-squad.yaml:139
```
   137: 
   138:         GUARDRAILS:
>> 139:         • Veto Power: TRUE para Verdade (dimension 1), veto_on_failure = false globalmente (REVIEW, não VETO)
   140:         • Pre-conditions: Sistema e user levantados explicitamente (não assumidos)
   141:         • Blocking Checkpoints: 8 de 10 são bloqueantes (CP_PHASE_0, CP_PHASE_1, etc.)
```
*(bloco/entidade: `evidence: |`)*

### squads/squad-creator-pro/assessments/axioma-assessment-wf-create-squad.yaml:162
```
   160:         • WebFetch: Não usa (usa web search + parse implícito em research loop)
   161:         • Frameworks Reuse: 4 frameworks mencionados (tier-system, quality-dimensions, decision-heuristics, executor-matrix)
>> 162:         • Config Lazy Load: heuristics.yaml, veto-conditions.yaml carregadas on-demand (não na startup)
   163:         • Specialist Agents: @oalanicolas + @pedro-valerio - não replicam lógica
   164: 
```
*(bloco/entidade: `evidence: |`)*

### squads/squad-creator-pro/assessments/axioma-assessment-wf-create-squad.yaml:233
```
   231:         MANUTENIBILIDADE:
   232:         • Changelog: Incluído (v2.0 até v2.7, 7 iterações documentadas)
>> 233:         • Config Separation: heuristics.yaml v2.0, veto-conditions.yaml v2.0 são separados
   234:         • Comments: 15+ seções comentadas (PURPOSE, RATIONALE, CRITICAL)
   235:         • Documentation: Referencia 4 frameworks + 10 data files + error_handling
```
*(bloco/entidade: `evidence: |`)*

### squads/squad-creator-pro/assessments/axioma-assessment-wf-create-squad.yaml:323
```
   321:     Avaliação realizada por @pedro-valerio
   322:     Axioma Assessment Framework v1.0
>> 323:     10 dimensões ponderadas, threshold veto em Verdade
   324: 
   325:     CONCLUSÃO: Workflow é PRODUCTION-READY. Recomendações acima são enhancements, não corrections.
```
*(bloco/entidade: `assessor_signature: |`)*

### squads/squad-creator-pro/checklists/mental-model-integration-checklist.md:81
```
   79: | # | Trigger | Action |
   80: |---|---------|--------|
>> 81: | V1 | Modelo mental sem checkpoint em nenhuma task | VETO - criar checkpoint ou remover modelo |
>> 82: | V2 | Checkpoint sem action definida | VETO - definir action concreta |
>> 83: | V3 | Task sem nenhum checkpoint | VETO - mínimo 2 checkpoints por task |
>> 84: | V4 | Checkpoint genérico (serve pra qualquer agent) | VETO - deve ser específico do Alan |
   85: 
   86: ## Totals
```

### squads/squad-creator-pro/checklists/sop-validation.md:112
```
   110: ### 6.2 Guardrails Requirement
   111: 
>> 112: - [ ] VETO applied to any automation without guardrails
   113: - [ ] Guardrails defined for each automated step:
   114:   - [ ] Loop Prevention
```

### squads/squad-creator-pro/config/axioma-validator.yaml:20
```
   18:     overall_threshold: 7.0
   19:     minimum_per_dimension: 6.0
>> 20:     truthfulness_threshold: 7.0  # VETO power
   21:     veto_on_truthfulness_failure: true
   22: 
```
*(bloco/entidade: `scoring`)*

### squads/squad-creator-pro/config/axioma-validator.yaml:34
```
   32:   # ============================================
   33:   dimensions:
>> 34:     # DIMENSION 1: TRUTHFULNESS (VETO POWER)
   35:     D1_truthfulness:
   36:       id: "D1"
```
*(bloco/entidade: `dimensions`)*

### squads/squad-creator-pro/config/axioma-validator.yaml:191
```
   189: 
   190:       red_flags:
>> 191:         - "Zero veto conditions"
   192:         - "Automação sem guardrails"
   193:         - "Sem tratamento de erros"
```
*(bloco/entidade: `red_flags`)*

### squads/squad-creator-pro/config/axioma-validator.yaml:311
```
   309:       - step: 3
   310:         name: "Check Veto Conditions"
>> 311:         action: "Truthfulness < 7.0 = VETO"
   312: 
   313:       - step: 4
```
*(bloco/entidade: `- step: 3`)*

### squads/squad-creator-pro/config/axioma-validator.yaml:320
```
   318:         name: "Determine Status"
   319:         action: |
>> 320:           IF truthfulness < 7.0 → VETO
   321:           ELSE IF overall < 7.0 → REVIEW
   322:           ELSE IF any dimension < 6.0 → REVIEW
```
*(bloco/entidade: `action: |`)*

### squads/squad-creator-pro/config/heuristics.yaml:53
```
   51: 
   52:       ELSE IF (squad_vision_clarity < 0.7)
>> 53:         THEN VETO → Return to Discovery, clarify vision
   54: 
   55:     veto_conditions:
   56:       - condition: "squad_vision_clarity < 0.7"
>> 57:         action: "VETO - Vision unclear"
   58:         recovery: "Define clear squad purpose and scope"
   59:         maps_to: "SC_VC_002"
```
*(bloco/entidade: `ELSE IF (squad_vision_clarity < 0.7)`)*

### squads/squad-creator-pro/config/heuristics.yaml:69
```
   67:     output:
   68:       type: "decision"
>> 69:       values: ["APPROVE", "REVIEW", "VETO"]
   70: 
   71:     integration:
```
*(bloco/entidade: `output`)*

### squads/squad-creator-pro/config/heuristics.yaml:86
```
   84:     description: |
   85:       Coherence validation for agent DNA and behavior.
>> 86:       Truthfulness (authenticity to source) has VETO power.
   87: 
   88:     weights:
>> 89:       dna_authenticity: 1.0     # VETO power
   90:       voice_coherence: 0.9
   91:       thinking_coherence: 0.8
```
*(bloco/entidade: `description: |`)*

### squads/squad-creator-pro/config/heuristics.yaml:103
```
   101:       PRIMARY BRANCH:
   102:         IF (dna_authenticity < 0.7 OR fabricated_content_detected)
>> 103:           THEN VETO → Agent is not authentic to source
   104: 
   105:       SECONDARY BRANCH:
```
*(bloco/entidade: `IF (dna_authenticity < 0.7 OR fabricated_content_detected)`)*

### squads/squad-creator-pro/config/heuristics.yaml:119
```
   117:     veto_conditions:
   118:       - condition: "dna_authenticity < 0.7"
>> 119:         action: "VETO - Agent not authentic"
   120:         recovery: "Return to DNA extraction with more sources"
   121:         maps_to: "SC_VC_005"
   122: 
   123:       - condition: "fabricated_content_detected = true"
>> 124:         action: "VETO - Fabricated content found"
   125:         recovery: "Remove fabricated content, verify all claims"
   126:         maps_to: "SC_VC_003"
```
*(bloco/entidade: `- condition: "dna_authenticity < 0.7"`)*

### squads/squad-creator-pro/config/model-routing.yaml:598
```
   596:       - "GLM-5 QUALIFIED for create-agent (98% quality, 99.1% savings)"
   597:       - "Output: 718 lines with ALL sections complete"
>> 598:       - "Key wins: 6 heuristics, 4 objection algorithms, SCOPE with veto conditions"
   599:       - "$0.02 vs ~$2.50 Opus"
   600:       - "5 tasks now qualified: extract-voice-dna, extract-knowledge, extract-thinking-dna, deep-research-pre-agent, create-agent"
```
*(bloco/entidade: `changes`)*

### squads/squad-creator-pro/config/quality-gates.yaml:76
```
   74: 
   75:       pass_action: "Proceed to Architecture"
>> 76:       fail_action: "VETO - Domain not viable"
   77: 
   78:       validation_questions:
```

### squads/squad-creator-pro/config/quality-gates.yaml:106
```
   104:       heuristic_reference: "SC_HE_001"
   105:       pass_action: "Proceed to DNA Extraction"
>> 106:       fail_action: "VETO - Return to Discovery"
   107: 
   108:       validation_questions:
```

### squads/squad-creator-pro/config/quality-gates.yaml:135
```
   133: 
   134:       pass_action: "Proceed to DNA Completeness"
>> 135:       fail_action: "VETO - Insufficient sources"
   136: 
   137:       auto_checks:
```

### squads/squad-creator-pro/config/quality-gates.yaml:176
```
   174: 
   175:       pass_action: "Proceed to Agent Creation"
>> 176:       fail_action: "VETO - DNA incomplete"
   177: 
   178:     # PHASE 4: AGENT CREATION
```

### squads/squad-creator-pro/config/quality-gates.yaml:200
```
   198:       heuristic_reference: "SC_HE_002"
   199:       pass_action: "Proceed to Smoke Tests"
>> 200:       fail_action: "VETO - Agent incoherent"
   201: 
   202:       coherence_tests:
```

### squads/squad-creator-pro/config/task-anatomy.yaml:197
```
   195:     fail:
   196:       condition: "Any required field missing or invalid"
>> 197:       action: "VETO - Task anatomy incomplete"
   198:       recovery: "Fix missing/invalid fields before proceeding"
   199: 
```
*(bloco/entidade: `fail`)*

### squads/squad-creator-pro/config/veto-conditions.yaml:1
```
>> 1: # VETO CONDITIONS ENGINE - Squad-Creator
   2: # Source patterns: HO-VC-001, HO-VC-002, HO-VC-003 + AN_VC_001-005
   3: # Version: 2.0
```

### squads/squad-creator-pro/config/veto-conditions.yaml:16
```
   14:     APPROVE: "Proceed to next phase"
   15:     REVIEW: "Address concerns before proceeding"
>> 16:     VETO: "BLOCKED - Cannot proceed until resolved"
   17: 
   18:   conditions:
```
*(bloco/entidade: `outcomes`)*

### squads/squad-creator-pro/config/veto-conditions.yaml:26
```
   24:       phase: "discovery"
   25:       trigger: "elite_minds_count < 3 OR source_quality < 0.6"
>> 26:       action: "VETO - Domain not viable for squad creation"
   27:       severity: "BLOCKING"
   28:       source_pattern: "HO-VC-001"
```
*(bloco/entidade: `SC_VC_001`)*

### squads/squad-creator-pro/config/veto-conditions.yaml:41
```
   39:       phase: "architecture"
   40:       trigger: "squad_vision_clarity < 0.7"
>> 41:       action: "VETO - Vision unclear, return to Discovery"
   42:       severity: "BLOCKING"
   43:       source_pattern: "HO-VC-001"
```
*(bloco/entidade: `SC_VC_002`)*

### squads/squad-creator-pro/config/veto-conditions.yaml:56
```
   54:       phase: "dna_extraction"
   55:       trigger: "verified_quotes < 15 OR signature_phrases < 5"
>> 56:       action: "VETO - Insufficient source material"
   57:       severity: "BLOCKING"
   58:       validation_questions:
```
*(bloco/entidade: `SC_VC_003`)*

### squads/squad-creator-pro/data/an-source-signals.yaml:20
```
   18:       indicates: "Heurística pessoal validada"
   19:     - pattern: "I never..."
>> 20:       indicates: "Anti-pattern pessoal - veto condition"
   21:     - pattern: "My rule is..."
   22:       indicates: "Framework pessoal explícito"
```
*(bloco/entidade: `- pattern: "I never..."`)*

### squads/squad-creator-pro/data/an-source-tiers.yaml:79
```
   77: weights:
   78:   - criterion: "Qualidade das fontes"
>> 79:     weight: "VETO - bloqueante"
   80:     note: "Se fontes sao lixo, para tudo"
   81: 
```
*(bloco/entidade: `- criterion: "Qualidade das fontes"`)*

### squads/squad-creator-pro/data/core-heuristics.md:51
```
   49:     veto_conditions:
   50:       - condition: "vision_clarity < 0.7"
>> 51:         action: "VETO - Vision unclear, requires clarification"
   52: 
   53:   output:
   54:     type: "decision"
>> 55:     values: ["PRIORITIZE", "CONSIDER", "DEFER", "VETO"]
   56: ```
   57: 
```
*(bloco/entidade: `- condition: "vision_clarity < 0.7"`)*

### squads/squad-creator-pro/data/core-heuristics.md:66
```
   64: [1] Avaliar Vision Clarity
   65:     |
>> 66:     +-- vision_clarity < 0.7? --> VETO (parar, clarificar visao)
   67:     |
   68:     v
```
*(bloco/entidade: `[1] Avaliar Vision Clarity`)*

### squads/squad-creator-pro/data/core-heuristics.md:91
```
   89: | Criterio | Peso | Threshold | Descricao |
   90: |----------|------|-----------|-----------|
>> 91: | End State Vision | 0.9 | 0.7 (veto) | Quao claramente a task contribui para o objetivo final |
   92: | Market Signals | 0.1 | N/A | Urgencia baseada em sinais externos (competidores, mercado) |
>> 93: | Vision Clarity | N/A | 0.7 (veto) | Clareza da visao do projeto/squad |
   94: 
   95: **Scoring Guide:**
```

### squads/squad-creator-pro/data/core-heuristics.md:108
```
   106: | Modo de Falha | Trigger | Deteccao | Recuperacao | Prevencao |
   107: |---------------|---------|----------|-------------|-----------|
>> 108: | Vision Drift | Execucao sem clareza de visao | Tasks desconectadas do objetivo | Parar, re-alinhar com stakeholder | Aplicar veto condition sempre |
   109: | Market Over-reaction | Priorizar sinais sobre visao | Mudanca frequente de direcao | Reduzir peso de market_signals | Manter end_state_vision em 0.9 |
   110: | False Urgency | Score inflado artificialmente | Tasks "urgentes" sem impacto | Revisar historico de priorizacao | Validar score com segundo avaliador |
```

### squads/squad-creator-pro/data/core-heuristics.md:143
```
   141:     vision_clarity: 0.5     # Visao do projeto confusa
   142: 
>> 143:   decision: "VETO"
   144:   rationale: "vision_clarity (0.5) < 0.7. Parar e clarificar visao do projeto antes de prosseguir."
   145: ```
```
*(bloco/entidade: `evaluation`)*

### squads/squad-creator-pro/data/extraction-mentoria-processos-dec19.yaml:204
```
   202:       source: "[SOURCE: @2:12:00-2:16:00]"
   203: 
>> 204:   veto:
   205:     - condition: "SE automatizando processo que nao foi desenhado manualmente primeiro"
   206:       action: "NUNCA automatizar sem entender o processo"
```

### squads/squad-creator-pro/data/hybridops-patterns.md:96
```
   94: ## ÍNDICE DE PATTERNS
   95: 
>> 96: 1. [Veto Conditions Patterns](#veto-conditions-patterns)
   97: 2. [Task Anatomy Patterns (8 Campos)](#task-anatomy-patterns-8-campos)
   98: 3. [Heuristics Patterns (PV_BS_001, PV_PA_001, PV_PM_001)](#heuristics-patterns)
```

### squads/squad-creator-pro/data/hybridops-patterns.md:106
```
   104: ---
   105: 
>> 106: ## VETO CONDITIONS PATTERNS
   107: 
   108: ### HO-VC-001: Veto Condição - Visão Estratégica Incompleta
```

### squads/squad-creator-pro/data/hybridops-patterns.md:119
```
   117: veto_trigger:
   118:   condition: "end_state_vision_clarity < 0.7"
>> 119:   action: "VETO - Vision unclear, return to Discovery"
   120:   severity: "BLOCKING"
   121:   recovery: "Clarify end-state vision before proceeding"
```
*(bloco/entidade: `veto_trigger`)*

### squads/squad-creator-pro/data/hybridops-patterns.md:142
```
   140: - APPROVE: Proceed to Architecture
   141: - REVIEW: Clarify vision with team
>> 142: - VETO: Return to Discovery phase
   143: 
   144: ---
```

### squads/squad-creator-pro/data/hybridops-patterns.md:157
```
   155: veto_conditions:
   156:   - condition: "truthfulness_coherence < 0.7"
>> 157:     action: "VETO - REJECT/REMOVE immediately"
   158:     severity: "CRITICAL"
   159:   - condition: "detected_incoherence = true"
>> 160:     action: "VETO - Trust breach, cannot proceed"
   161:     severity: "CRITICAL"
   162: ```
```
*(bloco/entidade: `- condition: "truthfulness_coherence < 0.7"`)*

### squads/squad-creator-pro/data/mental-model-task-matrix.yaml:75
```
   73:         step: "Gate"
   74:         step_name: "FRAMEWORK_HANDOFF_READY"
>> 75:         checkpoint_type: "veto"
   76:         question: "Insumos como um TODO trazem clareza ou confusão?"
   77:         action_if_pass: "HANDOFF para PV"
```
*(bloco/entidade: `- task: "validate-extraction"`)*

### squads/squad-creator-pro/data/mental-model-task-matrix.yaml:119
```
   117:         step: 1
   118:         step_name: "Fidelity Score"
>> 119:         checkpoint_type: "veto"
   120:         question: "Clone soa como a PESSOA ou como IA genérica?"
   121:         action_if_pass: "Prosseguir avaliação"
>> 122:         action_if_fail: "VETO - buscar mais fontes ouro antes de continuar"
   123:         rationale: "Clone genérico = falha de autenticidade na raiz."
   124: 
```
*(bloco/entidade: `- task: "an-validate-clone"`)*

### squads/squad-creator-pro/data/mental-model-task-matrix.yaml:318
```
   316:         question: "4 testes aplicados em sequência? (Impacto → Singularidade → Valor → Genialidade)"
   317:         action_if_pass: "Classificação válida"
>> 318:         action_if_fail: "VETO - task É o Pareto ao Cubo, não pode pular o framework"
   319:         rationale: "Esta task É a implementação do modelo. Sem framework = sem task."
   320: 
```
*(bloco/entidade: `- task: "find-0.8"`)*

### squads/squad-creator-pro/data/mental-model-task-matrix.yaml:333
```
   331:         step: "Item 7"
   332:         step_name: "Pareto ao Cubo Aplicado"
>> 333:         checkpoint_type: "veto"
   334:         question: "0.8% do expert está identificado e documentado?"
   335:         action_if_pass: "Handoff pode prosseguir"
>> 336:         action_if_fail: "VETO - executar find-0.8 antes de handoff"
   337:         rationale: "Sem identificar genialidade = clone mediano."
   338: 
```
*(bloco/entidade: `- task: "validate-extraction"`)*

### squads/squad-creator-pro/data/mental-model-task-matrix.yaml:669
```
   667: 
   668: # ==========================================
>> 669: # VETO CONDITIONS (da matriz)
   670: # ==========================================
   671: 
```

### squads/squad-creator-pro/data/pm-best-practices.md:353
```
   351: prd_trigger:
   352:   condition: "workflows_mapped >= 10 OR agents_needed >= 8"
>> 353:   action: "VETO direct creation, require PRD"
   354: 
   355:   workflow:
```
*(bloco/entidade: `prd_trigger`)*

### squads/squad-creator-pro/data/pv-meta-axiomas.yaml:12
```
   10:   overall_threshold: 7.0
   11:   minimum_per_dimension: 6.0
>> 12:   veto_on_failure: false  # Default REVIEW, não VETO
   13: 
   14: dimensions:
```
*(bloco/entidade: `scoring`)*

### squads/squad-creator-pro/data/pv-output-examples.yaml:12
```
   10:       Deixa eu ver aqui... tá, primeira coisa:
   11: 
>> 12:       **Onde estão as veto conditions?**
   13: 
   14:       Eu vejo checkpoints, mas não vejo o que IMPEDE de passar se não estiver certo.
```
*(bloco/entidade: `output: |`)*

### squads/squad-creator-pro/data/pv-output-examples.yaml:24
```
   22:       veto_conditions:
   23:         - condition: "sources.count < 5"
>> 24:           action: "VETO - Return to research"
   25:         - condition: "voice_dna.vocabulary.always_use.count < 8"
>> 26:           action: "VETO - Cannot proceed to next phase"
   27:       ```
   28: 
```
*(bloco/entidade: `- condition: "sources.count < 5"`)*

### squads/squad-creator-pro/data/pv-output-examples.yaml:60
```
   58:       ```
   59: 
>> 60:       2. Se match >= 60%, VETO no CREATE:
   61:       ```yaml
   62:       veto_conditions:
   63:         - condition: "registry_match >= 0.6 AND decision == 'CREATE'"
>> 64:           action: "VETO - Must ADAPT existing task, not CREATE"
   65:           message: "Similar task found: {matched_task}. Adapte, não crie."
   66:       ```
```

### squads/squad-creator-pro/data/pv-output-examples.yaml:219
```
   217:       Quer que eu detalhe algum ponto específico?
   218: 
>> 219:   - input: "Preciso criar veto conditions pra esse epic"
   220:     output: |
>> 221:       Boa, veto conditions são o coração do processo absolutista.
   222: 
>> 223:       **Estrutura de uma veto condition:**
   224: 
   225:       ```yaml
```

### squads/squad-creator-pro/data/pv-output-examples.yaml:230
```
   228:           condition: "Descrição clara do que está errado"
   229:           check: "Comando ou verificação que detecta"
>> 230:           action: "VETO - O que fazer"
   231:       ```
   232: 
```
*(bloco/entidade: `- id: V{story}.{number}  # Ex: V1.1, V2.3`)*

### squads/squad-creator-pro/data/pv-workflow-validation.yaml:205
```
   203:       echo "✅ Check 1: File exists"
   204:     else
>> 205:       echo "❌ VETO: File not found"
   206:       ERRORS=$((ERRORS+1))
   207:     fi
```
*(bloco/entidade: `else`)*

### squads/squad-creator-pro/data/pv-workflow-validation.yaml:213
```
   211:       echo "✅ Check 2: Section present"
   212:     else
>> 213:       echo "❌ VETO: Section missing"
   214:       ERRORS=$((ERRORS+1))
   215:     fi
```
*(bloco/entidade: `else`)*

### squads/squad-creator-pro/data/pv-workflow-validation.yaml:225
```
   223:       exit 1
   224:     fi
>> 225:   principle: "Script exit 0 = aprovado. Exit non-zero = VETO."
   226: 
   227: # ═══════════════════════════════════════════════════════════════════════════════
```

### squads/squad-creator-pro/data/pv-workflow-validation.yaml:252
```
   250:         - "Feedback loop acionado"
   251:         - "Max retries respeitado"
>> 252:         - "HALT com mensagem clara"
   253: 
   254: # ═══════════════════════════════════════════════════════════════════════════════
```
*(bloco/entidade: `verification`)*

### squads/squad-creator-pro/data/tool-evaluation-framework.md:30
```
   28: 2. **Contexto de Domínio** - Ferramentas de nicho competem com ferramentas de nicho
   29: 3. **Segurança é Factual** - CVE crítica é CVE crítica (único absoluto aceitável)
>> 30: 4. **Nenhum VETO Prematuro** - Projetos pequenos podem ser a melhor opção
   31: 5. **Dados > Heurísticas** - Normalizar dentro do dataset encontrado
   32: 
```

### squads/squad-creator-pro/data/tool-evaluation-framework.md:190
```
   188:         condition: "CVE crítica conhecida sem patch"
   189:         action: "FLAG - requer atenção humana"
>> 190:         note: "NÃO é VETO automático, mas destaque importante"
   191: 
   192:     - malware_history:
```
*(bloco/entidade: `- critical_cve_unpatched:`)*

### squads/squad-creator-pro/data/tool-evaluation-framework.md:663
```
   661: ```yaml
   662: no_automatic_vetos: |
>> 663:   Em vez de VETO automático, usamos FLAGS que requerem atenção humana.
   664: 
   665:   Razão: Um projeto com "problema" pode ainda ser a melhor opção
```
*(bloco/entidade: `no_automatic_vetos: |`)*

### squads/squad-creator-pro/minds/oalanicolas/artifacts/HANDOFF_PROTOCOL.md:231
```
   229: | trinity incomplete | AN_VC_002 | LOOP - complete component |
   230: | unvalidated inferences | AN_VC_004 | LOOP - validate or remove |
>> 231: | handoff without checklist | AN_VC_005 | HARD VETO |
   232: 
   233: ---
```

### squads/squad-creator-pro/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md:99
```
   97: 
   98: maximum_ratio: "40% bronze no total"
>> 99: veto_trigger: "> 50% bronze = VETO"
   100: ```
   101: 
```

### squads/squad-creator-pro/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md:157
```
   155:     green: ">= 0.7"   # Proceed confidently
   156:     yellow: "0.6-0.7" # Proceed with caution
>> 157:     red: "< 0.6"      # VETO - curate more
   158: 
   159:   action_on_red:
```
*(bloco/entidade: `thresholds`)*

### squads/squad-creator-pro/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md:200
```
   198: | Condition | Action | Recovery |
   199: |-----------|--------|----------|
>> 200: | ouro_ratio < 0.6 | VETO | Curate more ouro sources |
>> 201: | zero ouro sources | HARD VETO | Cannot proceed |
>> 202: | > 50% tier 2b | VETO | Eliminate low quality |
>> 203: | any tier 3 in final set | VETO | Remove immediately |
   204: 
   205: ---
```

### squads/squad-creator-pro/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md:236
```
   234: ```yaml
   235: project: "Generic Business Clone"
>> 236: status: "VETO"
   237: 
   238: sources:
```

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_001.md:54
```
   52:   veto_conditions:
   53:     - condition: "citations < 15"
>> 54:       action: "VETO - Insufficient citations"
   55:       maps_to: "AN_VC_004"
   56:     - condition: "ouro_ratio < 0.6"
>> 57:       action: "VETO - Too much bronze"
   58:       maps_to: "AN_VC_003"
   59:     - condition: "trinity_incomplete"
>> 60:       action: "VETO - Missing Playbook, Framework, or Swipe"
   61:       maps_to: "AN_VC_002"
   62: 
   63:   output:
   64:     type: "decision"
>> 65:     values: ["APPROVE", "REVIEW", "VETO"]
   66:     handoff_to: "@pedro-valerio"
   67:     handoff_format: "INSUMOS_READY"
```
*(bloco/entidade: `- condition: "citations < 15"`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_001.md:80
```
   78: 
   79: ELSE IF (source_quality < 0.6)
>> 80:   THEN VETO → Return to source curation
   81: 
   82: TERMINATION: Handoff approved with INSUMOS_READY format
```
*(bloco/entidade: `ELSE IF (source_quality < 0.6)`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_001.md:150
```
   148:   veto_conditions:
   149:     - condition: "self_validation_failed"
>> 150:       action: "HALT - Loop back to weakest step"
   151: 
   152:   validation_questions:
```
*(bloco/entidade: `- condition: "self_validation_failed"`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_002.md:73
```
   71:   veto_conditions:
   72:     - condition: "any_component_missing"
>> 73:       action: "VETO - Complete trinity before handoff"
   74:       maps_to: "AN_VC_002"
   75:     - condition: "playbook_only"
>> 76:       action: "VETO - Adicionar framework antes"
   77:     - condition: "framework_without_examples"
   78:       action: "REVIEW - Buscar swipe file"
```
*(bloco/entidade: `- condition: "any_component_missing"`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_002.md:95
```
   93: 
   94: ELSE IF (has_playbook AND NOT has_framework)
>> 95:   THEN VETO → Extract decision rules first
   96: 
   97: ELSE IF (NOT has_playbook)
>> 98:   THEN VETO → Start with step-by-step extraction
   99: 
   100: TERMINATION: All three components documented with [SOURCE:]
```
*(bloco/entidade: `ELSE IF (has_playbook AND NOT has_framework)`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_002.md:167
```
   165:   framework_check:
   166:     - "Tem regras SE/ENTÃO?"
>> 167:     - "Tem veto conditions?"
   168:     - "Decision tree está documentado?"
   169: 
```
*(bloco/entidade: `framework_check`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_003.md:101
```
   99:       action: "REVIEW - Apply Pareto ao Cubo before proceeding"
   100:     - condition: "zone_80_prioritized"
>> 101:       action: "VETO - Eliminar antes de continuar"
   102: 
   103:   output:
```
*(bloco/entidade: `- condition: "zone_80_prioritized"`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_004.md:61
```
   59:   veto_conditions:
   60:     - condition: "proposal_without_discovery"
>> 61:       action: "VETO - Map existing first"
   62:       maps_to: "AN_VC_006"
   63:     - condition: "create_when_similar_exists"
>> 64:       action: "VETO - Extend existing instead"
   65:       maps_to: "AN_VC_006"
   66: 
```
*(bloco/entidade: `- condition: "proposal_without_discovery"`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_005.md:75
```
   73:   veto_conditions:
   74:     - condition: "llm_when_code_suffices"
>> 75:       action: "VETO - Use deterministic solution"
   76:       maps_to: "AN_VC_007"
   77: 
```
*(bloco/entidade: `- condition: "llm_when_code_suffices"`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_006.md:78
```
   76:   veto_conditions:
   77:     - condition: "debug_without_verification"
>> 78:       action: "VETO - Verify physically first"
   79:       maps_to: "AN_VC_007"
   80:     - condition: "assume_without_checking"
>> 81:       action: "VETO - Check, don't assume"
   82:       maps_to: "AN_VC_007"
   83: ```
```
*(bloco/entidade: `- condition: "debug_without_verification"`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_007.md:76
```
   74:   veto_conditions:
   75:     - condition: "create_without_search"
>> 76:       action: "VETO - Search first"
   77:       maps_to: "AN_VC_006"
   78:     - condition: "create_when_80_percent_exists"
>> 79:       action: "VETO - Use existing"
   80:       maps_to: "AN_VC_006"
   81: 
```
*(bloco/entidade: `- condition: "create_without_search"`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_008.md:70
```
   68:   veto_conditions:
   69:     - condition: "ignore_repeated_correction"
>> 70:       action: "VETO - Document as rule now"
   71:       maps_to: "AN_VC_008"
   72: ```
```
*(bloco/entidade: `- condition: "ignore_repeated_correction"`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_008.md:82
```
   80: | IF/THEN | "When Z, do W" (2x) | IF Z → THEN W |
   81: | PRIORITY | "A before B" (2x) | PRIORITY: A > B |
>> 82: | VETO | "Stop if X" (2x) | VETO: X → STOP |
   83: 
   84: ## Decision Tree
```

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_008.md:103
```
   101:    - Clear trigger
   102:    - Specific action
>> 103:    - Category (NEVER/ALWAYS/IF-THEN/PRIORITY/VETO)
   104: ```
   105: 
```
*(bloco/entidade: `3. Rule documentation format:`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_008.md:118
```
   116: 
   117:   rule_format:
>> 118:     category: "NEVER | ALWAYS | IF-THEN | PRIORITY | VETO"
   119:     trigger: "When this happens..."
   120:     action: "Do this..."
```
*(bloco/entidade: `rule_format`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_009.md:106
```
   104:   veto_conditions:
   105:     - condition: "skip_verify"
>> 106:       action: "VETO - Verify first"
   107:     - condition: "skip_reuse_check"
>> 108:       action: "VETO - Check existing first"
   109:     - condition: "skip_validation"
>> 110:       action: "VETO - Test before delivering"
   111: ```
   112: 
```
*(bloco/entidade: `- condition: "skip_verify"`)*

### squads/squad-creator-pro/minds/oalanicolas/heuristics/AN_KE_010.md:222
```
   220:   veto_conditions:
   221:     - condition: "anti_patterns_detected > 0"
>> 222:       action: "HALT - Expand implicit references"
   223:     - condition: "checklist_pass_rate < 0.6"
>> 224:       action: "HALT - Major rewrite needed"
   225: 
   226:   pass_action: "Document approved for handoff/storage"
```
*(bloco/entidade: `- condition: "anti_patterns_detected > 0"`)*

### squads/squad-creator-pro/minds/pedro_valerio/artifacts/META_AXIOMAS.md:25
```
   23:     overall_threshold: 7.0
   24:     minimum_per_dimension: 6.0
>> 25:     veto_on_failure: false  # Default to REVIEW, not VETO
   26: 
   27:   dimensions:
```
*(bloco/entidade: `scoring`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_BS_001.md:31
```
   29:   veto_conditions:
   30:     - condition: "end_state_vision_clarity < 0.7"
>> 31:       action: "VETO - Vision unclear, return to Discovery"
   32:     - condition: "strategic_priority_score < 0.5"
   33:       action: "REVIEW - Alignment questionable"
```
*(bloco/entidade: `- condition: "end_state_vision_clarity < 0.7"`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_BS_001.md:42
```
   40:   output:
   41:     type: "decision"
>> 42:     values: ["APPROVE", "REVIEW", "VETO"]
   43: ```
   44: 
```
*(bloco/entidade: `output`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_BS_001.md:49
```
   47: **Input:** Architecture design proposal, process blueprint, system design
   48: **Process:** Evaluate against end-state vision using weighted criteria
>> 49: **Output:** APPROVE | REVIEW | VETO
   50: 
   51: ## Decision Tree
```

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_BS_001.md:130
```
   128:   veto_conditions:
   129:     - condition: "end_state_vision_clarity < 0.7"
>> 130:       action: "HALT - Vision unclear, return to Discovery"
   131: 
   132:   validation_questions:
```
*(bloco/entidade: `- condition: "end_state_vision_clarity < 0.7"`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PA_001.md:10
```
   8: ## Purpose
   9: 
>> 10: Coherence validation for executor assignments and people assessment. Evaluates truthfulness, system adherence potential, and technical skills with truthfulness having VETO power.
   11: 
   12: ## Configuration
```

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PA_001.md:21
```
   19: 
   20:   weights:
>> 21:     truthfulness_coherence: 1.0  # VETO power
   22:     system_adherence_potential: 0.8
   23:     technical_skill: 0.3
```
*(bloco/entidade: `weights`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PA_001.md:32
```
   30:   veto_conditions:
   31:     - condition: "truthfulness_coherence < 0.7"
>> 32:       action: "VETO - REJECT/REMOVE immediately"
   33:     - condition: "detected_incoherence = true"
>> 34:       action: "VETO - Trust violation, cannot proceed"
   35: 
   36:   fallback_mechanisms:
```
*(bloco/entidade: `- condition: "truthfulness_coherence < 0.7"`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PA_001.md:42
```
   40:   output:
   41:     type: "decision"
>> 42:     values: ["APPROVE", "REVIEW", "VETO"]
   43: ```
   44: 
```
*(bloco/entidade: `output`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PA_001.md:49
```
   47: **Input:** Executor assignment proposals, role definitions, team roster
   48: **Process:** Evaluate each executor against coherence criteria
>> 49: **Output:** APPROVE | REVIEW | VETO
   50: 
   51: ## Decision Tree
```

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PM_001.md:24
```
   22:     task_automatability: 0.8
   23:     task_frequency: 0.7
>> 24:     guardrails_present: 1.0  # VETO power
   25: 
   26:   thresholds:
```
*(bloco/entidade: `weights`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PM_001.md:34
```
   32:   veto_conditions:
   33:     - condition: "guardrails_missing = true"
>> 34:       action: "VETO - Define safety guardrails first"
   35:     - condition: "frequency < 1x per month AND impact < 0.5"
>> 36:       action: "VETO - Not worth automating"
   37: 
   38:   output:
```
*(bloco/entidade: `- condition: "guardrails_missing = true"`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PM_001.md:166
```
   164:   veto_conditions:
   165:     - condition: "guardrails_missing"
>> 166:       action: "VETO - Define safety guardrails first"
   167: 
   168:   validation_questions:
```
*(bloco/entidade: `- condition: "guardrails_missing"`)*

### squads/squad-creator-pro/minds/pedro_valerio/heuristics/PV_PM_001.md:186
```
   184: | Low (<2x/month) | High | Any | **KEEP_MANUAL** (judgment needed) |
   185: | Low | Low | Any | **ELIMINATE** |
>> 186: | Any | Any | Any (no guardrails) | **VETO** - add guardrails first |
   187: 
   188: ---
```

### squads/squad-creator-pro/scripts/clone-review.sh:348
```
   346: 
   347: # Checkpoint 5: Has immune system
>> 348: if grep -qiE "(veto:|never:|objection:|reject:)" "$CLONE_FILE"; then
   349:     QF_SCORE=$((QF_SCORE + 1))
   350:     QF_PASSED+=("5")
```

### squads/squad-creator-pro/scripts/coherence-validator.py:15
```
   13: Source configs:
   14: - config/heuristics.yaml (SC_HE_001-003 + AN_HE_001-003)
>> 15: - config/veto-conditions.yaml (SC_VC_001-010 + AN_VC_001-005)
   16: - config/axioma-validator.yaml (D1-D10)
   17: - config/quality-gates.yaml (QG-SC-*)
```

### squads/squad-creator-pro/scripts/coherence-validator.py:50
```
   48: 
   49: COHERENCE_RULES = {
>> 50:     # Each heuristic MUST have at least one veto condition
   51:     "heuristic_veto_coverage": {
   52:         "min_veto_per_heuristic": 1,
```
*(bloco/entidade: `COHERENCE_RULES = {`)*

### squads/squad-creator-pro/scripts/coherence-validator.py:143
```
   141: ) -> Dict[str, Any]:
   142:     """
>> 143:     Validate that each heuristic has at least one veto condition.
   144:     Rule: heuristic_veto_coverage
   145: 
   146:     Structure expected:
   147:     - heuristics.yaml: heuristics_engine.SC_HE_001-003 + AN_HE_001-003
   148:     - Each heuristic has veto_conditions[].maps_to pointing to SC_VC_* or AN_VC_*
>> 149:     - veto-conditions.yaml: veto_engine.conditions.SC_VC_001-010 + AN_VC_001-005
   150: 
   151:     Agents:
```
*(bloco/entidade: `) -> Dict[str, Any]:`)*

### squads/squad-creator-pro/scripts/coherence-validator.py:166
```
   164:         result["checks"].append({
   165:             "status": "skip",
>> 166:             "message": "Missing heuristics.yaml or veto-conditions.yaml"
   167:         })
   168:         return result
```
*(bloco/entidade: `result["checks"].append({`)*

### squads/squad-creator-pro/scripts/coherence-validator.py:185
```
   183:                 veto_conds = value.get("veto_conditions", [])
   184:                 if isinstance(veto_conds, list) and len(veto_conds) > 0:
>> 185:                     # Check if any veto condition has maps_to
   186:                     for vc in veto_conds:
   187:                         if isinstance(vc, dict) and vc.get("maps_to"):
```
*(bloco/entidade: `if isinstance(veto_conds, list) and len(veto_conds) > 0:`)*

### squads/squad-creator-pro/scripts/tests/test_clone_review.sh:125
```
   123: ## Immune System
   124: 
>> 125: veto: Never skip validation
   126: never: Compromise quality
   127: objection: Handle with data
```

### squads/squad-creator-pro/scripts/tests/test_coherence_validator.py:78
```
   76: 
   77:     def test_extract_veto_ids(self):
>> 78:         """Should extract veto condition IDs"""
   79:         data = {
   80:             'veto_conditions': [
```
*(bloco/entidade: `def test_extract_veto_ids(self):`)*

### squads/squad-creator-pro/skills/squad.md:49
```
   47:     description: |
   48:       Process absolutist. Invoke for workflow validation and audit.
>> 49:       Ensures zero wrong paths possible. Validates veto conditions,
   50:       unidirectional flow, and checkpoint coverage.
   51:     model: opus
```
*(bloco/entidade: `description: |`)*

### squads/squad-creator-pro/tasks/an-assess-sources.md:27
```
   25: IF the command succeeds → READ /tmp/preflight-assess-sources.yaml. Use as baseline scores.
   26: 
>> 27: VETO: If sources are already downloaded as files, do NOT grep checkpoints yourself.
   28:       The script scores all 25 checkpoints per source in <1s each.
   29: 
```

### squads/squad-creator-pro/tasks/an-assess-sources.md:425
```
   423:   question: "Reclassificação é baseada em EVIDÊNCIA das lentes ou em OPINIÃO pós-hoc?"
   424:   if_evidencia: "Reclassificar e documentar no source map"
>> 425:   if_opiniao: "VETO — manter tier original. Opinião não sobrescreve mecânica."
   426:   rationale: "O feedback loop existe para incorporar DADOS NOVOS, não para reinterpretar dados antigos."
   427: ```
```
*(bloco/entidade: `checkpoint_feedback_loop`)*

### squads/squad-creator-pro/tasks/an-clone-review.md:68
```
   66: IF the command succeeds → READ /tmp/preflight-clone-review.yaml. Use ONLY these numbers.
   67: 
>> 68: VETO: If /tmp/preflight-clone-review.yaml does not exist → BLOCK.
   69:       Do NOT count sources manually. Do NOT grep for checkpoints yourself.
   70:       The script does this faster, cheaper, and 100% consistently.
```

### squads/squad-creator-pro/tasks/an-clone-review.md:226
```
   224: | 3 | Thinking DNA exists | `thinking_dna:` section | Seção existe |
   225: | 4 | Has frameworks | `frameworks:` ou `mental_models:` | 2+ frameworks |
>> 226: | 5 | Has immune system | `veto:` ou `never:` ou `objection:` | Seção de proteção existe |
   227: 
   228: **Quick Fidelity Score = count(passed) / 5 × 100**
```

### squads/squad-creator-pro/tasks/an-compare-outputs.md:63
```
   61: 
   62:   veto_condition: |
>> 63:     IF match_rate < 0.75 → VETO (different tier = different user action)
   64:     Rationale: User decides based on tier, not score details
   65: ```
```
*(bloco/entidade: `veto_condition: |`)*

### squads/squad-creator-pro/tasks/an-compare-outputs.md:104
```
   102:   veto_condition: |
   103:     IF max_variance > 15% → REVIEW (significant scoring difference)
>> 104:     IF max_variance > 25% → VETO (unreliable scoring)
   105: ```
   106: 
```
*(bloco/entidade: `veto_condition: |`)*

### squads/squad-creator-pro/tasks/an-compare-outputs.md:171
```
   169: qualification_decision:
   170:   thresholds:
>> 171:     QUALIFIED: ">= 85 points AND no veto triggered"
>> 172:     CONDITIONAL: "70-84 points OR veto with mitigation possible"
>> 173:     NOT_QUALIFIED: "< 70 points OR hard veto"
   174: 
   175:   veto_conditions:
```
*(bloco/entidade: `thresholds`)*

### squads/squad-creator-pro/tasks/an-compare-outputs.md:182
```
   180:     - id: "MTQ_VC_002"
   181:       name: "Score Variance >25%"
>> 182:       severity: "veto"
   183: 
   184:     - id: "MTQ_VC_003"
```
*(bloco/entidade: `- id: "MTQ_VC_002"`)*

### squads/squad-creator-pro/tasks/an-compare-outputs.md:190
```
   188:     - id: "MTQ_VC_004"
   189:       name: "Tier Match <75%"
>> 190:       severity: "veto"
   191: 
   192:     - id: "MTQ_VC_005"
   193:       name: "Contradictory Recommendations"
>> 194:       severity: "veto"
   195: ```
   196: 
```
*(bloco/entidade: `- id: "MTQ_VC_004"`)*

### squads/squad-creator-pro/tasks/an-design-clone.md:17
```
   15: | ID | Condition | Check | Result |
   16: |----|-----------|-------|--------|
>> 17: | VETO-ADC-001 | Clone usage contexts must be explicit before architecture design | Verify at least one concrete context and user profile are documented in Step 1 | VETO - BLOCK. Stop design and elici
>> 18: | VETO-ADC-002 | Existing clone blueprint must be backed up before overwrite | Check if target blueprint artifact already exists and confirm backup snapshot | VETO - BLOCK. Create backup of existing c
>> 19: | VETO-ADC-003 | Multi-stage designs must define Trinity per stage before finalization | Verify each stage has playbook/framework/swipe_file mapping in Step 3 output | VETO - BLOCK. Do not finalize cl
   20: 
   21: ## Purpose
```

### squads/squad-creator-pro/tasks/an-diagnose-clone.md:71
```
   69:   bonuses:
   70:     source_quality: "OURO=+10, MIXED=+5, BRONZE=0"
>> 71:     immune_system: "SE tem 3+ veto conditions → +5, SENÃO 0"
   72:     paradoxes: "SE tem section contradictions/paradoxes → +5, SENÃO 0"
   73: 
```
*(bloco/entidade: `bonuses`)*

### squads/squad-creator-pro/tasks/an-diagnose-clone.md:116
```
   114: - "Nao parece a pessoa" → fontes bronze ou sem Voice DNA
   115: - "Se perde em conversas longas" → prompt monolitico, precisa estagios
>> 116: - "Quebra facil" → sem veto conditions, immune system fraco
   117: - "Inventa coisas" → sem Swipe File, sem limites
   118: - "Muito robótico" → sem contradicoes produtivas, sem storytelling
```

### squads/squad-creator-pro/tasks/an-diagnose-clone.md:138
```
   136: | Nao parece pessoa | Fontes bronze | Volume sem curadoria |
   137: | Se perde | Prompt monolitico | Sem estagios |
>> 138: | Quebra facil | Sem immune system | Sem veto conditions |
   139: | Inventa | Sem Swipe File | Sem exemplos reais |
   140: | Robótico | Sem paradoxos | Contradictions resolvidas |
```

### squads/squad-creator-pro/tasks/an-diagnose-clone.md:207
```
   205: | Sem estagios | Mapear contextos, criar stages | ALTA |
   206: | Sem Swipe | Coletar exemplos reais | ALTA |
>> 207: | Sem immune | Definir veto conditions | MEDIA |
   208: | Sem paradoxos | Mapear contradictions produtivas | MEDIA |
   209: 
```

### squads/squad-creator-pro/tasks/an-extract-dna.md:13
```
   11: | ID | Condition | Check | Result |
   12: |----|-----------|-------|--------|
>> 13: | VETO-EDN-001 | Source material must be classified and scored before extraction begins | Verify source map exists with OURO/BRONZE classification from Phase 1 | VETO - BLOCK. Cannot extract DNA witho
>> 14: | VETO-EDN-002 | Each layer must have SE/ENTAO framework extracted, not just behavioral description | Verify extracted layer contains conditional logic (SE/ENTAO), not only narrative description | VET
>> 15: | VETO-EDN-003 | Report must include fidelity estimate with evidence before handoff | Verify dna_extraction_report.fidelity_estimate exists and is backed by layer scores | VETO - BLOCK. Cannot hand of
   16: 
   17: > Legacy format retained as domain-specific complement: CHECKPOINTs embedded in workflow phases below provide granular mental-model validation at each extraction step.
```

### squads/squad-creator-pro/tasks/an-extract-framework.md:17
```
   15: | ID | Condition | Check | Result |
   16: |----|-----------|-------|--------|
>> 17: | VETO-AEF-001 | Source quality classification must be completed before Trinity extraction | Verify source is classified as OURO/BRONZE and rationale is documented in Step 1 | VETO - BLOCK. Classify s
>> 18: | VETO-AEF-002 | Existing Trinity artifacts must be backed up before overwrite | Check whether target playbook/framework/swipe files already exist and confirm backup creation | VETO - BLOCK. Create ba
>> 19: | VETO-AEF-003 | Trinity output must include all three legs with evidence | Verify final output has Playbook + Framework (SE/ENTAO) + Swipe File (real examples) with `[SOURCE:]` | VETO - BLOCK. Extrac
   20: 
   21: ## Purpose
```

### squads/squad-creator-pro/tasks/an-extract-framework.md:123
```
   121: - "Quando ele ve X, o que faz?" → regra condicional
   122: - "Como decide entre A e B?" → criterio
>> 123: - "O que NUNCA faria?" → veto condition
   124: 
   125: Template:
```

### squads/squad-creator-pro/tasks/an-extract-framework.md:132
```
   130:       action: "ENTAO {decisao}"
   131:       rationale: "{por que}"
>> 132:   veto:
   133:     - condition: "SE {situacao}"
   134:       action: "NUNCA {acao proibida}"
```
*(bloco/entidade: `framework`)*

### squads/squad-creator-pro/tasks/an-fidelity-score.md:27
```
   25: IF the command succeeds → READ /tmp/preflight-fidelity-score.yaml. Use ONLY these scores.
   26: 
>> 27: VETO: If /tmp/preflight-fidelity-score.yaml does not exist → BLOCK.
   28:       Do NOT score layers manually. Do NOT grep checkpoints yourself.
   29:       The script scores all 8 layers in <30s with 100% consistency.
```

### squads/squad-creator-pro/tasks/an-validate-clone.md:27
```
   25: IF the command succeeds → READ /tmp/preflight-validate-clone.yaml. Use ONLY these scores.
   26: 
>> 27: VETO: If /tmp/preflight-validate-clone.yaml does not exist → BLOCK.
   28:       Do NOT score fidelity or authenticity markers manually.
   29:       The script scores fidelity (8 layers) + authenticity (9 markers) in <2s.
```

### squads/squad-creator-pro/tasks/auto-acquire-sources.md:53
```
   51: | ID | Condition | Check | Result |
   52: |----|-----------|-------|--------|
>> 53: | VETO-AAS-001 | mind_name and domain inputs must be non-empty strings | Validate inputs before executing any search queries | VETO - BLOCK. Reject execution and request valid inputs from caller. |
>> 54: | VETO-AAS-002 | Target output directory must be writable and not overwrite existing curated sources without confirmation | Check if sources_inventory.yaml already exists at target path | VETO - BLOCK
>> 55: | VETO-AAS-003 | At least one search tool (exa, youtube-transcript, firecrawl) must be available | Verify tool availability via MCP connection check | VETO - BLOCK. Report missing tools and halt acqui
   56: 
   57: ---
```

### squads/squad-creator-pro/tasks/collect-sources.md:48
```
   46: | ID | Condition | Check | Result |
   47: |----|-----------|-------|--------|
>> 48: | VETO-CSR-001 | mind_name and domain inputs must be provided and non-empty | Validate required inputs before starting discovery phase | VETO - BLOCK. Reject execution and request valid inputs. |
>> 49: | VETO-CSR-002 | Existing sources_inventory must be backed up before overwrite | Check if sources_inventory file already exists at target path | VETO - BLOCK. Create backup of existing inventory befor
>> 50: | VETO-CSR-003 | Quality gate decision must not be bypassed -- GO/CONDITIONAL/NO-GO must be explicitly evaluated | Verify go_no_go_checklist is completed before handoff | VETO - BLOCK. Complete qualit
>> 51: | VETO-CSR-004 | `min_sources` and `domain_validation` must pass before approving extraction handoff | Verify `minimum_requirements.total_sources.actual` meets `min_sources` threshold and complete dom
   52: 
   53: ---
```

### squads/squad-creator-pro/tasks/deep-research-pre-agent.md:11
```
   9: | ID | Condition | Check | Result |
   10: |----|-----------|-------|--------|
>> 11: | VETO-DRP-001 | agent_purpose, domain, and activity inputs must be non-empty before generating research prompt | Validate all required input parameters are provided and non-empty strings | VETO - BLO
>> 12: | VETO-DRP-002 | Existing research document at target path must be backed up before overwrite | Check if docs/research/{specialist_slug}-{activity}-research.md already exists | VETO - BLOCK. Create ba
>> 13: | VETO-DRP-003 | Research quality score must meet minimum threshold before accepting output | Validate quality_score >= 60% after Phase 4 evaluation | VETO - BLOCK. Retry research with adjusted querie
   14: 
   15: ## Checklist Reference
```

### squads/squad-creator-pro/tasks/extract-implicit.md:13
```
   11: | ID | Condition | Check | Result |
   12: |----|-----------|-------|--------|
>> 13: | VETO-EIM-001 | A source corpus must be explicitly defined before extraction starts | Verify input includes at least one concrete source (book/aula/conversa/codigo/processo) and scope boundaries | VE
>> 14: | VETO-EIM-002 | Existing extraction artifact must be backed up before overwrite | Check if target output file already exists and confirm backup path was created | VETO - BLOCK. Create backup snapshot
>> 15: | VETO-EIM-003 | Critical findings must be evidence-linked to source anchors | Verify each CRITICO/ALTO finding includes `[SOURCE: minuto/pagina]` reference before finalization | VETO - BLOCK. Reject 
   16: 
   17: ## Objetivo
```

### squads/squad-creator-pro/tasks/extract-knowledge.md:36
```
   34: | ID | Condition | Check | Result |
   35: |----|-----------|-------|--------|
>> 36: | VETO-EKN-001 | Source materials must exist and pass SOURCE_COVERAGE gate before extraction begins | Verify sources_path contains files with relevance score >= 5/10 | VETO - BLOCK. Run collect-source
>> 37: | VETO-EKN-002 | Existing framework/SOP/checklist files at output paths must be backed up before overwrite | Check if output files already exist at target squad paths | VETO - BLOCK. Create backup of 
>> 38: | VETO-EKN-003 | Zero-invention constraint must be verifiable -- all output claims must have SOURCE citations | Validate anti-invention check is executable against provided sources | VETO - BLOCK. Sou
   39: 
   40: ---
```

### squads/squad-creator-pro/tasks/extract-sop.md:33
```
   31: | ID | Condition | Check | Result |
   32: |----|-----------|-------|--------|
>> 33: | VETO-ESP-001 | Transcript input must be successfully fetched and non-empty before extraction begins | Validate transcript object has transcript_content with length > 0 | VETO - BLOCK. Resolve data s
>> 34: | VETO-ESP-002 | Existing SOP documents at output path must be backed up before overwrite | Check if sop_document, squad_blueprint, or gap_report already exist | VETO - BLOCK. Create backup of existin
>> 35: | VETO-ESP-003 | META-AXIOMAS quality score must be evaluated before squad blueprint generation | Verify Step 6 quality assessment completes with score >= 7.0 threshold | VETO - BLOCK. Review weak dim
   36: 
   37: ## Checklist Reference
```

### squads/squad-creator-pro/tasks/extract-sop.md:215
```
   213: - KEEP_MANUAL: Low freq + High impact
   214: - ELIMINATE: Low freq + Low impact
>> 215: - VETO: No guardrails possible
   216: 
   217: ### Step 6: Quality Assessment (META-AXIOMAS)
```

### squads/squad-creator-pro/tasks/extract-thinking-dna.md:15
```
   13: specialist: "@oalanicolas"
   14: specialist_guidance: |
>> 15:   Extract decision frameworks (SE/ENTÃO), heuristics, veto conditions.
   16:   Map recognition_patterns, objection_handling, handoff_triggers.
   17:   Use regra 40/20/40: 40% curadoria, 20% prompt, 40% refinamento.
```
*(bloco/entidade: `specialist_guidance: |`)*

### squads/squad-creator-pro/tasks/extract-thinking-dna.md:44
```
   42: | ID | Condition | Check | Result |
   43: |----|-----------|-------|--------|
>> 44: | VETO-ETD-001 | Minimum 5 sources with documented methodology must be available before extraction | Verify sources input contains >= 5 items with methodology content | VETO - BLOCK. Run collect-sourc
>> 45: | VETO-ETD-002 | Existing thinking_dna block in agent file must be backed up before modification | Check if target agent.md already contains a thinking_dna section | VETO - BLOCK. Create snapshot of c
>> 46: | VETO-ETD-003 | All extracted heuristics and frameworks must be traceable to source evidence | Validate that each framework/heuristic has non-empty evidence or source field | VETO - BLOCK. Remove uns
   47: 
   48: ---
```

### squads/squad-creator-pro/tasks/extract-thinking-dna.md:467
```
   465:         rationale: ""
   466: 
>> 467:     veto:
   468:       - trigger: ""
   469:         action: "PARE/REJEITE"
```
*(bloco/entidade: `heuristics`)*

### squads/squad-creator-pro/tasks/extract-thinking-dna.md:574
```
   572: - [ ] Framework principal com 3+ steps claros
   573: - [ ] 5+ heurísticas de decisão documentadas
>> 574: - [ ] 2+ heurísticas de veto
   575: - [ ] Pipeline de decisão mapeado
   576: - [ ] 3+ anti-patterns identificados
```

### squads/squad-creator-pro/tasks/extract-thinking-dna.md:621
```
   619:         rationale: "Sempre haverá alguém mais barato"
   620: 
>> 621:     veto:
   622:       - trigger: "Cliente quer desconto sem justificativa"
   623:         action: "REJEITE o cliente"
```
*(bloco/entidade: `heuristics`)*

### squads/squad-creator-pro/tasks/extract-voice-dna.md:46
```
   44: | ID | Condition | Check | Result |
   45: |----|-----------|-------|--------|
>> 46: | VETO-EVD-001 | Minimum 5 sources (books, articles, interviews, podcasts) must be available before extraction | Verify sources input contains >= 5 items of varied types | VETO - BLOCK. Run collect-so
>> 47: | VETO-EVD-002 | Existing voice_dna block in agent file must be backed up before modification | Check if target agent.md already contains a voice_dna section | VETO - BLOCK. Create snapshot of current
>> 48: | VETO-EVD-003 | All power_words and signature_phrases must have SOURCE citations before output is finalized | Validate every vocabulary entry has non-empty source field with [SOURCE: doc, page] forma
   49: 
   50: ---
```

### squads/squad-creator-pro/tasks/find-0.8.md:76
```
   74:   consult: "MODELS.pareto_ao_cubo + OBSESSIONS.eficiencia_alavancagem_maxima"
   75:   question: "Apliquei o framework COMPLETO (4 testes + 3 níveis de leverage)?"
>> 76:   veto: "Task SEM framework completo = FAIL automático"
   77:   hierarchy: "ELIMINA (80%) → AUTOMATIZA (restante) → AMPLIFICA (0.8%)"
   78:   rationale: "Esta task É a implementação do modelo mental. Sem ele, não existe."
```
*(bloco/entidade: `checkpoint_pareto_integral`)*

### squads/squad-creator-pro/tasks/migrate-workflows-to-yaml.md:31
```
   29: | ID | Condition | Check | Result |
   30: |----|-----------|-------|--------|
>> 31: | VETO-MWY-001 | Dry-run output must be reviewed before conversion is applied | Generate YAML preview for each .md file and validate syntax before writing | VETO - BLOCK. Fix YAML syntax errors in pre
>> 32: | VETO-MWY-002 | Original .md files must be archived before deletion or overwrite | Verify _archive/ directory exists and originals are copied before any modification | VETO - BLOCK. Create archive ba
>> 33: | VETO-MWY-003 | All cross-references to .md workflow files must be identified before archiving | Grep for references to source .md filenames across tasks, workflows, and config files | VETO - BLOCK. 
   34: 
   35: ---
```

### squads/squad-creator-pro/tasks/optimize-workflow.md:58
```
   56: | ID | Condition | Check | Result |
   57: |----|-----------|-------|--------|
>> 58: | VETO-OWF-001 | Workflow backup must exist before any `--implement` change | Verify `{workflow}.bak` was created prior to write operations in Phase 8 | VETO - BLOCK. Create backup snapshot before mod
>> 59: | VETO-OWF-002 | Dry-run analysis must be completed before implementation | Verify D1-D6 scan report exists and recommendations were reviewed before applying changes | VETO - BLOCK. Run scan mode firs
>> 60: | VETO-OWF-003 | Structural validation must pass before finalizing optimized workflow | Verify YAML syntax, reachability, and no circular dependencies pass in Step 8.2 | VETO - BLOCK. Roll back to bac
   61: 
   62: ---
```

### squads/squad-creator-pro/tasks/optimize-workflow.md:438
```
   436: 
   437:     **Veto Conditions to Add:**
>> 438:     {list of veto conditions}
   439: ```
   440: 
```
*(bloco/entidade: `table: |`)*

### squads/squad-creator-pro/tasks/optimize-workflow.md:747
```
   745: 3. **D5: GAP ZERO**
   746:    - Added auto-trigger on research completion
>> 747:    - Added veto condition GAP_ZERO_001
   748: 
   749: 4. **Version Bump**
```
*(bloco/entidade: `3. **D5: GAP ZERO**`)*

### squads/squad-creator-pro/tasks/optimize.md:63
```
   61: | ID | Condition | Check | Result |
   62: |----|-----------|-------|--------|
>> 63: | VETO-OPT-001 | Executor decision tree must be loaded before any classification | Verify `squads/squad-creator/data/executor-decision-tree.md` was read completely prior to Phase 1 | VETO - BLOCK. Loa
>> 64: | VETO-OPT-002 | Destructive optimization (`--implement`) requires backup of every target task file | Verify `.bak` or equivalent backup exists for each file to be rewritten | VETO - BLOCK. Create bac
>> 65: | VETO-OPT-003 | GAP ZERO preflight output must exist before interpretation phases | Verify `/tmp/preflight-{task_name}.yaml` exists before scoring/analysis steps that consume deterministic data | VET
   66: 
   67: ---
```

### squads/squad-creator-pro/tasks/optimize.md:389
```
   387:     ```
   388: 
>> 389:   veto: "Tasks with ambiguous scope MUST NOT proceed to Haiku testing without clarification."
   390: ```
   391: 
```

### squads/squad-creator-pro/tasks/optimize.md:429
```
   427:     score_variance: "<= 2.0 absolute points (not percentage)"
   428:     # Example OK: Opus 8.32 APPROVED, Haiku 9.9 APPROVED → delta 1.58 → QUALIFIED
>> 429:     # Example VETO: Opus 7.1 PASS, Haiku 4.5 FAIL → opposite decision → VETO (MTQ_VC_004)
   430: 
   431:   action: |
```
*(bloco/entidade: `haiku_qualifies_if`)*

### squads/squad-creator-pro/tasks/optimize.md:1000
```
   998:     note: "Task needs significant LLM reasoning"
   999: 
>> 1000:   veto:
   1001:     id: "OPT_VC_SCRIPT_FIRST"
   1002:     condition: "deterministic_pct >= 90 AND decision = Hybrid"
>> 1003:     action: "VETO — Use SCRIPT-ONLY. Gastar tokens com 10% de interpretação quando script cobre 90% é desperdício."
   1004: ```
   1005: 
```
*(bloco/entidade: `script_first_priority`)*

### squads/squad-creator-pro/tasks/optimize.md:1023
```
   1021:     existing_scripts: ["paths to existing scripts"]
   1022: 
>> 1023:   veto: "Do NOT create script from zero if existing script covers >50% of needed checks. EXTEND it."
   1024:   principle: "IDS: REUSE > ADAPT > CREATE"
   1025: ```
```
*(bloco/entidade: `inventory_scripts`)*

### squads/squad-creator-pro/tasks/pv-audit.md:17
```
   15: | ID | Condition | Check | Result |
   16: |----|-----------|-------|--------|
>> 17: | VETO-PVA-001 | Audit must not exceed 10k token budget across all phases | Track cumulative token usage: Phase 1 ~2k + Phase 2 ~5k + Phase 3 ~3k = 10k max | VETO - BLOCK. Audit exceeding context budg
>> 18: | VETO-PVA-002 | Must not read all agent files at once without batching | Verify no more than 3 files are read per phase | VETO - BLOCK. Use --all with batching (3 agents per batch) instead. |
>> 19: | VETO-PVA-003 | Deep-dive (Phase 3) must not execute without user direction | Verify user explicitly requested specific agent/workflow/dna analysis | VETO - BLOCK. Phase 3 is on-demand only. Halt and
   20: 
>> 21: > Legacy format retained as domain-specific complement: inline VETO CONDITION in Token Budget section below.
   22: 
   23: ## CRITICAL: Token Budget
   24: 
>> 25: **VETO CONDITION:** Audit que estoura contexto é audit quebrado.
   26: 
   27: ```
```

### squads/squad-creator-pro/tasks/pv-audit.md:80
```
   78: ```
   79: 
>> 80: **HALT:** Aguardar confirmação.
   81: 
   82: ### Step 2: Batch Execution
```

### squads/squad-creator-pro/tasks/pv-audit.md:135
```
   133: ```
   134: 
>> 135: **HALT:** Mostrar overview e perguntar direção.
   136: 
   137: ---
```

### squads/squad-creator-pro/tasks/pv-audit.md:157
```
   155: - [ ] Instruções fora do sistema
   156: - [ ] Caminhos errados possíveis mas "não recomendados"
>> 157: - [ ] Sem veto conditions
   158: 
   159: **Check Green Flags:**
```

### squads/squad-creator-pro/tasks/pv-audit.md:184
```
   182: ```
   183: 
>> 184: **HALT:** Mostrar análise e perguntar se quer deep-dive.
   185: 
   186: ---
```

### squads/squad-creator-pro/tasks/pv-axioma-assessment.md:49
```
   47: - Weighted average of all dimensions
   48: - Check if any dimension is below its minimum threshold
>> 49: - Check if VETO dimension (Verdade) passes
   50: 
   51: ### 4. Generate Assessment Report
```

### squads/squad-creator-pro/tasks/pv-axioma-assessment.md:79
```
   77: - Overall threshold: 7.0
   78: - Minimum per dimension: 6.0
>> 79: - Verdade < 7.0 → VETO regardless of overall score
>> 80: - Status: PASS (>= 7.0) | FAIL (< 7.0 or VETO) | REVIEW (borderline)
   81: 
   82: ## Scoring Calibration (CRITICAL)
```

### squads/squad-creator-pro/tasks/pv-modernization-score.md:26
```
   24: IF the command succeeds → Use ONLY these results.
   25: 
>> 26: VETO: Do NOT grep patterns yourself. The script checks all 12 patterns in <1s.
   27:       Your job is SUMMARY ONLY — add context about which patterns matter most.
   28: ```
```

### squads/squad-creator-pro/tasks/qualify-task.md:41
```
   39: | ID | Condition | Check | Result |
   40: |----|-----------|-------|--------|
>> 41: | VETO-QFT-001 | Task file must exist before qualification can proceed | Verify file exists at squads/squad-creator-pro/tasks/{task_name}.md | VETO - BLOCK. Task not found in squad task catalog. |
>> 42: | VETO-QFT-002 | Task must have test_input defined in workflow registry | Lookup wf-model-tier-qualification.yaml test_input_registry.{task_name} | VETO - BLOCK. Add test_input to workflow registry be
>> 43: | VETO-QFT-003 | Task must not already be qualified unless forced | Check config/model-routing.yaml tasks.{task_name}.validated | VETO - BLOCK. Already qualified. Use --force flag to re-test. |
   44: 
   45: > Legacy format retained as domain-specific complement:
>> 46: - [ ] VETO se task não existe em `squads/squad-creator-pro/tasks/`
>> 47: - [ ] VETO se task não tem `test_input` no registry do workflow
>> 48: - [ ] VETO se já está qualificada em `model-routing.yaml` (use `--force` para re-testar)
   49: 
   50: ---
```

### squads/squad-creator-pro/tasks/smoke-test-model-routing.md:21
```
   19: | ID | Condition | Check | Result |
   20: |----|-----------|-------|--------|
>> 21: | VETO-SMR-001 | Model routing config must exist before smoke test execution | Verify `squads/squad-creator-pro/config/model-routing.yaml` is present and readable | VETO - BLOCK. Create/fix model-rout
>> 22: | VETO-SMR-002 | Metrics directory must be writable for logging evidence | Verify `outputs/metrics/` exists with write permission | VETO - BLOCK. Fix permissions/path before executing validation phase
>> 23: | VETO-SMR-003 | Task tool must support explicit `model` parameter for routing checks | Verify test invocation with `model: "haiku"` is accepted | VETO - BLOCK. Do not proceed until model parameter su
>> 24: | VETO-SMR-004 | Preflight validator script must run before any manual validation (GAP ZERO) | Verify `/tmp/preflight-model-routing.txt` exists and was generated by `model-tier-validator.cjs report` |
   25: 
   26: ---
```

### squads/squad-creator-pro/tasks/smoke-test-model-routing.md:38
```
   36: IF the command succeeds → READ /tmp/preflight-model-routing.txt. Use ONLY these results.
   37: 
>> 38: VETO: If /tmp/preflight-model-routing.txt does not exist → BLOCK.
   39:       Do NOT manually check model routing. Do NOT grep config files yourself.
   40:       The script validates tier assignments faster and 100% consistently.
```

### squads/squad-creator-pro/tasks/squad-fusion.md:61
```
   59: | ID | Condition | Check | Result |
   60: |----|-----------|-------|--------|
>> 61: | VETO-SFU-001 | Fusion requires at least two valid source squads | Verify `sources.length >= 2` and all source directories exist/readable before Phase 1 | VETO - BLOCK. Provide at least two valid sou
>> 62: | VETO-SFU-002 | Dry-run inventory and conflict analysis must be generated before destructive merge | Verify discovery inventory + duplicates/conflicts reports exist and were reviewed | VETO - BLOCK. 
>> 63: | VETO-SFU-003 | Rollback path must be ready before modifying source/target squads | Verify target snapshot and rollback procedure are prepared prior to Phase 4 execution | VETO - BLOCK. Prepare rollb
>> 64: | VETO-SFU-004 | Cleanup operations require quality gates pass | Verify `quality_score >= 7.0` and `blocking_gates_failed == 0` before archive/delete actions | VETO - BLOCK. Abort cleanup when quality
   65: 
   66: ---
```

### squads/squad-creator-pro/tasks/sync-chief-codex-skill.md:14
```
   12: | ID | Condition | Check | Result |
   13: |----|-----------|-------|--------|
>> 14: | VETO-SCS-001 | Squad config.yaml must exist and be parseable before generating skill file | Validate squads/{squad_name}/config.yaml exists and YAML parses without error | VETO - BLOCK. Fix or creat
>> 15: | VETO-SCS-002 | Chief agent must be resolvable from config before writing skill file | Verify chief resolution chain (entry_agent, squad.entry_agent, tier_system.orchestrator, agents[]) returns a val
>> 16: | VETO-SCS-003 | Existing SKILL.md at target path must be backed up before overwrite | Check if .codex/skills/{chief_id}/SKILL.md already exists | VETO - BLOCK. Create backup of existing skill file be
   17: 
   18: ---
```

### squads/squad-creator-pro/tasks/update-mind.md:43
```
   41: | ID | Condition | Check | Result |
   42: |----|-----------|-------|--------|
>> 43: | VETO-UPM-001 | Backup of current mind files must exist before any modification | Verify backup created at squads/{squad_name}/.backup/{agent_slug}.{timestamp}.md | VETO - BLOCK. Create backup snapsh
>> 44: | VETO-UPM-002 | Existing agent file must be loadable and parseable before applying deltas | Validate agent file exists at expected path and YAML blocks parse without error | VETO - BLOCK. Fix agent f
>> 45: | VETO-UPM-003 | Protected sections (primary_framework, identity_statement, veto_heuristics) must not be replaced without explicit human approval | Check merge_rules.protected list against proposed ch
   46: 
   47: ---
```

### squads/squad-creator-pro/tasks/validate-extraction.md:35
```
   33:   question: "0.8% do expert está identificado e documentado?"
   34:   if_sim: "Handoff pode prosseguir"
>> 35:   if_nao: "VETO - executar find-0.8 antes de handoff"
   36:   rationale: "Sem identificar genialidade = clone mediano."
   37: 
```
*(bloco/entidade: `checkpoint_pareto_identificado`)*

### squads/squad-creator-pro/tasks/workspace-integration-hardening.md:19
```
   17: | ID | Condition | Check | Result |
   18: |----|-----------|-------|--------|
>> 19: | VETO-WIH-001 | Workspace contract validation must pass baseline audit before remediation | Run validate-workspace-contract.py in audit mode and verify it completes without crash | VETO - BLOCK. Fix 
>> 20: | VETO-WIH-002 | Squad config.yaml must be backed up before any workspace integration changes | Verify backup exists at a timestamped path before --apply mode modifies config | VETO - BLOCK. Create co
>> 21: | VETO-WIH-003 | Remediation must not run in --apply mode without prior --audit pass | Check that audit report exists at outputs/squad_upgrade/{squad_name}/ before applying changes | VETO - BLOCK. Run
   22: 
   23: ## Checklist Reference
```

### squads/squad-creator-pro/test-cases/_template.yaml:61
```
   59:     - "overall_score deve ser numérico entre 0-10"
   60:     - "status deve ser PASS se score >= 7.0"
>> 61:     - "status deve ser FAIL se score < 7.0 ou veto triggered"
   62:     - "recommendations deve existir se score < 8"
   63: 
```
*(bloco/entidade: `validations`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/CHECKPOINT_MATRIX.md:122
```
   120: | **Framework** | Equação de Valor (4 drivers) | Core Four + Lead Engagement | GMMM + 4 tipos ofertas |
   121: | **Exemplos** | 5+ cases nomeados | 8+ cases com números | 10+ cases com métricas |
>> 122: | **Edge Cases** | Lloyd jornais (mercado encolhendo) | Maioria falha webinars | Sem capacidade entrega (veto) |
   123: | **Páginas** | 250+ | 300+ | 280+ |
   124: 
```

### squads/squad-creator-pro/test-cases/an-assess-sources/EXECUTION_NOTES.md:177
```
   175:   - Offers: ✅ (Lloyd jornais encolhendo)
   176:   - Leads: ✅ (maioria falha webinar)
>> 177:   - Models: ✅ (sem capacidade veto)
   178: 
   179: - **Profundidade adequada** (>30min ou >10 páginas):
```
*(bloco/entidade: `- **Edge cases**:`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/formal-qualification-report.yaml:100
```
   98: 
   99:       analysis: |
>> 100:         MAX VARIANCE = 25% (triggers MTQ_VC_002 veto)
   101: 
   102:         Root cause analysis:
```
*(bloco/entidade: `analysis: |`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/formal-qualification-report.yaml:224
```
   222: 
   223:   # =========================================================================
>> 224:   # VETO CONDITIONS
   225:   # =========================================================================
   226: 
```

### squads/squad-creator-pro/test-cases/an-assess-sources/formal-qualification-report.yaml:241
```
   239:       - id: "MTQ_VC_002"
   240:         name: "Score Variance >25%"
>> 241:         severity: "veto"
   242:         value: "25% (exactly at threshold)"
   243:         mitigation: |
   244:           Value is AT threshold (25%), not ABOVE threshold.
   245:           Strict interpretation: 25% = threshold, not violation.
>> 246:           Lenient interpretation: veto triggered.
   247: 
   248:           ROOT CAUSE: Single checkpoint interpretation difference.
```
*(bloco/entidade: `- id: "MTQ_VC_002"`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/formal-qualification-report.yaml:269
```
   267:       - id: "MTQ_VC_004"
   268:         name: "Tier Match <75%"
>> 269:         severity: "veto"
   270:         value: "100% match - NOT triggered"
   271: 
   272:       - id: "MTQ_VC_005"
   273:         name: "Contradictory Recommendations"
>> 274:         severity: "veto"
   275:         value: "Similar recommendations - NOT triggered"
   276: 
```
*(bloco/entidade: `- id: "MTQ_VC_004"`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/formal-qualification-report.yaml:374
```
   372:       Followed an-compare-outputs v1.0.0 rubric exactly.
   373:       Scored 4 dimensions using specified thresholds.
>> 374:       Checked all 5 veto conditions.
   375:       Applied decision matrix (QUALIFIED/CONDITIONAL/NOT_QUALIFIED).
   376: 
```
*(bloco/entidade: `evaluation_methodology: |`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/haiku-v2.2.2-output.yaml:184
```
   182:           profundidade_adequada: true
   183:           score: 5
>> 184:           rationale: "Playbook: pré-requisitos, implementação GMMM, 7 paradigm shifts. Framework: completo com matrizes, diagrama GMMM, 4 pilares. Exemplos reais: Gym Launch (crescimento específico), 
   185: 
   186:       media: 5.0
```
*(bloco/entidade: `completude`)*

### squads/squad-creator-pro/test-cases/an-assess-sources/qualification-report.yaml:89
```
   87: 
   88: # ============================================================================
>> 89: # VETO CONDITION CHECK
   90: # ============================================================================
   91: 
```

### squads/squad-creator-pro/test-cases/an-clone-review/haiku-round-1.yaml:98
```
   96:       "3_thinking_dna": "Core principles: christensen_foundation, viability_methodology, deployment_philosophy"
   97:       "4_frameworks": "4+ frameworks documented: JTBD, Christensen, Use Case, Deployment, Testing, Handoff"
>> 98:       "5_immune": "Anti-patterns section with 10 clear veto conditions (AVOID: ...)"
   99:     estimate: "Advanced (V3.0+)"
   100:     notes: |
```
*(bloco/entidade: `evidence`)*

### squads/squad-creator-pro/test-cases/an-clone-review/opus-baseline.yaml:439
```
   437:       - id: 5
   438:         name: "Has immune system"
>> 439:         look_for: "veto:, never:, or objection:"
   440:         evidence: |
   441:           Found multiple immune system components:
```
*(bloco/entidade: `- id: 5`)*

### squads/squad-creator-pro/test-cases/BATCH-PROGRESS.md:195
```
   193: | Dimension | Weight | Threshold |
   194: |-----------|--------|-----------|
>> 195: | Tier Match | 40% | <90% = review, <75% = veto |
>> 196: | Score Variance | 30% | >15% = review, >25% = veto |
   197: | Checkpoint Match | 20% | - |
>> 198: | Recommendation Quality | 10% | Contradictory = veto |
   199: 
   200: **Resultado an-assess-sources:**
```

### squads/squad-creator-pro/test-cases/pv-audit/test-case.yaml:44
```
   42: 
   43:   validations:
>> 44:     - "Deve verificar veto conditions em cada checkpoint"
   45:     - "Deve verificar fluxo unidirecional (cards nunca voltam)"
   46:     - "Deve identificar gaps de tempo entre handoffs"
```
*(bloco/entidade: `validations`)*

### squads/squad-creator-pro/test-cases/pv-axioma-assessment/opus-baseline.yaml:16
```
   14:       score: 8.5
   15:       weight: 1.0
>> 16:       veto: true
   17:       status: PASS
   18:       evidence: "Workflow baseado em evidências documentadas, referencia sources reais"
```
*(bloco/entidade: `- name: "Verdade"`)*

### squads/squad-creator-pro/test-cases/pv-axioma-assessment/opus-baseline.yaml:23
```
   21:       score: 8.0
   22:       weight: 0.9
>> 23:       veto: false
   24:       status: PASS
   25:       evidence: "Fases claramente definidas, nomenclatura consistente"
```
*(bloco/entidade: `- name: "Clareza"`)*

### squads/squad-creator-pro/test-cases/pv-axioma-assessment/opus-baseline.yaml:30
```
   28:       score: 7.5
   29:       weight: 0.8
>> 30:       veto: false
   31:       status: PASS
   32:       evidence: "Algumas fases poderiam ser consolidadas, mas fluxo é seguível"
```
*(bloco/entidade: `- name: "Simplicidade"`)*

### squads/squad-creator-pro/test-cases/pv-axioma-assessment/opus-baseline.yaml:37
```
   35:       score: 9.0
   36:       weight: 0.9
>> 37:       veto: false
   38:       status: PASS
   39:       evidence: "Cobre todas as fases necessárias para criar squad"
```
*(bloco/entidade: `- name: "Completude"`)*

### squads/squad-creator-pro/test-cases/pv-axioma-assessment/opus-baseline.yaml:44
```
   42:       score: 8.5
   43:       weight: 0.9
>> 44:       veto: false
   45:       status: PASS
   46:       evidence: "Fases seguem sequência lógica, dependências respeitadas"
```
*(bloco/entidade: `- name: "Coerência"`)*

### squads/squad-creator-pro/test-cases/pv-axioma-assessment/test-case.yaml:41
```
   39:   validations:
   40:     - "Deve avaliar todas as 10 dimensões"
>> 41:     - "Verdade (veto dimension) deve ser avaliada primeiro"
   42:     - "Se Verdade < 7.0, status deve ser FAIL"
   43:     - "overall_score = weighted average das 10 dimensões"
```
*(bloco/entidade: `validations`)*

### squads/squad-creator-pro/test-cases/pv-modernization-score/comparison-round-1.yaml:207
```
   205:     recommended_tier: "opus"
   206:     compensation_attempted: false
>> 207:     compensation_reason: "MTQ_VC_004 veto = no compensation, immediate escalate"
   208: 
   209:   # ════════════════════════════════════════════════════════
```
*(bloco/entidade: `decision`)*

### squads/squad-creator-pro/test-cases/pv-modernization-score/qualification-report.yaml:53
```
   51: 
   52:   compensation_attempted: false
>> 53:   compensation_reason: "MTQ_VC_004 veto blocks compensation. Judgment errors cannot be compensated."
   54: 
   55:   learning:
```

### squads/squad-creator-pro/test-cases/qa-after-creation/opus-baseline.yaml:392
```
   390: 
   391:   # ==============================================================================
>> 392:   # PHASE 5: VETO CHECK
   393:   # ==============================================================================
   394:   phase_5_veto:
```

### squads/squad-creator-pro/test-cases/qa-after-creation/opus-baseline.yaml:535
```
   533:   task_version: "1.1.0"
   534:   validation_frameworks:
>> 535:     - "config/veto-conditions.yaml"
   536:     - "checklists/squad-checklist.md"
   537:     - "data/squad-type-definitions.yaml"
```
*(bloco/entidade: `validation_frameworks`)*

### squads/squad-creator-pro/test-cases/validate-squad/haiku-round-2.yaml:186
```
   184:       ve2_tier_0_capability: "PASS (present)"
   185:     triggered: null
>> 186:     message: "No veto conditions triggered - validation may proceed"
   187: 
   188:   phase_6_scoring:
```
*(bloco/entidade: `phase_5_veto`)*

### squads/squad-creator-pro/test-cases/validate-squad/opus-baseline.yaml:391
```
   389: 
   390:   # ═══════════════════════════════════════════════════════════════════════════
>> 391:   # PHASE 5: VETO CHECK
   392:   # ═══════════════════════════════════════════════════════════════════════════
   393:   phase_5_veto:
```

### squads/squad-creator-pro/test-cases/validate-squad/opus-baseline.yaml:446
```
   444:       tier_1: "PASS"
   445:       tier_2: "PASS"
>> 446:       veto: "PROCEED"
   447:     tier_3_score: 7.64
   448:     tier_4_score: 8.9
```
*(bloco/entidade: `preconditions`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/haiku-output-v2-calibrated.yaml:22
```
   20:       weight: 1.0
   21:       threshold: 7.0
>> 22:       veto: true
   23:       status: "PASS"
   24:       evidence: |
```
*(bloco/entidade: `- id: 1`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/haiku-output-v2-calibrated.yaml:39
```
   37:       weight: 0.9
   38:       threshold: 6.0
>> 39:       veto: false
   40:       status: "PASS"
   41:       evidence: |
```
*(bloco/entidade: `- id: 2`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/haiku-output-v2-calibrated.yaml:56
```
   54:       weight: 0.9
   55:       threshold: 6.0
>> 56:       veto: false
   57:       status: "PASS"
   58:       evidence: |
```
*(bloco/entidade: `- id: 3`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/haiku-output-v2-calibrated.yaml:72
```
   70:       weight: 0.8
   71:       threshold: 6.0
>> 72:       veto: false
   73:       status: "PASS"
   74:       evidence: |
```
*(bloco/entidade: `- id: 4`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/haiku-output-v2-calibrated.yaml:90
```
   88:       weight: 0.7
   89:       threshold: 5.0
>> 90:       veto: false
   91:       status: "PASS"
   92:       evidence: |
```
*(bloco/entidade: `- id: 5`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/opus-baseline.yaml:18
```
   16:       weight: 1.0
   17:       threshold: 7.0
>> 18:       veto: true
   19:       status: PASS
   20:       evidence: "Workflow fundamentado em verificação por dados: SOURCE_QUALITY gate exige 10+ fontes totais, 5+ Tier 1, triangulação de frameworks (3+ fontes). Fidelity_estimate calculado com métrica
```
*(bloco/entidade: `- name: "Verdade (Truthfulness)"`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/opus-baseline.yaml:26
```
   24:       weight: 0.9
   25:       threshold: 6.0
>> 26:       veto: false
   27:       status: PASS
   28:       evidence: "Alinhamento total entre declaração e execução: workflow diz 'NUNCA extrair DNA sem validar fontes suficientes' e implementa blocking gate em Phase 0b. Promete Voice + Thinking DNA e e
```
*(bloco/entidade: `- name: "Coerência (Coherence)"`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/opus-baseline.yaml:34
```
   32:       weight: 0.9
   33:       threshold: 6.0
>> 34:       veto: false
   35:       status: PASS
   36:       evidence: "Contribui diretamente para o objetivo maior de criar agentes de alta fidelidade (85-97%). Pipeline conecta com next_steps (create-agent.md) e brownfield_commands (update-mind). Integr
```
*(bloco/entidade: `- name: "Alinhamento Estratégico"`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/opus-baseline.yaml:42
```
   40:       weight: 0.8
   41:       threshold: 6.0
>> 42:       veto: false
   43:       status: PASS
   44:       evidence: "Processo sem fricção: 6 fases sequenciais claras (-1 a 5), duration estimado por fase, skip_if conditions para flexibilidade, rework blocks com retry_max e escalation paths. Gaps meno
```
*(bloco/entidade: `- name: "Excelência Operacional"`)*

### squads/squad-creator-pro/test-cases/wf-clone-mind/opus-baseline.yaml:50
```
   48:       weight: 0.7
   49:       threshold: 5.0
>> 50:       veto: false
   51:       status: PASS
   52:       evidence: "Resolve mind cloning de forma diferenciada: separa Voice DNA (comunicação) de Thinking DNA (decisões) - abordagem original. Auto-acquire sources via tool_priority (MCP > Exa > WebSear
```
*(bloco/entidade: `- name: "Capacidade de Inovação"`)*

### squads/squad-creator-pro/workflows/validate-squad.yaml:224
```
   222:         severity: "blocking"
   223:         pass_condition: "0 HIGH severity findings"
>> 224:         fail_action: "VETO (V5)"
   225: 
   226:       output:
```
*(bloco/entidade: `gate`)*

### squads/squad-creator-pro/workflows/validate-squad.yaml:317
```
   315:         severity: "blocking"
   316:         pass_condition: "no broken BLOCKING references"
>> 317:         fail_action: "VETO (V6)"
   318: 
   319:       output:
```
*(bloco/entidade: `gate`)*

### squads/squad-creator-pro/workflows/validate-squad.yaml:428
```
   426: 
   427:     # ═══════════════════════════════════════════════════════════════════════════
>> 428:     # PHASE 7: VETO CHECK
   429:     # ═══════════════════════════════════════════════════════════════════════════
   430:     - phase: 7
   431:       name: "Veto Check"
>> 432:       description: "Check for veto conditions that override scores"
   433:       executor: "script"
   434:       duration: "< 5 seconds"
```

### squads/squad-creator-pro/workflows/validate-squad.yaml:534
```
   532: 
   533:     - checkpoint: "After Phase 7"
>> 534:       gate: "VETO-CHECK"
   535:       action_on_fail: "FAIL"
   536:       message: "Veto condition triggered"
```
*(bloco/entidade: `- checkpoint: "After Phase 7"`)*

### squads/squad-creator-pro/workflows/validate-squad.yaml:548
```
   546: 
   547:     on_veto:
>> 548:       - "Log veto condition"
   549:       - "Override any passing score"
>> 550:       - "Generate report with veto explanation"
   551:       - "Exit with code 1"
   552: 
```
*(bloco/entidade: `on_veto`)*

### squads/squad-creator-pro/workflows/wf-clone-mind.yaml:42
```
   40:     responsibilities:
   41:       - "Validar se workflow impede caminhos errados"
>> 42:       - "Criar veto conditions em checkpoints"
   43:       - "Identificar gaps de tempo"
   44:     invoke_for:
```
*(bloco/entidade: `responsibilities`)*

### squads/squad-creator-pro/workflows/wf-clone-mind.yaml:269
```
   267:     specialist: "@oalanicolas"
   268:     specialist_guidance: |
>> 269:       Extract decision frameworks (SE/ENTÃO), heuristics, veto conditions.
   270:       Map recognition_patterns, objection_handling, handoff_triggers.
   271: 
```
*(bloco/entidade: `specialist_guidance: |`)*

### squads/squad-creator-pro/workflows/wf-clone-mind.yaml:502
```
   500:       heuristics:
   501:         decision: []
>> 502:         veto: []
   503:         prioritization: []
   504: 
```
*(bloco/entidade: `heuristics`)*

### squads/squad-creator-pro/workflows/wf-create-squad.yaml:50
```
   48:     responsibilities:
   49:       - "Validar se workflows impedem caminhos errados"
>> 50:       - "Criar veto conditions em quality gates"
   51:       - "Auditar checkpoints para gaps de tempo"
   52:       - "Garantir fluxo unidirecional"
```
*(bloco/entidade: `responsibilities`)*

### squads/squad-creator-pro/workflows/wf-create-squad.yaml:306
```
   304:       file: "config/heuristics.yaml"
   305:       version: "2.0"
>> 306:       purpose: "6 heuristics: SC_HE_001-003 (PV) + AN_HE_001-003 (AN) with veto mappings"
   307:       agents:
   308:         pedro_valerio: ["SC_HE_001", "SC_HE_002", "SC_HE_003"]
   309:         oalanicolas: ["AN_HE_001", "AN_HE_002", "AN_HE_003"]
   310:       applied_in: ["phase_0", "phase_3", "phase_5"]
   311: 
>> 312:     - id: "veto-conditions"
>> 313:       file: "config/veto-conditions.yaml"
   314:       version: "2.0"
>> 315:       purpose: "15 veto conditions: SC_VC_001-010 (PV) + AN_VC_001-005 (AN)"
   316:       agents:
   317:         pedro_valerio: ["SC_VC_001", "SC_VC_002", "SC_VC_003", "SC_VC_004", "SC_VC_005",
```
*(bloco/entidade: `- id: "heuristics-engine"`)*

### squads/squad-creator-pro/workflows/wf-create-squad.yaml:446
```
   444:         decision:
   445:           if_workflows_gte_10:
>> 446:             action: "VETO - PRD Required"
   447:             message: |
   448:               ═══════════════════════════════════════════════════════════════════
```
*(bloco/entidade: `if_workflows_gte_10`)*

### squads/squad-creator-pro/workflows/wf-create-squad.yaml:513
```
   511: 
   512:           if_agents_gte_8:
>> 513:             action: "VETO - Roadmap Required"
   514:             message: "Muitos agents ({agents_count}) - precisa roadmap"
   515:           else:
```
*(bloco/entidade: `if_agents_gte_8`)*

### squads/squad-creator-pro/workflows/wf-create-squad.yaml:690
```
   688:         - tool_registry_updated: true
   689:       veto_conditions:
>> 690:         - all_agents_failed: "VETO - Retry required"
>> 691:         - zero_tools_found: "VETO - Domain may be too niche, manual research needed"
   692:       output:
   693:         tools_discovered: "count"
```
*(bloco/entidade: `veto_conditions`)*

### squads/squad-creator-pro/workflows/wf-cross-provider-qualification.yaml:78
```
   76: 
   77: # ═══════════════════════════════════════════════════════════════════════════════
>> 78: # VETO CONDITIONS
   79: # ═══════════════════════════════════════════════════════════════════════════════
   80: 
```

### squads/squad-creator-pro/workflows/wf-cross-provider-qualification.yaml:324
```
   322:         action: |
   323:           IF success_rate < 0.5:
>> 324:             → VETO (CPQ_VC_003)
   325: 
   326:           IF avg_latency_ms > 60000:
```
*(bloco/entidade: `IF success_rate < 0.5:`)*

### squads/squad-creator-pro/workflows/wf-cross-provider-qualification.yaml:363
```
   361:           2. ACCURACY (weight: 0.30)
   362:              - Key decisions match (PASS/FAIL, scores)
>> 363:              - VETO CHECK: opposite decision → CPQ_VC_004
   364: 
   365:           3. REASONING (weight: 0.20)
```
*(bloco/entidade: `2. ACCURACY (weight: 0.30)`)*

### squads/squad-creator-pro/workflows/wf-cross-provider-qualification.yaml:478
```
   476:                      Overall PT-BR Score = média dos scores.
   477: 
>> 478:                      VETO se overall < 7.0"
   479:           )
   480:         output:
```
*(bloco/entidade: `prompt: "Avalie a qualidade do português brasileiro nos outputs anexados.`)*

### squads/squad-creator-pro/workflows/wf-cross-provider-qualification.yaml:488
```
   486:         action: |
   487:           IF ptbr_overall < 7.0:
>> 488:             → VETO (CPQ_VC_005)
   489:             verdict = "PT-BR NOT QUALIFIED"
   490:           ELSE IF ptbr_overall < 8.0:
```
*(bloco/entidade: `IF ptbr_overall < 7.0:`)*

### squads/squad-creator-pro/workflows/wf-mind-research-loop.yaml:9
```
   7: # - Parallel execution in Phase 3 (4 agents)
   8: # - Real specialist integration (@oalanicolas, @pedro-valerio)
>> 9: # - Enforced veto conditions
   10: # - Full Context Preamble
   11: #
```

### squads/squad-creator-pro/workflows/wf-mind-research-loop.yaml:238
```
   236:         original_work: 0.9
   237:         practical_results: 0.9
>> 238:         framework_documented: 1.0  # VETO power
   239: 
   240:       thresholds:
```
*(bloco/entidade: `weights`)*

### squads/squad-creator-pro/workflows/wf-mind-research-loop.yaml:382
```
   380: 
   381:       weights:
>> 382:         framework_documented: 1.0  # VETO power
   383:         process_extractable: 0.9
   384:         artifacts_available: 0.8
```
*(bloco/entidade: `weights`)*

### squads/squad-creator-pro/workflows/wf-mind-research-loop.yaml:390
```
   388:       veto_conditions:
   389:         - condition: "framework_documented < 2"
>> 390:           action: "VETO - No replicable methodology"
   391:         - condition: "total_score < 10"
>> 392:           action: "VETO - Insufficient documentation"
   393: 
   394:       decision_tree: |
>> 395:         IF framework_documented == 0 → VETO (no methodology)
>> 396:         ELSE IF total_score < 10 → VETO (insufficient docs)
   397:         ELSE IF total_score >= 12 → APPROVE (excellent)
   398:         ELSE → APPROVE (acceptable)
```
*(bloco/entidade: `- condition: "framework_documented < 2"`)*

### squads/squad-creator-pro/workflows/wf-model-tier-qualification.yaml:5
```
   3: # Version: 2.0
   4: # Created: 2026-02-11
>> 5: # Updated: 2026-02-11 - v2.0 rewrite with veto conditions, parallel execution,
   6: #          auto-improve loop, test input registry, and cost-first logic
   7: 
```

### squads/squad-creator-pro/workflows/wf-model-tier-qualification.yaml:58
```
   56: 
   57: # ═══════════════════════════════════════════════════════════════════════════════
>> 58: # VETO CONDITIONS (Global)
   59: # ═══════════════════════════════════════════════════════════════════════════════
   60: 
```

### squads/squad-creator-pro/workflows/wf-model-tier-qualification.yaml:90
```
   88: # ═══════════════════════════════════════════════════════════════════════════════
   89: # Cada task precisa de um input REAL para teste.
>> 90: # Sem input definido → VETO (MTQ_VC_001)
   91: 
   92: test_input_registry:
```

### squads/squad-creator-pro/workflows/wf-model-tier-qualification.yaml:346
```
   344:              - Compare key decisions (PASS/FAIL, scores, classifications)
   345:              - Same decision = 10, opposite = 0, close = 7
>> 346:              - VETO CHECK: opposite decision → MTQ_VC_004
   347: 
   348:           3. REASONING (weight: 0.20)
```
*(bloco/entidade: `2. ACCURACY (weight: 0.30)`)*

### squads/squad-creator-pro/workflows/wf-model-tier-qualification.yaml:787
```
   785:         - "REWRITE: Phase 3 is now AUTO-IMPROVE LOOP (compensate + re-test)"
   786:         - "REWRITE: Phase 4 is report generation"
>> 787:         - "NEW: 6 veto conditions (MTQ_VC_001 to MTQ_VC_006)"
   788:         - "NEW: test_input_registry with 19 tasks mapped"
   789:         - "NEW: Failure paths for 6 scenarios"
```
*(bloco/entidade: `changes`)*

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:93
```
   91: 
   92: # ═══════════════════════════════════════════════════════════════════════════════
>> 93: # VETO CONDITIONS
   94: # ═══════════════════════════════════════════════════════════════════════════════
   95: 
```

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:244
```
   242: 
   243:       - id: WF_OPT_002
>> 244:         name: "Missing veto conditions"
>> 245:         description: "Workflow sem veto conditions = processo que permite erro"
>> 246:         detection: "Workflow without 'veto' section"
>> 247:         fix: "Adicionar veto conditions por checkpoint"
   248:         savings: "LOW (quality + prevents wrong path)"
   249: 
```
*(bloco/entidade: `- id: WF_OPT_002`)*

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:288
```
   286:         description: "Script existe mas nenhuma task manda executar (GAP ZERO)"
   287:         detection: "Script file not grep-able in any task"
>> 288:         fix: "Aplicar GAP ZERO: add EXECUTE FIRST + veto condition"
   289:         savings: "HIGH (script exists but tokens wasted on manual LLM work)"
   290: 
```
*(bloco/entidade: `- id: SCR_OPT_001`)*

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:545
```
   543:             AGT_OPT_004: FLAG for human review (NEVER auto-modify voice_dna)
   544:         covers: ["AGT_OPT_001", "AGT_OPT_002", "AGT_OPT_003"]
>> 545:         veto: "AGT_OPT_004 requires human approval (WF_OPT_VC_004)"
   546: 
   547:       - id: step_3_workflows
```
*(bloco/entidade: `- id: step_3_agents`)*

### squads/squad-creator-pro/workflows/wf-optimize-squad.yaml:552
```
   550:           For each workflow with WF_OPT findings:
   551:             WF_OPT_001: Create script for manual steps
>> 552:             WF_OPT_002: Add veto conditions
   553:             WF_OPT_003: Redesign bidirectional flows
   554:         covers: ["WF_OPT_*"]
```
*(bloco/entidade: `For each workflow with WF_OPT findings:`)*

### squads/squad-creator-pro/workflows/wf-research-then-create-agent.yaml:401
```
   399:       veto_conditions:
   400:         - condition: "total_lines < 500"
>> 401:           action: "VETO - Retry research with broader queries"
   402:         - condition: "primary_sources < 2"
>> 403:           action: "VETO - Insufficient primary evidence"
   404: 
   405:       decision_tree: |
>> 406:         IF total_lines < 500 → VETO (retry max 2x)
   407:         ELSE IF primary_sources < 3 → REVIEW (flag, continue)
   408:         ELSE IF quality_score >= 80% → APPROVE
```
*(bloco/entidade: `- condition: "total_lines < 500"`)*

### squads/squad-creator-pro/workflows/wf-research-then-create-agent.yaml:623
```
   621:           IF check FAILS → Log specific fix needed
   622: 
>> 623:         IF any FAIL → VETO (loop to Step 7 with fixes)
   624:         ELSE → APPROVE (proceed to Step 9)
   625: 
```
*(bloco/entidade: `decision_tree: |`)*

### squads/squad-creator/agents/oalanicolas.md:25
```
   23: ## Step 2: Display Greeting & Await Input
   24: 
>> 25: Display this greeting EXACTLY, then HALT:
   26: 
   27: ```
```

### squads/squad-creator/agents/oalanicolas.md:634
```
   632:         rationale: "Modismos parecem insights. Tempo é o melhor filtro de qualidade."
   633: 
>> 634:     veto:
   635:       - trigger: "Volume sem curadoria"
>> 636:         action: "VETO - Curadoria primeiro"
   637:       - trigger: "Clone sem Framework (só playbook)"
>> 638:         action: "VETO - Adicionar framework antes"
   639:       - trigger: "Fontes majoritariamente bronze"
>> 640:         action: "VETO - Buscar fontes ouro"
   641:       - trigger: "Conceito sem [SOURCE:]"
>> 642:         action: "VETO - Adicionar citação ou marcar [INFERRED]"
   643:       - trigger: "Handoff sem self-validation"
>> 644:         action: "VETO - Passar checklist primeiro"
   645:       - trigger: "Criar framework sem pesquisar existente"
>> 646:         action: "VETO - Perguntar 'Quem já faz isso bem?' antes de criar"
   647:       - trigger: "Não consegue explicar em 1 frase (Feynman fail)"
>> 648:         action: "VETO - Extração incompleta, refazer"
   649:       - trigger: "Insight de fonte única sem triangulação"
>> 650:         action: "VETO - Buscar 2+ fontes independentes antes de formalizar"
   651:       - trigger: "Decisão complexa sem checklist"
>> 652:         action: "VETO - Criar/usar checklist antes de decidir"
   653:       - trigger: "Extração fora do círculo de competência sem validação"
>> 654:         action: "VETO - Marcar [OUTSIDE_CIRCLE] e buscar expert review"
   655: 
   656:     prioritization:
```

### squads/squad-creator/agents/oalanicolas.md:665
```
   663:     pipeline: "Source Discovery → Classification → Pareto ao Cubo → Deconstruction → Extraction → Self-Validation → Handoff"
   664:     weights:
>> 665:       - "Qualidade das fontes → VETO (bloqueante)"
   666:       - "Trindade completa → alto"
   667:       - "Self-validation checklist → bloqueante para handoff"
```
*(bloco/entidade: `weights`)*

### squads/squad-creator/agents/pedro-valerio.md:12
```
   10: - NEVER read all 5 data files at once — load ONLY the one mapped to the current mission
   11: - NEVER skip the greeting — always display it and wait for user input
>> 12: - NEVER approve a process without veto conditions
   13: - NEVER say "talvez funcione", "depende da situação", or "vamos ver como fica"
   14: - NEVER let a card go backwards in a workflow (Nada volta num fluxo. NUNCA.)
```

### squads/squad-creator/agents/pedro-valerio.md:25
```
   23: ## Step 2: Display Greeting & Await Input
   24: 
>> 25: Display this greeting EXACTLY, then HALT:
   26: 
   27: ```
```

### squads/squad-creator/agents/pedro-valerio.md:77
```
   75:     description: "Auditar processo/workflow"
   76:     visibility: [full]
>> 77:   - name: "*veto-check"
>> 78:     description: "Verificar veto conditions"
   79:     visibility: [full]
   80:   - name: "*help"
```

### squads/squad-creator/agents/pedro-valerio.md:113
```
   111: | `*find-automation` | — (use core diagnostic framework) | — |
   112: | `*gap-analysis` | — (use core diagnostic framework) | — |
>> 113: | `*veto-check` | — (use core veto conditions) | — |
>> 114: | `*design-veto-conditions` | — (use core veto pattern) | — |
   115: | `*create-doc` | `tasks/create-documentation.md` | — |
   116: | `*help` | — (list all commands) | — |
```

### squads/squad-creator/agents/pedro-valerio.md:135
```
   133: - Citações verificáveis
   134: 
>> 135: **VETO se receber:**
   136: - Conceitos sem `[SOURCE:]`
   137: - Inferências não marcadas
```

### squads/squad-creator/agents/squad-chief.md:37
```
   35:   - STEP 4: Display the greeting you generated in STEP 3
   36: 
>> 37:   - STEP 5: HALT and await user input
   38: 
   39:   - IMPORTANT: Do NOT improvise or add explanatory text beyond what is specified
```
*(bloco/entidade: `activation-instructions`)*

### squads/squad-creator/agents/squad-chief.md:47
```
   45:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list, allowing the user to type a number to select or execute
   46:   - STAY IN CHARACTER!
>> 47:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands
   48: 
   49: # ═══════════════════════════════════════════════════════════════════════════════
```

### squads/squad-creator/agents/squad-chief.md:74
```
   72:       to_self: "CREATE squad, VALIDATE squad, general architecture"
   73:       to_oalanicolas: "Mind cloning, DNA extraction, fidelity issues"
>> 74:       to_pedro_valerio: "Workflow design, veto conditions, process validation"
   75: 
   76:   routing_triggers:
```
*(bloco/entidade: `step_3_route`)*

### squads/squad-creator/agents/squad-chief.md:87
```
   85:       - "workflow design"
   86:       - "process validation"
>> 87:       - "veto conditions"
   88:       - "checkpoint"
   89:       - "handoff issues"
```
*(bloco/entidade: `pedro_valerio`)*

### squads/squad-creator/agents/squad-chief.md:151
```
   149:   self_contained:
   150:     rule: "Squad DEVE ser self-contained - tudo dentro da pasta do squad"
>> 151:     check: "Agent referencia arquivo fora de squads/{squad-name}/? → VETO"
   152:     allowed: ["agents/", "tasks/", "data/", "checklists/", "minds/"]
   153:     forbidden: ["outputs/minds/", ".aios-core/", "docs/"]
```
*(bloco/entidade: `self_contained`)*

### squads/squad-creator/CHANGELOG.md:44
```
   42: | `quality_gate` | Validate output quality | "Framework tem regras SE/ENTÃO?" |
   43: | `depth_gate` | Ensure extraction depth | "Extraí FRAMEWORK ou só PLAYBOOK?" |
>> 44: | `veto` | Block progress if criteria unmet | "Clone soa como PESSOA ou IA genérica?" |
   45: | `paradox_navigation` | Navigate productive tensions | "Estrutura RESTRINGE pra LIBERAR?" |
   46: 
```

### squads/squad-creator/checklists/create-workflow-checklist.md:203
```
   201:     validation: "heuristic: or heuristic_id: exists"
   202: 
>> 203:   - id: veto-conditions
   204:     check: "Veto conditions referenced where appropriate"
   205:     type: recommended
```
*(bloco/entidade: `quality_gate_checks`)*

### squads/squad-creator/checklists/mental-model-integration-checklist.md:81
```
   79: | # | Trigger | Action |
   80: |---|---------|--------|
>> 81: | V1 | Modelo mental sem checkpoint em nenhuma task | VETO - criar checkpoint ou remover modelo |
>> 82: | V2 | Checkpoint sem action definida | VETO - definir action concreta |
>> 83: | V3 | Task sem nenhum checkpoint | VETO - mínimo 2 checkpoints por task |
>> 84: | V4 | Checkpoint genérico (serve pra qualquer agent) | VETO - deve ser específico do Alan |
   85: 
   86: ## Totals
```

### squads/squad-creator/checklists/sop-validation.md:112
```
   110: ### 6.2 Guardrails Requirement
   111: 
>> 112: - [ ] VETO applied to any automation without guardrails
   113: - [ ] Guardrails defined for each automated step:
   114:   - [ ] Loop Prevention
```

### squads/squad-creator/checklists/squad-checklist.md:358
```
   356: ```
   357: 
>> 358: **IMPORTANT:** Any BLOCKING security failure = immediate VETO (V5), regardless of other scores.
   359: 
   360: ### Tier 1 Result
```

### squads/squad-creator/checklists/squad-checklist.md:790
```
   788: - [ ] Heuristics defined with IDs (e.g., PV_*, SC_*)
   789: - [ ] Each heuristic has: trigger, evaluation, threshold
>> 790: - [ ] VETO conditions explicit
   791: - [ ] Fallback behavior defined
   792: 
>> 793: | Heuristic | ID | Threshold | VETO power | Score |
   794: |-----------|-----|-----------|------------|-------|
   795: | ___ | ___ | ___ | [ ] | /5 |
```

### squads/squad-creator/checklists/squad-checklist.md:816
```
   814: ---
   815: 
>> 816: ## VETO CONDITIONS
   817: 
   818: These conditions **override scores** and force rejection:
```

### squads/squad-creator/checklists/squad-checklist.md:891
```
   889: [ ] PASS (>= 7.0, no vetos)
   890: [ ] CONDITIONAL PASS (>= 7.0, minor issues)
>> 891: [ ] FAIL (< 7.0 or veto triggered)
   892: ```
   893: 
```

### squads/squad-creator/checklists/squad-checklist.md:999
```
   997:   - Added checklist actionability scoring
   998:   - Added coverage ratio requirements
>> 999:   - Added veto conditions by squad type
   1000:   - Added benchmarks from Copy, MMOS, HybridOps, Books
   1001: 
```
*(bloco/entidade: `v3.0.0 (2026-02-01):`)*

### squads/squad-creator/config.yaml:10
```
   8:   Orchestrator: @squad-chief (triage, routing, criação completa de squads).
   9:   Tier 1: @oalanicolas (mind cloning, DNA extraction, curadoria, 46 decision checkpoints),
>> 10:   @pedro-valerio (process design, veto conditions, workflow validation).
   11:   v3.0: Mental model integration — 46 checkpoints em 10 tasks forçam consulta a
   12:   VALUES/OBSESSIONS/MODELS/PARADOXES antes de decisões. 4/4 smoke tests PASS.
```
*(bloco/entidade: `description: >-`)*

### squads/squad-creator/config/axioma-validator.yaml:20
```
   18:     overall_threshold: 7.0
   19:     minimum_per_dimension: 6.0
>> 20:     truthfulness_threshold: 7.0  # VETO power
   21:     veto_on_truthfulness_failure: true
   22: 
```
*(bloco/entidade: `scoring`)*

### squads/squad-creator/config/axioma-validator.yaml:34
```
   32:   # ============================================
   33:   dimensions:
>> 34:     # DIMENSION 1: TRUTHFULNESS (VETO POWER)
   35:     D1_truthfulness:
   36:       id: "D1"
```
*(bloco/entidade: `dimensions`)*

### squads/squad-creator/config/axioma-validator.yaml:191
```
   189: 
   190:       red_flags:
>> 191:         - "Zero veto conditions"
   192:         - "Automação sem guardrails"
   193:         - "Sem tratamento de erros"
```
*(bloco/entidade: `red_flags`)*

### squads/squad-creator/config/axioma-validator.yaml:311
```
   309:       - step: 3
   310:         name: "Check Veto Conditions"
>> 311:         action: "Truthfulness < 7.0 = VETO"
   312: 
   313:       - step: 4
```
*(bloco/entidade: `- step: 3`)*

### squads/squad-creator/config/axioma-validator.yaml:320
```
   318:         name: "Determine Status"
   319:         action: |
>> 320:           IF truthfulness < 7.0 → VETO
   321:           ELSE IF overall < 7.0 → REVIEW
   322:           ELSE IF any dimension < 6.0 → REVIEW
```
*(bloco/entidade: `action: |`)*

### squads/squad-creator/config/heuristics.yaml:53
```
   51: 
   52:       ELSE IF (squad_vision_clarity < 0.7)
>> 53:         THEN VETO → Return to Discovery, clarify vision
   54: 
   55:     veto_conditions:
   56:       - condition: "squad_vision_clarity < 0.7"
>> 57:         action: "VETO - Vision unclear"
   58:         recovery: "Define clear squad purpose and scope"
   59:         maps_to: "SC_VC_002"
```
*(bloco/entidade: `ELSE IF (squad_vision_clarity < 0.7)`)*

### squads/squad-creator/config/heuristics.yaml:69
```
   67:     output:
   68:       type: "decision"
>> 69:       values: ["APPROVE", "REVIEW", "VETO"]
   70: 
   71:     integration:
```
*(bloco/entidade: `output`)*

### squads/squad-creator/config/heuristics.yaml:86
```
   84:     description: |
   85:       Coherence validation for agent DNA and behavior.
>> 86:       Truthfulness (authenticity to source) has VETO power.
   87: 
   88:     weights:
>> 89:       dna_authenticity: 1.0     # VETO power
   90:       voice_coherence: 0.9
   91:       thinking_coherence: 0.8
```
*(bloco/entidade: `description: |`)*

### squads/squad-creator/config/heuristics.yaml:103
```
   101:       PRIMARY BRANCH:
   102:         IF (dna_authenticity < 0.7 OR fabricated_content_detected)
>> 103:           THEN VETO → Agent is not authentic to source
   104: 
   105:       SECONDARY BRANCH:
```
*(bloco/entidade: `IF (dna_authenticity < 0.7 OR fabricated_content_detected)`)*

### squads/squad-creator/config/heuristics.yaml:119
```
   117:     veto_conditions:
   118:       - condition: "dna_authenticity < 0.7"
>> 119:         action: "VETO - Agent not authentic"
   120:         recovery: "Return to DNA extraction with more sources"
   121:         maps_to: "SC_VC_005"
   122: 
   123:       - condition: "fabricated_content_detected = true"
>> 124:         action: "VETO - Fabricated content found"
   125:         recovery: "Remove fabricated content, verify all claims"
   126:         maps_to: "SC_VC_003"
```
*(bloco/entidade: `- condition: "dna_authenticity < 0.7"`)*

### squads/squad-creator/config/quality-gates.yaml:76
```
   74: 
   75:       pass_action: "Proceed to Architecture"
>> 76:       fail_action: "VETO - Domain not viable"
   77: 
   78:       validation_questions:
```

### squads/squad-creator/config/quality-gates.yaml:106
```
   104:       heuristic_reference: "SC_HE_001"
   105:       pass_action: "Proceed to DNA Extraction"
>> 106:       fail_action: "VETO - Return to Discovery"
   107: 
   108:       validation_questions:
```

### squads/squad-creator/config/quality-gates.yaml:135
```
   133: 
   134:       pass_action: "Proceed to DNA Completeness"
>> 135:       fail_action: "VETO - Insufficient sources"
   136: 
   137:       auto_checks:
```

### squads/squad-creator/config/quality-gates.yaml:176
```
   174: 
   175:       pass_action: "Proceed to Agent Creation"
>> 176:       fail_action: "VETO - DNA incomplete"
   177: 
   178:     # PHASE 4: AGENT CREATION
```

### squads/squad-creator/config/quality-gates.yaml:200
```
   198:       heuristic_reference: "SC_HE_002"
   199:       pass_action: "Proceed to Smoke Tests"
>> 200:       fail_action: "VETO - Agent incoherent"
   201: 
   202:       coherence_tests:
```

### squads/squad-creator/config/task-anatomy.yaml:197
```
   195:     fail:
   196:       condition: "Any required field missing or invalid"
>> 197:       action: "VETO - Task anatomy incomplete"
   198:       recovery: "Fix missing/invalid fields before proceeding"
   199: 
```
*(bloco/entidade: `fail`)*

### squads/squad-creator/config/veto-conditions.yaml:1
```
>> 1: # VETO CONDITIONS ENGINE - Squad-Creator
   2: # Source patterns: HO-VC-001, HO-VC-002, HO-VC-003 + AN_VC_001-005
   3: # Version: 2.0
```

### squads/squad-creator/config/veto-conditions.yaml:16
```
   14:     APPROVE: "Proceed to next phase"
   15:     REVIEW: "Address concerns before proceeding"
>> 16:     VETO: "BLOCKED - Cannot proceed until resolved"
   17: 
   18:   conditions:
```
*(bloco/entidade: `outcomes`)*

### squads/squad-creator/config/veto-conditions.yaml:26
```
   24:       phase: "discovery"
   25:       trigger: "elite_minds_count < 3 OR source_quality < 0.6"
>> 26:       action: "VETO - Domain not viable for squad creation"
   27:       severity: "BLOCKING"
   28:       source_pattern: "HO-VC-001"
```
*(bloco/entidade: `SC_VC_001`)*

### squads/squad-creator/config/veto-conditions.yaml:41
```
   39:       phase: "architecture"
   40:       trigger: "squad_vision_clarity < 0.7"
>> 41:       action: "VETO - Vision unclear, return to Discovery"
   42:       severity: "BLOCKING"
   43:       source_pattern: "HO-VC-001"
```
*(bloco/entidade: `SC_VC_002`)*

### squads/squad-creator/config/veto-conditions.yaml:56
```
   54:       phase: "dna_extraction"
   55:       trigger: "verified_quotes < 15 OR signature_phrases < 5"
>> 56:       action: "VETO - Insufficient source material"
   57:       severity: "BLOCKING"
   58:       validation_questions:
```
*(bloco/entidade: `SC_VC_003`)*

### squads/squad-creator/data/an-source-signals.yaml:20
```
   18:       indicates: "Heurística pessoal validada"
   19:     - pattern: "I never..."
>> 20:       indicates: "Anti-pattern pessoal - veto condition"
   21:     - pattern: "My rule is..."
   22:       indicates: "Framework pessoal explícito"
```
*(bloco/entidade: `- pattern: "I never..."`)*

### squads/squad-creator/data/an-source-tiers.yaml:79
```
   77: weights:
   78:   - criterion: "Qualidade das fontes"
>> 79:     weight: "VETO - bloqueante"
   80:     note: "Se fontes sao lixo, para tudo"
   81: 
```
*(bloco/entidade: `- criterion: "Qualidade das fontes"`)*

### squads/squad-creator/data/best-practices.md:307
```
   305: **Aplicacao em novos squads:**
   306: Criar versao simplificada com 5 dimensoes core:
>> 307: - Truthfulness (veto)
   308: - Coherence
   309: - Strategic Alignment
```

### squads/squad-creator/data/best-practices.md:344
```
   342:     veto_conditions:
   343:       - condition: "dimension_1 < 0.7"
>> 344:         action: "VETO - Immediate rejection"
   345: 
   346:   decision_tree:
```
*(bloco/entidade: `- condition: "dimension_1 < 0.7"`)*

### squads/squad-creator/data/best-practices.md:354
```
   352:   output:
   353:     type: "decision"
>> 354:     values: ["APPROVE", "REVIEW", "VETO"]
   355: 
   356:   failure_modes:
```
*(bloco/entidade: `output`)*

### squads/squad-creator/data/best-practices.md:381
```
   379: veto_conditions:
   380:   - condition: "end_state_vision_clarity < 0.7"
>> 381:     action: "VETO - Vision unclear"
   382: ```
   383: 
```
*(bloco/entidade: `- condition: "end_state_vision_clarity < 0.7"`)*

### squads/squad-creator/data/best-practices.md:392
```
   390: ```yaml
   391: weights:
>> 392:   truthfulness_coherence: 1.0  # VETO power
   393:   system_adherence_potential: 0.8
   394:   technical_skill: 0.3
   395: 
   396: veto_conditions:
   397:   - condition: "truthfulness_coherence < 0.7"
>> 398:     action: "VETO - REJECT/REMOVE immediately"
   399: ```
   400: 
```
*(bloco/entidade: `weights`)*

### squads/squad-creator/data/core-heuristics.md:51
```
   49:     veto_conditions:
   50:       - condition: "vision_clarity < 0.7"
>> 51:         action: "VETO - Vision unclear, requires clarification"
   52: 
   53:   output:
   54:     type: "decision"
>> 55:     values: ["PRIORITIZE", "CONSIDER", "DEFER", "VETO"]
   56: ```
   57: 
```
*(bloco/entidade: `- condition: "vision_clarity < 0.7"`)*

### squads/squad-creator/data/core-heuristics.md:66
```
   64: [1] Avaliar Vision Clarity
   65:     |
>> 66:     +-- vision_clarity < 0.7? --> VETO (parar, clarificar visao)
   67:     |
   68:     v
```
*(bloco/entidade: `[1] Avaliar Vision Clarity`)*

### squads/squad-creator/data/core-heuristics.md:91
```
   89: | Criterio | Peso | Threshold | Descricao |
   90: |----------|------|-----------|-----------|
>> 91: | End State Vision | 0.9 | 0.7 (veto) | Quao claramente a task contribui para o objetivo final |
   92: | Market Signals | 0.1 | N/A | Urgencia baseada em sinais externos (competidores, mercado) |
>> 93: | Vision Clarity | N/A | 0.7 (veto) | Clareza da visao do projeto/squad |
   94: 
   95: **Scoring Guide:**
```

### squads/squad-creator/data/core-heuristics.md:108
```
   106: | Modo de Falha | Trigger | Deteccao | Recuperacao | Prevencao |
   107: |---------------|---------|----------|-------------|-----------|
>> 108: | Vision Drift | Execucao sem clareza de visao | Tasks desconectadas do objetivo | Parar, re-alinhar com stakeholder | Aplicar veto condition sempre |
   109: | Market Over-reaction | Priorizar sinais sobre visao | Mudanca frequente de direcao | Reduzir peso de market_signals | Manter end_state_vision em 0.9 |
   110: | False Urgency | Score inflado artificialmente | Tasks "urgentes" sem impacto | Revisar historico de priorizacao | Validar score com segundo avaliador |
```

### squads/squad-creator/data/core-heuristics.md:143
```
   141:     vision_clarity: 0.5     # Visao do projeto confusa
   142: 
>> 143:   decision: "VETO"
   144:   rationale: "vision_clarity (0.5) < 0.7. Parar e clarificar visao do projeto antes de prosseguir."
   145: ```
```
*(bloco/entidade: `evaluation`)*

### squads/squad-creator/data/decision-heuristics-framework.md:37
```
   35:   veto_conditions:
   36:     - condition: "criterion_1 < 0.7"
>> 37:       action: "VETO - Return to previous phase"
   38:     - condition: "critical_check = false"
>> 39:       action: "VETO - Cannot proceed"
   40: 
>> 41:   # What to do when veto triggers
   42:   feedback_on_failure:
   43:     - "Specific remediation step 1"
```
*(bloco/entidade: `- condition: "criterion_1 < 0.7"`)*

### squads/squad-creator/data/decision-heuristics-framework.md:49
```
   47:   output:
   48:     type: "decision"
>> 49:     values: ["APPROVE", "REVIEW", "VETO"]
   50: ```
   51: 
```
*(bloco/entidade: `output`)*

### squads/squad-creator/data/decision-heuristics-framework.md:61
```
   59: PRIMARY BRANCH (highest priority):
   60:   IF (critical_condition_violated)
>> 61:     THEN VETO → immediate action
   62: 
   63: SECONDARY BRANCH:
```
*(bloco/entidade: `IF (critical_condition_violated)`)*

### squads/squad-creator/data/decision-heuristics-framework.md:101
```
   99:   veto_conditions:
   100:     - condition: "vision_clarity < 0.7"
>> 101:       action: "VETO - Vision unclear, return to Discovery"
   102: 
   103:   decision_tree: |
```
*(bloco/entidade: `- condition: "vision_clarity < 0.7"`)*

### squads/squad-creator/data/decision-heuristics-framework.md:124
```
   122: 
   123:   weights:
>> 124:     consistency: 1.0           # VETO power
   125:     system_fit: 0.8
   126:     capability: 0.3
```
*(bloco/entidade: `weights`)*

### squads/squad-creator/data/hybridops-patterns.md:96
```
   94: ## ÍNDICE DE PATTERNS
   95: 
>> 96: 1. [Veto Conditions Patterns](#veto-conditions-patterns)
   97: 2. [Task Anatomy Patterns (8 Campos)](#task-anatomy-patterns-8-campos)
   98: 3. [Heuristics Patterns (PV_BS_001, PV_PA_001, PV_PM_001)](#heuristics-patterns)
```

### squads/squad-creator/data/hybridops-patterns.md:106
```
   104: ---
   105: 
>> 106: ## VETO CONDITIONS PATTERNS
   107: 
   108: ### HO-VC-001: Veto Condição - Visão Estratégica Incompleta
```

### squads/squad-creator/data/hybridops-patterns.md:119
```
   117: veto_trigger:
   118:   condition: "end_state_vision_clarity < 0.7"
>> 119:   action: "VETO - Vision unclear, return to Discovery"
   120:   severity: "BLOCKING"
   121:   recovery: "Clarify end-state vision before proceeding"
```
*(bloco/entidade: `veto_trigger`)*

### squads/squad-creator/data/hybridops-patterns.md:142
```
   140: - APPROVE: Proceed to Architecture
   141: - REVIEW: Clarify vision with team
>> 142: - VETO: Return to Discovery phase
   143: 
   144: ---
```

### squads/squad-creator/data/hybridops-patterns.md:157
```
   155: veto_conditions:
   156:   - condition: "truthfulness_coherence < 0.7"
>> 157:     action: "VETO - REJECT/REMOVE immediately"
   158:     severity: "CRITICAL"
   159:   - condition: "detected_incoherence = true"
>> 160:     action: "VETO - Trust breach, cannot proceed"
   161:     severity: "CRITICAL"
   162: ```
```
*(bloco/entidade: `- condition: "truthfulness_coherence < 0.7"`)*

### squads/squad-creator/data/mental-model-task-matrix.yaml:75
```
   73:         step: "Gate"
   74:         step_name: "FRAMEWORK_HANDOFF_READY"
>> 75:         checkpoint_type: "veto"
   76:         question: "Insumos como um TODO trazem clareza ou confusão?"
   77:         action_if_pass: "HANDOFF para PV"
```
*(bloco/entidade: `- task: "validate-extraction"`)*

### squads/squad-creator/data/mental-model-task-matrix.yaml:119
```
   117:         step: 1
   118:         step_name: "Fidelity Score"
>> 119:         checkpoint_type: "veto"
   120:         question: "Clone soa como a PESSOA ou como IA genérica?"
   121:         action_if_pass: "Prosseguir avaliação"
>> 122:         action_if_fail: "VETO - buscar mais fontes ouro antes de continuar"
   123:         rationale: "Clone genérico = falha de autenticidade na raiz."
   124: 
```
*(bloco/entidade: `- task: "an-validate-clone"`)*

### squads/squad-creator/data/mental-model-task-matrix.yaml:318
```
   316:         question: "4 testes aplicados em sequência? (Impacto → Singularidade → Valor → Genialidade)"
   317:         action_if_pass: "Classificação válida"
>> 318:         action_if_fail: "VETO - task É o Pareto ao Cubo, não pode pular o framework"
   319:         rationale: "Esta task É a implementação do modelo. Sem framework = sem task."
   320: 
```
*(bloco/entidade: `- task: "find-0.8"`)*

### squads/squad-creator/data/mental-model-task-matrix.yaml:333
```
   331:         step: "Item 7"
   332:         step_name: "Pareto ao Cubo Aplicado"
>> 333:         checkpoint_type: "veto"
   334:         question: "0.8% do expert está identificado e documentado?"
   335:         action_if_pass: "Handoff pode prosseguir"
>> 336:         action_if_fail: "VETO - executar find-0.8 antes de handoff"
   337:         rationale: "Sem identificar genialidade = clone mediano."
   338: 
```
*(bloco/entidade: `- task: "validate-extraction"`)*

### squads/squad-creator/data/mental-model-task-matrix.yaml:669
```
   667: 
   668: # ==========================================
>> 669: # VETO CONDITIONS (da matriz)
   670: # ==========================================
   671: 
```

### squads/squad-creator/data/pm-best-practices.md:353
```
   351: prd_trigger:
   352:   condition: "workflows_mapped >= 10 OR agents_needed >= 8"
>> 353:   action: "VETO direct creation, require PRD"
   354: 
   355:   workflow:
```
*(bloco/entidade: `prd_trigger`)*

### squads/squad-creator/data/pv-meta-axiomas.yaml:12
```
   10:   overall_threshold: 7.0
   11:   minimum_per_dimension: 6.0
>> 12:   veto_on_failure: false  # Default REVIEW, não VETO
   13: 
   14: dimensions:
```
*(bloco/entidade: `scoring`)*

### squads/squad-creator/data/pv-output-examples.yaml:12
```
   10:       Deixa eu ver aqui... tá, primeira coisa:
   11: 
>> 12:       **Onde estão as veto conditions?**
   13: 
   14:       Eu vejo checkpoints, mas não vejo o que IMPEDE de passar se não estiver certo.
```
*(bloco/entidade: `output: |`)*

### squads/squad-creator/data/pv-output-examples.yaml:24
```
   22:       veto_conditions:
   23:         - condition: "sources.count < 5"
>> 24:           action: "VETO - Return to research"
   25:         - condition: "voice_dna.vocabulary.always_use.count < 8"
>> 26:           action: "VETO - Cannot proceed to next phase"
   27:       ```
   28: 
```
*(bloco/entidade: `- condition: "sources.count < 5"`)*

### squads/squad-creator/data/pv-output-examples.yaml:60
```
   58:       ```
   59: 
>> 60:       2. Se match >= 60%, VETO no CREATE:
   61:       ```yaml
   62:       veto_conditions:
   63:         - condition: "registry_match >= 0.6 AND decision == 'CREATE'"
>> 64:           action: "VETO - Must ADAPT existing task, not CREATE"
   65:           message: "Similar task found: {matched_task}. Adapte, não crie."
   66:       ```
```

### squads/squad-creator/data/pv-output-examples.yaml:219
```
   217:       Quer que eu detalhe algum ponto específico?
   218: 
>> 219:   - input: "Preciso criar veto conditions pra esse epic"
   220:     output: |
>> 221:       Boa, veto conditions são o coração do processo absolutista.
   222: 
>> 223:       **Estrutura de uma veto condition:**
   224: 
   225:       ```yaml
```

### squads/squad-creator/data/pv-output-examples.yaml:230
```
   228:           condition: "Descrição clara do que está errado"
   229:           check: "Comando ou verificação que detecta"
>> 230:           action: "VETO - O que fazer"
   231:       ```
   232: 
```
*(bloco/entidade: `- id: V{story}.{number}  # Ex: V1.1, V2.3`)*

### squads/squad-creator/data/pv-workflow-validation.yaml:205
```
   203:       echo "✅ Check 1: File exists"
   204:     else
>> 205:       echo "❌ VETO: File not found"
   206:       ERRORS=$((ERRORS+1))
   207:     fi
```
*(bloco/entidade: `else`)*

### squads/squad-creator/data/pv-workflow-validation.yaml:213
```
   211:       echo "✅ Check 2: Section present"
   212:     else
>> 213:       echo "❌ VETO: Section missing"
   214:       ERRORS=$((ERRORS+1))
   215:     fi
```
*(bloco/entidade: `else`)*

### squads/squad-creator/data/pv-workflow-validation.yaml:225
```
   223:       exit 1
   224:     fi
>> 225:   principle: "Script exit 0 = aprovado. Exit non-zero = VETO."
   226: 
   227: # ═══════════════════════════════════════════════════════════════════════════════
```

### squads/squad-creator/data/pv-workflow-validation.yaml:252
```
   250:         - "Feedback loop acionado"
   251:         - "Max retries respeitado"
>> 252:         - "HALT com mensagem clara"
   253: 
   254: # ═══════════════════════════════════════════════════════════════════════════════
```
*(bloco/entidade: `verification`)*

### squads/squad-creator/data/quality-dimensions-framework.md:31
```
   29:     overall_threshold: 7.0
   30:     minimum_per_dimension: 6.0
>> 31:     veto_on_failure: false  # Default to REVIEW, not VETO
   32: 
   33:   dimensions:
```
*(bloco/entidade: `scoring`)*

### squads/squad-creator/data/quality-dimensions-framework.md:109
```
   107: ## 3. Dimension Details
   108: 
>> 109: ### 3.1 Accuracy (Weight: 1.0, VETO)
   110: 
   111: **Definition:** Correctness verified by data/evidence.
```

### squads/squad-creator/data/tool-evaluation-framework.md:30
```
   28: 2. **Contexto de Domínio** - Ferramentas de nicho competem com ferramentas de nicho
   29: 3. **Segurança é Factual** - CVE crítica é CVE crítica (único absoluto aceitável)
>> 30: 4. **Nenhum VETO Prematuro** - Projetos pequenos podem ser a melhor opção
   31: 5. **Dados > Heurísticas** - Normalizar dentro do dataset encontrado
   32: 
```

### squads/squad-creator/data/tool-evaluation-framework.md:190
```
   188:         condition: "CVE crítica conhecida sem patch"
   189:         action: "FLAG - requer atenção humana"
>> 190:         note: "NÃO é VETO automático, mas destaque importante"
   191: 
   192:     - malware_history:
```
*(bloco/entidade: `- critical_cve_unpatched:`)*

### squads/squad-creator/data/tool-evaluation-framework.md:663
```
   661: ```yaml
   662: no_automatic_vetos: |
>> 663:   Em vez de VETO automático, usamos FLAGS que requerem atenção humana.
   664: 
   665:   Razão: Um projeto com "problema" pode ainda ser a melhor opção
```
*(bloco/entidade: `no_automatic_vetos: |`)*

### squads/squad-creator/docs/AGENT-COLLABORATION.md:109
```
   107: |---------|-----------|
   108: | **Ativação** | `@squad-creator:pedro-valerio` |
>> 109: | **Funções** | Design de workflows, veto conditions, automação, criação de artefatos |
   110: | **Recebe de** | @oalanicolas (insumos extraídos), @squad-chief (requests) |
   111: | **Entrega para** | @squad-chief (artefatos prontos) |
```

### squads/squad-creator/docs/AGENT-COLLABORATION.md:122
```
   120: *create-agent     - Criar agent a partir de DNA
   121: *audit            - Auditar processo/workflow
>> 122: *veto-check       - Verificar veto conditions
   123: ```
   124: 
```

### squads/squad-creator/docs/AGENT-COLLABORATION.md:169
```
   167: │  ├── @pedro-valerio cria artefatos:                                     │
   168: │  │   ├── Agents baseados nos DNAs                                       │
>> 169: │  │   ├── Tasks com veto conditions                                      │
   170: │  │   ├── Workflows com checkpoints                                      │
   171: │  │   └── Checklists de validação                                        │
```

### squads/squad-creator/docs/AGENT-COLLABORATION.md:313
```
   311: - < 5 signature phrases
   312: 
>> 313: **Se veto:** Devolve para @oalanicolas com lista do que falta.
   314: 
   315: ---
```

### squads/squad-creator/docs/AGENT-COLLABORATION.md:360
```
   358: | **Criar task.md** | - | - | ✅ |
   359: | **Criar workflow.yaml** | - | - | ✅ |
>> 360: | **Definir veto conditions** | - | - | ✅ |
   361: | **Auditar processo** | - | - | ✅ |
   362: | **Gerar config.yaml** | ✅ | - | - |
```

### squads/squad-creator/docs/ARCHITECTURE-DIAGRAMS.md:90
```
   88:             PV->>PV: Create tasks
   89:             PV->>PV: Create workflows
>> 90:             PV->>PV: Define veto conditions
   91:         end
   92:     end
```
*(bloco/entidade: `else Accept`)*

### squads/squad-creator/docs/COMMANDS.md:336
```
   334: | `*find-automation` | Identifica oportunidades de automação |
   335: | `*gap-analysis` | Análise de gaps em processos |
>> 336: | `*veto-check` | Define condições de veto |
   337: 
   338: **Quando usar:**
   339: - Design de workflows
   340: - Criação de checklists
>> 341: - Definição de veto conditions
   342: - Automação de processos
   343: - Validação de tasks
```

### squads/squad-creator/docs/COMMANDS.md:366
```
   364: │  → @pedro-valerio                                               │
   365: │                                                                 │
>> 366: │  "Quero adicionar veto conditions"                              │
   367: │  → @pedro-valerio                                               │
   368: │                                                                 │
```

### squads/squad-creator/docs/CONCEPTS.md:144
```
   142:       - "When in doubt, test"
   143:       - "Market > Copy"
>> 144:     veto:
   145:       - "Never sell to people who don't want to buy"
   146: 
```
*(bloco/entidade: `heuristics`)*

### squads/squad-creator/docs/CONCEPTS.md:492
```
   490: **Filosofia:** "A melhor coisa é impossibilitar caminhos errados"
   491: 
>> 492: **Comandos:** `*create-task`, `*create-workflow`, `*create-agent`, `*audit`, `*veto-check`
   493: 
   494: ### Fluxo de Colaboração
```

### squads/squad-creator/docs/CONCEPTS.md:564
```
   562: | Clone não soa autêntico | `@oalanicolas` |
   563: | Criar workflow | `@pedro-valerio` |
>> 564: | Definir veto conditions | `@pedro-valerio` |
   565: | Auditar processo | `@pedro-valerio` |
   566: | Criar squad completo | `@squad-chief` |
```

### squads/squad-creator/docs/FAQ.md:610
```
   608: | `@squad-chief` | Orquestração, triagem, criação, SOPs | `@squad-creator` |
   609: | `@oalanicolas` | Mind cloning, DNA extraction | `@squad-creator:oalanicolas` |
>> 610: | `@pedro-valerio` | Process design, veto conditions | `@squad-creator:pedro-valerio` |
   611: 
   612: ### Quando usar @squad-chief?
```

### squads/squad-creator/docs/FAQ.md:641
```
   639: Use **diretamente** quando o foco é **processos e artefatos**:
   640: - "Preciso criar um workflow multi-fase"
>> 641: - "Quero definir veto conditions"
   642: - "Audite esse processo existente"
   643: - "Crie um agent a partir desse DNA"
```

### squads/squad-creator/docs/FAQ.md:650
```
   648: - `*create-agent` - Criar agent a partir de DNA
   649: - `*audit` - Auditar processo/workflow
>> 650: - `*veto-check` - Verificar veto conditions
   651: 
   652: **Filosofia:** "A melhor coisa é impossibilitar caminhos errados"
```

### squads/squad-creator/docs/MIGRATION-PLAN-AGENT-CONFORMITY.md:310
```
   308:     description: "Auditar processo/workflow"
   309:     visibility: [full]
>> 310:   - name: "*veto-check"
>> 311:     description: "Verificar veto conditions"
   312:     visibility: [full]
   313:   - name: "*help"
```

### squads/squad-creator/docs/MIGRATION-PLAN-AGENT-CONFORMITY.md:337
```
   335: 
   336:       **Veto Conditions Propostas:**
>> 337:       - VETO se step 3 não tiver bloqueio físico para step 5
>> 338:       - VETO se handoff não tiver trigger automático
>> 339:       - VETO se checklist não estiver inline na task
   340: 
   341:       **Automações Recomendadas:**
```
*(bloco/entidade: `output: |`)*

### squads/squad-creator/docs/MIGRATION-PLAN-AGENT-CONFORMITY.md:373
```
   371: 
   372:         veto_conditions:
>> 373:           - SE período < 30 dias → VETO (amostra insuficiente)
>> 374:           - SE dashboard offline → VETO (aguardar restore)
   375: 
   376:         action_items:
```
*(bloco/entidade: `veto_conditions`)*

### squads/squad-creator/docs/MIGRATION-PLAN-AGENT-CONFORMITY.md:383
```
   381:       ```
   382: 
>> 383:       Task tem 8 campos obrigatórios + veto conditions. Pronta pra execução.
   384: 
>> 385:   - input: "*veto-check no processo de aprovação de budget"
   386:     output: |
   387:       ## Veto Check: Processo de Aprovação de Budget
```

### squads/squad-creator/docs/MIGRATION-PLAN-AGENT-CONFORMITY.md:393
```
   391:       | Pergunta | Resposta | Status |
   392:       |----------|----------|--------|
>> 393:       | Se executor não ler instruções, o que acontece? | Pode aprovar sem checklist | ❌ VETO |
>> 394:       | Se executor tentar pular step, consegue? | Sim, pode ir direto pra aprovação | ❌ VETO |
>> 395:       | Se executor errar, sistema detecta? | Não, só descobre depois | ❌ VETO |
>> 396:       | Handoff tem automação? | Não, é email manual | ❌ VETO |
   397: 
   398:       **Resultado: 4 VETOS**
```
*(bloco/entidade: `output: |`)*

### squads/squad-creator/docs/MIGRATION-ROADMAP-HYBRIDOPS.md:212
```
   210: 
   211: ## FASE 1: FOUNDATION (Semana 1)
>> 212: **Objetivo:** Estabelecer base de veto conditions e task anatomy
   213: 
   214: ### 1.1 Implementar Veto Conditions Framework
   215: 
>> 216: **Task:** Criar engine de veto conditions em quality gates
   217: 
   218: **Arquivos a criar:**
   219: ```
   220: squads/squad-creator/
   221: ├── config/
>> 222: │   └── veto-conditions.yaml       # Engine de veto (NEW)
   223: ├── checklists/
>> 224: │   └── veto-validation.md         # Checklist de veto (NEW)
   225: ```
   226: 
>> 227: **Estrutura `veto-conditions.yaml`:**
   228: ```yaml
   229: veto_engine:
```

### squads/squad-creator/docs/MIGRATION-ROADMAP-HYBRIDOPS.md:238
```
   236:       phase: "architecture"
   237:       trigger: "squad_vision_clarity < 0.7"
>> 238:       action: "VETO - Return to discovery"
   239:       severity: "BLOCKING"
   240:       source_pattern: "HO-VC-001"
```
*(bloco/entidade: `SC_VC_001`)*

### squads/squad-creator/docs/MIGRATION-ROADMAP-HYBRIDOPS.md:247
```
   245:       phase: "agent_design"
   246:       trigger: "agent_behavior_coherence < 0.7"
>> 247:       action: "VETO - Reject agent, redesign"
   248:       severity: "CRITICAL"
   249:       source_pattern: "HO-VC-002"
```
*(bloco/entidade: `SC_VC_002`)*

### squads/squad-creator/docs/MIGRATION-ROADMAP-HYBRIDOPS.md:256
```
   254:       phase: "workflow_design"
   255:       trigger: "guardrails_present = false"
>> 256:       action: "VETO - Define guardrails first"
   257:       severity: "BLOCKING"
   258:       required_guardrails:
```
*(bloco/entidade: `SC_VC_003`)*

### squads/squad-creator/docs/MIGRATION-ROADMAP-HYBRIDOPS.md:271
```
   269:       phase: "dna_extraction"
   270:       trigger: "source_quality_score < 0.6"
>> 271:       action: "VETO - Insufficient sources"
   272:       severity: "BLOCKING"
   273: 
```
*(bloco/entidade: `SC_VC_004`)*

### squads/squad-creator/docs/PATTERN-LIBRARY.md:11
```
   9: ## Overview
   10: 
>> 11: This document consolidates all patterns, heuristics, veto conditions, quality gates, and axiomas used by the Squad-Creator system.
   12: 
   13: **Config Files:**
   14: - `config/heuristics.yaml` - 3 decision heuristics (SC_HE_*)
>> 15: - `config/veto-conditions.yaml` - 10 veto conditions (SC_VC_*)
   16: - `config/axioma-validator.yaml` - 10 axioma dimensions (D1-D10)
   17: - `config/quality-gates.yaml` - 10 quality gates (QG-SC-*)
```

### squads/squad-creator/docs/PATTERN-LIBRARY.md:43
```
   41: ├── YES (score >= 7) → PROCEED
   42: ├── PARTIAL (score 5-6) → Document gaps, proceed with warning
>> 43: └── NO (score < 5) → VETO (SC_VC_002)
   44: ```
   45: 
```

### squads/squad-creator/docs/PATTERN-LIBRARY.md:54
```
   52: ├── Voice + Thinking DNA match → PASS
   53: ├── Minor inconsistencies → WARN, suggest fixes
>> 54: └── Major misalignment → VETO (SC_VC_005)
   55: ```
   56: 
```

### squads/squad-creator/docs/PATTERN-LIBRARY.md:82
```
   80: | SC_VC_005 | Agent Coherence | misalignment detected | Realign voice+thinking |
   81: | SC_VC_006 | Smoke Test | any smoke test fails | Fix and re-test |
>> 82: | SC_VC_007 | Guardrail Missing | no veto condition | Add veto conditions |
   83: | SC_VC_008 | Unidirectional Flow | flow allows backtrack | Redesign flow |
   84: | SC_VC_009 | Axioma Score | D1 < 7.0 | Improve truthfulness |
```

### squads/squad-creator/docs/PATTERN-LIBRARY.md:90
```
   88: 
   89: ```
>> 90: HARD VETO (immediate stop):
   91:   SC_VC_003 (Source Quality) - No sources = no clone
   92:   SC_VC_006 (Smoke Test) - Failed behavior = broken agent
   93:   SC_VC_009 (Axioma D1) - Truthfulness below threshold
   94: 
>> 95: SOFT VETO (warn, allow override):
   96:   SC_VC_001 (Domain Viability) - May proceed with reduced scope
   97:   SC_VC_010 (Task Anatomy) - May proceed with documentation
```

### squads/squad-creator/docs/PEDRO-VALERIO-ARCHITECTURE.md:13
```
   11: O Pedro Valério é um **clone de mente** (mind clone) que opera como agente especializado em:
   12: - Auditoria de processos e workflows
>> 13: - Design de veto conditions
   14: - Validação de compliance com IDS (Incremental Development System)
   15: - Identificação de automações faltando
```

### squads/squad-creator/docs/PEDRO-VALERIO-ARCHITECTURE.md:97
```
   95:   - voice_dna.anchor_words
   96:   - voice_dna.fixed_vocabulary
>> 97:   - heuristics.veto[*]
   98: 
   99: ATIVADO POR CONTEXTO:
```
*(bloco/entidade: `SEMPRE ATIVO (guia toda resposta):`)*

### squads/squad-creator/docs/PEDRO-VALERIO-ARCHITECTURE.md:172
```
   170:          │
   171:          ▼
>> 172: Output: Audit com veto conditions identificadas
   173: ```
   174: 
```

### squads/squad-creator/docs/PEDRO-VALERIO-ARCHITECTURE.md:382
```
   380: - `*find-automation` - Identificar automações faltando
   381: - `*gap-analysis` - Mapear gaps de tempo
>> 382: - `*veto-check` - Validar veto conditions
   383: 
   384: ### IDS (Incremental Development System)
```

### squads/squad-creator/docs/PEDRO-VALERIO-ARCHITECTURE.md:392
```
   390: - `*gate-classification` - Human-in-loop vs automático
   391: - `*agent-activation-check` - Validar --append-system-prompt
>> 392: - `*design-veto-conditions {epic/story}` - Criar veto conditions
   393: - `*validation-script {story}` - Gerar script bash
   394: - `*smoke-test-design {workflow}` - Desenhar smoke tests
```

### squads/squad-creator/docs/sop-extraction-process.md:300
```
   298: │  └────────────┴───────────┴──────────────┴───────────┴─────────┘ │
   299: │                                                                   │
>> 300: │  ⚠️ VETO CHECK: Tem guardrails?                                   │
   301: │     □ Loop Prevention    □ Idempotency    □ Audit Trail          │
   302: │     □ Escape Route       □ Retry Logic    □ Rollback             │
   303: │                                                                   │
>> 304: │  Se não tem guardrails → VETO (não automatizar)                   │
   305: └──────────────────────────────────────────────────────────────────┘
   306: ```
```

### squads/squad-creator/docs/sop-extraction-process.md:317
```
   315: | Low (<2x/mo) | High | Any | **KEEP_MANUAL** (risk doesn't justify) |
   316: | Low (<2x/mo) | Low | Any | **ELIMINATE** (question necessity) |
>> 317: | Any | Any | No guardrails | **VETO** (never automate without safeguards) |
   318: 
   319: **Mandatory Guardrails:**
```

### squads/squad-creator/docs/sop-extraction-process.md:358
```
   356: | # | Dimension | Weight | Threshold | Description |
   357: |---|-----------|--------|-----------|-------------|
>> 358: | 1 | **Truthfulness** | 1.0 | 7.0 | Process described accurately? (VETO if <7) |
   359: | 2 | **Coherence** | 0.9 | 6.0 | Steps align logically? |
   360: | 3 | **Strategic Alignment** | 0.9 | 6.0 | Serves business goals? |
```

### squads/squad-creator/docs/sop-extraction-process.md:372
```
   370: - Overall Score: ≥7.0 to proceed
   371: - Per Dimension: ≥6.0 (except Innovation/Adaptability: ≥5.0)
>> 372: - Truthfulness: VETO if <7.0
   373: 
   374: ---
```

### squads/squad-creator/docs/sop-extraction-process.md:445
```
   443:     - id: CP1
   444:       after_task: "[task-name]"
>> 445:       type: validation | approval | veto
   446:       validator: human | @agent
   447:       criteria: "[approval criteria]"
```
*(bloco/entidade: `- id: CP1`)*

### squads/squad-creator/docs/squad-chief-agent-flow.md:19
```
   17: 4. [Mapeamento de Comandos](#mapeamento-de-comandos)
   18: 5. [Integrações entre Agentes](#integrações-entre-agentes)
>> 19: 6. [Veto Conditions](#veto-conditions)
   20: 7. [Configuração](#configuração)
   21: 8. [Modos de Execução](#modos-de-execução)
```

### squads/squad-creator/docs/squad-chief-agent-flow.md:66
```
   64: - "tier - not level or rank"
   65: - "checkpoint - not review or check"
>> 66: - "veto condition - not blocker or issue"
   67: - "heuristic - not rule or guideline"
   68: - "quality gate - not validation or test"
```

### squads/squad-creator/docs/squad-chief-agent-flow.md:260
```
   258:         B --> C["Execute generate-squad-greeting.js"]
   259:         C --> D["Exibe Greeting + Commands"]
>> 260:         D --> E["HALT - Aguarda Usuário"]
   261:     end
   262: 
```
*(bloco/entidade: `subgraph ACTIVATION["ATIVAÇÃO DO AGENTE"]`)*

### squads/squad-creator/docs/squad-chief-agent-flow.md:528
```
   526: | @squad-chief | @oalanicolas | "clone mind {name}" | Extract Voice + Thinking DNA |
   527: | @oalanicolas | @squad-chief | DNA complete | Continue agent creation |
>> 528: | @squad-chief | @pedro-valerio | "validate workflow" | Audit for veto conditions |
   529: | @pedro-valerio | @squad-chief | Audit report | Apply fixes or approve |
   530: | @squad-chief | @tim-ferriss | "deconstruct {system}" | Extract frameworks |
```

### squads/squad-creator/docs/squad-chief-agent-flow.md:538
```
   536: |---------|---------|---------|
   537: | Mind cloning, DNA extraction | "clone mind", "extract DNA", "fidelity" | @oalanicolas |
>> 538: | Workflow design, process validation | "validate workflow", "veto conditions", "checkpoint" | @pedro-valerio |
   539: | Deconstruction, framework extraction | "deconstruct", "extract framework" | @tim-ferriss |
   540: | Deep validation beyond standard gates | "deep audit", "comprehensive validation" | @qa-architect |
```

### squads/squad-creator/docs/squad-creation-pipeline-workflow.md:20
```
   18: Garantir que squads sejam criados com:
   19: 1. **Conhecimento autêntico** - Extraído de fontes reais, não inventado
>> 20: 2. **Processos à prova de erro** - Operacionalizados com veto conditions
   21: 3. **Rastreabilidade completa** - Citações, fontes, e validações documentadas
   22: 
```

### squads/squad-creator/docs/squad-creation-pipeline-workflow.md:168
```
   166: 
   167:     Knowledge --> Handoff_AN_PV: Artifacts ready
>> 168:     Handoff_AN_PV --> Knowledge: VETO - falta citação
   169:     Handoff_AN_PV --> Operationalization: APPROVED
   170: 
```
*(bloco/entidade: `stateDiagram-v2`)*

### squads/squad-creator/docs/squad-creation-pipeline-workflow.md:743
```
   741: ```
   742: 
>> 743: ### Condições de Bloqueio (HALT)
   744: 
>> 745: O workflow deve HALT quando:
   746: 
   747: 1. **Sources insuficientes** - Expert não tem material público suficiente
```

### squads/squad-creator/docs/squad-creation-pipeline-workflow.md:809
```
   807: 2. Buscar entrevistas em profundidade
   808: 3. Verificar se expert tem livros/artigos
>> 809: 4. Considerar HALT se expert muito tácito
   810: 
   811: #### 2. Extração fica em loop
```

### squads/squad-creator/docs/validation-report-2026-02-01.md:355
```
   353: | Operational Excellence | 0.20 | 10/10 | 2.00 | Granular validation system with 50+ checks |
   354: | Innovation Capacity | 0.10 | 10/10 | 1.00 | Extensible validation framework |
>> 355: | Risk Management | 0.10 | 10/10 | 1.00 | Quality gates with veto conditions |
   356: | Resource Optimization | 0.05 | 10/10 | 0.50 | Efficient component reuse |
   357: | Stakeholder Value | 0.05 | 10/10 | 0.50 | High value for squad creators |
```

### squads/squad-creator/minds/oalanicolas/artifacts/HANDOFF_PROTOCOL.md:231
```
   229: | trinity incomplete | AN_VC_002 | LOOP - complete component |
   230: | unvalidated inferences | AN_VC_004 | LOOP - validate or remove |
>> 231: | handoff without checklist | AN_VC_005 | HARD VETO |
   232: 
   233: ---
```

### squads/squad-creator/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md:99
```
   97: 
   98: maximum_ratio: "40% bronze no total"
>> 99: veto_trigger: "> 50% bronze = VETO"
   100: ```
   101: 
```

### squads/squad-creator/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md:157
```
   155:     green: ">= 0.7"   # Proceed confidently
   156:     yellow: "0.6-0.7" # Proceed with caution
>> 157:     red: "< 0.6"      # VETO - curate more
   158: 
   159:   action_on_red:
```
*(bloco/entidade: `thresholds`)*

### squads/squad-creator/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md:200
```
   198: | Condition | Action | Recovery |
   199: |-----------|--------|----------|
>> 200: | ouro_ratio < 0.6 | VETO | Curate more ouro sources |
>> 201: | zero ouro sources | HARD VETO | Cannot proceed |
>> 202: | > 50% tier 2b | VETO | Eliminate low quality |
>> 203: | any tier 3 in final set | VETO | Remove immediately |
   204: 
   205: ---
```

### squads/squad-creator/minds/oalanicolas/artifacts/SOURCE_CLASSIFICATION.md:236
```
   234: ```yaml
   235: project: "Generic Business Clone"
>> 236: status: "VETO"
   237: 
   238: sources:
```

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_001.md:54
```
   52:   veto_conditions:
   53:     - condition: "citations < 15"
>> 54:       action: "VETO - Insufficient citations"
   55:       maps_to: "AN_VC_004"
   56:     - condition: "ouro_ratio < 0.6"
>> 57:       action: "VETO - Too much bronze"
   58:       maps_to: "AN_VC_003"
   59:     - condition: "trinity_incomplete"
>> 60:       action: "VETO - Missing Playbook, Framework, or Swipe"
   61:       maps_to: "AN_VC_002"
   62: 
   63:   output:
   64:     type: "decision"
>> 65:     values: ["APPROVE", "REVIEW", "VETO"]
   66:     handoff_to: "@pedro-valerio"
   67:     handoff_format: "INSUMOS_READY"
```
*(bloco/entidade: `- condition: "citations < 15"`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_001.md:80
```
   78: 
   79: ELSE IF (source_quality < 0.6)
>> 80:   THEN VETO → Return to source curation
   81: 
   82: TERMINATION: Handoff approved with INSUMOS_READY format
```
*(bloco/entidade: `ELSE IF (source_quality < 0.6)`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_001.md:150
```
   148:   veto_conditions:
   149:     - condition: "self_validation_failed"
>> 150:       action: "HALT - Loop back to weakest step"
   151: 
   152:   validation_questions:
```
*(bloco/entidade: `- condition: "self_validation_failed"`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_002.md:73
```
   71:   veto_conditions:
   72:     - condition: "any_component_missing"
>> 73:       action: "VETO - Complete trinity before handoff"
   74:       maps_to: "AN_VC_002"
   75:     - condition: "playbook_only"
>> 76:       action: "VETO - Adicionar framework antes"
   77:     - condition: "framework_without_examples"
   78:       action: "REVIEW - Buscar swipe file"
```
*(bloco/entidade: `- condition: "any_component_missing"`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_002.md:95
```
   93: 
   94: ELSE IF (has_playbook AND NOT has_framework)
>> 95:   THEN VETO → Extract decision rules first
   96: 
   97: ELSE IF (NOT has_playbook)
>> 98:   THEN VETO → Start with step-by-step extraction
   99: 
   100: TERMINATION: All three components documented with [SOURCE:]
```
*(bloco/entidade: `ELSE IF (has_playbook AND NOT has_framework)`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_002.md:167
```
   165:   framework_check:
   166:     - "Tem regras SE/ENTÃO?"
>> 167:     - "Tem veto conditions?"
   168:     - "Decision tree está documentado?"
   169: 
```
*(bloco/entidade: `framework_check`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_003.md:101
```
   99:       action: "REVIEW - Apply Pareto ao Cubo before proceeding"
   100:     - condition: "zone_80_prioritized"
>> 101:       action: "VETO - Eliminar antes de continuar"
   102: 
   103:   output:
```
*(bloco/entidade: `- condition: "zone_80_prioritized"`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_004.md:61
```
   59:   veto_conditions:
   60:     - condition: "proposal_without_discovery"
>> 61:       action: "VETO - Map existing first"
   62:       maps_to: "AN_VC_006"
   63:     - condition: "create_when_similar_exists"
>> 64:       action: "VETO - Extend existing instead"
   65:       maps_to: "AN_VC_006"
   66: 
```
*(bloco/entidade: `- condition: "proposal_without_discovery"`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_005.md:75
```
   73:   veto_conditions:
   74:     - condition: "llm_when_code_suffices"
>> 75:       action: "VETO - Use deterministic solution"
   76:       maps_to: "AN_VC_007"
   77: 
```
*(bloco/entidade: `- condition: "llm_when_code_suffices"`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_006.md:78
```
   76:   veto_conditions:
   77:     - condition: "debug_without_verification"
>> 78:       action: "VETO - Verify physically first"
   79:       maps_to: "AN_VC_007"
   80:     - condition: "assume_without_checking"
>> 81:       action: "VETO - Check, don't assume"
   82:       maps_to: "AN_VC_007"
   83: ```
```
*(bloco/entidade: `- condition: "debug_without_verification"`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_007.md:76
```
   74:   veto_conditions:
   75:     - condition: "create_without_search"
>> 76:       action: "VETO - Search first"
   77:       maps_to: "AN_VC_006"
   78:     - condition: "create_when_80_percent_exists"
>> 79:       action: "VETO - Use existing"
   80:       maps_to: "AN_VC_006"
   81: 
```
*(bloco/entidade: `- condition: "create_without_search"`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_008.md:70
```
   68:   veto_conditions:
   69:     - condition: "ignore_repeated_correction"
>> 70:       action: "VETO - Document as rule now"
   71:       maps_to: "AN_VC_008"
   72: ```
```
*(bloco/entidade: `- condition: "ignore_repeated_correction"`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_008.md:82
```
   80: | IF/THEN | "When Z, do W" (2x) | IF Z → THEN W |
   81: | PRIORITY | "A before B" (2x) | PRIORITY: A > B |
>> 82: | VETO | "Stop if X" (2x) | VETO: X → STOP |
   83: 
   84: ## Decision Tree
```

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_008.md:103
```
   101:    - Clear trigger
   102:    - Specific action
>> 103:    - Category (NEVER/ALWAYS/IF-THEN/PRIORITY/VETO)
   104: ```
   105: 
```
*(bloco/entidade: `3. Rule documentation format:`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_008.md:118
```
   116: 
   117:   rule_format:
>> 118:     category: "NEVER | ALWAYS | IF-THEN | PRIORITY | VETO"
   119:     trigger: "When this happens..."
   120:     action: "Do this..."
```
*(bloco/entidade: `rule_format`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_009.md:106
```
   104:   veto_conditions:
   105:     - condition: "skip_verify"
>> 106:       action: "VETO - Verify first"
   107:     - condition: "skip_reuse_check"
>> 108:       action: "VETO - Check existing first"
   109:     - condition: "skip_validation"
>> 110:       action: "VETO - Test before delivering"
   111: ```
   112: 
```
*(bloco/entidade: `- condition: "skip_verify"`)*

### squads/squad-creator/minds/oalanicolas/heuristics/AN_KE_010.md:222
```
   220:   veto_conditions:
   221:     - condition: "anti_patterns_detected > 0"
>> 222:       action: "HALT - Expand implicit references"
   223:     - condition: "checklist_pass_rate < 0.6"
>> 224:       action: "HALT - Major rewrite needed"
   225: 
   226:   pass_action: "Document approved for handoff/storage"
```
*(bloco/entidade: `- condition: "anti_patterns_detected > 0"`)*

### squads/squad-creator/minds/pedro_valerio/artifacts/META_AXIOMAS.md:25
```
   23:     overall_threshold: 7.0
   24:     minimum_per_dimension: 6.0
>> 25:     veto_on_failure: false  # Default to REVIEW, not VETO
   26: 
   27:   dimensions:
```
*(bloco/entidade: `scoring`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_BS_001.md:31
```
   29:   veto_conditions:
   30:     - condition: "end_state_vision_clarity < 0.7"
>> 31:       action: "VETO - Vision unclear, return to Discovery"
   32:     - condition: "strategic_priority_score < 0.5"
   33:       action: "REVIEW - Alignment questionable"
```
*(bloco/entidade: `- condition: "end_state_vision_clarity < 0.7"`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_BS_001.md:42
```
   40:   output:
   41:     type: "decision"
>> 42:     values: ["APPROVE", "REVIEW", "VETO"]
   43: ```
   44: 
```
*(bloco/entidade: `output`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_BS_001.md:49
```
   47: **Input:** Architecture design proposal, process blueprint, system design
   48: **Process:** Evaluate against end-state vision using weighted criteria
>> 49: **Output:** APPROVE | REVIEW | VETO
   50: 
   51: ## Decision Tree
```

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_BS_001.md:130
```
   128:   veto_conditions:
   129:     - condition: "end_state_vision_clarity < 0.7"
>> 130:       action: "HALT - Vision unclear, return to Discovery"
   131: 
   132:   validation_questions:
```
*(bloco/entidade: `- condition: "end_state_vision_clarity < 0.7"`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PA_001.md:10
```
   8: ## Purpose
   9: 
>> 10: Coherence validation for executor assignments and people assessment. Evaluates truthfulness, system adherence potential, and technical skills with truthfulness having VETO power.
   11: 
   12: ## Configuration
```

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PA_001.md:21
```
   19: 
   20:   weights:
>> 21:     truthfulness_coherence: 1.0  # VETO power
   22:     system_adherence_potential: 0.8
   23:     technical_skill: 0.3
```
*(bloco/entidade: `weights`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PA_001.md:32
```
   30:   veto_conditions:
   31:     - condition: "truthfulness_coherence < 0.7"
>> 32:       action: "VETO - REJECT/REMOVE immediately"
   33:     - condition: "detected_incoherence = true"
>> 34:       action: "VETO - Trust violation, cannot proceed"
   35: 
   36:   fallback_mechanisms:
```
*(bloco/entidade: `- condition: "truthfulness_coherence < 0.7"`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PA_001.md:42
```
   40:   output:
   41:     type: "decision"
>> 42:     values: ["APPROVE", "REVIEW", "VETO"]
   43: ```
   44: 
```
*(bloco/entidade: `output`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PA_001.md:49
```
   47: **Input:** Executor assignment proposals, role definitions, team roster
   48: **Process:** Evaluate each executor against coherence criteria
>> 49: **Output:** APPROVE | REVIEW | VETO
   50: 
   51: ## Decision Tree
```

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PM_001.md:24
```
   22:     task_automatability: 0.8
   23:     task_frequency: 0.7
>> 24:     guardrails_present: 1.0  # VETO power
   25: 
   26:   thresholds:
```
*(bloco/entidade: `weights`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PM_001.md:34
```
   32:   veto_conditions:
   33:     - condition: "guardrails_missing = true"
>> 34:       action: "VETO - Define safety guardrails first"
   35:     - condition: "frequency < 1x per month AND impact < 0.5"
>> 36:       action: "VETO - Not worth automating"
   37: 
   38:   output:
```
*(bloco/entidade: `- condition: "guardrails_missing = true"`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PM_001.md:166
```
   164:   veto_conditions:
   165:     - condition: "guardrails_missing"
>> 166:       action: "VETO - Define safety guardrails first"
   167: 
   168:   validation_questions:
```
*(bloco/entidade: `- condition: "guardrails_missing"`)*

### squads/squad-creator/minds/pedro_valerio/heuristics/PV_PM_001.md:186
```
   184: | Low (<2x/month) | High | Any | **KEEP_MANUAL** (judgment needed) |
   185: | Low | Low | Any | **ELIMINATE** |
>> 186: | Any | Any | Any (no guardrails) | **VETO** - add guardrails first |
   187: 
   188: ---
```

### squads/squad-creator/README.md:264
```
   262: | **Orch** | **squad-chief** | Orquestração + Triagem + SOP | Ponto de entrada, criar squads, extrair SOPs |
   263: | **1** | **oalanicolas** | Mind Cloning | Extrair DNA, curar fontes, validar fidelidade |
>> 264: | **1** | **pedro-valerio** | Process Design | Validar workflows, criar checklists, veto conditions |
   265: 
   266: ### Divisão de Responsabilidades
```

### squads/squad-creator/scripts/coherence-validator.py:15
```
   13: Source configs:
   14: - config/heuristics.yaml (SC_HE_001-003 + AN_HE_001-003)
>> 15: - config/veto-conditions.yaml (SC_VC_001-010 + AN_VC_001-005)
   16: - config/axioma-validator.yaml (D1-D10)
   17: - config/quality-gates.yaml (QG-SC-*)
```

### squads/squad-creator/scripts/coherence-validator.py:50
```
   48: 
   49: COHERENCE_RULES = {
>> 50:     # Each heuristic MUST have at least one veto condition
   51:     "heuristic_veto_coverage": {
   52:         "min_veto_per_heuristic": 1,
```
*(bloco/entidade: `COHERENCE_RULES = {`)*

### squads/squad-creator/scripts/coherence-validator.py:143
```
   141: ) -> Dict[str, Any]:
   142:     """
>> 143:     Validate that each heuristic has at least one veto condition.
   144:     Rule: heuristic_veto_coverage
   145: 
   146:     Structure expected:
   147:     - heuristics.yaml: heuristics_engine.SC_HE_001-003 + AN_HE_001-003
   148:     - Each heuristic has veto_conditions[].maps_to pointing to SC_VC_* or AN_VC_*
>> 149:     - veto-conditions.yaml: veto_engine.conditions.SC_VC_001-010 + AN_VC_001-005
   150: 
   151:     Agents:
```
*(bloco/entidade: `) -> Dict[str, Any]:`)*

### squads/squad-creator/scripts/coherence-validator.py:166
```
   164:         result["checks"].append({
   165:             "status": "skip",
>> 166:             "message": "Missing heuristics.yaml or veto-conditions.yaml"
   167:         })
   168:         return result
```
*(bloco/entidade: `result["checks"].append({`)*

### squads/squad-creator/scripts/coherence-validator.py:185
```
   183:                 veto_conds = value.get("veto_conditions", [])
   184:                 if isinstance(veto_conds, list) and len(veto_conds) > 0:
>> 185:                     # Check if any veto condition has maps_to
   186:                     for vc in veto_conds:
   187:                         if isinstance(vc, dict) and vc.get("maps_to"):
```
*(bloco/entidade: `if isinstance(veto_conds, list) and len(veto_conds) > 0:`)*

### squads/squad-creator/skills/squad.md:49
```
   47:     description: |
   48:       Process absolutist. Invoke for workflow validation and audit.
>> 49:       Ensures zero wrong paths possible. Validates veto conditions,
   50:       unidirectional flow, and checkpoint coverage.
   51:     model: opus
```
*(bloco/entidade: `description: |`)*

### squads/squad-creator/tasks/an-diagnose-clone.md:21
```
   19: - "Nao parece a pessoa" → fontes bronze ou sem Voice DNA
   20: - "Se perde em conversas longas" → prompt monolitico, precisa estagios
>> 21: - "Quebra facil" → sem veto conditions, immune system fraco
   22: - "Inventa coisas" → sem Swipe File, sem limites
   23: - "Muito robótico" → sem contradicoes produtivas, sem storytelling
```

### squads/squad-creator/tasks/an-diagnose-clone.md:45
```
   43: | Nao parece pessoa | Fontes bronze | Volume sem curadoria |
   44: | Se perde | Prompt monolitico | Sem estagios |
>> 45: | Quebra facil | Sem immune system | Sem veto conditions |
   46: | Inventa | Sem Swipe File | Sem exemplos reais |
   47: | Robótico | Sem paradoxos | Contradictions resolvidas |
```

### squads/squad-creator/tasks/an-diagnose-clone.md:86
```
   84: | Sem estagios | Mapear contextos, criar stages | ALTA |
   85: | Sem Swipe | Coletar exemplos reais | ALTA |
>> 86: | Sem immune | Definir veto conditions | MEDIA |
   87: | Sem paradoxos | Mapear contradictions produtivas | MEDIA |
   88: 
```

### squads/squad-creator/tasks/an-extract-framework.md:60
```
   58: - "Quando ele ve X, o que faz?" → regra condicional
   59: - "Como decide entre A e B?" → criterio
>> 60: - "O que NUNCA faria?" → veto condition
   61: 
   62: Template:
```

### squads/squad-creator/tasks/an-extract-framework.md:69
```
   67:       action: "ENTAO {decisao}"
   68:       rationale: "{por que}"
>> 69:   veto:
   70:     - condition: "SE {situacao}"
   71:       action: "NUNCA {acao proibida}"
```
*(bloco/entidade: `framework`)*

### squads/squad-creator/tasks/an-validate-clone.md:37
```
   35:   question: "Clone soa como a PESSOA ou como IA genérica?"
   36:   if_pessoa: "Prosseguir avaliação"
>> 37:   if_generico: "VETO - buscar mais fontes ouro antes de continuar"
   38:   rationale: "Clone genérico = falha de autenticidade na raiz. Não adianta avaliar layers."
   39: ```
```
*(bloco/entidade: `checkpoint_autenticidade_fidelity`)*

### squads/squad-creator/tasks/CHANGELOG.md:61
```
   59: - Prompt quality, pipeline coherence, checklist actionability checks
   60: - Coverage ratio checks
>> 61: - Type-specific veto conditions
   62: 
   63: ### Alterado
```

### squads/squad-creator/tasks/create-agent.md:69
```
   67: ```
   68: 
>> 69: **VETO CONDITIONS:**
>> 70: - ❌ Agent referencia arquivo fora do squad → VETO
>> 71: - ❌ Agent tem >50% de conteúdo filosófico vs operacional → VETO
>> 72: - ❌ Agent não tem SCOPE definido → VETO
>> 73: - ❌ Agent não tem heuristics de decisão → VETO
>> 74: - ❌ Agent não tem output examples → VETO
   75: 
   76: ---
```

### squads/squad-creator/tasks/create-documentation.md:52
```
   50: | Trigger | Ação |
   51: |---------|------|
>> 52: | Agent criado sem agent-flow doc | **VETO** - criar documentação antes de marcar done |
>> 53: | Workflow criado sem workflow doc | **VETO** - criar documentação antes de marcar done |
>> 54: | Squad criado sem README completo | **VETO** - criar README antes de marcar done |
>> 55: | Doc sem diagrama Mermaid | **VETO** - adicionar diagrama |
>> 56: | Doc sem troubleshooting | **VETO** - adicionar seção |
   57: 
   58: ---
```

### squads/squad-creator/tasks/create-documentation.md:122
```
   120: | Entradas e saídas do workflow | ✅ |
   121: | Pontos de decisão com diagrama | ✅ |
>> 122: | Condições de bloqueio (HALT) | ✅ |
   123: | Troubleshooting (3+ problemas) | ✅ |
   124: | Changelog | ✅ |
```

### squads/squad-creator/tasks/create-pipeline.md:27
```
   25: [PHASE 0: QUALIFICATION]
   26:     → Run "Does My Squad Need a Pipeline?" checklist
>> 27:     → VETO if score < 3
   28:     ↓
   29: [PHASE 1: DESIGN]
```
*(bloco/entidade: `[PHASE 0: QUALIFICATION]`)*

### squads/squad-creator/tasks/create-pipeline.md:64
```
   62: - **3+ yes** → Proceed to Phase 1
   63: - **1-2 yes** → Pipeline is optional, ask user
>> 64: - **0 yes** → **VETO** — squad doesn't need pipeline, just use functions
   65: 
   66: **Examples:**
```

### squads/squad-creator/tasks/create-pipeline.md:267
```
   265: | Condition | Action |
   266: |-----------|--------|
>> 267: | Squad scored 0 on qualification | **VETO** — don't create pipeline |
>> 268: | Phase has no clear input/output contract | **VETO** — define contracts first |
>> 269: | Squad already has lib/ with different pattern | **VETO** — audit existing code first |
>> 270: | Phases are not sequential (parallel needed) | **VETO** — this pattern is sequential only |
   271: 
   272: ---
```

### squads/squad-creator/tasks/create-workflow.md:44
```
   42: [PHASE 2: CHECKPOINT DESIGN]
   43:     → Define checkpoints per phase
>> 44:     → Set veto conditions
   45:     → Design error handling
   46:     ↓
```
*(bloco/entidade: `[PHASE 2: CHECKPOINT DESIGN]`)*

### squads/squad-creator/tasks/create-workflow.md:394
```
   392: 
   393:   examples:
>> 394:     - veto: "Vision unclear (<0.7 clarity score)"
>> 395:     - veto: "Missing required outputs"
>> 396:     - veto: "Quality score below 7.0"
>> 397:     - veto: "Security validation failed"
>> 398:     - veto: "Human review rejected"
   399: ```
   400: 
```
*(bloco/entidade: `examples`)*

### squads/squad-creator/tasks/create-workflow.md:712
```
   710: - Follow AIOS workflow standards (YAML format)
   711: - Have 3+ phases with tier classification
>> 712: - Include checkpoints with veto conditions
   713: - Assign agents to phases correctly
   714: - Integrate with squad ecosystem
```

### squads/squad-creator/tasks/extract-sop.md:196
```
   194: - KEEP_MANUAL: Low freq + High impact
   195: - ELIMINATE: Low freq + Low impact
>> 196: - VETO: No guardrails possible
   197: 
   198: ### Step 6: Quality Assessment (META-AXIOMAS)
```

### squads/squad-creator/tasks/extract-thinking-dna.md:12
```
   10: specialist: "@oalanicolas"
   11: specialist_guidance: |
>> 12:   Extract decision frameworks (SE/ENTÃO), heuristics, veto conditions.
   13:   Map recognition_patterns, objection_handling, handoff_triggers.
   14:   Use regra 40/20/40: 40% curadoria, 20% prompt, 40% refinamento.
```
*(bloco/entidade: `specialist_guidance: |`)*

### squads/squad-creator/tasks/extract-thinking-dna.md:454
```
   452:         rationale: ""
   453: 
>> 454:     veto:
   455:       - trigger: ""
   456:         action: "PARE/REJEITE"
```
*(bloco/entidade: `heuristics`)*

### squads/squad-creator/tasks/extract-thinking-dna.md:561
```
   559: - [ ] Framework principal com 3+ steps claros
   560: - [ ] 5+ heurísticas de decisão documentadas
>> 561: - [ ] 2+ heurísticas de veto
   562: - [ ] Pipeline de decisão mapeado
   563: - [ ] 3+ anti-patterns identificados
```

### squads/squad-creator/tasks/extract-thinking-dna.md:608
```
   606:         rationale: "Sempre haverá alguém mais barato"
   607: 
>> 608:     veto:
   609:       - trigger: "Cliente quer desconto sem justificativa"
   610:         action: "REJEITE o cliente"
```
*(bloco/entidade: `heuristics`)*

### squads/squad-creator/tasks/find-0.8.md:71
```
   69:   consult: "MODELS.pareto_ao_cubo + OBSESSIONS.eficiencia_alavancagem_maxima"
   70:   question: "Apliquei o framework COMPLETO (4 testes + 3 níveis de leverage)?"
>> 71:   veto: "Task SEM framework completo = FAIL automático"
   72:   hierarchy: "ELIMINA (80%) → AUTOMATIZA (restante) → AMPLIFICA (0.8%)"
   73:   rationale: "Esta task É a implementação do modelo mental. Sem ele, não existe."
```
*(bloco/entidade: `checkpoint_pareto_integral`)*

### squads/squad-creator/tasks/install-commands.md:128
```
   126:   - When listing tasks/templates or presenting options during conversations, always show as numbered options list
   127:   - STAY IN CHARACTER!
>> 128:   - CRITICAL: On activation, ONLY greet user and then HALT to await user requested assistance or given commands. ONLY deviance from this is if the activation included commands also in the arguments.
   129: 
   130: agent:
```
*(bloco/entidade: `activation-instructions`)*

### squads/squad-creator/tasks/pv-audit.md:13
```
   11: ## CRITICAL: Token Budget
   12: 
>> 13: **VETO CONDITION:** Audit que estoura contexto é audit quebrado.
   14: 
   15: ```
```

### squads/squad-creator/tasks/pv-audit.md:68
```
   66: ```
   67: 
>> 68: **HALT:** Aguardar confirmação.
   69: 
   70: ### Step 2: Batch Execution
```

### squads/squad-creator/tasks/pv-audit.md:123
```
   121: ```
   122: 
>> 123: **HALT:** Mostrar overview e perguntar direção.
   124: 
   125: ---
```

### squads/squad-creator/tasks/pv-audit.md:145
```
   143: - [ ] Instruções fora do sistema
   144: - [ ] Caminhos errados possíveis mas "não recomendados"
>> 145: - [ ] Sem veto conditions
   146: 
   147: **Check Green Flags:**
```

### squads/squad-creator/tasks/pv-audit.md:172
```
   170: ```
   171: 
>> 172: **HALT:** Mostrar análise e perguntar se quer deep-dive.
   173: 
   174: ---
```

### squads/squad-creator/tasks/pv-axioma-assessment.md:47
```
   45: - Weighted average of all dimensions
   46: - Check if any dimension is below its minimum threshold
>> 47: - Check if VETO dimension (Verdade) passes
   48: 
   49: ### 4. Generate Assessment Report
```

### squads/squad-creator/tasks/pv-axioma-assessment.md:77
```
   75: - Overall threshold: 7.0
   76: - Minimum per dimension: 6.0
>> 77: - Verdade < 7.0 → VETO regardless of overall score
>> 78: - Status: PASS (>= 7.0) | FAIL (< 7.0 or VETO) | REVIEW (borderline)
   79: 
   80: ## Completion Criteria
```

### squads/squad-creator/tasks/qa-after-creation.md:13
```
   11: **Specialist Guidance:**
   12: - Use Process Absolutism principles for validation
>> 13: - Define VETO conditions that BLOCK, not just warn
   14: - For workflow/process validation, invoke: `@pedro-valerio *audit`
   15: - For designing quality gates, invoke: `@pedro-valerio *design-heuristic`
```

### squads/squad-creator/tasks/validate-extraction.md:29
```
   27:   question: "0.8% do expert está identificado e documentado?"
   28:   if_sim: "Handoff pode prosseguir"
>> 29:   if_nao: "VETO - executar find-0.8 antes de handoff"
   30:   rationale: "Sem identificar genialidade = clone mediano."
   31: 
```
*(bloco/entidade: `checkpoint_pareto_identificado`)*

### squads/squad-creator/tasks/validate-squad.md:14
```
   12: **Process Validation (via @pedro-valerio):**
   13: - Audit workflows para verificar se impedem caminhos errados
>> 14: - Validar veto conditions em cada checkpoint
   15: - Identificar gaps de tempo entre handoffs
   16: - Garantir fluxo unidirecional (cards nunca voltam)
```

### squads/squad-creator/tasks/validate-squad.md:26
```
   24: 
   25: **Frameworks Used:**
>> 26: - `config/veto-conditions.yaml` → Veto engine with 10 blocking conditions **[v3.3]**
   27: - `config/task-anatomy.yaml` → 8-field task validation schema **[v3.3]**
   28: - `data/squad-type-definitions.yaml` → Squad type detection and requirements
```

### squads/squad-creator/tasks/validate-squad.md:74
```
   72:     → Score 0-10, weighted 20% of final
   73:     ↓
>> 74: [PHASE 5: VETO CHECK]
>> 75:     → Check type-specific veto conditions
>> 76:     → Any veto = FAIL regardless of score
   77:     ↓
   78: [PHASE 6: SCORING & REPORT]
```

### squads/squad-creator/tasks/validate-squad.md:984
```
   982:         - "Heuristics have IDs (PV_*, SC_*)"
   983:         - "Each has: trigger, evaluation, threshold"
>> 984:         - "VETO conditions explicit"
   985:         - "Fallback behavior defined"
   986: 
```
*(bloco/entidade: `criteria`)*

### squads/squad-creator/tasks/validate-squad.md:1087
```
   1085: ---
   1086: 
>> 1087: ## PHASE 5: VETO CHECK
   1088: 
   1089: **Duration:** < 30 seconds
   1090: **Mode:** Autonomous
>> 1091: **Result:** VETO or PROCEED
>> 1092: **Reference:** `config/veto-conditions.yaml` **[v3.3]**
   1093: 
   1094: ### Universal Vetos (SC_VC_*)
   1095: 
   1096: ```yaml
   1097: universal_vetos:
>> 1098:   # From config/veto-conditions.yaml
   1099:   - id: "SC_VC_001"
   1100:     condition: "Domain not viable"
   1101:     check: "elite_minds_count < 3 OR source_quality < 0.6"
>> 1102:     result: "VETO - Domain not viable for squad creation"
   1103: 
   1104:   - id: "SC_VC_002"
   1105:     condition: "Vision unclear"
   1106:     check: "squad_vision_clarity < 0.7"
>> 1107:     result: "VETO - Vision unclear, return to Discovery"
   1108: 
   1109:   - id: "SC_VC_010"
   1110:     condition: "Task anatomy incomplete"
   1111:     check: "required_fields_missing = true"
>> 1112:     result: "VETO - Task missing required 8 fields"
   1113: 
   1114:   # Legacy vetos (maintained for backwards compatibility)
   1115:   - id: "V1"
   1116:     condition: "No entry agent defined"
   1117:     check: "tier_1_result.entry_agent_exists == false"
>> 1118:     result: "VETO"
   1119: 
   1120:   - id: "V2"
   1121:     condition: "Entry agent cannot activate"
   1122:     check: "tier_1_result.entry_agent_activatable == false"
>> 1123:     result: "VETO"
   1124: 
   1125:   - id: "V3"
   1126:     condition: ">20% of referenced files missing"
   1127:     check: "tier_1_result.missing_references > 20%"
>> 1128:     result: "VETO"
   1129: 
   1130:   - id: "V4"
   1131:     condition: "config.yaml invalid"
   1132:     check: "tier_1_result.config_valid == false"
>> 1133:     result: "VETO"
   1134: 
   1135:   - id: "V5"
   1136:     condition: "Security issue detected"
   1137:     check: "tier_1_result.security_issues > 0"
>> 1138:     result: "VETO"
   1139:     message: "Secrets, API keys, or credentials found"
   1140: 
   1141:   - id: "V6"
   1142:     condition: "Critical cross-reference broken"
   1143:     check: "tier_1_result.broken_handoffs > 0"
>> 1144:     result: "VETO"
   1145:     message: "Handoff to non-existent agent"
   1146: ```
```

### squads/squad-creator/templates/agent-flow-doc-tmpl.md:90
```
   88:         B --> C["Exibe Greeting"]
   89:         C --> D["Lista Quick Commands"]
>> 90:         D --> E["HALT - Aguarda Usuário"]
   91:     end
   92: 
```
*(bloco/entidade: `subgraph ACTIVATION["ATIVAÇÃO DO AGENTE"]`)*

### squads/squad-creator/templates/agent-flow-doc-tmpl.md:267
```
   265: ### Blocking Conditions
   266: 
>> 267: O @{{agent_id}} deve **HALT** e perguntar ao usuário quando:
   268: - {{blocking_1}}
   269: - {{blocking_2}}
```

### squads/squad-creator/templates/agent-flow-doc-tmpl.md:405
```
   403: 
   404: ```
>> 405: Erro: VETO - {{veto_message}}
   406: ```
   407: 
```

### squads/squad-creator/templates/agent-flow-doc-tmpl.md:414
```
   412: 
   413: **Solução:**
>> 414: 1. Verificar mensagem de veto
>> 415: 2. Corrigir condição que causou veto
   416: 3. Re-executar comando
   417: 
```

### squads/squad-creator/templates/agent-tmpl.md:22
```
   20:       - Use DNA Mental™ 8-Layer Architecture for complete clone
   21:       For process/workflow validation:
>> 22:       - Invoke @pedro-valerio for: *audit, *design-heuristic, *veto-check
   23: 
   24:   architecture: |
```
*(bloco/entidade: `notes: |`)*

### squads/squad-creator/templates/agent-tmpl.md:99
```
   97:   - STEP 2: Adopt the persona defined in Level 1
   98:   - STEP 3: Display greeting from Level 6
>> 99:   - STEP 4: HALT and await user command
   100:   - CRITICAL: DO NOT load external files during activation
   101:   - CRITICAL: ONLY load files when user executes a command (*)
```
*(bloco/entidade: `activation-instructions`)*

### squads/squad-creator/templates/agent-tmpl.md:621
```
   619: │  2. Parse command_loader configuration                           │
   620: │  3. Display greeting                                             │
>> 621: │  4. HALT - await user command                                    │
   622: └─────────────────────────────────────────────────────────────────┘
   623:               │
```

### squads/squad-creator/templates/handoff-insumos-tmpl.yaml:59
```
   57:     veto_conditions:
   58:       - trigger: "{o que dispara}"
>> 59:         action: "VETO - {razão}"
   60:     decision_architecture:
   61:       pipeline: "{fluxo de decisão}"
```
*(bloco/entidade: `- trigger: "{o que dispara}"`)*

### squads/squad-creator/templates/pop-extractor-prompt.md:392
```
   390: - Low Frequency + High Impact → **KEEP_MANUAL** (risk doesn't justify)
   391: - Low Frequency + Low Impact → **ELIMINATE** (question necessity)
>> 392: - **NO GUARDRAILS → VETO** (never automate without safeguards)
   393: 
   394: ---
```

### squads/squad-creator/templates/workflow-doc-tmpl.md:536
```
   534: | {{ponto_2}} | {{ponto_2_fase}} | @{{ponto_2_decisor}} | {{ponto_2_criterio}} | {{ponto_2_positivo}} | {{ponto_2_negativo}} |
   535: 
>> 536: ### Condições de Bloqueio (HALT)
   537: 
>> 538: O workflow deve **HALT** e solicitar intervenção do usuário quando:
   539: 
   540: 1. {{halt_condition_1}}
```

### squads/squad-creator/templates/workflow-doc-tmpl.md:667
```
   665: 
   666: - ❌ Pular steps sem validação
>> 667: - ❌ Ignorar veto conditions
   668: - ❌ Não verificar outputs antes de handoff
   669: - ❌ Executar em YOLO mode com requisitos ambíguos
```

### squads/squad-creator/templates/workflow-doc-tmpl.md:842
```
   840: | **Data Files** | {{total_data}} arquivos |
   841: | **Pontos de Decisão** | {{total_decisions}} decisões |
>> 842: | **Condições de HALT** | {{total_halts}} condições |
   843: | **Modos de Execução** | YOLO, Interactive, Pre-Flight |
   844: 
```

### squads/squad-creator/templates/workflow-tmpl.yaml:175
```
   173:     condition: Has checkpoints with heuristics
   174:     instruction: |
>> 175:       Define formal checkpoint configurations with veto conditions.
   176:     template: |
   177:       # ═══════════════════════════════════════════════════════════════════════════════
```
*(bloco/entidade: `instruction: |`)*

### squads/squad-creator/templates/workflow-tmpl.yaml:334
```
   332:     - "At least one phase has inline_structure"
   333:     - "error_handling section is defined"
>> 334:     - "checkpoint_config defines veto conditions"
   335:     - "decision_matrix_fit is documented"
   336:     - "clone_combinations defines agent synergies"
```
*(bloco/entidade: `recommended_requirements`)*

### squads/squad-creator/workflows/validate-squad.yaml:210
```
   208:         severity: "blocking"
   209:         pass_condition: "0 HIGH severity findings"
>> 210:         fail_action: "VETO (V5)"
   211: 
   212:       output:
```
*(bloco/entidade: `gate`)*

### squads/squad-creator/workflows/validate-squad.yaml:291
```
   289:         severity: "blocking"
   290:         pass_condition: "no broken BLOCKING references"
>> 291:         fail_action: "VETO (V6)"
   292: 
   293:       output:
```
*(bloco/entidade: `gate`)*

### squads/squad-creator/workflows/validate-squad.yaml:402
```
   400: 
   401:     # ═══════════════════════════════════════════════════════════════════════════
>> 402:     # PHASE 7: VETO CHECK
   403:     # ═══════════════════════════════════════════════════════════════════════════
   404:     - phase: 7
   405:       name: "Veto Check"
>> 406:       description: "Check for veto conditions that override scores"
   407:       executor: "script"
   408:       duration: "< 5 seconds"
```

### squads/squad-creator/workflows/validate-squad.yaml:508
```
   506: 
   507:     - checkpoint: "After Phase 7"
>> 508:       gate: "VETO-CHECK"
   509:       action_on_fail: "FAIL"
   510:       message: "Veto condition triggered"
```
*(bloco/entidade: `- checkpoint: "After Phase 7"`)*

### squads/squad-creator/workflows/validate-squad.yaml:522
```
   520: 
   521:     on_veto:
>> 522:       - "Log veto condition"
   523:       - "Override any passing score"
>> 524:       - "Generate report with veto explanation"
   525:       - "Exit with code 1"
   526: 
```
*(bloco/entidade: `on_veto`)*

### squads/squad-creator/workflows/wf-clone-mind.yaml:42
```
   40:     responsibilities:
   41:       - "Validar se workflow impede caminhos errados"
>> 42:       - "Criar veto conditions em checkpoints"
   43:       - "Identificar gaps de tempo"
   44:     invoke_for:
```
*(bloco/entidade: `responsibilities`)*

### squads/squad-creator/workflows/wf-clone-mind.yaml:269
```
   267:     specialist: "@oalanicolas"
   268:     specialist_guidance: |
>> 269:       Extract decision frameworks (SE/ENTÃO), heuristics, veto conditions.
   270:       Map recognition_patterns, objection_handling, handoff_triggers.
   271: 
```
*(bloco/entidade: `specialist_guidance: |`)*

### squads/squad-creator/workflows/wf-clone-mind.yaml:502
```
   500:       heuristics:
   501:         decision: []
>> 502:         veto: []
   503:         prioritization: []
   504: 
```
*(bloco/entidade: `heuristics`)*

### squads/squad-creator/workflows/wf-create-squad.yaml:39
```
   37:     responsibilities:
   38:       - "Validar se workflows impedem caminhos errados"
>> 39:       - "Criar veto conditions em quality gates"
   40:       - "Auditar checkpoints para gaps de tempo"
   41:       - "Garantir fluxo unidirecional"
```
*(bloco/entidade: `responsibilities`)*

### squads/squad-creator/workflows/wf-create-squad.yaml:295
```
   293:       file: "config/heuristics.yaml"
   294:       version: "2.0"
>> 295:       purpose: "6 heuristics: SC_HE_001-003 (PV) + AN_HE_001-003 (AN) with veto mappings"
   296:       agents:
   297:         pedro_valerio: ["SC_HE_001", "SC_HE_002", "SC_HE_003"]
   298:         oalanicolas: ["AN_HE_001", "AN_HE_002", "AN_HE_003"]
   299:       applied_in: ["phase_0", "phase_3", "phase_5"]
   300: 
>> 301:     - id: "veto-conditions"
>> 302:       file: "config/veto-conditions.yaml"
   303:       version: "2.0"
>> 304:       purpose: "15 veto conditions: SC_VC_001-010 (PV) + AN_VC_001-005 (AN)"
   305:       agents:
   306:         pedro_valerio: ["SC_VC_001", "SC_VC_002", "SC_VC_003", "SC_VC_004", "SC_VC_005",
```
*(bloco/entidade: `- id: "heuristics-engine"`)*

### squads/squad-creator/workflows/wf-create-squad.yaml:429
```
   427:         decision:
   428:           if_workflows_gte_10:
>> 429:             action: "VETO - PRD Required"
   430:             message: |
   431:               ═══════════════════════════════════════════════════════════════════
```
*(bloco/entidade: `if_workflows_gte_10`)*

### squads/squad-creator/workflows/wf-create-squad.yaml:496
```
   494: 
   495:           if_agents_gte_8:
>> 496:             action: "VETO - Roadmap Required"
   497:             message: "Muitos agents ({agents_count}) - precisa roadmap"
   498:           else:
```
*(bloco/entidade: `if_agents_gte_8`)*

### squads/squad-creator/workflows/wf-create-squad.yaml:652
```
   650:         - tool_registry_updated: true
   651:       veto_conditions:
>> 652:         - all_agents_failed: "VETO - Retry required"
>> 653:         - zero_tools_found: "VETO - Domain may be too niche, manual research needed"
   654:       output:
   655:         tools_discovered: "count"
```
*(bloco/entidade: `veto_conditions`)*

### squads/squad-creator/workflows/wf-mind-research-loop.yaml:9
```
   7: # - Parallel execution in Phase 3 (4 agents)
   8: # - Real specialist integration (@oalanicolas, @pedro-valerio)
>> 9: # - Enforced veto conditions
   10: # - Full Context Preamble
   11: #
```

### squads/squad-creator/workflows/wf-mind-research-loop.yaml:238
```
   236:         original_work: 0.9
   237:         practical_results: 0.9
>> 238:         framework_documented: 1.0  # VETO power
   239: 
   240:       thresholds:
```
*(bloco/entidade: `weights`)*

### squads/squad-creator/workflows/wf-mind-research-loop.yaml:382
```
   380: 
   381:       weights:
>> 382:         framework_documented: 1.0  # VETO power
   383:         process_extractable: 0.9
   384:         artifacts_available: 0.8
```
*(bloco/entidade: `weights`)*

### squads/squad-creator/workflows/wf-mind-research-loop.yaml:390
```
   388:       veto_conditions:
   389:         - condition: "framework_documented < 2"
>> 390:           action: "VETO - No replicable methodology"
   391:         - condition: "total_score < 10"
>> 392:           action: "VETO - Insufficient documentation"
   393: 
   394:       decision_tree: |
>> 395:         IF framework_documented == 0 → VETO (no methodology)
>> 396:         ELSE IF total_score < 10 → VETO (insufficient docs)
   397:         ELSE IF total_score >= 12 → APPROVE (excellent)
   398:         ELSE → APPROVE (acceptable)
```
*(bloco/entidade: `- condition: "framework_documented < 2"`)*

### squads/squad-creator/workflows/wf-research-then-create-agent.yaml:401
```
   399:       veto_conditions:
   400:         - condition: "total_lines < 500"
>> 401:           action: "VETO - Retry research with broader queries"
   402:         - condition: "primary_sources < 2"
>> 403:           action: "VETO - Insufficient primary evidence"
   404: 
   405:       decision_tree: |
>> 406:         IF total_lines < 500 → VETO (retry max 2x)
   407:         ELSE IF primary_sources < 3 → REVIEW (flag, continue)
   408:         ELSE IF quality_score >= 80% → APPROVE
```
*(bloco/entidade: `- condition: "total_lines < 500"`)*

### squads/squad-creator/workflows/wf-research-then-create-agent.yaml:623
```
   621:           IF check FAILS → Log specific fix needed
   622: 
>> 623:         IF any FAIL → VETO (loop to Step 7 with fixes)
   624:         ELSE → APPROVE (proceed to Step 9)
   625: 
```
*(bloco/entidade: `decision_tree: |`)*

## 🗂️ Estado de workflow / artefato (199 trechos com contexto, 199 ocorrências totais)

### .aiox-core/cli/commands/pro/index.js:210
```
   208:     // Display success
   209:     console.log('License activated successfully!\n');
>> 210:     console.log('  Status:       Active');
   211:     console.log(`  Key:          ${maskKey(result.key)}`);
   212:     console.log(`  Features:     ${result.features.join(', ')}`);
```

### .aiox-core/core/errors/constants.js:96
```
   94:     retryable: false,
   95:     userMessage: 'AIOX orchestration failed.',
>> 96:     recovery: ['Review orchestration metadata and the active workflow state.'],
   97:   },
   98:   {
```
*(bloco/entidade: `{`)*

### .aiox-core/core/orchestration/bob-orchestrator.js:654
```
   652: 
   653:       case 'restart':
>> 654:         // AC3 [3]: Reset story (keep epic progress, clear story workflow state)
   655:         this._log(`Restarting story ${result.story}`);
   656:         return {
```
*(bloco/entidade: `case 'restart':`)*

### .aiox-core/core/orchestration/condition-evaluator.js:129
```
   127:       frontend_has_tailwind: () => this.profile.frontend.styling === 'tailwind',
   128: 
>> 129:       // Workflow state conditions
   130:       qa_review_approved: () => this._checkQAApproval(),
   131:       phase_2_completed: () => this._checkPhaseCompleted(2),
```
*(bloco/entidade: `evaluators`)*

### .aiox-core/core/orchestration/context-manager.js:2
```
   1: /**
>> 2:  * Context Manager - Persists workflow state between phases
   3:  *
   4:  * DETERMINISTIC: All operations use file system operations (fs-extra),
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/context-manager.js:58
```
   56: 
   57:     // State file path
>> 58:     this.stateDir = path.join(projectRoot, '.aiox', 'workflow-state');
   59:     this.statePath = path.join(this.stateDir, `${workflowId}.json`);
   60:     this.handoffDir = path.join(this.stateDir, 'handoffs');
```
*(bloco/entidade: `constructor(workflowId, projectRoot) {`)*

### .aiox-core/core/orchestration/context-manager.js:78
```
   76: 
   77:   /**
>> 78:    * Initialize or load existing workflow state
   79:    * @returns {Promise<Object>} Current state
   80:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/context-manager.js:434
```
   432: 
   433:   /**
>> 434:    * Compute delivery confidence score from workflow state.
   435:    * @private
   436:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/context-manager.js:613
```
   611: 
   612:   /**
>> 613:    * Reset workflow state (for re-execution)
   614:    * @param {boolean} keepMetadata - Whether to preserve metadata
   615:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/session-state.js:5
```
   3:  *
   4:  * Story 11.5: Projeto Bob - Session State Persistence
>> 5:  * ADR-011: Unified Session State (absorbs Workflow State from 11.3)
   6:  *
   7:  * Provides session state persistence to disk for:
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/session-state.js:27
```
   25: const SESSION_STATE_FILENAME = '.session-state.yaml';
   26: const CRASH_THRESHOLD_MINUTES = 30;
>> 27: const LEGACY_WORKFLOW_STATE_DIR = '.aiox/workflow-state';
   28: 
   29: /**
```

### .aiox-core/core/orchestration/session-state.js:76
```
   74:  * long-running epic/story work can resume after pauses, crashes, or terminal
   75:  * restarts. The manager also supports session-scoped overrides and migration
>> 76:  * from the legacy workflow-state format.
   77:  */
   78: class SessionState {
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/session-state.js:85
```
   83:    * @param {Object} [options] - Options
   84:    * @param {boolean} [options.debug=false] - Enable debug logging
>> 85:    * @param {boolean} [options.autoMigrate=true] - Attempt migration from legacy workflow state on load
   86:    */
   87:   constructor(projectRoot, options = {}) {
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/session-state.js:153
```
   151:         },
   152: 
>> 153:         // Workflow State (ADR-011 - migrated from 11.3)
   154:         workflow: {
   155:           current_phase: null,
```
*(bloco/entidade: `session_state: {`)*

### .aiox-core/core/orchestration/session-state.js:220
```
   218:     }
   219: 
>> 220:     // Check for legacy workflow state and migrate (ADR-011)
   221:     if (this.options.autoMigrate) {
   222:       const migrated = await this.migrateFromWorkflowState();
```
*(bloco/entidade: `async loadSessionState() {`)*

### .aiox-core/core/orchestration/session-state.js:595
```
   593: 
   594:       case ResumeOption.RESTART:
>> 595:         // Reset workflow state but keep progress
   596:         await this.updateSessionState({
   597:           workflow: {
```
*(bloco/entidade: `case ResumeOption.RESTART:`)*

### .aiox-core/core/orchestration/session-state.js:667
```
   665: 
   666:   /**
>> 667:    * Migrates from legacy workflow state (ADR-011)
   668:    * @returns {Promise<boolean>} True if migration occurred
   669:    */
   670:   async migrateFromWorkflowState() {
   671:     try {
>> 672:       // Check if legacy workflow state directory exists
   673:       if (!fsSync.existsSync(this.legacyStatePath)) {
   674:         return false;
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/session-state.js:686
```
   684: 
   685:       if (this.options.debug) {
>> 686:         console.log(`[SessionState] Found ${stateFiles.length} legacy workflow state files to migrate`);
   687:       }
   688: 
```
*(bloco/entidade: `if (this.options.debug) {`)*

### .aiox-core/core/orchestration/session-state.js:706
```
   704:           epic: {
   705:             id: 'migrated',
>> 706:             title: 'Migrated from Workflow State',
   707:             total_stories: 1,
   708:           },
```
*(bloco/entidade: `epic: {`)*

### .aiox-core/core/orchestration/session-state.js:717
```
   715:           },
   716: 
>> 717:           // Migrate workflow state
   718:           workflow: {
   719:             current_phase: legacyState.currentPhase || null,
```
*(bloco/entidade: `session_state: {`)*

### .aiox-core/core/orchestration/session-state.js:741
```
   739:           },
   740: 
>> 741:           resume_instructions: 'Migrated from legacy workflow state. Please review and continue.',
   742: 
   743:           // Story 12.7: Initialize overrides (empty on migration)
```

### .aiox-core/core/orchestration/workflow-executor.js:62
```
   60: /**
   61:  * Workflow execution state
>> 62:  * @typedef {Object} WorkflowState
   63:  * @property {string} workflowId - Workflow identifier
   64:  * @property {string} currentPhase - Current phase ID
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/workflow-executor.js:98
```
   96:       '.aiox-core/development/workflows/development-cycle.yaml',
   97:     );
>> 98:     this.statePath = path.join(projectRoot, '.aiox/workflow-state/');
   99:     this.configPath = path.join(projectRoot, '.aiox-core/core-config.yaml');
   100: 
```
*(bloco/entidade: `constructor(projectRoot, options = {}) {`)*

### .aiox-core/core/orchestration/workflow-executor.js:232
```
   230: 
   231:   /**
>> 232:    * Initializes or resumes workflow state
   233:    * @param {string} storyPath - Path to story file
>> 234:    * @returns {Promise<WorkflowState>} Workflow state
   235:    */
   236:   async initializeState(storyPath) {
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/workflow-executor.js:281
```
   279: 
   280:   /**
>> 281:    * Saves the current workflow state
   282:    * @returns {Promise<void>}
   283:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/workflow-executor.js:297
```
   295: 
   296:   /**
>> 297:    * Syncs internal workflow state to unified session state (Story 11.5)
   298:    * @returns {Promise<void>}
   299:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/orchestration/workflow-orchestrator.js:121
```
   119:       'docs/stories',
   120:       'supabase/docs',
>> 121:       '.aiox/workflow-state',
   122:     ];
   123: 
```
*(bloco/entidade: `dirs`)*

### .aiox-core/core/session/context-detector.js:182
```
   180:         lastActivity: Date.now(),
   181:         workflowActive: state.workflowActive || null,
>> 182:         workflowState: state.workflowState || null,
   183:         lastCommands: state.lastCommands || [],
   184:         agentSequence: state.agentSequence || [],
```
*(bloco/entidade: `sessionData`)*

### .aiox-core/core/session/context-loader.js:324
```
   322:       }
   323: 
>> 324:       // Infer workflow state transition
>> 325:       const workflowState = this._inferWorkflowState(taskName, result);
>> 326:       if (workflowState) {
>> 327:         sessionState.workflowActive = workflowState.workflow;
>> 328:         sessionState.workflowState = workflowState.state;
   329:       }
   330: 
```

### .aiox-core/core/session/context-loader.js:337
```
   335:         success: true,
   336:         sessionId: sessionState.sessionId,
>> 337:         workflowState: sessionState.workflowState,
   338:       };
   339:     } catch (error) {
```
*(bloco/entidade: `return {`)*

### .aiox-core/core/session/context-loader.js:346
```
   344: 
   345:   /**
>> 346:    * Infer workflow state from completed task
   347:    *
   348:    * @param {string} taskName - Completed task name
   349:    * @param {Object} _result - Task result (unused, reserved for future use)
>> 350:    * @returns {Object|null} Workflow state info
   351:    * @private
   352:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/session/context-loader.js:381
```
   379: 
   380:   /**
>> 381:    * Get current workflow state from session
   382:    *
>> 383:    * @returns {Object|null} Current workflow state
   384:    */
   385:   getWorkflowState() {
```
*(bloco/entidade: `/**`)*

### .aiox-core/core/session/context-loader.js:391
```
   389:         return {
   390:           workflow: sessionState.workflowActive,
>> 391:           state: sessionState.workflowState || null,
   392:           lastActivity: sessionState.lastActivity,
   393:         };
```
*(bloco/entidade: `return {`)*

### .aiox-core/data/entity-registry.yaml:3105
```
   3103:       usedBy: []
   3104:       dependencies:
>> 3105:         - workflow-state-manager
   3106:         - output-formatter
   3107:         - dev
```
*(bloco/entidade: `dependencies`)*

### .aiox-core/data/entity-registry.yaml:4355
```
   4353:         - aiox-master
   4354:       dependencies:
>> 4355:         - workflow-state-manager.js
   4356:         - workflow-validator.js
   4357:         - session-state.js
```
*(bloco/entidade: `dependencies`)*

### .aiox-core/data/entity-registry.yaml:8097
```
   8095:         - squad-validator
   8096:         - framework-analyzer
>> 8097:         - workflow-state-manager
   8098:         - workflow-navigator
   8099:       externalDeps: []
```
*(bloco/entidade: `dependencies`)*

### .aiox-core/data/entity-registry.yaml:8149
```
   8147:       checksum: sha256:e9af315c4b6ed0f3a0ccc0956921b04f75865a019ada427bdb1d871a1a059bcb
   8148:       lastVerified: '2026-05-20T17:52:00.679Z'
>> 8149:     workflow-state-manager:
>> 8150:       path: .aiox-core/development/scripts/workflow-state-manager.js
   8151:       layer: L2
   8152:       type: script
>> 8153:       purpose: Entity at .aiox-core/development/scripts/workflow-state-manager.js
   8154:       keywords:
   8155:         - workflow
```

### .aiox-core/data/entity-registry.yaml:15540
```
   15538:       checksum: sha256:a8ca099258eef7744315ae575cfdc3b7ebf2a3942d182ee6293b3661414260c3
   15539:       lastVerified: '2026-05-20T17:52:00.982Z'
>> 15540:     workflow-state-schema:
>> 15541:       path: .aiox-core/data/workflow-state-schema.yaml
   15542:       layer: L3
   15543:       type: data
>> 15544:       purpose: Workflow State Schema
   15545:       keywords:
   15546:         - workflow
```

### .aiox-core/data/workflow-patterns.yaml:720
```
   718: # ============================================================
   719: #
>> 720: # Workflow state files complement pattern-based detection.
   721: # When a state file exists, it takes precedence over command history
>> 722: # for workflow state detection.
   723: #
   724: state_integration:
   725:   description: "File-based state persistence for guided workflow automation"
   726:   state_file_location: ".aiox/{instance-id}-state.yaml"
>> 727:   state_file_schema: ".aiox-core/data/workflow-state-schema.yaml"
>> 728:   manager_script: ".aiox-core/development/scripts/workflow-state-manager.js"
   729: 
   730:   behavior:
```

### .aiox-core/data/workflow-patterns.yaml:765
```
   763:     order: "squad-first, core-fallback"
   764:     explanation: |
>> 765:       When target_context=hybrid, agent references are resolved in this order:
   766:       1. Check squad agents directory first (squads/{squad}/agents/)
   767:       2. If not found, fall back to core agents (.aiox-core/development/agents/)
```
*(bloco/entidade: `explanation: |`)*

### .aiox-core/data/workflow-state-schema.yaml:1
```
>> 1: # Workflow State Schema
   2: # Defines the structure for workflow execution state files
   3: # State files are stored at: .aiox/{instance-id}-state.yaml
```

### .aiox-core/data/workflow-state-schema.yaml:30
```
   28: 
   29:   # ---- Context ----
>> 30:   target_context:
   31:     type: string
   32:     required: true
```
*(bloco/entidade: `fields`)*

### .aiox-core/data/workflow-state-schema.yaml:40
```
   38:     type: string
   39:     required: false
>> 40:     description: "Squad name when target_context=squad or hybrid"
   41: 
   42:   # ---- Lifecycle ----
```
*(bloco/entidade: `squad_name`)*

### .aiox-core/data/workflow-state-schema.yaml:67
```
   65:     description: "Name/description of current phase"
   66: 
>> 67:   current_step_index:
   68:     type: number
   69:     required: true
```

### .aiox-core/data/workflow-state-schema.yaml:107
```
   105:         format: iso-8601
   106:         description: "When this step was completed"
>> 107:       artifacts_created:
   108:         type: array
   109:         items:
```

### .aiox-core/data/workflow-state-schema.yaml:163
```
   161: # workflow_name: Greenfield Service/API Development
   162: # instance_id: greenfield-service-20260131-a1b2c3
>> 163: # target_context: core
   164: # started_at: "2026-01-31T10:00:00Z"
   165: # updated_at: "2026-01-31T14:30:00Z"
>> 166: # status: active
   167: # current_phase: "PM: Create PRD"
>> 168: # current_step_index: 1
   169: #
   170: # steps:
```

### .aiox-core/data/workflow-state-schema.yaml:175
```
   173: #     agent: analyst
   174: #     action: "creates: project-brief.md"
>> 175: #     status: completed
   176: #     started_at: "2026-01-31T10:00:00Z"
   177: #     completed_at: "2026-01-31T11:00:00Z"
>> 178: #     artifacts_created: [project-brief.md]
   179: #     session_id: "session-abc123"
   180: #
```

### .aiox-core/development/agents/ux-design-expert.md:437
```
   435: - `*build {component}` - Build atomic component
   436: 
>> 437: Type `*help` to see commands by phase, or `*status` to see workflow state.
   438: 
   439: ---
```

### .aiox-core/development/data/tier-system-framework.md:55
```
   53:     - 'Manage handoffs between agents'
   54:     - 'Ensure quality gates are applied'
>> 55:     - 'Maintain workflow state'
   56:   when_to_activate: 'Always - serves as entry point'
   57: ```
```
*(bloco/entidade: `responsibilities`)*

### .aiox-core/development/scripts/agent-exit-hooks.js:12
```
   10:  *
   11:  * Purpose:
>> 12:  * - Save workflow state when commands complete successfully
   13:  * - Persist context (story_path, branch, epic) to session-state.json
   14:  * - Enable workflow navigation on subsequent agent activation
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/agent-exit-hooks.js:39
```
   37:     // Update session state
   38:     const detector = new ContextDetector();
>> 39:     const workflowState = detectWorkflowState(command, result);
   40: 
   41:     detector.updateSessionState({
>> 42:       workflowActive: workflowState?.workflow || null,
   43:       lastCommands: [command],
   44:       agentSequence: [agent],
```
*(bloco/entidade: `try {`)*

### .aiox-core/development/scripts/agent-exit-hooks.js:60
```
   58: 
   59: /**
>> 60:  * Detect workflow state from command completion
   61:  * @param {string} command - Command that completed
   62:  * @param {Object} result - Command result
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/batch-update-agents-session-context.js:34
```
   32:     // Pattern 1: Update activation-instructions
   33:     const activationPattern = /(- STEP 2\.5: Load project status.*\n)( {2}- STEP 3: Greet user)/s;
>> 34:     const activationReplacement = '$1  - STEP 2.6: Load session context using .aiox-core/scripts/session-context-loader.js to detect previous agent and workflow state\n$2';
   35: 
   36:     content = content.replace(activationPattern, activationReplacement);
```
*(bloco/entidade: `try {`)*

### .aiox-core/development/scripts/generate-greeting.js:41
```
   39:  * Delegates to ActivationRuntime.activate() which handles:
   40:  * - Parallel loading of config, session, project status, git, permissions
>> 41:  * - Sequential context detection and workflow state
   42:  * - Greeting generation via GreetingBuilder
   43:  *
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/greeting-builder.js:203
```
   201:       lastCommands: context.lastCommands || [],
   202:       sessionMessage: context.sessionMessage || null,
>> 203:       workflowState: context.workflowState || null,
   204:       workflowActive: context.workflowActive || null,
   205:       permissions: context.permissions || null,
```
*(bloco/entidade: `sectionContext`)*

### .aiox-core/development/scripts/greeting-builder.js:362
```
   360:    *   - new session: full archetypal intro
   361:    *   - existing session: brief "Welcome back" with current focus
>> 362:    *   - workflow session: focused on workflow state
   363:    * @param {Object} agent - Agent definition
   364:    * @param {string} sessionType - Session type
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/greeting-builder.js:397
```
   395:       const namedGreeting = greetingLevels.named || `${this._formatAgentLabel(agent)} ready`;
   396:       const workflowPhase =
>> 397:         sectionContext.workflowState?.currentPhase || sectionContext.workflowActive;
   398:       if (workflowPhase) {
   399:         greeting = `${namedGreeting} -- workflow active`;
```
*(bloco/entidade: `workflowPhase`)*

### .aiox-core/development/scripts/greeting-builder.js:894
```
   892:       // Fallback: Pattern-based detection from command history
   893:       const commandHistory = context.commandHistory || context.lastCommands || [];
>> 894:       const workflowState = this.workflowNavigator.detectWorkflowState(commandHistory, context);
   895: 
>> 896:       if (!workflowState) {
   897:         return null;
   898:       }
   899: 
>> 900:       const suggestions = this.workflowNavigator.suggestNextCommands(workflowState);
   901:       if (!suggestions || suggestions.length === 0) {
   902:         return null;
```
*(bloco/entidade: `try {`)*

### .aiox-core/development/scripts/greeting-builder.js:908
```
   906:       const enhancedSuggestions = this._enhanceSuggestionsWithSurface(suggestions, context);
   907: 
>> 908:       const greetingMessage = this.workflowNavigator.getGreetingMessage(workflowState);
   909:       const header = greetingMessage || 'Next steps:';
   910: 
```

### .aiox-core/development/scripts/greeting-builder.js:919
```
   917: 
   918:   /**
>> 919:    * Detect workflow state from SessionState for cross-terminal continuity.
   920:    * Story ACT-5 (AC: 3, 6): Reads persisted session state to detect
   921:    * active workflows that span terminal sessions.
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/unified-activation-pipeline.js:305
```
   303:     const sessionType = this._detectSessionType(sessionContext, options);
   304: 
>> 305:     // Step 8: Workflow state detection
>> 306:     const workflowState = this._detectWorkflowState(sessionContext, sessionType);
   307: 
   308:     // --- Assemble enriched context ---
```

### .aiox-core/development/scripts/unified-activation-pipeline.js:318
```
   316:       preference,
   317:       sessionType,
>> 318:       workflowState,
   319:       userProfile,
   320:       // MIS-6: Agent memories from progressive retrieval
```
*(bloco/entidade: `enrichedContext`)*

### .aiox-core/development/scripts/unified-activation-pipeline.js:575
```
   573: 
   574:   /**
>> 575:    * Detect workflow state from session context and session type.
   576:    * Story ACT-5: Relaxed trigger - now detects workflows for any non-new session.
   577:    * @private
   578:    * @param {Object|null} sessionContext - Session context data
   579:    * @param {string} sessionType - Detected session type
>> 580:    * @returns {Object|null} Workflow state or null
   581:    */
   582:   _detectWorkflowState(sessionContext, sessionType) {
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/unified-activation-pipeline.js:694
```
   692:       preference: 'auto',
   693:       sessionType: 'new',
>> 694:       workflowState: null,
   695:       userProfile: 'advanced',
   696:       // MIS-6: Include memories field in fallback context
```
*(bloco/entidade: `return {`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:58
```
   56:   section('GAP 1: Context Targeting');
   57: 
>> 58:   // 1.1 create-workflow.md has target_context and squad_name
   59:   const createWf = fs.readFileSync(path.join(ROOT, '.aiox-core/development/tasks/create-workflow.md'), 'utf-8');
   60:   assert(
>> 61:     createWf.includes('campo: target_context'),
>> 62:     '1.1a create-workflow.md has target_context field',
>> 63:     'Missing "campo: target_context" in Entrada',
   64:   );
   65:   assert(
```
*(bloco/entidade: `verifyGap1`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:71
```
   69:   );
   70:   assert(
>> 71:     createWf.includes('target_context="squad"'),
   72:     '1.1c create-workflow.md has squad pre-condition',
   73:     'Missing squad existence pre-condition',
```
*(bloco/entidade: `assert(`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:89
```
   87:   const modifyWf = fs.readFileSync(path.join(ROOT, '.aiox-core/development/tasks/modify-workflow.md'), 'utf-8');
   88:   assert(
>> 89:     modifyWf.includes('campo: target_context'),
>> 90:     '1.2a modify-workflow.md has target_context field',
>> 91:     'Missing "campo: target_context" in Entrada',
   92:   );
   93:   assert(
```
*(bloco/entidade: `assert(`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:99
```
   97:   );
   98:   assert(
>> 99:     modifyWf.includes('Resolve workflow path based on target_context'),
   100:     '1.2c modify-workflow.md has conditional path resolution',
   101:     'Missing path resolution in step 1',
```
*(bloco/entidade: `assert(`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:160
```
   158:   const template = fs.readFileSync(path.join(ROOT, '.aiox-core/product/templates/workflow-template.yaml'), 'utf-8');
   159:   assert(
>> 160:     template.includes('{{TARGET_CONTEXT}}'),
>> 161:     '1.4a Template has TARGET_CONTEXT variable',
>> 162:     'Missing {{TARGET_CONTEXT}}',
   163:   );
   164:   assert(
```
*(bloco/entidade: `assert(`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:366
```
   364:   let WorkflowStateManager;
   365:   try {
>> 366:     ({ WorkflowStateManager } = require('../../../.aiox-core/development/scripts/workflow-state-manager'));
   367:     pass('3.1 WorkflowStateManager module loads');
   368:   } catch (e) {
```
*(bloco/entidade: `try {`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:382
```
   380:     const wfData = yaml.load(wfContent);
   381: 
>> 382:     const state = await mgr.createState(wfData, { target_context: 'core' });
   383:     assert(
   384:       !!state.instance_id,
```
*(bloco/entidade: `try {`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:399
```
   397:     );
   398:     assert(
>> 399:       state.current_step_index === 0,
   400:       '3.2d Starts at step 0',
>> 401:       `Got: ${state.current_step_index}`,
   402:     );
   403:     assert(
```
*(bloco/entidade: `assert(`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:409
```
   407:     );
   408:     assert(
>> 409:       state.target_context === 'core',
>> 410:       '3.2f target_context is core',
>> 411:       `Got: ${state.target_context}`,
   412:     );
   413: 
```
*(bloco/entidade: `assert(`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:461
```
   459:     );
   460:     assert(
>> 461:       state.steps[0].artifacts_created.includes('project-brief.md'),
   462:       '3.6b Artifacts recorded',
>> 463:       `Got: ${state.steps[0].artifacts_created}`,
   464:     );
   465: 
   466:     mgr.advanceStep(state);
   467:     assert(
>> 468:       state.current_step_index > 0,
   469:       '3.6c Advanced past step 0',
>> 470:       `Still at: ${state.current_step_index}`,
   471:     );
   472: 
```
*(bloco/entidade: `assert(`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:526
```
   524:     );
   525:     assert(
>> 526:       reloaded.current_step_index === state.current_step_index,
>> 527:       '3.10c Reloaded current_step_index matches',
>> 528:       `Got: ${reloaded?.current_step_index}`,
   529:     );
   530: 
   531:     // 3.11 Skip optional step
   532:     const optionalIdx = state.steps.findIndex((s) => s.optional && s.status === 'pending');
   533:     if (optionalIdx !== -1) {
>> 534:       state.current_step_index = optionalIdx;
   535:       mgr.markStepSkipped(state, optionalIdx);
   536:       assert(
```
*(bloco/entidade: `assert(`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:650
```
   648:     );
   649: 
>> 650:     // 3.20 workflow-state-schema.yaml exists and is valid YAML
>> 651:     const schemaContent = fs.readFileSync(path.join(ROOT, '.aiox-core/data/workflow-state-schema.yaml'), 'utf-8');
   652:     const schema = yaml.load(schemaContent);
   653:     assert(
```

### .aiox-core/development/scripts/verify-workflow-gaps.js:729
```
   727: 
   728:   // 4.3 Schema includes hybrid
>> 729:   const schemaContent = fs.readFileSync(path.join(ROOT, '.aiox-core/data/workflow-state-schema.yaml'), 'utf-8');
   730:   const schema = yaml.load(schemaContent);
   731:   assert(
>> 732:     schema.fields.target_context.enum.includes('hybrid'),
   733:     '4.3 Schema enum includes hybrid',
>> 734:     `Enum: ${schema.fields.target_context.enum}`,
   735:   );
   736: 
```

### .aiox-core/development/scripts/verify-workflow-gaps.js:853
```
   851: 
   852:     // 4.11 StateManager.createState with hybrid
>> 853:     const { WorkflowStateManager } = require('../../../.aiox-core/development/scripts/workflow-state-manager');
   854:     hybridStateMgr = new WorkflowStateManager({ verbose: false });
   855:     const wfData = {
```

### .aiox-core/development/scripts/verify-workflow-gaps.js:866
```
   864:     };
   865:     hybridState = await hybridStateMgr.createState(wfData, {
>> 866:       target_context: 'hybrid',
   867:       squad_name: 'test-squad',
   868:     });
   869:     assert(
>> 870:       hybridState.target_context === 'hybrid',
>> 871:       '4.11a createState sets target_context=hybrid',
>> 872:       `Got: ${hybridState.target_context}`,
   873:     );
   874:     assert(
```
*(bloco/entidade: `hybridState = await hybridStateMgr.createState(wfData, {`)*

### .aiox-core/development/scripts/verify-workflow-gaps.js:889
```
   887: 
   888:     // 4.13 resolveAgentPaths returns null squadPath for core
>> 889:     const coreState = { target_context: 'core', squad_name: null };
   890:     const corePaths = hybridStateMgr.resolveAgentPaths(coreState);
   891:     assert(
```

### .aiox-core/development/scripts/workflow-navigator.js:2
```
   1: /**
>> 2:  * Workflow Navigator - Next-Step Suggestions for Workflow State
   3:  *
   4:  * Provides intelligent next-step command suggestions based on:
>> 5:  * - Current workflow state (detected from command history)
   6:  * - Workflow transitions (defined in workflow-patterns.yaml)
   7:  * - Context data (story path, branch, epic)
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/workflow-navigator.js:34
```
   32: 
   33:   /**
>> 34:    * Detect current workflow state from command history
   35:    * @param {Array<string>} commandHistory - Recent commands executed
   36:    * @param {Object} context - Session context (story_path, branch, etc.)
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/workflow-navigator.js:67
```
   65: 
   66:   /**
>> 67:    * Suggest next commands for current workflow state
>> 68:    * @param {Object} workflowState - { workflow, state, context }
   69:    * @returns {Array} Array of suggestions with pre-populated commands
   70:    */
>> 71:   suggestNextCommands(workflowState) {
>> 72:     if (!workflowState || !workflowState.workflow || !workflowState.state) {
   73:       return [];
   74:     }
   75: 
>> 76:     const workflow = this.patterns.workflows[workflowState.workflow];
   77:     if (!workflow || !workflow.transitions) {
   78:       return [];
   79:     }
   80: 
>> 81:     const transition = workflow.transitions[workflowState.state];
   82:     if (!transition || !transition.next_steps) {
   83:       return [];
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/workflow-navigator.js:88
```
   86:     // Generate suggestions with pre-populated templates
   87:     const suggestions = transition.next_steps.map(step => {
>> 88:       const command = this.populateTemplate(step.args_template, workflowState.context);
   89:       return {
   90:         command: `*${step.command}${command ? ' ' + command : ''}`,
```
*(bloco/entidade: `suggestions`)*

### .aiox-core/development/scripts/workflow-navigator.js:202
```
   200: 
   201:   /**
>> 202:    * Detect workflow state from a state file (GAP-3 integration)
>> 203:    * @param {string} stateFilePath - Path to a workflow state YAML file
   204:    * @returns {Object|null} { workflow, state, context, stateData } or null
   205:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/workflow-navigator.js:220
```
   218: 
   219:       // Try to map step index to a semantic state via workflow transitions
>> 220:       let semanticState = `step_${stateData.current_step_index}`;
   221:       const currentStep = Array.isArray(stateData.steps)
>> 222:         ? stateData.steps[stateData.current_step_index]
   223:         : null;
   224:       if (currentStep && this.patterns.workflows) {
```
*(bloco/entidade: `try {`)*

### .aiox-core/development/scripts/workflow-navigator.js:243
```
   241:           instance_id: stateData.instance_id,
   242:           current_phase: stateData.current_phase,
>> 243:           target_context: stateData.target_context,
   244:           squad_name: stateData.squad_name,
   245:         },
```
*(bloco/entidade: `context: {`)*

### .aiox-core/development/scripts/workflow-navigator.js:255
```
   253: 
   254:   /**
>> 255:    * Suggest next commands based on workflow state file (GAP-3 integration)
>> 256:    * @param {Object} state - Workflow state object from state file
   257:    * @returns {Array} Array of suggestions
   258:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/workflow-navigator.js:264
```
   262:     }
   263: 
>> 264:     if (!Array.isArray(state.steps) || state.current_step_index < 0 || state.current_step_index >= state.steps.length) {
   265:       return [];
   266:     }
   267: 
>> 268:     const currentStep = state.steps[state.current_step_index];
   269:     if (!currentStep) {
   270:       return [];
```
*(bloco/entidade: `suggestNextCommandsFromState(state) {`)*

### .aiox-core/development/scripts/workflow-navigator.js:315
```
   313: 
   314:   /**
>> 315:    * Get greeting message for workflow state
>> 316:    * @param {Object} workflowState - Workflow state
   317:    * @returns {string} Greeting message
   318:    */
>> 319:   getGreetingMessage(workflowState) {
>> 320:     if (!workflowState || !workflowState.workflow || !workflowState.state) {
   321:       return '';
   322:     }
   323: 
>> 324:     const workflow = this.patterns.workflows[workflowState.workflow];
   325:     if (!workflow || !workflow.transitions) {
   326:       return '';
   327:     }
   328: 
>> 329:     const transition = workflow.transitions[workflowState.state];
   330:     return transition?.greeting_message || '';
   331:   }
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/workflow-state-manager.js:2
```
   1: /**
>> 2:  * Workflow State Manager
   3:  *
   4:  * @deprecated Superseded by session-state.js (Story 11.5).
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/workflow-state-manager.js:20
```
   18:  * - Each session picks up where the last left off via state file
   19:  *
>> 20:  * @module workflow-state-manager
   21:  * @version 2.0.0
   22:  */
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/workflow-state-manager.js:58
```
   56:    * @param {Object} workflowData - Parsed workflow YAML (the workflow: block)
   57:    * @param {Object} instanceConfig - Instance configuration
>> 58:    * @param {string} [instanceConfig.target_context='core']
   59:    * @param {string} [instanceConfig.squad_name]
   60:    * @returns {Promise<Object>} Created state object
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/workflow-state-manager.js:65
```
   63:     const wf = workflowData.workflow || workflowData;
   64:     if (!wf || !wf.id) {
>> 65:       throw new Error('workflow.id is required to create workflow state');
   66:     }
   67:     const instanceId = this._generateInstanceId(wf.id);
```
*(bloco/entidade: `if (!wf || !wf.id) {`)*

### .aiox-core/development/scripts/workflow-state-manager.js:74
```
   72:       workflow_name: wf.name || wf.id,
   73:       instance_id: instanceId,
>> 74:       target_context: instanceConfig.target_context || 'core',
   75:       squad_name: instanceConfig.squad_name || null,
   76:       started_at: new Date().toISOString(),
   77:       updated_at: new Date().toISOString(),
   78:       status: 'active',
   79:       current_phase: null,
>> 80:       current_step_index: 0,
   81:       steps: [],
   82:       artifacts: [],
```
*(bloco/entidade: `state`)*

### .aiox-core/development/scripts/workflow-state-manager.js:109
```
   107:           started_at: null,
   108:           completed_at: null,
>> 109:           artifacts_created: [],
   110:           notes: step.notes || null,
   111:           session_id: null,
```
*(bloco/entidade: `return {`)*

### .aiox-core/development/scripts/workflow-state-manager.js:304
```
   302: 
   303:   /**
>> 304:    * List all active workflow state files
   305:    * @returns {Promise<Array>} Array of { instanceId, workflowId, status, updatedAt }
   306:    */
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/scripts/workflow-state-manager.js:347
```
   345:    */
   346:   advanceStep(state) {
>> 347:     const currentIndex = state.current_step_index;
   348: 
   349:     // Find next pending step after current
   350:     for (let i = currentIndex + 1; i < state.steps.length; i++) {
   351:       if (state.steps[i].status === 'pending') {
>> 352:         state.current_step_index = i;
   353:         state.current_phase = state.steps[i].phase;
   354:         this._log(`Advanced to step ${i}: ${state.steps[i].phase}`);
```
*(bloco/entidade: `advanceStep(state) {`)*

### .aiox-core/development/scripts/workflow-state-manager.js:381
```
   379:     step.status = 'completed';
   380:     step.completed_at = new Date().toISOString();
>> 381:     step.artifacts_created = artifacts;
   382: 
   383:     // Update artifact registry
```
*(bloco/entidade: `markStepCompleted(state, stepIndex, artifacts = []) {`)*

### .aiox-core/development/scripts/workflow-state-manager.js:429
```
   427:       return null;
   428:     }
>> 429:     return state.steps[state.current_step_index] || null;
   430:   }
   431: 
```
*(bloco/entidade: `getCurrentStep(state) {`)*

### .aiox-core/development/scripts/workflow-state-manager.js:562
```
   560:       }
   561: 
>> 562:       const isCurrent = step.step_index === state.current_step_index && state.status === 'active';
   563:       const marker = isCurrent ? ' <-- current' : '';
   564:       const optional = step.optional ? ' (optional)' : '';
```
*(bloco/entidade: `for (const step of state.steps) {`)*

### .aiox-core/development/scripts/workflow-state-manager.js:594
```
   592: 
   593:   /**
>> 594:    * Resolve agent directory paths based on workflow state context.
   595:    * For hybrid workflows, returns both core and squad paths.
   596:    *
>> 597:    * @param {Object} state - Workflow state object
   598:    * @returns {{ corePath: string, squadPath: string|null }} Agent directory paths
   599:    */
   600:   resolveAgentPaths(state) {
   601:     const corePath = path.join(this.basePath, '.aiox-core', 'development', 'agents');
   602: 
>> 603:     if (state.target_context === 'core') {
   604:       return { corePath, squadPath: null };
   605:     }
```
*(bloco/entidade: `/**`)*

### .aiox-core/development/tasks/create-workflow.md:59
```
   57:   validação: Must be non-empty, lowercase, kebab-case
   58: 
>> 59: - campo: target_context
   60:   tipo: string
   61:   origem: User Input
```

### .aiox-core/development/tasks/create-workflow.md:68
```
   66:   tipo: string
   67:   origem: User Input
>> 68:   obrigatório: false (required when target_context="squad" or "hybrid")
   69:   validação: Must be kebab-case, squad must exist in squads/
   70: 
```
*(bloco/entidade: `- campo: squad_name`)*

### .aiox-core/development/tasks/create-workflow.md:116
```
   114:       Check target does not already exist; required inputs provided; permissions granted
   115:     error_message: "Pre-condition failed: Target does not already exist; required inputs provided; permissions granted"
>> 116:   - [ ] When target_context="squad" or "hybrid", squad directory must exist at squads/{squad_name}/
   117:     tipo: pre-condition
   118:     blocker: true
   119:     validação: |
>> 120:       If target_context is "squad" or "hybrid", verify squads/{squad_name}/ exists and has a valid squad.yaml
   121:     error_message: "Pre-condition failed: Squad '{squad_name}' not found in squads/"
   122: ```
```
*(bloco/entidade: `pre-conditions`)*

### .aiox-core/development/tasks/create-workflow.md:359
```
   357: 
   358: 4. **Create Workflow File**
>> 359:    - Resolve output path based on target_context:
   360:      - `core` → `.aiox-core/development/workflows/{workflow-name}.yaml`
   361:      - `squad` → `squads/{squad_name}/workflows/{workflow-name}.yaml`
```
*(bloco/entidade: `4. **Create Workflow File**`)*

### .aiox-core/development/tasks/create-workflow.md:366
```
   364:    - Include comprehensive documentation
   365: 
>> 366: 4.5. **Update Squad Manifest** (when target_context="squad" or "hybrid")
   367:    - Load `squads/{squad_name}/squad.yaml`
   368:    - Initialize `components.workflows` array if it does not exist
```

### .aiox-core/development/tasks/create-workflow.md:419
```
   417:    (hybrid → squads/{squad_name}/workflows/{workflow-name}.yaml)
   418: 📊 Workflow Summary:
>> 419:    - Context: {target_context} {squad_name if applicable}
   420:    - Steps: {step-count}
   421:    - Agents: {agent-list}
```
*(bloco/entidade: `📊 Workflow Summary:`)*

### .aiox-core/development/tasks/create-worktree.md:288
```
   286: Path:     .aiox/worktrees/{storyId}
   287: Branch:   auto-claude/{storyId}
>> 288: Status:   active
   289: 
   290: Next Steps:
```

### .aiox-core/development/tasks/execute-epic-plan.md:359
```
   357:   started_at: {ISO timestamp}
   358:   updated_at: {ISO timestamp}
>> 359:   status: active
   360: 
   361:   current_wave: 1
```
*(bloco/entidade: `epic_state`)*

### .aiox-core/development/tasks/execute-epic-plan.md:571
```
   569:           ## Output
   570:           When done, report:
>> 571:           - Status: completed or failed
   572:           - Files changed
   573:           - Tests added/passing
```

### .aiox-core/development/tasks/execute-epic-plan.md:776
```
   774:   started_at: "2026-02-06T10:00:00Z"
   775:   updated_at: "2026-02-06T14:30:00Z"
>> 776:   status: active  # active | completed | aborted
   777: 
   778:   current_wave: 2
```
*(bloco/entidade: `epic_state`)*

### .aiox-core/development/tasks/execute-epic-plan.md:784
```
   782:     1:
   783:       name: "Foundation Fixes"
>> 784:       status: completed
   785:       tag: wave-1-complete
   786:       stories:
>> 787:         ACT-1: { status: completed, branch: feat/act-1-greeting-config }
>> 788:         ACT-2: { status: completed, branch: feat/act-2-user-profile-audit }
>> 789:         ACT-3: { status: completed, branch: feat/act-3-status-loader-reliability }
>> 790:         ACT-4: { status: completed, branch: feat/act-4-permission-mode }
   791:     2:
   792:       name: "Unification"
```
*(bloco/entidade: `1`)*

### .aiox-core/development/tasks/modify-workflow.md:57
```
   55:   validação: Must exist in system
   56: 
>> 57: - campo: target_context
   58:   tipo: string
   59:   origem: User Input
```

### .aiox-core/development/tasks/modify-workflow.md:66
```
   64:   tipo: string
   65:   origem: User Input
>> 66:   obrigatório: false (required when target_context="squad" or "hybrid")
   67:   validação: Must be kebab-case, squad must exist in squads/
   68: 
```
*(bloco/entidade: `- campo: squad_name`)*

### .aiox-core/development/tasks/modify-workflow.md:114
```
   112:       Check target exists; backup created; valid modification parameters
   113:     error_message: "Pre-condition failed: Target exists; backup created; valid modification parameters"
>> 114:   - [ ] When target_context="squad" or "hybrid", squad directory must exist at squads/{squad_name}/
   115:     tipo: pre-condition
   116:     blocker: true
   117:     validação: |
>> 118:       If target_context is "squad" or "hybrid", verify squads/{squad_name}/ exists and has a valid squad.yaml
   119:     error_message: "Pre-condition failed: Squad '{squad_name}' not found in squads/"
   120: ```
```
*(bloco/entidade: `pre-conditions`)*

### .aiox-core/development/tasks/modify-workflow.md:250
```
   248: ## Prerequisites
   249: 
>> 250: - Target workflow must exist (path resolved from target_context):
   251:   - `core` → `.aiox-core/development/workflows/`
   252:   - `squad` → `squads/{squad_name}/workflows/`
```

### .aiox-core/development/tasks/modify-workflow.md:262
```
   260: ### 1. Workflow Analysis and Backup
   261: 
>> 262: - Resolve workflow path based on target_context:
   263:   - `core` → `.aiox-core/development/workflows/{workflow-name}.yaml`
   264:   - `squad` → `squads/{squad_name}/workflows/{workflow-name}.yaml`
```

### .aiox-core/development/tasks/next.md:8
```
   6: 
   7: AIOX 4.0.4 runtime-first mode adds deterministic next-step recommendation from
>> 8: execution signals (story/qa/ci/diff) via `workflow-state-manager`. That module
   9: is a legacy compatibility helper for `*next`; new persistent story/epic state
   10: belongs in `.aiox-core/core/orchestration/session-state.js`.
```

### .aiox-core/development/tasks/next.md:98
```
   96: ### Step 3: Runtime-First Deterministic Recommendation (Preferred)
   97: ```javascript
>> 98: const { WorkflowStateManager } = require('.aiox-core/development/scripts/workflow-state-manager');
   99: const manager = new WorkflowStateManager();
   100: 
```

### .aiox-core/development/tasks/patterns.md:202
```
   200: 
   201: 2. develop → review-qa → apply-qa-fixes
>> 202:    Occurrences: 8 | Success: 88% | Status: active
   203:    Workflow: story_development | Last seen: 1d ago
   204: 
   205: 3. create-story → validate-story-draft → develop
>> 206:    Occurrences: 6 | Success: 100% | Status: active
   207:    Workflow: story_creation | Last seen: 3d ago
   208: 
```
*(bloco/entidade: `2. develop → review-qa → apply-qa-fixes`)*

### .aiox-core/development/tasks/plan-execute-subtask.md:69
```
   67:       schema:
   68:         subtaskId: string
>> 69:         status: completed|failed|blocked
   70:         attempt: integer
   71:         filesModified: array
```
*(bloco/entidade: `schema`)*

### .aiox-core/development/tasks/qa-fix-issues.md:68
```
   66:       schema:
   67:         storyId: string
>> 68:         status: completed|failed|blocked
   69:         issuesFixed: array
   70:         verificationResults: array
```
*(bloco/entidade: `schema`)*

### .aiox-core/development/tasks/qa-review-build.md:185
```
   183: checks:
   184:   - id: subtasks-complete
>> 185:     condition: 'all subtasks have status: completed'
   186:     severity: HIGH
   187:     message: 'All subtasks must be completed before QA review'
```
*(bloco/entidade: `- id: subtasks-complete`)*

### .aiox-core/development/tasks/run-workflow-engine.md:26
```
   24:   validação: Must match an existing workflow YAML file
   25: 
>> 26: - campo: target_context
   27:   tipo: string
   28:   origem: Delegated from run-workflow.md
```

### .aiox-core/development/tasks/run-workflow-engine.md:35
```
   33:   tipo: string
   34:   origem: Delegated from run-workflow.md
>> 35:   obrigatório: false (required when target_context="squad" or "hybrid")
   36:   validação: Must be kebab-case, squad must exist in squads/
   37: 
```
*(bloco/entidade: `- campo: squad_name`)*

### .aiox-core/development/tasks/run-workflow-engine.md:45
```
   43: 
   44: **Saída:**
>> 45: - campo: workflow_state
   46:   tipo: object
   47:   destino: File system (.aiox/{instance-id}-engine-state.yaml)
```

### .aiox-core/development/tasks/run-workflow-engine.md:73
```
   71:       Check workflow file exists at resolved path
   72:     error_message: "Pre-condition failed: Workflow '{workflow_name}' not found"
>> 73:   - [ ] When target_context="squad" or "hybrid", squad directory must exist
   74:     tipo: pre-condition
   75:     blocker: true
   76:     validação: |
>> 77:       If target_context is "squad" or "hybrid", verify squads/{squad_name}/ exists
   78:     error_message: "Pre-condition failed: Squad '{squad_name}' not found"
   79:   - [ ] For action=continue/status/skip/abort, an active engine state file must exist
```
*(bloco/entidade: `pre-conditions`)*

### .aiox-core/development/tasks/run-workflow-engine.md:103
```
   101:     blocker: true
   102:     validação: |
>> 103:       Verify all required steps have status: completed in state
   104:     error_message: "Post-condition failed: Not all steps completed"
   105:   - [ ] State file created with all step outputs
```
*(bloco/entidade: `validação: |`)*

### .aiox-core/development/tasks/run-workflow-engine.md:155
```
   153:   - **Source:** Claude Code runtime
   154: 
>> 155: - **Tool:** workflow-state-manager
>> 156:   - **Purpose:** Create and manage workflow state
>> 157:   - **Source:** .aiox-core/development/scripts/workflow-state-manager.js
   158:   - **Lifecycle:** Deprecated for new story/epic lifecycle flows; use `.aiox-core/core/orchestration/session-state.js` outside legacy guided workflow execution
   159: 
```

### .aiox-core/development/tasks/run-workflow-engine.md:218
```
   216:   - run-workflow.md (delegates to this task)
   217:   - subagent-step-prompt.md (template for prompt building)
>> 218:   - workflow-state-manager.js
   219:   - workflow-validator.js
   220: tags:
```
*(bloco/entidade: `dependencies`)*

### .aiox-core/development/tasks/run-workflow-engine.md:265
```
   263: Initialize a new workflow and execute the first action step.
   264: 
>> 265: **1. Resolve workflow path** based on `target_context`:
   266: - `core` → `.aiox-core/development/workflows/{workflow_name}.yaml`
   267: - `squad` → `squads/{squad_name}/workflows/{workflow_name}.yaml`
```

### .aiox-core/development/tasks/run-workflow-engine.md:284
```
   282:   workflow_name: {workflow.name}
   283:   instance_id: "{workflow_id}-engine-{timestamp}"
>> 284:   target_context: {target_context}
   285:   squad_name: {squad_name}
   286:   mode: engine
   287:   started_at: {ISO timestamp}
>> 288:   status: active
>> 289:   current_step_index: 0
   290:   current_phase: null
   291:   step_outputs: {}
```
*(bloco/entidade: `engine_state`)*

### .aiox-core/development/tasks/run-workflow-engine.md:365
```
   363: **1. Load state.**
   364: 
>> 365: **2. Identify the current step** at `current_step_index`.
   366: 
   367: **3. Verify** the step has `optional: true`. If not → error: "Step {id} is not optional."
```

### .aiox-core/development/tasks/run-workflow-engine.md:377
```
   375: ```
   376: 
>> 377: **5. Advance `current_step_index`** past the skipped step.
   378: 
   379: **6. Save state.**
```

### .aiox-core/development/tasks/run-workflow-engine.md:415
```
   413: ### Sequence Advancer (Core Algorithm)
   414: 
>> 415: This is the internal procedure called by both `start` and `continue`. It walks through the sequence from `current_step_index`, automatically processing non-action items, and stops when it hits an acti
   416: 
   417: ```
   418: PROCEDURE advance_and_execute(state, workflow):
   419: 
>> 420:   index = state.current_step_index
   421:   sequence = workflow.sequence
   422: 
```

### .aiox-core/development/tasks/run-workflow-engine.md:453
```
   451:     # --- Action Step (spawn subagent) ---
   452:     IF item has 'agent' field:
>> 453:       state.current_step_index = index
   454:       Execute the step:
   455:         1. IF elicit=true → run Elicitation Handler
```
*(bloco/entidade: `IF item has 'agent' field:`)*

### .aiox-core/development/tasks/run-workflow-engine.md:468
```
   466:       Display step result to user.
   467:       Advance index for next invocation:
>> 468:         state.current_step_index = index + 1
   469:       Show what comes next (preview):
   470:         Scan ahead to find next action step, show its agent/action.
```
*(bloco/entidade: `Advance index for next invocation:`)*

### .aiox-core/development/tasks/run-workflow-engine.md:604
```
   602: 
   603: ```
>> 604: resolve_agent_path(agent_ref, target_context, squad_name):
   605:   # Handle explicit prefix
   606:   IF agent_ref starts with "core:":
```

### .aiox-core/development/tasks/run-workflow-engine.md:612
```
   610: 
   611:   # Context-based resolution
>> 612:   IF target_context == "core":
   613:     RETURN ".aiox-core/development/agents/{agent_ref}.md"
>> 614:   IF target_context == "squad":
   615:     RETURN "squads/{squad_name}/agents/{agent_ref}.md"
>> 616:   IF target_context == "hybrid":
   617:     squad_path = "squads/{squad_name}/agents/{agent_ref}.md"
   618:     core_path = ".aiox-core/development/agents/{agent_ref}.md"
```
*(bloco/entidade: `resolve_agent_path(agent_ref, target_context, squad_name):`)*

### .aiox-core/development/tasks/run-workflow-engine.md:627
```
   625: 
   626: ```
>> 627: resolve_task_path(uses_ref, target_context, squad_name):
>> 628:   IF target_context == "core":
   629:     RETURN ".aiox-core/development/tasks/{uses_ref}.md"
>> 630:   IF target_context == "squad":
   631:     RETURN "squads/{squad_name}/tasks/{uses_ref}.md"
>> 632:   IF target_context == "hybrid":
   633:     squad_path = "squads/{squad_name}/tasks/{uses_ref}.md"
   634:     core_path = ".aiox-core/development/tasks/{uses_ref}.md"
```

### .aiox-core/development/tasks/run-workflow-engine.md:643
```
   641: 
   642: ```
>> 643: resolve_data_path(data_ref, target_context, squad_name):
>> 644:   IF target_context == "core":
   645:     RETURN ".aiox-core/data/{data_ref}"
>> 646:   IF target_context == "squad":
   647:     RETURN "squads/{squad_name}/data/{data_ref}"
>> 648:   IF target_context == "hybrid":
   649:     squad_path = "squads/{squad_name}/data/{data_ref}"
   650:     core_path = ".aiox-core/data/{data_ref}"
```

### .aiox-core/development/tasks/run-workflow-engine.md:687
```
   685: 
   686: If the YAML block cannot be parsed:
>> 687: - Extract `status` from any line containing "status: completed" or "status: failed"
   688: - Extract individual output values by searching for each expected output key
   689: - Log a warning that structured parsing failed
```

### .aiox-core/development/tasks/run-workflow-engine.md:785
```
   783:   workflow_name: {name}
   784:   instance_id: {instance_id}
>> 785:   target_context: {context}
   786:   squad_name: {squad}
   787:   mode: engine
   788:   started_at: {timestamp}
   789:   updated_at: {current timestamp}
>> 790:   status: active|completed|aborted
>> 791:   current_step_index: {index of NEXT step to process}
   792:   current_phase: {phase name}
   793:   last_completed_step: {id of last completed action step, or null}
```
*(bloco/entidade: `engine_state`)*

### .aiox-core/development/tasks/run-workflow-engine.md:804
```
   802:   step_results:
   803:     {step_id}:
>> 804:       status: completed|failed|skipped
   805:       outputs: {parsed outputs}
   806:       score: {if applicable}
```
*(bloco/entidade: `{step_id}:`)*

### .aiox-core/development/tasks/run-workflow-engine.md:829
```
   827: ```
   828: 
>> 829: The engine loads the state, reads `current_step_index`, and picks up exactly where it left off. All previous step outputs are available in `step_outputs` for the `requires` chain.
   830: 
   831: ---
```

### .aiox-core/development/tasks/run-workflow.md:41
```
   39:   validação: Must match an existing workflow YAML file
   40: 
>> 41: - campo: target_context
   42:   tipo: string
   43:   origem: User Input
```

### .aiox-core/development/tasks/run-workflow.md:50
```
   48:   tipo: string
   49:   origem: User Input
>> 50:   obrigatório: false (required when target_context="squad" or "hybrid")
   51:   validação: Must be kebab-case, squad must exist in squads/
   52: 
```
*(bloco/entidade: `- campo: squad_name`)*

### .aiox-core/development/tasks/run-workflow.md:66
```
   64: 
   65: **Saída:**
>> 66: - campo: workflow_state
   67:   tipo: object
   68:   destino: File system (.aiox/{instance-id}-state.yaml)
```

### .aiox-core/development/tasks/run-workflow.md:104
```
   102:       Check .aiox/{instance-id}-state.yaml exists with status=active
   103:     error_message: "Pre-condition failed: No active workflow instance found"
>> 104:   - [ ] When target_context="squad" or "hybrid", squad directory must exist
   105:     tipo: pre-condition
   106:     blocker: true
   107:     validação: |
>> 108:       If target_context is "squad" or "hybrid", verify squads/{squad_name}/ exists
   109:     error_message: "Pre-condition failed: Squad '{squad_name}' not found"
   110: ```
```
*(bloco/entidade: `pre-conditions`)*

### .aiox-core/development/tasks/run-workflow.md:156
```
   154: > **Note:** The tools below are conceptual patterns executed by the AI agent at runtime (file reads, YAML parsing, state management). They are NOT standalone JS scripts — the agent implements this log
   155: 
>> 156: - **Tool:** workflow-state-manager
>> 157:   - **Purpose:** Create, load, save, and query workflow state
>> 158:   - **Lifecycle:** Legacy guided workflow state only; new story/epic lifecycle flows use `.aiox-core/core/orchestration/session-state.js`
   159:   - **Implementation:** AI agent reads/writes `.aiox/{instance-id}-state.yaml` files directly
   160: 
```

### .aiox-core/development/tasks/run-workflow.md:240
```
   238: 
   239: 1. **workflow_name** — Which workflow to run (required)
>> 240: 2. **target_context** — Where to look for the workflow: `core`, `squad`, or `hybrid` (default: `core`)
>> 241: 3. **squad_name** — Required when target_context is `squad` or `hybrid`
   242: 4. **action** — What to do: `start`, `continue`, `status`, `skip`, `abort` (default: `continue`)
   243: 5. **mode** — Execution mode: `guided` (persona-switch) or `engine` (real subagent spawning) (default: `guided`)
```

### .aiox-core/development/tasks/run-workflow.md:254
```
   252: IF mode == "engine":
   253:   Delegate ENTIRELY to run-workflow-engine.md task.
>> 254:   Pass all parameters: workflow_name, target_context, squad_name, action.
   255:   The engine task handles everything from here — do NOT continue below.
   256:   STOP.
```
*(bloco/entidade: `IF mode == "engine":`)*

### .aiox-core/development/tasks/run-workflow.md:269
```
   267: Initialize a new workflow execution.
   268: 
>> 269: 1. **Resolve workflow file path** based on target_context:
   270:    - `core` → `.aiox-core/development/workflows/{workflow_name}.yaml`
   271:    - `squad` → `squads/{squad_name}/workflows/{workflow_name}.yaml`
```

### .aiox-core/development/tasks/squad-creator-download.md:6
```
   4: responsavel_type: agent
   5: atomic_layer: task
>> 6: status: active
   7: sprint: 8
   8: story: SQS-6
```

### .aiox-core/development/tasks/squad-creator-publish.md:6
```
   4: responsavel_type: agent
   5: atomic_layer: task
>> 6: status: active
   7: sprint: 8
   8: story: SQS-6
```

### .aiox-core/development/tasks/squad-creator-sync-ide-command.md:6
```
   4: responsavel_type: agent
   5: atomic_layer: task
>> 6: status: active
   7: sprint: 9
   8: story: SQC-12
```

### .aiox-core/development/tasks/squad-creator-sync-synkra.md:6
```
   4: responsavel_type: agent
   5: atomic_layer: task
>> 6: status: active
   7: sprint: 8
   8: story: SQS-5
```

### .aiox-core/development/tasks/story-checkpoint.md:109
```
   107:       label: "⏸️ PAUSE - Save state and stop"
   108:       description: |
>> 109:         Save the current workflow state and stop execution.
   110:         You can resume later with *workflow resume development-cycle.
   111:       action: save_session_state
```
*(bloco/entidade: `description: |`)*

### .aiox-core/development/tasks/story-checkpoint.md:179
```
   177:     description: "Transition to next story"
   178:     actions:
>> 179:       - Update workflow state with new story
   180:       - Reset phase to 1_validation
   181:       - Continue workflow execution
```
*(bloco/entidade: `actions`)*

### .aiox-core/development/tasks/story-checkpoint.md:190
```
   188: steps:
   189:   1_save_state:
>> 190:     description: "Persist workflow state"
>> 191:     location: ".aiox/workflow-state/${story_id}-state.yaml"
   192:     content:
   193:       workflow_id: development-cycle
```
*(bloco/entidade: `1_save_state`)*

### .aiox-core/development/tasks/story-checkpoint.md:205
```
   203:     description: "Confirm state saved"
   204:     message: |
>> 205:       ✅ Workflow state saved!
   206: 
   207:       To resume later, run:
```
*(bloco/entidade: `message: |`)*

### .aiox-core/development/tasks/story-checkpoint.md:215
```
   213:   3_exit:
   214:     description: "Exit workflow"
>> 215:     status: paused
   216: ```
   217: 
```
*(bloco/entidade: `3_exit`)*

### .aiox-core/development/tasks/story-checkpoint.md:296
```
   294:   2_save_final_state:
   295:     description: "Save abort state"
>> 296:     location: ".aiox/workflow-state/${story_id}-state.yaml"
>> 297:     status: aborted
   298: 
   299:   3_report:
```
*(bloco/entidade: `2_save_final_state`)*

### .aiox-core/development/tasks/story-checkpoint.md:314
```
   312:   4_exit:
   313:     description: "Exit workflow"
>> 314:     status: aborted
   315: ```
   316: 
```
*(bloco/entidade: `4_exit`)*

### .aiox-core/development/tasks/validate-workflow.md:47
```
   45:   validação: Resolves to workflow file by name
   46: 
>> 47: - campo: target_context
   48:   tipo: string
   49:   origem: User Input
```

### .aiox-core/development/tasks/validate-workflow.md:56
```
   54:   tipo: string
   55:   origem: User Input
>> 56:   obrigatório: false (required when target_context="squad" or "hybrid")
   57:   validação: Must be kebab-case, squad must exist in squads/
   58: 
```
*(bloco/entidade: `- campo: squad_name`)*

### .aiox-core/development/tasks/validate-workflow.md:105
```
   103:       Check that workflow_path OR workflow_name OR all=true is provided
   104:     error_message: "Pre-condition failed: Must specify workflow_path, workflow_name, or --all flag"
>> 105:   - [ ] When target_context="squad", squad directory must exist
   106:     tipo: pre-condition
   107:     blocker: true
   108:     validação: |
>> 109:       If target_context is "squad", verify squads/{squad_name}/ exists
   110:     error_message: "Pre-condition failed: Squad '{squad_name}' not found in squads/"
   111: ```
```
*(bloco/entidade: `pre-conditions`)*

### .aiox-core/development/tasks/validate-workflow.md:247
```
   245: 
   246: 1. **workflow_path** or **workflow_name** — Which workflow(s) to validate (one required unless `--all`)
>> 247: 2. **target_context** — Where to look for the workflow: `core`, `squad`, or `hybrid` (default: `core`)
>> 248: 3. **squad_name** — Required when target_context is `squad` or `hybrid`
   249: 4. **strict** — Treat warnings as errors (default: `false`)
   250: 5. **all** — Validate all workflows in the resolved context (default: `false`)
```

### .aiox-core/development/tasks/validate-workflow.md:262
```
   260: 
   261: **Single file by name:**
>> 262: - Resolve based on target_context:
   263:   - `core` → `.aiox-core/development/workflows/{workflow_name}.yaml`
   264:   - `squad` → `squads/{squad_name}/workflows/{workflow_name}.yaml`
   265:   - `hybrid` → `squads/{squad_name}/workflows/{workflow_name}.yaml`
   266: 
   267: **All workflows (--all flag):**
>> 268: - Scan directory based on target_context:
   269:   - `core` → all `.yaml` files in `.aiox-core/development/workflows/`
   270:   - `squad` → all `.yaml` files in `squads/{squad_name}/workflows/`
```

### .aiox-core/development/templates/subagent-step-prompt.md:49
```
   47: ```yaml
   48: step_output:
>> 49:   status: completed|failed
   50:   outputs:
   51:     # Include all output fields defined in the workflow step's 'outputs' list
```
*(bloco/entidade: `step_output`)*

### .aiox-core/development/workflows/development-cycle.yaml:449
```
   447:     persistence:
   448:       enabled: true
>> 449:       location: ".aiox/workflow-state/"
   450:       format: yaml
   451: 
```
*(bloco/entidade: `persistence`)*

### .aiox-core/development/workflows/epic-orchestration.yaml:180
```
   178:     persistence:
   179:       enabled: true
>> 180:       location: ".aiox/workflow-state/"
   181:       format: json
   182:       file: "${config.epicId}-pipeline.json"
```
*(bloco/entidade: `persistence`)*

### .aiox-core/infrastructure/scripts/pm-adapter.js:92
```
   90:    *
   91:    * Updates only the status field of a story in the PM tool.
>> 92:    * Useful for workflow state transitions (Draft → InProgress → Done).
   93:    *
   94:    * @param {string} storyId - Story ID (e.g., "3.14")
```
*(bloco/entidade: `/**`)*

### .aiox-core/infrastructure/tools/mcp/n8n.yaml:151
```
   149: 
   150:     helpers:
>> 151:       - id: extract-workflow-state
   152:         language: javascript
   153:         runtime: isolated_vm
```
*(bloco/entidade: `helpers`)*

### .aiox-core/install-manifest.yaml:1379
```
   1377:     type: data
   1378:     size: 27228
>> 1379:   - path: data/workflow-state-schema.yaml
   1380:     hash: sha256:d80a645a9c48b8ab8168ddbe36279662d72de4fb5cd8953a6685e5d1bd9968db
   1381:     type: data
```

### .aiox-core/install-manifest.yaml:1803
```
   1801:     type: script
   1802:     size: 10120
>> 1803:   - path: development/scripts/workflow-state-manager.js
   1804:     hash: sha256:34b249724bb9b4625b4c6e0c67f412d341927323278867367faf8999d09e741c
   1805:     type: script
```

### .aiox-core/product/templates/tmpl-comment-on-examples.sql:34
```
   32: -- Business columns with context
   33: COMMENT ON COLUMN users.email IS 'Primary email for login and notifications. Must be unique.';
>> 34: COMMENT ON COLUMN users.status IS 'Account status: active, pending, suspended, deleted';
   35: 
   36: -- Columns with constraints explained
```

### .aiox-core/product/templates/workflow-template.yaml:19
```
   17: {{#IF_CONTEXT}}
   18: context:
>> 19:   target: "{{TARGET_CONTEXT}}"  # core | squad | hybrid
   20:   {{#IF_SQUAD}}
   21:   squad: "{{SQUAD_NAME}}"
```
*(bloco/entidade: `context`)*

### .aiox-core/scripts/workflow-management.md:42
```
   40: 2. **Stage Transitions**: Mark complete → Check conditions → Load next agent → Pass artifacts
   41: 
>> 42: 3. **Artifact Tracking**: Track status, creator, timestamps in workflow_state
   43: 
   44: 4. **Interruption Handling**: Analyze provided artifacts → Determine position → Suggest next step
```

### .aiox-core/version.json:29
```
   27:     "data\\workflow-chains.yaml": "sha256:1fbf1625e267eedc315cf1e08e5827c250ddc6785fb2cb139e7702def9b66268",
   28:     "data\\workflow-patterns.yaml": "sha256:0e90d71ce0cc218d8710c1f195f74a24d3aa7513f5728f5e65da9220612c3617",
>> 29:     "data\\workflow-state-schema.yaml": "sha256:d80a645a9c48b8ab8168ddbe36279662d72de4fb5cd8953a6685e5d1bd9968db",
   30:     "elicitation\\agent-elicitation.js": "sha256:ef13ebff1375279e7b8f0f0bbd3699a0d201f9a67127efa64c4142159a26f417",
   31:     "elicitation\\task-elicitation.js": "sha256:cc44ad635e60cbdb67d18209b4b50d1fb2824de2234ec607a6639eb1754bfc75",
```

### .aiox-core/workflow-intelligence/engine/suggestion-engine.js:100
```
   98:     if (!WorkflowStateManager) {
   99:       try {
>> 100:         ({ WorkflowStateManager } = require('../../development/scripts/workflow-state-manager'));
   101:       } catch (error) {
   102:         console.warn('[SuggestionEngine] Failed to load WorkflowStateManager:', error.message);
```
*(bloco/entidade: `try {`)*

### .aiox-core/workflow-intelligence/engine/wave-analyzer.js:550
```
   548: 
   549:   /**
>> 550:    * Get wave context for current workflow state
   551:    * @param {string} workflowId - Workflow identifier
   552:    * @param {string} currentTask - Currently executing task
```
*(bloco/entidade: `/**`)*

### .aiox-core/workflow-intelligence/index.js:206
```
   204: 
   205: /**
>> 206:  * Get next steps for a workflow state
   207:  * @param {string} workflowName - Workflow name
   208:  * @param {string} state - Current state
```
*(bloco/entidade: `/**`)*

### .aiox-core/workflow-intelligence/index.js:216
```
   214: 
   215: /**
>> 216:  * Get transitions for a workflow state
   217:  * @param {string} workflowName - Workflow name
   218:  * @param {string} state - Current state
```
*(bloco/entidade: `/**`)*

### .aiox-core/workflow-intelligence/registry/workflow-registry.js:198
```
   196: 
   197:   /**
>> 198:    * Get transitions for a workflow state
   199:    * @param {string} workflowName - Name of the workflow
   200:    * @param {string} state - Current state in the workflow
```
*(bloco/entidade: `/**`)*

### .aiox-core/workflow-intelligence/registry/workflow-registry.js:229
```
   227: 
   228:   /**
>> 229:    * Get next steps for a workflow state
   230:    * @param {string} workflowName - Name of the workflow
   231:    * @param {string} state - Current state
```
*(bloco/entidade: `/**`)*

### squads/squad-creator-pro/scripts/on-specialist-complete.py:24
```
   22: 
   23: def load_state() -> dict:
>> 24:     """Load current workflow state."""
   25:     if STATE_FILE.exists():
   26:         return json.loads(STATE_FILE.read_text())
```
*(bloco/entidade: `def load_state() -> dict:`)*

### squads/squad-creator-pro/scripts/on-specialist-complete.py:31
```
   29: 
   30: def save_state(state: dict):
>> 31:     """Save workflow state."""
   32:     STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
   33:     STATE_FILE.write_text(json.dumps(state, indent=2))
```
*(bloco/entidade: `def save_state(state: dict):`)*

### squads/squad-creator-pro/scripts/save-session-metrics.py:23
```
   21: 
   22: def load_state() -> dict:
>> 23:     """Load current workflow state."""
   24:     if STATE_FILE.exists():
   25:         return json.loads(STATE_FILE.read_text())
```
*(bloco/entidade: `def load_state() -> dict:`)*

### squads/squad-creator-pro/scripts/save-session-metrics.py:30
```
   28: 
   29: def save_state(state: dict):
>> 30:     """Save workflow state."""
   31:     STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
   32:     STATE_FILE.write_text(json.dumps(state, indent=2))
```
*(bloco/entidade: `def save_state(state: dict):`)*

### squads/squad-creator-pro/tasks/optimize-workflow.md:464
```
   462:   per_phase:
   463:     estimate_tokens:
>> 464:       input: "phase_context + workflow_state"
   465:       output: "phase_result + handoff_context"
   466: 
```
*(bloco/entidade: `estimate_tokens`)*

### squads/squad-creator/data/tier-system-framework.md:55
```
   53:     - "Manage handoffs between agents"
   54:     - "Ensure quality gates are applied"
>> 55:     - "Maintain workflow state"
   56:   when_to_activate: "Always - serves as entry point"
   57: ```
```
*(bloco/entidade: `responsibilities`)*

### squads/squad-creator/scripts/on-specialist-complete.py:24
```
   22: 
   23: def load_state() -> dict:
>> 24:     """Load current workflow state."""
   25:     if STATE_FILE.exists():
   26:         return json.loads(STATE_FILE.read_text())
```
*(bloco/entidade: `def load_state() -> dict:`)*

### squads/squad-creator/scripts/on-specialist-complete.py:31
```
   29: 
   30: def save_state(state: dict):
>> 31:     """Save workflow state."""
   32:     STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
   33:     STATE_FILE.write_text(json.dumps(state, indent=2))
```
*(bloco/entidade: `def save_state(state: dict):`)*

### squads/squad-creator/scripts/save-session-metrics.py:23
```
   21: 
   22: def load_state() -> dict:
>> 23:     """Load current workflow state."""
   24:     if STATE_FILE.exists():
   25:         return json.loads(STATE_FILE.read_text())
```
*(bloco/entidade: `def load_state() -> dict:`)*

### squads/squad-creator/scripts/save-session-metrics.py:30
```
   28: 
   29: def save_state(state: dict):
>> 30:     """Save workflow state."""
   31:     STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
   32:     STATE_FILE.write_text(json.dumps(state, indent=2))
```
*(bloco/entidade: `def save_state(state: dict):`)*

### squads/squad-creator/tasks/sync-ide-command.md:6
```
   4: responsavel_type: agent
   5: atomic_layer: task
>> 6: status: active
   7: sprint: 9
   8: story: SQC-12
```

### squads/squad-creator/templates/workflow-tmpl.yaml:190
```
   188:   - id: completion-signals
   189:     title: Completion Signals
>> 190:     instruction: Define signals for workflow state communication.
   191:     template: |
   192:       # ═══════════════════════════════════════════════════════════════════════════════
```
*(bloco/entidade: `- id: completion-signals`)*
