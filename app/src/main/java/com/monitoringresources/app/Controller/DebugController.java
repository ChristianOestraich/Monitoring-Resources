package com.monitoringresources.app.Controller;

import java.io.IOException;
import java.util.Map;

import com.sun.jdi.AbsentInformationException;
import com.sun.jdi.Bootstrap;
import com.sun.jdi.ClassType;
import com.sun.jdi.IncompatibleThreadStateException;
import com.sun.jdi.LocalVariable;
import com.sun.jdi.Location;
import com.sun.jdi.StackFrame;
import com.sun.jdi.Value;
import com.sun.jdi.VirtualMachine;
import com.sun.jdi.connect.Connector;
import com.sun.jdi.connect.IllegalConnectorArgumentsException;
import com.sun.jdi.connect.LaunchingConnector;
import com.sun.jdi.connect.VMStartException;
import com.sun.jdi.event.BreakpointEvent;
import com.sun.jdi.event.ClassPrepareEvent;
import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.request.BreakpointRequest;
import com.sun.jdi.request.ClassPrepareRequest;
import com.sun.jdi.request.StepRequest;

public class DebugController 
{
    private Class<?> debugClass; 
    private int[] breakPointLines;

    public Class<?> getDebugClass() 
    {
        return debugClass;
    }

    public void setDebugClass( Class<?> debugClass ) 
    {
        this.debugClass = debugClass;
    }

    public int[] getBreakPointLines() 
    {
        return breakPointLines;
    }

    public void setBreakPointLines( int[] breakPointLines ) 
    {
        this.breakPointLines = breakPointLines;
    }

    /**
     * Sets the debug class as the main argument in the connector and launches the VM
     * @return VirtualMachine
     * @throws IOException
     * @throws IllegalConnectorArgumentsException
     * @throws VMStartException
     */
    LaunchingConnector launchingConnector = Bootstrap.virtualMachineManager().defaultConnector();
    public VirtualMachine connectAndLaunchVM() throws IOException, IllegalConnectorArgumentsException, VMStartException 
    {
        Map<String, Connector.Argument> arguments = launchingConnector.defaultArguments();
        arguments.get("main" ).setValue( debugClass.getName() );
        VirtualMachine vm = launchingConnector.launch( arguments );
        return vm;
    }

    /**
     * Creates a request to prepare the debug class, add filter as the debug class and enables it
     * @param vm
     */
    public void enableClassPrepareRequest(VirtualMachine vm) 
    {
        ClassPrepareRequest classPrepareRequest = vm.eventRequestManager().createClassPrepareRequest();
        classPrepareRequest.addClassFilter( debugClass.getName() );
        classPrepareRequest.enable();
    }

    /**
     * Sets the break points at the line numbers mentioned in breakPointLines array
     * @param vm
     * @param event
     * @throws AbsentInformationException
     */
    public void setBreakPoints( VirtualMachine vm, ClassPrepareEvent event ) throws AbsentInformationException 
    {
        ClassType classType = (ClassType) event.referenceType();
        
        for ( int lineNumber: breakPointLines ) 
        {
            Location location = classType.locationsOfLine( lineNumber ).get( 0 );
            BreakpointRequest bpReq = vm.eventRequestManager().createBreakpointRequest( location );
            bpReq.enable();
        }
    }

    /**
     * Displays the visible variables
     * @param event
     * @throws IncompatibleThreadStateException
     * @throws AbsentInformationException
     */
    public void displayVariables( LocatableEvent event ) throws IncompatibleThreadStateException, AbsentInformationException 
    {
        StackFrame stackFrame = event.thread().frame( 0 );
        
        if ( stackFrame.location().toString().contains( debugClass.getName() ) ) 
        {
            Map<LocalVariable, Value> visibleVariables = stackFrame.getValues( stackFrame.visibleVariables() );
            System.out.println( "Variables at " +stackFrame.location().toString() +  " > " );
            
            for ( Map.Entry<LocalVariable, Value> entry : visibleVariables.entrySet() ) 
            {
                System.out.println( entry.getKey().name() + " = " + entry.getValue() );
            }
        }
    }

    /**
     * Enables step request for a break point
     * @param vm
     * @param event
     */
    public void enableStepRequest( VirtualMachine vm, BreakpointEvent event ) 
    {
        //enable step request for last break point
        if ( event.location().toString().contains( debugClass.getName() + ":" + breakPointLines[breakPointLines.length-1] ) ) 
        {
            StepRequest stepRequest = vm.eventRequestManager().createStepRequest( event.thread(), StepRequest.STEP_LINE, StepRequest.STEP_OVER );
            stepRequest.enable();    
        }
    }

}