<?php
namespace Dotpulse\Basic\Command;

/*
 * This file is part of the Neos.Neos package.
 *
 * (c) Contributors of the Neos Project - www.neos.io
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Cli\CommandController;
use Neos\Neos\Service\PublishingService;
use Neos\ContentRepository\Domain\Model\Workspace;
use Neos\ContentRepository\Domain\Repository\WorkspaceRepository;

/**
 * The Workspace Command Controller
 *
 * @Flow\Scope("singleton")
 */
class WorkspaceCommandController extends CommandController
{

    /**
     * @Flow\Inject
     * @var PublishingService
     */
    protected $publishingService;

    /**
     * @Flow\Inject
     * @var WorkspaceRepository
     */
    protected $workspaceRepository;

    /**
     * Checkall workspaces for unpublished changes
     *
     * This command checks all workspaces for unpublished changes and show these in a table.
     *
     * @return void
     */
    public function checkAllCommand()
    {
        $workspaces = $this->workspaceRepository->findAll();
        if ($workspaces->count() === 0) {
            $this->outputLine('No workspaces found.');
            $this->quit(0);
        }

        $tableRows = [];
        $headerRow = ['Workspace', 'Unpublished nodes'];

        /** @var Workspace $workspace */
        foreach ($workspaces as $workspace) {
            $workspaceName = $workspace->getName();

            try {
                $nodes = $this->publishingService->getUnpublishedNodes($workspace);
            } catch (\Exception $exception) {
                $this->outputLine('An error occurred while fetching unpublished nodes from workspace %s, publish aborted.', [$workspaceName]);
                $this->quit(1);
            }

            $tableRows[] = [$workspaceName, count($nodes)];
        }

        $this->output->outputTable($tableRows, $headerRow);
    }
}
