package com.monitoringresources.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import com.monitoringresources.app.Controller.DebugController;
import com.sun.jdi.VMDisconnectedException;
import com.sun.jdi.VirtualMachine;
import com.sun.jdi.event.BreakpointEvent;
import com.sun.jdi.event.ClassPrepareEvent;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.EventSet;
import com.sun.jdi.event.StepEvent;

@SpringBootApplication
public class MonitoringResourcesApplication 
{
	public static void main( String[] args ) 
	{
		DebugController debuggerInstance = new DebugController();
        debuggerInstance.setDebugClass( JDIExampleDebuggee.class );
        int[] breakPoints = {6, 9};
        debuggerInstance.setBreakPointLines( breakPoints );
        VirtualMachine vm = null;

        try 
        {
            vm = debuggerInstance.connectAndLaunchVM();
            debuggerInstance.enableClassPrepareRequest( vm );

            EventSet eventSet = null;
            
            while ( ( eventSet = vm.eventQueue().remove() ) != null ) 
            {
                for ( Event event : eventSet ) 
                {
                    if ( event instanceof ClassPrepareEvent ) 
                    {
                        debuggerInstance.setBreakPoints( vm, (ClassPrepareEvent) event );
                    }

                    if ( event instanceof BreakpointEvent ) 
                    {
                        event.request().disable();
                        debuggerInstance.displayVariables( (BreakpointEvent) event );
                        debuggerInstance.enableStepRequest( vm, (BreakpointEvent) event );
                    }

                    if ( event instanceof StepEvent ) 
                    {
                        debuggerInstance.displayVariables( (StepEvent) event );
                    }

                    vm.resume();
                }
            }
        } 
        
        catch ( VMDisconnectedException e ) 
        {
            System.out.println("Virtual Machine is disconnected.");
        } 
        
        catch ( Exception e ) 
        {
            e.printStackTrace();
        }

        finally 
        {
            InputStreamReader reader = new InputStreamReader( vm.process().getInputStream() );
            OutputStreamWriter writer = new OutputStreamWriter( System.out );
            char[] buf = new char[512];

            
            try 
			{
				writer.write( buf );
				reader.read( buf );
				writer.flush();
			} 
			
			catch ( IOException e ) 
			{
				e.printStackTrace();
			}
        }

        SpringApplication.run(MonitoringResourcesApplication.class, args);
    }
}
